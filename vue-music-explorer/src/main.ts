import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import { msToMins } from './filters/msToMins';
import { formatArtwork } from './filters/formatArtwork';

Vue.filter('msToMins', (value: number) => msToMins(value));
Vue.filter('formatArtwork', (value: string, size: number) => formatArtwork(value, size));
import { musickitConfig } from './services/musickit-config';
musickitConfig.configure();


Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
