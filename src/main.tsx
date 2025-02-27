import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import QueryProvider from '@providers/QueryProvider';
import RouterProvider from '@providers/RouterProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider />
    </QueryProvider>
  </StrictMode>,
);
