/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";
import BaseTable from "./components/common/BaseTable.vue";
import BaseDialog from "./components/common/BaseDialog.vue";
import BaseEditDialog from "./components/common/BaseEditDialog.vue";
import BaseConfirmation from "./components/common/BaseConfirmation.vue";
import TableHeader from "./components/common/TableHeader.vue";
import DialogTable from "./components/common/dialogTable";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";
import "./assets/css/app.css";

const app = createApp(App);

app.component("dialog-table", DialogTable);
app.component("base-dialog", BaseDialog);
app.component("base-edit-dialog", BaseEditDialog);
app.component("base-confirmation", BaseConfirmation);
app.component("base-table", BaseTable);
app.component("t-header", TableHeader);

registerPlugins(app);

app.mount("#app");
