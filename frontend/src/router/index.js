import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Quotes from "../pages/Quotes.vue";
import Manage from "../pages/Manage.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/quote", component: Quotes },
  { path: "/manage", component: Manage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
