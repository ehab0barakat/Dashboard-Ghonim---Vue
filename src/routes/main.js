import BaseLayout from "@/layouts/BaseLayout";
import HomePage from "@/pages/main/HomePage";
import UsersPage from "@/pages/main/UsersPage";

import { i18n } from "@/plugins/i18n";

const { t } = i18n.global;

export const mainRoutes = [
  {
    path: "/",
    redirect: "/dashboard/home",
  },
  {
    path: "/dashboard",
    redirect: "/dashboard/home",
    component: BaseLayout,
    children: [
      // home
      {
        name: "home-page",
        path: "/dashboard/home",
        components: {
          main: HomePage,
        },
        meta: {
          title: t("homePage.title"),
          requiresAuth: true,
        },
      },

      {
        name: "users-page",
        path: "/dashboard/users",
        components: {
          main: UsersPage,
        },
        meta: {
          title: t("usersPage.title"),
          requiresAuth: true,
        },
      },
    ],
  },
];
