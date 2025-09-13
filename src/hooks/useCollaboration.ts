import { useState, useEffect } from 'react';
import type { Socket } from 'socket.io-client';
import type { CollaborationEvent } from '../types/form';

interface UseCollaborationOptions {
  formId: string;
  userId: string;
}

export const useCollaboration = ({ formId, userId }: UseCollaborationOptions) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  const [events, setEvents] = useState<CollaborationEvent[]>([]);

  useEffect(() => {
    // For demo purposes, we'll simulate real-time collaboration
    // In a real implementation, this would connect to a Socket.io server
    
    const mockSocket = {
      emit: (event: string, data: any) => {
        console.log('Emitting event:', event, data);
      },
      on: (event: string, _callback: Function) => {
        console.log('Listening for event:', event);
      },
      disconnect: () => {
        console.log('Disconnecting from collaboration server');
      },
    } as any;

    setSocket(mockSocket);

    // Simulate connected users
    setConnectedUsers(['John Doe', 'Jane Smith', userId]);

    // Simulate real-time events
    const interval = setInterval(() => {
      const mockEvent: CollaborationEvent = {
        type: 'field_updated',
        userId: 'demo-user',
        timestamp: new Date(),
        data: { fieldId: 'demo-field', action: 'edit' },
      };
      
      setEvents(prev => [...prev.slice(-4), mockEvent]);
    }, 10000);

    return () => {
      clearInterval(interval);
      mockSocket?.disconnect();
    };
  }, [formId, userId]);

  const broadcastChange = (event: Omit<CollaborationEvent, 'timestamp'>) => {
    const fullEvent: CollaborationEvent = {
      ...event,
      timestamp: new Date(),
    };

    socket?.emit('form_change', fullEvent);
    setEvents(prev => [...prev.slice(-4), fullEvent]);
  };

  return {
    connectedUsers,
    events,
    broadcastChange,
    isConnected: !!socket,
  };
};