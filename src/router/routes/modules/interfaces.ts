import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const INTERFACES: AppRouteRecordRaw = {
  path: '/interfaces',
  name: 'interfaces',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.interfaces',
    requiresAuth: true,
    icon: 'icon-link',
    order: 0,
  },
  children: [
    {
      path: 'list',
      name: 'interfacesList',
      component: () => import('@/views/interfaces/list/index.vue'),
      meta: {
        locale: 'menu.interfaces.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default INTERFACES;
