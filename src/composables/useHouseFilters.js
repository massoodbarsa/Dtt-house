import { useHousesStore } from "../stores/houses";
import { ref, computed } from "vue";

export function useHouseFilters() {
  const store = useHousesStore();
  const searchQuery = ref("");
  const sortCriterion = ref("price"); // price, size
  const sortOrder = ref("asc"); // asc or desc
  const showFavoritesOnly = ref(false);

  const clearSearch = () => {
    searchQuery.value = "";
  };

  // Compute filtered and sorted houses
  const filteredHouses = computed(() => {
    let houses = showFavoritesOnly.value
      ? store.favorites
      : store.items.filter((house) =>
          house.location.city
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
        );

    if (sortCriterion.value) {
      houses = [...houses].sort((a, b) => {
        const valueA = sortCriterion.value === "price" ? a.price : a.size;
        const valueB = sortCriterion.value === "price" ? b.price : b.size;
        return sortOrder.value === "asc" ? valueA - valueB : valueB - valueA;
      });
    }

    return houses;
  });

  const sortHouses = (criterion) => {
    if (sortCriterion.value === criterion) {
      // Toggle sort order if same criterion is clicked
      sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    } else {
      // Set new criterion and default to ascending
      sortCriterion.value = criterion;
      sortOrder.value = "asc";
    }
  };

  return {
    searchQuery,
    sortCriterion,
    sortOrder,
    showFavoritesOnly,
    clearSearch,
    sortHouses,
    filteredHouses,
  };
}
