import { nextTick } from "vue";
import { createRouter, createWebHistory } from "vue-router";

//ROUTES
import { authRoutes } from "@/routes/auth";
import { mainRoutes } from "@/routes/main";
import { miscRoutes } from "@/routes/misc";
import { useAuthStore } from "@/store/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [...authRoutes, ...mainRoutes, ...miscRoutes],
});

//GUARDS
router.afterEach((to, _) => {
  nextTick(() => {
    document.title = "Icon - " + to.meta.title;
  });
});

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated)
    next({name: "auth-login"});
  else next();

});

export default router;
