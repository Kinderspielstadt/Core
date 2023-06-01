import * as VueRouter from 'vue-router';
import DataView from '../components/views/DataView.vue';
import CheckInView from '../components/views/CheckInView.vue';
import BankView from '../components/views/BankView.vue';
import StocksView from '../components/views/StocksView.vue';
import RadioView from '../components/views/RadioView.vue';

const routes = [
  {
    path: '/data',
    component: DataView,
  },
  {
    path: '/checkin',
    component: CheckInView,
  },
  {
    path: '/bank',
    component: BankView,
  },
  {
    path: '/stocks',
    component: StocksView,
  },
  {
    path: '/radio',
    component: RadioView,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

export default router;