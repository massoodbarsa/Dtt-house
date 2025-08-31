<script setup>
import { ref, computed, onMounted } from "vue";
import { useHousesStore } from "../stores/houses";
import { useRouter } from "vue-router";
import Modal from "@/components/Modal.vue";

const store = useHousesStore();
const searchQuery = ref("");
const router = useRouter();

// Modal state
const showModal = ref(false);
const houseToDelete = ref(null);

const clearSearch = () => {
  searchQuery.value = "";
};

const filteredHouses = computed(() =>
  store.items.filter((house) =>
    house.location.city.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

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
    await store.deleteHouse(houseToDelete.value.id); // delete from API
    houseToDelete.value = null;
    showModal.value = false;
  }
};

const cancelDelete = () => {
  houseToDelete.value = null;
  showModal.value = false;
};

const createListing = (id) => {
  router.push(`/create-listing`);
};
</script>

<template>
  <section class="home">
    <div class="row">
      <h1>Houses</h1>
      <button class="btn" @click="createListing">
        <span style="font-size: larger; margin-right: 5px">+</span>CREATE NEW
      </button>
    </div>

    <div class="row">
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
          <img src="/ic_clear_white@3x.png" alt="search" width="18" />
        </span>
      </div>

      <section>
        <button
          class="btn"
          style="
            border-radius: 5px 0 0 5px;
            padding-left: 50px;
            padding-right: 50px;
          "
        >
          Price
        </button>
        <button
          class="btn"
          style="
            border-radius: 0 5px 5px 0;
            background-color: var(--color-tertiary);
            padding-left: 50px;
            padding-right: 50px;
          "
        >
          Size
        </button>
      </section>
    </div>

    <p v-if="store.isLoading">Loading...</p>
    <div v-else-if="filteredHouses.length === 0">
      <section style="margin: 100px 0">
        <img src="/img_empty_houses@3x.png" alt="empty ssearch" width="400" />
        <p>No resault found</p>
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
          <section>
            <img
              :src="house.image"
              alt="search"
              width="180"
              height="180"
              style="border-radius: 5px"
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
            <section class="house-options" style="gap: 20px">
              <span class="house-options">
                <img
                  src="/ic_bed@3x.png"
                  alt="search"
                  width="25"
                  height="25"
                  style="border-radius: 5px"
                />
                <p>{{ house.rooms.bedrooms }}</p></span
              >
              <span class="house-options">
                <img
                  src="/ic_bath@3x.png"
                  alt="search"
                  width="25"
                  height="25"
                  style="border-radius: 5px"
                />
                <p>{{ house.rooms.bathrooms }}</p></span
              >
              <span class="house-options">
                <img
                  src="/ic_size@3x.png"
                  alt="search"
                  width="25"
                  height="25"
                  style="border-radius: 5px"
                />
                <p>{{ house.size }}</p></span
              >
            </section>
          </section>
        </div>
        <section
          style="align-self: flex-start; margin: 40px; gap: 20px; display: flex"
        >
          <img
            src="/ic_edit@3x.png"
            alt="edit"
            width="18"
            @click="editHouse(house.id)"
            style="cursor: pointer"
          />
          <img
            src="/ic_delete@3x.png"
            alt="delete"
            width="18"
            @click="deleteHouse(house)"
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
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text-primary);
  margin-top: 10px;
}

.btn {
  font-size: var(--button-desktop);
  height: 50px;
  cursor: pointer;
}

.search-wrapper {
  position: relative;
  width: 250px;
}

.search {
  width: 100%;
  background-color: var(--color-tertiary);
  border: none;
  border-radius: 5px;
  padding: 12px 35px 12px 35px; /* space for icons */
  font-size: 14px;
  outline: none;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 10px;
  pointer-events: none;
}

.clear-icon {
  position: absolute;
  right: -40px;
  top: 13px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.house-list-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 20px;
  margin-top: 20px;
  background-color: var(--bg-2);
  padding: 5px 20px;
  border-radius: 5px;
}
.house-list {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 20px;
  margin-top: 20px;
  background-color: var(--bg-2);
  padding: 5px 20px;
  border-radius: 5px;
}

.house-item {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
}

.house-options {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-text-secondary);
}
</style>
