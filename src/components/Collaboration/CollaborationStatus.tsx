import React from 'react';
import { Users, Wifi, WifiOff } from 'lucide-react';
import { useCollaboration } from '../../hooks/useCollaboration';

interface CollaborationStatusProps {
  formId: string;
  userId: string;
}

const CollaborationStatus: React.FC<CollaborationStatusProps> = ({ formId, userId }) => {
  const { connectedUsers, events, isConnected } = useCollaboration({ formId, userId });

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-900">Collaboration</span>
        </div>
        <div className="flex items-center space-x-1">
          {isConnected ? (
            <Wifi className="w-4 h-4 text-green-500" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-xs ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Connected Users */}
      <div className="mb-3">
        <div className="text-xs text-gray-500 mb-1">Active users ({connectedUsers.length})</div>
        <div className="flex space-x-1">
          {connectedUsers.slice(0, 5).map((user, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white font-medium"
              title={user}
            >
              {user.charAt(0).toUpperCase()}
            </div>
          ))}
          {connectedUsers.length > 5 && (
            <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-xs text-white">
              +{connectedUsers.length - 5}
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      {events.length > 0 && (
        <div>
          <div className="text-xs text-gray-500 mb-1">Recent activity</div>
          <div className="space-y-1 max-h-20 overflow-y-auto">
            {events.slice(-3).reverse().map((event, index) => (
              <div key={index} className="text-xs text-gray-600 flex items-center justify-between">
                <span>
                  {event.userId} {event.type.replace('_', ' ')}
                </span>
                <span className="text-gray-400">
                  {new Date(event.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isConnected && (
        <div className="text-xs text-gray-500 mt-2">
          Real-time collaboration is currently unavailable
        </div>
      )}
    </div>
  );
};

export default CollaborationStatus;