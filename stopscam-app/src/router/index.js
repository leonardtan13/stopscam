import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../components/CommunityFeed.vue"),
    },
    // {
    //   path: "/login",
    //   component: () => import("../views/Test.vue"),
    // },
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
