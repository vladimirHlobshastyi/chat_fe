import { useEffect, useRef, useCallback, useState, ReactNode } from 'react';
import { useChatStore } from '@/store/chatStore/useChatStore';
import { WebSocketContext } from './useWebSocket';
import { useAuthStore } from '@/store/authStore/useAuthStore';
import { useQueryClient } from '@tanstack/react-query';

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const reconnectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const myId = useChatStore((s) => s.myProfile?.userId);
  const setOnlineUsers = useChatStore((s) => s.setOnlineUsers);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const queryClient = useQueryClient();

  const connect = useCallback(() => {
    if (!isAuthenticated || ws) return;

    const socket = new WebSocket('ws://localhost:3000');

    socket.onopen = () => {
      console.log('✅ WebSocket connected');
      if (myId) {
        socket.send(JSON.stringify({ type: 'init', userId: myId }));
      }
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'online_users') {
        setOnlineUsers(msg.data);
      }

      if (msg.type === 'new_message') {
        queryClient.invalidateQueries({ queryKey: ['unread-total'] });
        queryClient.invalidateQueries({ queryKey: ['unread-per-chat'] });
        queryClient.invalidateQueries({ queryKey: ['chats'] });
      }

      if (msg.type === 'read_message') {
        queryClient.invalidateQueries({ queryKey: ['unread-total'] });
        queryClient.invalidateQueries({ queryKey: ['unread-per-chat'] });
      }
    };

    socket.onerror = (err) => {
      console.error('❌ WebSocket error', err);
    };

    socket.onclose = () => {
      console.warn('🛑 WebSocket closed');
      setWs(null);

      if (useAuthStore.getState().isAuthenticated) {
        reconnectTimeout.current = setTimeout(() => {
          console.log('🔄 Reconnecting WebSocket...');
          connect();
        }, 3000);
      } else {
        setOnlineUsers([]);
      }
    };

    setWs(socket);
  }, [myId, isAuthenticated, ws, setOnlineUsers]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
      ws?.close();
    };
  }, [connect]);

  useEffect(() => {
    if (!isAuthenticated && ws) {
      ws.close();
      setWs(null);
      setOnlineUsers([]);
      console.log('🚪 WebSocket disconnected due to logout');
    }
  }, [isAuthenticated, ws]);

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
