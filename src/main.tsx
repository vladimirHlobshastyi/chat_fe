import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import QueryProvider from '@providers/QueryProvider';
import RouterProvider from '@providers/RouterProvider';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import WebSocketProvider from './providers/WebSocketProvider';

TimeAgo.addDefaultLocale(en);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <WebSocketProvider>
        <RouterProvider />
      </WebSocketProvider>
    </QueryProvider>
  </StrictMode>,
);
