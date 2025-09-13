// composables/useHousesActive.js
import { useRoute } from "vue-router";

/*
  Composable to determine if the current route belongs to the "Houses" section
*/
export function useActiveRoute() {
  const route = useRoute();

  const housesRoutes = ["Houses", "CreateListing", "EditListing", "DetailPage"];

  // Return plain boolean
  const isActive = () => housesRoutes.includes(route.name);

  return { isActive };
}
