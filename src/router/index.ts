import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import appSetting from '../app-setting';
import { useAppStore } from '../stores/index';

import { RouterView } from 'vue-router';
import HomeView from '../views/index.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/login.vue'),
        meta: { layout: 'auth', },
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/auth/register.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/otp',
        name: 'otp',
        component: () => import('../views/auth/otp.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: () => import('../views/auth/forgot-password.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/forgot-password-otp',
        name: 'forgot-password-otp',
        component: () => import('../views/auth/forgot-password-otp.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/reset-password',
        name: 'reset-password',
        component: () => import('../views/auth/reset-password.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/roles',
        component: RouterView,                // wrapper that renders the children
        meta: { requiresAuth: true },
        children: [
            {
                path: 'list',
                name: 'roles-list',
                component: () => import('../../src/views/user-management/role/index.vue'),
            },
            {
                path: 'add',
                name: 'role-add',
                component: () => import('../../src/views/user-management/role/add.vue'),
            },
            {
                path: ':id/edit',
                name: 'role-edit',
                props: true,
                component: () => import('../../src/views/user-management/role/edit.vue'),
            },
        ],
    },
    {
        path: '/users',
        component: RouterView,                // wrapper that renders the children
        meta: { requiresAuth: true },
        children: [
            {
                path: 'list',
                name: 'users-list',
                component: () => import('../../src/views/user-management/user/index.vue'),
            },
            {
                path: 'add',
                name: 'user-add',
                component: () => import('../../src/views/user-management/user/add.vue'),
            },
            {
                path: ':id/edit',
                name: 'user-edit',
                props: true,
                component: () => import('../../src/views/user-management/user/edit.vue'),
            },
        ],
    },
    {
        path: '/economic-and-capital-market-information/economic-submissions',
        component: RouterView,                // wrapper that renders the children
        meta: { requiresAuth: true },
        children: [
            {
                path: 'list',
                name: 'economic-submissions-list',
                component: () => import('../../src/views/economic-and-capital-market-information/economic-submissions/index.vue'),
            },
            {
                path: 'add',
                name: 'economic-submission-add',
                component: () => import('../../src/views/economic-and-capital-market-information/economic-submissions/add.vue'),
            },
            {
                path: ':id/edit',
                name: 'economic-submission-edit',
                props: true,
                component: () => import('../../src/views/economic-and-capital-market-information/economic-submissions/edit.vue'),
            },
            {
                path: ':id/show',
                name: 'economic-submission-show',
                props: true,
                component: () => import('../../src/views/economic-and-capital-market-information/economic-submissions/show.vue'),
            },
        ],
    },
    {
        path: '/economic-and-capital-market-information/sectors',
        component: RouterView, // wrapper that renders the children
        meta: { requiresAuth: true },
        children: [
            // --- Sector Routes ---
            {
                path: 'list',
                name: 'sectors-list',
                component: () => import('../../src/views/economic-and-capital-market-information/sectors/index.vue'),
            },
            {
                path: 'add',
                name: 'sector-add',
                component: () => import('../../src/views/economic-and-capital-market-information/sectors/add.vue'),
            },
            {
                path: ':id/edit',
                name: 'sector-edit',
                props: true,
                component: () => import('../../src/views/economic-and-capital-market-information/sectors/edit.vue'),
            },
            // --- SubSector Routes (nested inside a Sector) ---
            {
                path: ':id/sub-sectors',
                component: RouterView, // nested wrapper for subsectors
                props: true,
                children: [
                    {
                        path: 'list',
                        name: 'sub-sectors-list',
                        props: true,
                        component: () => import('../../src/views/economic-and-capital-market-information/sectors/sub-sectors/index.vue'),
                    },
                    {
                        path: 'add',
                        name: 'sub-sector-add',
                        props: true,
                        component: () => import('../../src/views/economic-and-capital-market-information/sectors/sub-sectors/add.vue'),
                    },
                    {
                        path: ':sub_sector/edit',
                        name: 'sub-sector-edit',
                        props: true,
                        component: () => import('../../src/views/economic-and-capital-market-information/sectors/sub-sectors/edit.vue'),
                    },
                ],
            },
        ],
    },
    {
        path: '/economic-and-capital-market-information/portfolio-records',
        component: RouterView,                // wrapper that renders the children
        meta: { requiresAuth: true },
        children: [
            {
                path: 'list',
                name: 'portfolio-records-list',
                component: () => import('../../src/views/economic-and-capital-market-information/portfolio-records/index.vue'),
            },
            {
                path: 'add',
                name: 'portfolio-record-add',
                component: () => import('../../src/views/economic-and-capital-market-information/portfolio-records/add.vue'),
            },
            {
                path: ':id/edit',
                name: 'portfolio-record-edit',
                props: true,
                component: () => import('../../src/views/economic-and-capital-market-information/portfolio-records/edit.vue'),
            },
        ],
    },
    // optional fallback
    {
        path: '/:catchAll(.*)',
        name: 'not-found',
        component: () => import('../views/pages/error404.vue'),
        meta: { layout: 'auth' },
    },
];

const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { left: 0, top: 0 };
    },
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  // Set layout
  const store = useAppStore();
  store.setMainLayout(to.meta?.layout === 'auth' ? 'auth' : 'app');

  // Auth protection
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'login' });
  }

  if (to.meta.guestOnly && isAuthenticated) {
    return next({ name: 'home' });
  }

  next();
});


// changed signature: no `next()` in afterEach
router.afterEach(() => {
    appSetting.changeAnimation();
});

export default router;
export const appRouter = router;

