import { createRouter, createWebHistory } from "vue-router";
import Houses from "../pages/Houses.vue";

const routes = [{ path: "/", name: "Houses", component: Houses }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
