import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faAngleDoubleRight, faCircleXmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
// eslint-disable-next-line import/extensions
import router from './router';
import store from './store';

const vuetify = createVuetify({
  components,
  directives,
});

library.add(faAngleDoubleRight);
library.add(faCircleXmark);
library.add(faCircleCheck);

createApp(App)
  .use(store)
  .use(router)
  .use(vuetify)
  .component('fa-icon', FontAwesomeIcon)
  .mount('#app');
