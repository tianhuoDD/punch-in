import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

// pinia状态管理
import { createPinia } from "pinia";
app.use(createPinia());

// 单路由页面
import router from "./router";
app.use(router);

// vant组件引入
import Vant from "vant";
import "vant/lib/index.css";
app.use(Vant);

app.mount("#app");

// vite-plugin-svg-icons 必要的配置
import "virtual:svg-icons-register";
