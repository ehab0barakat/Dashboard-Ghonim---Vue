import NotFoundPage from "@/pages/misc/NotFoundPage";

import { i18n } from "@/plugins/i18n";
const { t } = i18n.global;

export const miscRoutes = [
  {
    name: "not-found",
    path: "/:notfound(.*)",
    component: NotFoundPage,
    meta: {
      title: t("pageNotFound.title"),
    },
  },
];
