export default function SafetyLogPage() {
  const logEntries: any[] = [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'unsafe':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'safe':
        return 'Safe';
      case 'warning':
        return 'Warning';
      case 'unsafe':
        return 'Unsafe';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="px-8 py-6">
      <div className="flex items-baseline gap-4 pb-6 border-b border-gray-200 mb-6">
        <h1 className="text-3xl font-light tracking-tight">Safety Log</h1>
        <p className="text-sm text-gray-600">
          Real-time safety monitoring log from Guardian AI system
        </p>
      </div>

      <div className="max-w-screen-2xl">
        {logEntries.length === 0 ? (
          <div className="border border-gray-200 bg-white p-12 text-center">
            <div className="text-gray-400">
              <svg
                className="w-12 h-12 mx-auto mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-sm">No safety log entries yet</p>
              <p className="text-xs mt-1">
                Start Guardian monitoring to begin logging safety checks
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {logEntries.map((entry) => (
              <div
                key={entry.id}
                className="border border-gray-200 bg-white p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${getStatusColor(
                        entry.status
                      )}`}
                    />
                    <span className="text-sm font-medium">
                      {getStatusLabel(entry.status)}
                    </span>
                    <span className="text-xs text-gray-500">
                      Robot: {entry.robot}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-500">
                      Confidence: {entry.confidence}%
                    </span>
                    <span className="text-xs text-gray-500">
                      {entry.timestamp}
                    </span>
                  </div>
                </div>

                <div className="text-sm text-gray-700 mb-2">
                  {entry.summary}
                </div>

                {entry.concerns.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="text-xs font-medium text-gray-900 mb-1">
                      Concerns:
                    </div>
                    <ul className="space-y-1">
                      {entry.concerns.map((concern: string, index: number) => (
                        <li
                          key={index}
                          className="text-xs text-gray-600 flex items-start gap-2"
                        >
                          <span className="text-red-500 flex-shrink-0">•</span>
                          <span>{concern}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
