import { en } from "@/config/locale/en";
import { ar } from "@/config/locale/ar";
import { createI18n } from "vue-i18n";

const messages = {
  en,
  ar,
};

export const i18n = new createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages,
});
