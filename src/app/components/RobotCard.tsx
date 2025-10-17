'use client';

import GuardianSystem from './GuardianSystem';

interface RobotCardProps {
  name: string;
  hardware: string;
  policyModel: string;
  uptime: string;
  batteryLevel: number; // 0-100
  taskProgress: string;
  status?: 'active' | 'idle' | 'charging' | 'error';
  enableWebcam?: boolean;
}

export default function RobotCard({
  name,
  hardware,
  policyModel,
  uptime,
  batteryLevel,
  taskProgress,
  status = 'active',
  enableWebcam = false,
}: RobotCardProps) {
  // Determine battery color based on level
  const getBatteryColor = (level: number) => {
    if (level >= 60) return 'bg-green-500';
    if (level >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Determine status color
  const getStatusColor = (s: string) => {
    switch (s) {
      case 'active':
        return 'bg-green-500';
      case 'idle':
        return 'bg-gray-400';
      case 'charging':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="border border-gray-200 bg-white flex flex-col h-full">
      {/* Header with robot name */}
      <div className="px-6 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getStatusColor(status)}`} />
          <h2 className="text-xl font-light tracking-tight">{name}</h2>
        </div>
      </div>

      {/* Stats section */}
      <div className="px-6 pb-4 space-y-2">
        <div className="text-sm">
          <span className="text-gray-500">Hardware:</span>{' '}
          <span className="text-black">{hardware}</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Policy Model:</span>{' '}
          <span className="text-black">{policyModel}</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Uptime:</span>{' '}
          <span className="text-black">{uptime}</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Battery:</span>{' '}
          <span className="text-black">{batteryLevel}%</span>
          <div className="mt-1 h-2 bg-gray-200 w-full">
            <div
              className={`h-full ${getBatteryColor(batteryLevel)}`}
              style={{ width: `${batteryLevel}%` }}
            />
          </div>
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Task Progress:</span>{' '}
          <span className="text-black">{taskProgress}</span>
        </div>
      </div>

      {/* Video feed */}
      <div className="px-6 py-4">
        <div className="text-xs text-gray-500 mb-2">Video Feed</div>
        {enableWebcam ? (
          <GuardianSystem />
        ) : (
          <div className="bg-gray-100 border border-gray-200 aspect-video flex items-center justify-center">
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
              <span className="text-xs">Camera feed</span>
            </div>
          </div>
        )}
      </div>

      {/* Map placeholder */}
      <div className="px-6 py-4 flex-1">
        <div className="text-xs text-gray-500 mb-2">Location</div>
        <div className="bg-gray-100 border border-gray-200 h-48 flex items-center justify-center">
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
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            <span className="text-xs">Map view</span>
          </div>
        </div>
      </div>
    </div>
  );
}
