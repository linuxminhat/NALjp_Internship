import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import "./assets/style.css";
import router from "./router/index.js";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Import toàn bộ gói icon
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

// Add toàn bộ gói icon vào thư viện
library.add(fas, fab, far);

import "ant-design-vue/dist/reset.css";
import { Calendar, Menu, Layout, Avatar } from "ant-design-vue";

const app = createApp(App);
app.use(router);
app.use(Layout);
app.use(Avatar);
app.use(Calendar);
app.use(Menu);

app.use(createPinia());
app.component("fa", FontAwesomeIcon);
app.mount("#app");
