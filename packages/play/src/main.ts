import { createApp } from 'vue';
import App from './App.vue';
import Vant from 'vant';
import 'vant/lib/index.css';
import 'gupo-ui/src/index.scss';
import GupoUI from 'gupo-ui/src/index';

const app = createApp(App);

app.use(Vant).use(GupoUI);

app.mount('#app');
