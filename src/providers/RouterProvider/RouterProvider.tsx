import { routeTree } from '@/routeTree.gen';
import {
  RouterProvider as TanstackRouterProvider,
  createRouter,
} from '@tanstack/react-router';

const router = createRouter({ routeTree });
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const RouterProvider = () => {
  return <TanstackRouterProvider router={router} />;
};

export default RouterProvider;
