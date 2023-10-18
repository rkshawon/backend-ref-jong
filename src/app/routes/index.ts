import express from 'express';
import authRoutes from '../modules/auth/auth.routes';
import clientRoutes from '../modules/client/client.routes';
import usersRoutes from '../modules/user/user.routes';

const router = express.Router();

const appRoutes = [
  {
    path: '/users',
    route: usersRoutes,
  },
  {
    path: '/clients',
    route: clientRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
];

appRoutes.forEach(route => router.use(route.path, route.route));
export default router;
