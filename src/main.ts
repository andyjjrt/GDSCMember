import vue3GoogleLogin from "vue3-google-login";
import "./style.css";
import App from "./App.vue";
import router from "./routes";
import VueQrcode from "@chenfengyuan/vue-qrcode";

const store = createPinia();
const app = createApp(App);

app.use(vue3GoogleLogin, {
  clientId:
    "1074271718336-6bd2eece404794eqmtpptar29v2u7kg9.apps.googleusercontent.com",
});
app.use(router);
app.use(store);
app.component(VueQrcode.name, VueQrcode);

app.mount("#app");
