import type { RouteObject, RouteProps } from 'react-router-dom';

import { MainPage } from '@/pages/MainPage/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage/ProfilePage';
import { ProjectPage } from '@/pages/ProjectPage/ProjectPage';

export enum AppRoutes {
   MAIN = 'main',
   PROFILE = 'profile',
   NOT_FOUND = 'not_found',
   PROJECT = 'project', // Добавляем новый маршрут
}

export const RoutePath: Record<AppRoutes, string> = {
   [AppRoutes.MAIN]: '/',
   [AppRoutes.PROFILE]: '/profile',
   [AppRoutes.NOT_FOUND]: '*',
   [AppRoutes.PROJECT]: '/projects/:id', // Параметр id для страницы проекта
};

export const routeConfig: Record<AppRoutes, RouteObject> = {
   [AppRoutes.MAIN]: {
      path: RoutePath.main,
      element: <MainPage />,
   },
   [AppRoutes.PROFILE]: {
      path: RoutePath.profile,
      element: <ProfilePage />,
   },
   [AppRoutes.NOT_FOUND]: {
      path: RoutePath.not_found,
      element: <NotFoundPage />,
   },
   [AppRoutes.PROJECT]: {
      path: RoutePath.project,
      element: <ProjectPage />, // Добавляем новую страницу
   },
};
