/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import router from "./router";
import { i18n } from "./i18n";
import { pinia } from "./pinia";

export function registerPlugins(app) {
  loadFonts();
  app.use(i18n).use(router).use(pinia).use(vuetify);
}
