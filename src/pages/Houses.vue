<script setup>
import { ref, computed, onMounted } from "vue";
import { useHousesStore } from "../stores/houses";
import { useRouter } from "vue-router";
import Modal from "@/components/Modal.vue";

const store = useHousesStore();
const searchQuery = ref("");
const router = useRouter();

// Sorting state
const sortCriterion = ref("price"); // price, size
const sortOrder = ref("asc"); // asc or desc

// Modal state
const showModal = ref(false);
const houseToDelete = ref(null);

// Favorites filter state
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

onMounted(() => {
  store.fetchAll();
});

const editHouse = (id) => {
  router.push(`/edit-listing/${id}`);
};

const deleteHouse = (house) => {
  houseToDelete.value = house;
  showModal.value = true;
};

const confirmDelete = async () => {
  if (houseToDelete.value) {
    await store.deleteHouse(houseToDelete.value.id);
    houseToDelete.value = null;
    showModal.value = false;
  }
};

const cancelDelete = () => {
  houseToDelete.value = null;
  showModal.value = false;
};

const createListing = () => {
  router.push(`/create-listing`);
};

// Handle sorting
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

// Toggle favorite status
const toggleFavorite = (house) => {
  if (store.favorites.some((fav) => fav.id === house.id)) {
    store.removeFavorite(house.id);
  } else {
    store.addFavorite(house);
  }
};

// Toggle favorites filter
const toggleFavoritesFilter = () => {
  showFavoritesOnly.value = !showFavoritesOnly.value;
};
</script>

<template>
  <section class="home">
    <div class="row header-row">
      <h1 class="title">Houses</h1>
      <button
        class="btn create-btn"
        @click="createListing"
        title="Create New Listing"
      >
        <span class="create-icon">
          <img
            src="/ic_plus_white@3x.png"
            alt="create"
            class="create-img desktop-icon"
          />
          <img
            src="/ic_plus_grey@3x.png"
            alt="create"
            class="create-img mobile-icon"
          />
        </span>
        <span class="create-text">CREATE</span>
      </button>
    </div>

    <div class="row controls-row">
      <div class="search-wrapper">
        <span class="search-icon">
          <img src="/ic_search@3x.png" alt="search" width="18" />
        </span>
        <input
          v-model="searchQuery"
          type="text"
          class="search"
          placeholder="Search for a house"
        />
        <span v-if="searchQuery" class="clear-icon" @click="clearSearch">
          <img src="/ic_clear_white@3x.png" alt="clear" width="18" />
        </span>
      </div>

      <section class="toggle-btns">
        <button
          class="btn"
          :class="{ active: sortCriterion === 'price' }"
          @click="sortHouses('price')"
        >
          Price
          {{
            sortCriterion === "price" ? (sortOrder === "asc" ? "↑" : "↓") : ""
          }}
        </button>
        <button
          class="btn"
          :class="{ active: sortCriterion === 'size' }"
          @click="sortHouses('size')"
        >
          Size
          {{
            sortCriterion === "size" ? (sortOrder === "asc" ? "↑" : "↓") : ""
          }}
        </button>
        <button
          class="btn favorites-btn"
          :class="{ active: showFavoritesOnly }"
          @click="toggleFavoritesFilter"
          title="Toggle Favorites Filter"
        >
          Favorites
        </button>
      </section>
    </div>

    <p v-if="store.isLoading">Loading...</p>
    <div v-else-if="filteredHouses.length === 0">
      <section class="empty-state">
        <img src="/img_empty_houses@3x.png" alt="empty search" width="200" />
        <p>No results found</p>
        <p>Please try another keyword.</p>
      </section>
    </div>
    <div v-else>
      <div
        v-for="house in filteredHouses"
        :key="house.id"
        class="house-list-container"
      >
        <div class="house-list">
          <section class="house-image">
            <img
              :src="house.image || '/property-fallback.png'"
              alt="house"
              style="border-radius: 5px; cursor: pointer"
              @click="router.push(`/detail-page/${house.id}`)"
            />
          </section>
          <section class="house-item">
            <h2>
              {{ house.location.street }} {{ house.location.houseNumber }}
              {{ house.location.houseNumberAddition }}
            </h2>
            <p>€ {{ house.price }}</p>
            <p style="color: var(--color-tertiary)">
              {{ house.location.zip }} {{ house.location.city }}
            </p>
            <section class="house-options">
              <span class="house-options">
                <img
                  src="/ic_bed@3x.png"
                  alt="bedrooms"
                  width="20"
                  height="20"
                />
                <p>{{ house.rooms.bedrooms }}</p>
              </span>
              <span class="house-options">
                <img
                  src="/ic_bath@3x.png"
                  alt="bathrooms"
                  width="20"
                  height="20"
                />
                <p>{{ house.rooms.bathrooms }}</p>
              </span>
              <span class="house-options">
                <img src="/ic_size@3x.png" alt="size" width="20" height="20" />
                <p>{{ house.size }}</p>
              </span>
            </section>
          </section>
        </div>
        <section class="house-actions">
          <img
            :src="
              store.favorites.some((fav) => fav.id === house.id)
                ? '/heart_668687.png'
                : '/heart_3916769.png'
            "
            alt="favorite"
            width="24"
            @click.stop="toggleFavorite(house)"
            style="cursor: pointer"
          />
          <img
            src="/ic_edit@3x.png"
            alt="edit"
            width="24"
            @click.stop="editHouse(house.id)"
            style="cursor: pointer"
          />
          <img
            src="/ic_delete@3x.png"
            alt="delete"
            width="24"
            @click.stop="deleteHouse(house)"
            style="cursor: pointer"
          />
        </section>
      </div>
    </div>

    <Modal
      :show="showModal"
      title="Delete House"
      message="Are you sure you want to delete this house?"
      @close="cancelDelete"
      @confirm="confirmDelete"
    />
  </section>
</template>

<style scoped>
.home {
  padding: 20px;
  position: relative;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text-primary);
  margin-bottom: 20px;
}

.header-row {
  flex-wrap: wrap;
  gap: 10px;
}

.btn {
  font-size: var(--button-desktop, 16px);
  height: 48px;
  padding: 0 20px;
  cursor: pointer;
  background-color: var(--color-tertiary);
  border: none;
  border-radius: 5px;
  transition: background-color 0.2s ease;
  min-width: 100px;
  touch-action: manipulation;
}

.btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-primary-light); /* custom focus ring */
}

.btn.active {
  background-color: var(--color-primary);
  color: white;
}

.create-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 0 15px;
  background-color: var(--color-primary);
  color: white;
}

.create-img {
  width: 20px;
  height: 20px;
}

.desktop-icon {
  display: inline-block;
}

.mobile-icon {
  display: none;
}

.create-text {
  display: inline;
}

.search-wrapper {
  position: relative;
  flex: 1;
  max-width: 300px;
  min-width: 200px;
}

.search {
  width: 100%;
  background-color: var(--color-tertiary);
  border: none;
  border-radius: 5px;
  padding: 12px 40px 12px 35px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-30%);
  pointer-events: none;
}

.clear-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-30%);
  cursor: pointer;
  transition: color 0.2s ease;
}

.toggle-btns {
  display: flex;
  gap: 0;
}

.toggle-btns .btn {
  flex: 1;
  border-radius: 0;
}

.toggle-btns .btn:first-child {
  border-radius: 5px 0 0 5px;
}

.toggle-btns .btn:nth-child(2) {
  border-radius: 0;
}

.toggle-btns .favorites-btn {
  border-radius: 0 5px 5px 0;
}

.favorites-btn.active {
  background-color: rgb(255, 0, 136);
}

.house-list-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
  background-color: var(--bg-2);
  padding: 15px;
  border-radius: 5px;
}

.house-list {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.house-image img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 5px;
}

.house-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.house-item h2 {
  font-size: 18px;
  margin: 0 0 5px 0;
}

.house-item p {
  margin: 5px 0;
}

.house-options {
  display: flex;
  align-items: center;
  gap: 15px;
  color: var(--color-text-secondary);
}

.house-options img {
  border-radius: 5px;
}

.house-actions {
  display: flex;
  gap: 15px;
  align-items: center;
  align-self: flex-start;
}

.empty-state {
  text-align: center;
  margin: 50px 0;
}

.empty-state img {
  max-width: 100%;
  height: auto;
}

.house-actions img {
  width: 20px;
  height: 20px;
}
@media (max-width: 1000px) {
  .controls-row {
    flex-direction: column;
    align-items: stretch;
    position: relative;
  }

  .search-wrapper {
    max-width: 100%;
    width: 100%;
    margin-bottom: 10px;
  }
}

@media (max-width: 768px) {
  .home {
    padding: 15px;
  }

  .header-row {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .create-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    min-width: unset;
    padding: 0;
    background-color: transparent;
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .create-text {
    display: none;
  }

  .desktop-icon {
    display: none;
  }

  .mobile-icon {
    display: inline-block;
  }

  .create-img {
    width: 24px;
    height: 24px;
  }

  .controls-row {
    flex-direction: column;
    align-items: stretch;
    position: relative;
  }

  .search-wrapper {
    max-width: 100%;
    width: 100%;
    margin-bottom: 10px;
  }

  .toggle-btns {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .toggle-btns .btn {
    flex: 1;
    padding: 0 10px;
    font-size: 14px;
    height: 40px;
    width: 33.33%; /* Equal width for all toggle buttons */
  }

  .toggle-btns .btn:first-child {
    border-radius: 5px 0 0 5px;
  }

  .toggle-btns .btn:nth-child(2) {
    border-radius: 0;
  }

  .toggle-btns .favorites-btn {
    border-radius: 0 5px 5px 0;
  }

  .toggle-btns .favorites-btn.active {
    background-color: rgb(255, 0, 136);
  }

  .house-list-container {
    align-items: flex-start;
    padding: 10px;
  }

  .house-list {
    align-items: flex-start;
    width: 100%;
  }

  .house-image img {
    width: 100%;
    max-width: 300px;
    height: auto;
    aspect-ratio: 1 / 1;
  }

  .house-item h2 {
    font-size: 16px;
  }

  .house-item p {
    font-size: 14px;
  }

  .house-options {
    gap: 10px;
  }

  .house-options img {
    width: 18px;
    height: 18px;
  }

  .house-actions {
    gap: 10px;
  }

  .empty-state img {
    width: 150px;
  }

  .house-image img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
  }

  .house-actions img {
    width: 15px;
    height: 15px;
  }
}
</style>
