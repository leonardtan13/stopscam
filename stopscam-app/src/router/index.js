import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/help",
      component: () => import("../views/HelpView.vue"),
    },
    {
      path: "/feed",
      component: () => import("../views/FeedView.vue"),
    },
    {
      path: "/",
      component: () => import("../views/HomeView.vue"),
    },
  ],
});

export default router;
