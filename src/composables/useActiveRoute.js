// composables/useHousesActive.js
import { useRoute } from "vue-router";
import { computed } from "vue";

/*
 Composable to determine if the current route belongs to the "Houses" section
 */
export function useActiveRoute() {
  const route = useRoute();

  const housesRoutes = ["Houses", "CreateListing", "EditListing", "DetailPage"];

  const isActive = computed(() => housesRoutes.includes(route.name));

  return { isActive };
}
