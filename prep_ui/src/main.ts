import bulmaConfig from 'buefy';
import { createApp } from 'vue';
import 'buefy/dist/buefy.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';
import router from './router';
import store from './store';

library.add(faAngleDoubleRight);

createApp(App)
  // .use(bulmaConfig)
  .use(store)
  .use(router)
  .component('fa-icon', FontAwesomeIcon)
  .mount('#app');
