import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueCookies from "vue3-cookies";

const app = createApp(App);
app.use(router);
app.use(VueCookies);
app.mount("#app");

app.config.globalProperties.axios = axios;
