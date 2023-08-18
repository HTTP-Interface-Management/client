import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const PROJECTS: AppRouteRecordRaw = {
  path: '/projects',
  name: 'projects',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.projects',
    requiresAuth: true,
    icon: 'icon-subscribed',
    order: 0,
  },
  children: [
    {
      path: 'list',
      name: 'projectsList',
      component: () => import('@/views/projects/list/index.vue'),
      meta: {
        locale: 'menu.projects.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default PROJECTS;
