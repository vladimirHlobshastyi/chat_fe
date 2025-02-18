import { createRoute } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
import AdminLayout from '../layouts/AdminLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Users from '../pages/admin/Users';
import Gifts from '../pages/admin/Gifts';
import Tariffs from '../pages/admin/Tariffs';
import Transactions from '../pages/admin/Transactions';
import Dialogs from '../pages/admin/Dialogs';

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
});

const adminRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminLayout,
});

const usersRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/users',
  component: Users,
});

const giftsRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/gifts',
  component: Gifts,
});

const tariffsRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/tariffs',
  component: Tariffs,
});

const transactionsRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/transactions',
  component: Transactions,
});

const dialogsRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/dialogs',
  component: Dialogs,
});

export const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  adminRootRoute.addChildren([
    usersRoute,
    giftsRoute,
    tariffsRoute,
    transactionsRoute,
    dialogsRoute,
  ]),
]);
