import App from '@/App.vue';
import { createApp, watch } from 'vue';

const app = createApp(App);

// pinia store
import { createPinia } from 'pinia';
const pinia = createPinia();
app.use(pinia);

import router from '@/router';
app.use(router);

// main app css
import '@/assets/css/app.css';

// perfect scrollbar
import PerfectScrollbar from 'vue3-perfect-scrollbar';
app.use(PerfectScrollbar);

//vue-meta
import { createHead } from '@vueuse/head';
const head = createHead();
app.use(head);

// set default settings
import appSetting from '@/app-setting';
appSetting.init();

//vue-i18n
import i18n from '@/i18n';
app.use(i18n);

// tippy tooltips
import { TippyPlugin } from 'tippy.vue';
app.use(TippyPlugin);

//input mask
import Maska from 'maska';
app.use(Maska);

//markdown editor
import 'easymde/dist/easymde.min.css';
import VueEasymde from 'vue3-easymde';
app.use(VueEasymde);

// popper
import Popper from 'vue3-popper';
app.component('Popper', Popper);

// json to excel
import vue3JsonExcel from 'vue3-json-excel';
app.use(vue3JsonExcel);

import { useAuthStore } from '@/stores/auth';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

app.use(Vue3Toastify, {
  autoClose: 3000,       // milliseconds
  position: "top-right", // or 'top-center', 'bottom-left', etc.
  newestOnTop: true,
  theme: 'light', // 'dark' or 'colored'
});

const auth = useAuthStore()
if (auth.token) {
    auth.fetchUser()
}
watch(
  () => auth.token,
  (val) => {
    if (!val) {
      router.push({ name: 'login' })
    }
  }
)
app.mount('#app');
