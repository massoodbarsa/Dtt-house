import { createRouter, createWebHistory } from "vue-router";
import Houses from "../pages/Houses.vue";
import About from "../pages/About.vue";

const routes = [
  { path: "/", name: "Houses", component: Houses },
  { path: "/about", name: "About", component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
