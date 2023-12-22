import { createApp } from "vue";

import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import router from "@/router/index";
import store from "@/store/index";


const app = createApp(App);
app.use(VueAxios, axios)
app.use(router)
app.use(store)
app.mount('#app')