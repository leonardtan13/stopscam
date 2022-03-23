import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/profile",
      component: () => import("../views/ProfileView.vue"),
    },
    // {
    //   path: "/feed",
    //   component: () => import("../views/Feed.vue"),
    // },
  ],
});

export default router;
