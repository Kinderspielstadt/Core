import * as VueRouter from 'vue-router';
import CheckInView from '../components/views/CheckInView.vue';
import BankView from '../components/views/BankView.vue';
import StocksView from '../components/views/StocksView.vue';
import RadioView from '../components/views/RadioView.vue';
import SettingsView from '../components/views/SettingsView.vue';
import DataView from '../components/views/DataView.vue';
import AdminView from '../components/views/AdminView.vue';

const routes = [
  {
    path: '/checkin',
    name: 'checkin',
    component: CheckInView,
  },
  {
    path: '/bank',
    name: 'bank',
    component: BankView,
  },
  {
    path: '/stocks',
    name: 'stocks',
    component: StocksView,
  },
  {
    path: '/radio',
    name: 'radio',
    component: RadioView,
  },
  {
    path: '/data',
    name: 'data',
    component: DataView,
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView,
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView,
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

export default router;