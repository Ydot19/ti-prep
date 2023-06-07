import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../page/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/problems/classifications',
    name: 'classification categories',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../page/ClassificationCategories.vue'),
  },
  {
    path: '/problems/classifications/:classification',
    name: 'specific problems by classification category',
    component: () => import('../page/ProblemsByClassification.vue'),
  },
  {
    path: '/problems/detail/:id',
    name: 'specific problem details',
    component: () => import('../page/ProblemDetails.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
