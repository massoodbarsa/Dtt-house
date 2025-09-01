<script setup>
import { ref, reactive, onMounted } from "vue";
import { useHousesStore } from "../stores/houses";
import { useRoute, useRouter } from "vue-router";
import BackButton from "../components/BackButton.vue";
import Modal from "@/components/Modal.vue";

const store = useHousesStore();
const route = useRoute();
const router = useRouter();
const houseId = Number(route.params.id);

const showModal = ref(false);
const houseToDelete = ref(null);

const house = reactive({
  id: null,
  image: "",
  price: 0,
  rooms: { bedrooms: 0, bathrooms: 0 },
  size: 0,
  description: "",
  location: {
    street: "",
    houseNumber: "",
    houseNumberAddition: "",
    city: "",
    zip: "",
  },
  constructionYear: 0,
  hasGarage: false,
});

const recommendedHouses = ref([]);

onMounted(() => {
  const found = store.items.find((h) => h.id === houseId);
  if (found) Object.assign(house, found);
  recommendedHouses.value = store.items
    .filter((h) => h.id !== houseId)
    .slice(0, 3);
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
    router.push("/");
  }
};

const cancelDelete = () => {
  houseToDelete.value = null;
  showModal.value = false;
};
</script>

<template>
  <div class="page-wrapper">
    <div class="back-btn-main">
      <BackButton text="Back to overview" to="/" />
    </div>
    <div class="back-btn" @click="router.push(`/`)">
      <img src="/ic_back_white@3x.png" alt="Back" class="back-icon" />
    </div>
    <div class="container">
      <div class="detail-page">
        <!-- House image with buttons -->
        <div class="house-content">
          <section class="house-image">
            <img
              :src="house.image || '/placeholder.png'"
              alt="House"
              class="main-image"
            />
          </section>
        </div>

        <!-- House details -->
        <div class="house-list-container">
          <div class="house-info">
            <section class="house-item">
              <h1>
                {{ house.location.street }} {{ house.location.houseNumber }}
                {{ house.location.houseNumberAddition }}
              </h1>
              <span class="house-options">
                <img
                  src="/ic_location@3x.png"
                  alt="Location"
                  class="option-icon"
                />
                <p>{{ house.location.zip }}</p>
              </span>
              <section class="house-options">
                <span class="house-options">
                  <img src="/ic_price@3x.png" alt="Price" class="option-icon" />
                  <p>€ {{ house.price.toLocaleString() }}</p>
                </span>
                <span class="house-options">
                  <img src="/ic_size@3x.png" alt="Size" class="option-icon" />
                  <p>{{ house.size }} m²</p>
                </span>
                <span class="house-options">
                  <img
                    src="/ic_construction_date@3x.png"
                    alt="Construction Year"
                    class="option-icon"
                  />
                  <p>Built in {{ house.constructionYear }}</p>
                </span>
              </section>
              <section class="house-options">
                <span class="house-options">
                  <img
                    src="/ic_bed@3x.png"
                    alt="Bedrooms"
                    class="option-icon"
                  />
                  <p>{{ house.rooms.bedrooms }}</p>
                </span>
                <span class="house-options">
                  <img
                    src="/ic_bath@3x.png"
                    alt="Bathrooms"
                    class="option-icon"
                  />
                  <p>{{ house.rooms.bathrooms }}</p>
                </span>
                <span class="house-options">
                  <img
                    src="/ic_garage@3x.png"
                    alt="Garage"
                    class="option-icon"
                  />
                  <p>{{ house.hasGarage ? "Yes" : "No" }}</p>
                </span>
              </section>
              <p class="text">{{ house.description }}</p>
            </section>
          </div>
          <div class="mutation-btns">
            <img
              src="/ic_edit@3x.png"
              alt="Edit house"
              class="action-icon"
              @click="editHouse(house.id)"
            />
            <img
              src="/ic_delete@3x.png"
              alt="Delete house"
              class="action-icon"
              @click="deleteHouse(house)"
            />
          </div>
        </div>
      </div>

      <!-- Recommended houses -->
      <aside class="recommended">
        <h2>Recommended for you</h2>
        <div
          v-for="recHouse in recommendedHouses"
          :key="recHouse.id"
          class="house-list"
        >
          <section>
            <img
              :src="recHouse.image || '/placeholder.png'"
              alt="Recommended house"
              class="recommended-image"
              @click="$router.push(`/house/${recHouse.id}`)"
            />
          </section>
          <section class="house-item">
            <h4>
              {{ recHouse.location.street }} {{ recHouse.location.houseNumber }}
              {{ recHouse.location.houseNumberAddition }}
            </h4>
            <p>€ {{ recHouse.price.toLocaleString() }}</p>
            <p class="tertiary-text">
              {{ recHouse.location.zip }} {{ recHouse.location.city }}
            </p>
            <section class="house-options">
              <span class="house-options">
                <img src="/ic_bed@3x.png" alt="Bedrooms" class="option-icon" />
                <p>{{ recHouse.rooms.bedrooms }}</p>
              </span>
              <span class="house-options">
                <img
                  src="/ic_bath@3x.png"
                  alt="Bathrooms"
                  class="option-icon"
                />
                <p>{{ recHouse.rooms.bathrooms }}</p>
              </span>
              <span class="house-options">
                <img src="/ic_size@3x.png" alt="Size" class="option-icon" />
                <p>{{ recHouse.size }} m²</p>
              </span>
            </section>
          </section>
        </div>
      </aside>
    </div>
    <Modal
      :show="showModal"
      title="Delete House"
      message="Are you sure you want to delete this house?"
      @close="cancelDelete"
      @confirm="confirmDelete"
    />
  </div>
</template>

<style scoped>
.page-wrapper {
  margin: 10px 0 30px;
  box-sizing: border-box;
  overflow-x: hidden;
}

.back-btn-main {
  margin-bottom: 20px;
}

.back-btn {
  display: none;
}

.container {
  display: flex;
  justify-content: space-between;
  gap: 50px;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}

.detail-page {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.house-content {
  position: relative;
}

.house-image {
  width: 100%;
}

.main-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 5px;
}

.house-list-container {
  background-color: var(--bg-2);
  padding: 20px 30px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}

.house-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.house-item h1 {
  margin: 10px 0;
  font-size: 24px;
}

.house-options {
  display: flex;
  align-items: center;
  gap: 10px;
}

.house-options > span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.option-icon {
  width: 25px;
  height: 25px;
  border-radius: 5px;
}

.text {
  text-align: left;
  line-height: 1.5rem;
  margin: 10px 0;
}

.mutation-btns {
  display: flex;
  gap: 20px;
  align-self: flex-start;
  margin: 20px 10px;
}

.action-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.action-icon:hover {
  opacity: 0.8;
}

.recommended {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.recommended h2 {
  text-align: left;
  margin: 0;
  font-size: 20px;
}

.house-list {
  display: flex;
  gap: 15px;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
}

.recommended-image {
  width: 120px;
  height: 120px;
  border-radius: 5px;
  cursor: pointer;
}

.house-item h4 {
  margin: 0;
  font-size: 16px;
}

.house-item p {
  margin: 2px 0;
}

.tertiary-text {
  color: var(--color-tertiary);
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
    gap: 30px;
    padding: 0 10px;
    width: 100%;
  }

  .back-btn-main {
    display: none;
  }

  .back-btn {
    display: block;
    position: absolute;
    top: 23px;
    left: 10px;
    z-index: 1080;
    padding: 20px;
  }

  .back-icon {
    width: 24px;
    height: 24px;
  }

  .mutation-btns {
    position: absolute;
    top: 10px;
    right: 10px;
    margin: 0;
    gap: 15px;
    background: rgba(255, 255, 255, 0.8);
    padding: 8px;
    border-radius: 5px;
  }

  .mutation-btns:hover {
    opacity: 0.8;
  }

  .action-icon {
    width: 18px;
    height: 18px;
  }

  .house-list-container {
    padding: 15px;
    width: 100%;
    box-sizing: border-box;
  }

  .recommended {
    width: 100%;
  }

  .main-image {
    max-height: 300px;
  }

  .house-item h1 {
    font-size: 20px;
  }

  .recommended-image {
    width: 100px;
    height: 100px;
  }

  .house-list {
    padding: 8px;
  }
}
</style>
