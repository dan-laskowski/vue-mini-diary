import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUnderline,
  faBold,
  faItalic,
  faList,
  faListOl,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUnderline, faBold, faItalic, faList, faListOl);

createApp(App)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
