import { createRouter, createWebHistory } from "vue-router";
import useAuthUser from "@/composables/UseAuthUser";

const routes = [
  {
    name: "EmailConfirmation",
    path: "/joliskokassa/email-confirmation",
    component: () => import("@/pages/EmailConfirmation.vue"),
  },
  {
    name: "Home",
    path: "/joliskokassa/",
    component: () => import("@/pages/Home.vue"),
  },
  {
    name: "Me",
    path: "/joliskokassa/me",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/pages/Me.vue"),
  },
  {
    name: "Girls",
    path: "/joliskokassa/girls",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/pages/Girls.vue"),
  },
  {
    name: "Login",
    path: "/joliskokassa/login",
    component: () => import("@/pages/Login.vue"),
  },
  {
    name: "ForgotPassword",
    path: "/joliskokassa/forgotPassword",
    component: () => import("@/pages/ForgotPassword.vue"),
  },
  {
    name: "Logout",
    path: "/joliskokassa/logout",
    beforeEnter: async () => {
      const { logout } = useAuthUser();
      await logout();
      return { name: "Home" };
    },
  },
  {
    name: "Register",
    path: "/joliskokassa/register",
    component: () => import("@/pages/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const { isLoggedIn } = useAuthUser();
  if (
    !isLoggedIn() &&
    to.meta.requiresAuth &&
    !Object.keys(to.query).includes("fromEmail")
  ) {
    return { name: "Login" };
  }
});

export default router;
