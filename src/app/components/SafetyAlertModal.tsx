'use client';

import { useEffect, useRef } from 'react';

interface SafetyAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  robot: string;
  status: 'warning' | 'unsafe';
  summary: string;
  concerns: string[];
  recommendations: string[];
  confidence: number;
}

export default function SafetyAlertModal({
  isOpen,
  onClose,
  robot,
  status,
  summary,
  concerns,
  recommendations,
  confidence,
}: SafetyAlertModalProps) {
  const dismissButtonRef = useRef<HTMLButtonElement>(null);

  // Focus dismiss button when modal opens
  useEffect(() => {
    if (isOpen && dismissButtonRef.current) {
      dismissButtonRef.current.focus();
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const borderColor = status === 'unsafe' ? 'border-red-200' : 'border-yellow-200';
  const dotColor = status === 'unsafe' ? 'bg-red-500' : 'bg-yellow-500';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Alert Card */}
      <div className={`bg-white border ${borderColor} shadow-lg max-w-2xl w-full`}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${dotColor}`} />
              <span className="text-base font-medium">
                {status === 'unsafe' ? 'Safety Concern' : 'Safety Warning'}
              </span>
            </div>
            <button
              ref={dismissButtonRef}
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Dismiss alert"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-4">
          {/* Human Pilot Required */}
          <div className="bg-gray-50 border border-gray-200 px-4 py-3 text-center">
            <p className="text-lg font-medium text-gray-900">
              Human pilot intervention required
            </p>
          </div>
          {/* Robot and Confidence */}
          <div className="text-sm text-gray-600">
            Robot: <span className="font-medium text-gray-900">{robot}</span> • Confidence: {confidence}%
          </div>

          {/* Summary */}
          <div className="text-base text-gray-700">{summary}</div>

          {/* Concerns */}
          {concerns.length > 0 && (
            <div>
              <div className="text-sm font-medium text-gray-900 mb-2">Concerns:</div>
              <ul className="space-y-2">
                {concerns.map((concern, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className={`${status === 'unsafe' ? 'text-red-500' : 'text-yellow-500'} flex-shrink-0`}>
                      •
                    </span>
                    <span>{concern}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div>
              <div className="text-sm font-medium text-gray-900 mb-2">
                Recommendations:
              </div>
              <ul className="space-y-2">
                {recommendations.map((recommendation, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-blue-500 flex-shrink-0">→</span>
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
