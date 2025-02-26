import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import QueryProvider from '@providers/QueryProvider';
import RouterProvider from '@providers/RouterProvider';
import AuthProvider from './providers/AuthProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <QueryProvider>
        <RouterProvider />
      </QueryProvider>
    </AuthProvider>
  </StrictMode>,
);
