import LoginPage from "@/pages/auth/LoginPage";

import { i18n } from "@/plugins/i18n";
const { t } = i18n.global;

export const authRoutes = [
  {
    path: "/auth",
    redirect: "auth/login",
    children: [
      {
        name: "auth-login",
        path: "/auth/login",
        component: LoginPage,
        meta: {
          title: t("loginPage.title"),
        },
      },
    ],
  },
  {
    path: "/login",
    redirect: "auth/login",
  },
];
