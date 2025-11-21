import { createApp } from 'vue';
import App from './App.vue';
import LDesignVue from '@ldesign/webcomponent-vue';

const app = createApp(App);

// 使用 LDesign Vue 插件
app.use(LDesignVue);

app.mount('#app');




