'use client';

import { useRef, useState, useEffect } from 'react';
import { useSafetyLog } from '../contexts/SafetyLogContext';
import SafetyAlertModal from './SafetyAlertModal';

interface SafetyCheckResult {
  safe: boolean;
  confidence: number;
  summary: string;
  concerns: string[];
  recommendations: string[];
}

interface GuardianSystemProps {
  robotName?: string;
}

export default function GuardianSystem({ robotName = 'Unknown Robot' }: GuardianSystemProps) {
  const { addLogEntry } = useSafetyLog();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const shouldContinueCheckingRef = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [checking, setChecking] = useState(false);
  const [isContinuousChecking, setIsContinuousChecking] = useState(false);
  const [checkStatus, setCheckStatus] = useState<string>('');
  const [checkError, setCheckError] = useState<string | null>(null);
  const [safetyResult, setSafetyResult] = useState<SafetyCheckResult | null>(null);
  const [alertData, setAlertData] = useState<SafetyCheckResult | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const startWebcam = async () => {
    setLoading(true);
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsActive(true);
        setLoading(false);
      }
    } catch (err) {
      console.error('Error accessing webcam:', err);
      setError('Unable to access webcam. Please grant camera permissions.');
      setLoading(false);
    }
  };

  const stopWebcam = () => {
    // Stop continuous checking if active
    if (isContinuousChecking) {
      stopContinuousChecking();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
  };

  const captureFrame = (): string | null => {
    if (!videoRef.current) {
      return null;
    }

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return null;
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.8);
  };

  const performSingleCheck = async (): Promise<boolean> => {
    try {
      setCheckError(null);

      // Step 1: Capture frame
      setCheckStatus('Capturing frame from webcam');
      const imageData = captureFrame();

      if (!imageData) {
        throw new Error('Failed to capture frame from webcam');
      }

      // Step 2: Encoding
      setCheckStatus('Encoding image data');

      // Step 3: Sending request
      setCheckStatus('Sending request to Gemini AI');
      const responsePromise = fetch('/api/check-safety', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      });

      // Step 4: Waiting for response
      setCheckStatus('Waiting for response');

      const response = await responsePromise;

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Safety check failed');
      }

      // Step 5: Processing response
      setCheckStatus('Processing results');
      const result = await response.json();

      setSafetyResult(result);

      // Determine status based on result
      let status: 'safe' | 'warning' | 'unsafe' = 'safe';
      if (!result.safe) {
        status = 'unsafe';
      } else if (result.concerns && result.concerns.length > 0) {
        status = 'warning';
      }

      // Only log incidents (warnings and unsafe conditions)
      if (status === 'warning' || status === 'unsafe') {
        addLogEntry({
          robot: robotName,
          status,
          confidence: result.confidence,
          summary: result.summary,
          concerns: result.concerns || [],
          recommendations: result.recommendations || [],
        });

        // Trigger alert
        setAlertData(result);
        setShowAlert(true);
      }

      return true;
    } catch (err) {
      console.error('Error checking safety:', err);
      setCheckError(err instanceof Error ? err.message : 'Failed to check safety');
      return false;
    }
  };

  const startContinuousChecking = async () => {
    if (!isActive) {
      setCheckError('Please start the camera first');
      return;
    }

    setIsContinuousChecking(true);
    setChecking(true);
    shouldContinueCheckingRef.current = true;
    setSafetyResult(null);

    while (shouldContinueCheckingRef.current) {
      await performSingleCheck();

      if (!shouldContinueCheckingRef.current) break;

      // Wait 1 second before next check
      setCheckStatus('Waiting 1 second before next check');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setChecking(false);
    setCheckStatus('');
  };

  const stopContinuousChecking = () => {
    shouldContinueCheckingRef.current = false;
    setIsContinuousChecking(false);
    setChecking(false);
    setCheckStatus('');
  };

  // Cleanup on unmount - stop camera and checking when navigating away
  useEffect(() => {
    return () => {
      // Stop continuous checking
      shouldContinueCheckingRef.current = false;

      // Stop webcam stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      {/* Video display area */}
      <div className="bg-gray-100 border border-gray-200 aspect-video overflow-hidden relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-400">
              <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <span className="text-xs">Loading webcam...</span>
            </div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-400 px-4">
              <svg
                className="w-12 h-12 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="text-xs">{error}</span>
            </div>
          </div>
        )}
        {!isActive && !loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-400">
              <svg
                className="w-12 h-12 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs">Camera ready</span>
            </div>
          </div>
        )}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
      </div>

      {/* Control buttons */}
      <div className="mt-3 flex justify-center gap-2">
        {!isActive ? (
          <button
            onClick={startWebcam}
            disabled={loading}
            className="px-3 py-1.5 border border-gray-200 bg-white text-gray-700 text-xs hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Starting...' : 'Start Camera'}
          </button>
        ) : (
          <button
            onClick={stopWebcam}
            className="px-3 py-1.5 border border-gray-200 bg-white text-gray-700 text-xs hover:bg-gray-50 transition-colors"
          >
            Stop Camera
          </button>
        )}
        <button
          onClick={isContinuousChecking ? stopContinuousChecking : startContinuousChecking}
          disabled={!isActive}
          className="px-3 py-1.5 border border-gray-200 bg-white text-gray-700 text-xs hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isContinuousChecking ? 'Stop Checking Safety' : 'Start Checking Safety'}
        </button>
      </div>

      {/* Status Line */}
      {checking && checkStatus && (
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
          <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          <span>{checkStatus}</span>
        </div>
      )}

      {/* Safety Check Results */}
      {checkError && (
        <div className="mt-3 p-3 border border-red-200 bg-red-50">
          <div className="flex items-start gap-2">
            <svg
              className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div className="text-xs text-red-700">{checkError}</div>
          </div>
        </div>
      )}

      {safetyResult && (
        <div className="mt-3 p-4 border border-gray-200 bg-white space-y-3">
          {/* Status Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  safetyResult.safe ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <span className="text-sm font-medium">
                {safetyResult.safe ? 'Safe' : 'Safety Concern'}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              Confidence: {safetyResult.confidence}%
            </span>
          </div>

          {/* Summary */}
          <div className="text-sm text-gray-700">{safetyResult.summary}</div>

          {/* Concerns */}
          {safetyResult.concerns && safetyResult.concerns.length > 0 && (
            <div className="space-y-1">
              <div className="text-xs font-medium text-gray-900">Concerns:</div>
              <ul className="space-y-1">
                {safetyResult.concerns.map((concern, index) => (
                  <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="text-red-500 flex-shrink-0">•</span>
                    <span>{concern}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendations */}
          {safetyResult.recommendations && safetyResult.recommendations.length > 0 && (
            <div className="space-y-1">
              <div className="text-xs font-medium text-gray-900">Recommendations:</div>
              <ul className="space-y-1">
                {safetyResult.recommendations.map((recommendation, index) => (
                  <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="text-blue-500 flex-shrink-0">→</span>
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Safety Alert Modal */}
      {alertData && (
        <SafetyAlertModal
          isOpen={showAlert}
          onClose={() => setShowAlert(false)}
          robot={robotName}
          status={alertData.safe ? 'warning' : 'unsafe'}
          summary={alertData.summary}
          concerns={alertData.concerns || []}
          recommendations={alertData.recommendations || []}
          confidence={alertData.confidence}
        />
      )}
    </div>
  );
}
