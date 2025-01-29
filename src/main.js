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
/* 
@rom:error 添加 vant toast样式的原因：同时使用 Popup 和 Toast 会导致样式冲突，Toast样式变为白底。具体参见：https://blog.csdn.net/qq_37131375/article/details/133707824
解决方式：可再次引入 toast 样式来解决
更多的问题：当使用按需引入时，无需手动导入 showToast ，否则会导致样式问题。具体参见：https://vant-ui.github.io/vant/#/zh-CN/toast#an-xu-yin-ru-zu-jian-shi-shi-yong-showtoast-shi-chu-xian-yang-shi-yi-chang-wen-ti
更多的问题2：经过更深入研究，发现不能同时使用「全量引入」和「按需引入」，否则会导致样式错落等问题。具体参见：https://vant-ui.github.io/vant/#/zh-CN/quickstart#shi-yong-ti-shi
 */
// import "vant/lib/index.css";
// import "vant/es/toast/style";
app.use(Vant);

app.mount("#app");

// vite-plugin-svg-icons 必要的配置
import "virtual:svg-icons-register";
// 引入全局样式
import "./styles/global.css";
import "./styles/colors.css";

import "@icon-park/vue-next/styles/index.css";
