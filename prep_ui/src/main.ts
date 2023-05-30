import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faAngleDoubleRight,
  faCircleXmark,
  faCircleCheck,
  faArrowRight,
  faList,
  faItalic,
  faBold,
  faHeading,
  faPen,
  faGlasses,
  faChevronLeft,
  faChevronRight,
  faPaperPlane,
  faRotateLeft,
  faCloudArrowUp,
  faQuoteLeft,
  faCode,
  faLink,
  faListOl,
} from '@fortawesome/free-solid-svg-icons';
// eslint-disable-next-line import/order
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
library.add(faArrowRight);
library.add(faList);
library.add(faItalic);
library.add(faBold);
library.add(faHeading);
library.add(faPen);
library.add(faGlasses);
library.add(faChevronLeft);
library.add(faChevronRight);
library.add(faPaperPlane);
library.add(faRotateLeft);
library.add(faCloudArrowUp);
library.add(faQuoteLeft);
library.add(faCode);
library.add(faLink);
library.add(faListOl);

createApp(App)
  .use(store)
  .use(router)
  .use(vuetify)
  .component('fa-icon', FontAwesomeIcon)
  .mount('#app');
