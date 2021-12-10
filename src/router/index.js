import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from '../supabase/index';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Diary from '../views/Diary.vue';
import Profile from '../views/Profile.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      auth: false,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      auth: false,
    },
  },
  {
    path: '/diary',
    name: 'Diary',
    component: Diary,
    meta: {
      auth: true,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      auth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = supabase.auth.user();
  if (to.matched.some((res) => res.meta.auth)) {
    if (user) {
      next();
      return;
    }
    next({ name: 'Login' });
    return;
  }
  next();
});

export default router;
