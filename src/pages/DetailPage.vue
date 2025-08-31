<script></script>
tem
<script setup>
import { ref, reactive, onMounted } from "vue";
import { useHousesStore } from "../stores/houses";
import { useRoute } from "vue-router";
import BackButton from "../components/BackButton.vue";

const store = useHousesStore();
const route = useRoute();
const houseId = Number(route.params.id);

console.log(houseId);

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

// Recommended houses (e.g., other houses from the store)
const recommendedHouses = ref([]);

onMounted(() => {
  // Load the house by ID
  const found = store.items.find((h) => h.id === houseId);
  if (found) Object.assign(house, found);

  // Load recommended houses (e.g., up to 3 other houses)
  recommendedHouses.value = store.items
    .filter((h) => h.id !== houseId)
    .slice(0, 3);
});
</script>

<template>
  <div style="margin-top: 10px; margin-bottom: 30px">
    <BackButton text="Back to overview" to="/" />
  </div>
  <div class="container">
    <div class="detail-page">
      <!-- House information -->
      <div class="house-content">
        <!-- Large house photo -->
        <section class="house-image">
          <img
            :src="house.image || '/placeholder.png'"
            alt="House"
            style="
              width: 100%;
              max-height: 400px;
              object-fit: cover;
              border-radius: 5px;
            "
          />
        </section>
      </div>

      <!-- list info -->

      <div class="house-list-container">
        <div>
          <section class="house-item" style="gap: 20px">
            <h1 style="margin: 10px 0">
              {{ house.location.street }} {{ house.location.houseNumber }}
              {{ house.location.houseNumberAddition }}
            </h1>

            <span class="house-options" style="gap: 10px">
              <img
                src="/ic_location@3x.png"
                alt="search"
                width="25"
                height="25"
                style="border-radius: 5px"
              />
              <p>{{ house.location.zip }}</p></span
            >
            <!--  -->
            <section class="house-options" style="gap: 30px">
              <span class="house-options">
                <img
                  src="/ic_price@3x.png"
                  alt="search"
                  width="25"
                  height="25"
                  style="border-radius: 5px"
                />
                <p>{{ house.price }}</p></span
              >
              <span class="house-options">
                <img
                  src="/ic_size@3x.png"
                  alt="search"
                  width="25"
                  height="25"
                  style="border-radius: 5px"
                />
                <p>{{ house.size }} m2</p></span
              >
              <span class="house-options">
                <img
                  src="/ic_construction_date@3x.png"
                  alt="search"
                  width="25"
                  height="25"
                  style="border-radius: 5px"
                />
                <p>Built in {{ house.constructionYear }}</p></span
              >
            </section>

            <!--  -->
            <section class="house-options" style="gap: 30px">
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
                  src="/ic_garage@3x.png"
                  alt="search"
                  width="25"
                  height="25"
                  style="border-radius: 5px"
                />

                <p>{{ house.hasGarage === true ? "Yes" : "No" }}</p></span
              >
            </section>
          </section>
          <p class="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <section
          style="
            align-self: flex-start;
            margin: 20px 10px;
            gap: 20px;
            display: flex;
          "
        >
          <img
            src="/ic_edit@3x.png"
            alt="edit"
            width="20"
            @click="editHouse(house.id)"
            style="cursor: pointer"
          />
          <img
            src="/ic_delete@3x.png"
            alt="delete"
            width="20"
            @click="deleteHouse(house)"
            style="cursor: pointer"
          />
        </section>
      </div>
    </div>

    <!-- Recommended houses column -->
    <!-- Recommended houses column -->
    <!-- Recommended houses column -->
    <!-- Recommended houses column -->
    <!-- Recommended houses column -->
    <!-- Recommended houses column -->
    <aside class="recommended">
      <h2 style="text-align: left; margin-top: 0">Recommended for you</h2>
      <div
        class="house-list"
        v-for="recHouse in recommendedHouses"
        :key="recHouse.id"
      >
        <section>
          <img
            :src="recHouse.image || '/placeholder.png'"
            alt="Recommended house"
            width="120"
            height="120"
            style="border-radius: 5px; cursor: pointer"
            @click="$router.push(`/house/${recHouse.id}`)"
          />
        </section>
        <section class="house-item">
          <h4>
            {{ recHouse.location.street }}
            {{ recHouse.location.houseNumber }}
            {{ recHouse.location.houseNumberAddition }}
          </h4>
          <p>€ {{ recHouse.price }}</p>
          <p style="color: var(--color-tertiary)">
            {{ recHouse.location.zip }} {{ recHouse.location.city }}
          </p>
          <section class="house-options" style="gap: 20px">
            <span class="house-options">
              <img
                src="/ic_bed@3x.png"
                alt="Bedrooms"
                width="25"
                height="25"
                style="border-radius: 5px"
              />
              <p>{{ recHouse.rooms.bedrooms }}</p>
            </span>
            <span class="house-options">
              <img
                src="/ic_bath@3x.png"
                alt="Bathrooms"
                width="25"
                height="25"
                style="border-radius: 5px"
              />
              <p>{{ recHouse.rooms.bathrooms }}</p>
            </span>
            <span class="house-options">
              <img
                src="/ic_size@3x.png"
                alt="Size"
                width="25"
                height="25"
                style="border-radius: 5px"
              />
              <p>{{ recHouse.size }} m²</p>
            </span>
          </section>
        </section>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  gap: 50px;
}
.detail-page {
  display: flex;
  flex-direction: column;
  flex: 2;
}

.house-list-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* gap: 30px; */

  background-color: var(--bg-2);
  padding: 5px 30px;
  border-radius: 5px;
}
.house-image {
  width: 100%;
}
.house-content {
  display: flex;
  gap: 40px;
}
.house-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/*  */
.description {
  margin: 10px 0;
}
.house-options {
  display: flex;
  align-items: center;
}
.house-options span {
  display: flex;
  align-items: center;
  gap: 5px;
}

/*  */
.recommended {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  /* padding: 10px; */
}

.house-list {
  display: flex;
  gap: 15px;
  justify-content: flex-start;
  background-color: #fff;
  padding: 10px;
  /* background-color: red; */
}
.house-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  /* background-color: red; */
}
.house-item h4 {
  margin: 0;
  font-size: 16px;
}
.house-item p {
  margin: 2px 0;
}

.text {
  text-align: left;
  line-height: 1.5rem;
}
</style>
