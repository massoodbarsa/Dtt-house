import { createRouter, createWebHistory } from "vue-router";
import Houses from "../pages/Houses.vue";
import About from "../pages/About.vue";
import EditListing from "../pages/EditListing.vue";
import CreateListing from "../pages/CreateListing.vue";

const routes = [
  { path: "/", name: "Houses", component: Houses },
  { path: "/about", name: "About", component: About },
  {
    path: "/edit-listing/:id",
    name: "EditListing",
    component: EditListing,
    props: true,
  },
  {
    path: "/create-listing",
    name: "CreateListing",
    component: CreateListing,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
