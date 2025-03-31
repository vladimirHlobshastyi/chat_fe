import { createContext, useContext } from 'react';

export const WebSocketContext = createContext<WebSocket | null>(null);

export const useWebSocket = () => {
  const ws = useContext(WebSocketContext);
  if (!ws) {
    return null;
  }
  return ws;
};
