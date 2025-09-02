import { createRouter, createWebHistory } from "vue-router";
import HousesList from "../pages/HousesList.vue";
import AboutPage from "../pages/AboutPage.vue";
import EditListing from "../pages/EditListing.vue";
import CreateListing from "../pages/CreateListing.vue";
import DetailPage from "../pages/DetailPage.vue";

const routes = [
  { path: "/", name: "Houses", component: HousesList },
  { path: "/about", name: "About", component: AboutPage },
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
  {
    path: "/detail-page/:id",
    name: "DetailPage",
    component: DetailPage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
