import { createApp } from 'vue'
import './main.css'
import App from './main.vue'
import { createPinia } from 'pinia';
import naive from 'naive-ui'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(naive);
app.mount('#app');