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
    // {
    //   path: "/sign-in",
    //   component: () => import("../views/SignIn.vue"),
    // },
    // {
    //   path: "/feed",
    //   component: () => import("../views/Feed.vue"),
    // },
  ],
});

export default router;
