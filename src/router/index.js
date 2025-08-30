import { createRouter, createWebHistory } from "vue-router";
import Houses from "../pages/Houses.vue";
import About from "../pages/About.vue";
import EditListing from "../pages/EditListing.vue";

const routes = [
  { path: "/", name: "Houses", component: Houses },
  { path: "/about", name: "About", component: About },
  {
    path: "/edit-listing/:id",
    name: "EditListing",
    component: EditListing,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
