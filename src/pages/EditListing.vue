<script setup>
import { ref, reactive, onMounted } from "vue";
import { useHousesStore } from "../stores/houses";
import { useRoute, useRouter } from "vue-router";
import HouseForm from "../components/HouseForm.vue";
import BackButton from "../components/BackButton.vue";

const store = useHousesStore();
const route = useRoute();
const router = useRouter();
const houseId = Number(route.params.id);
const errorMessage = ref(null);

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

onMounted(() => {
  const found = store.items.find((h) => h.id === houseId);
  if (found) Object.assign(house, found);
});

const removeImage = () => {
  house.image = ""; // Clear the image preview
};

const saveHouse = async (houseData, imageFile) => {
  try {
    const updatedHouse = await store.saveHouse(
      { ...houseData, id: houseId },
      imageFile,
      true
    );

    errorMessage.value = null;
    const redirectId = updatedHouse?.id || houseId; // Use houseId if response is null or missing id
    console.log("Navigating to detail page:", `/detail-page/${redirectId}`);
    router.push(`/detail-page/${redirectId}`);
  } catch (err) {
    console.error("Failed to update house:", err);
    errorMessage.value = "Failed to update house.";
  }
};
</script>

<template>
  <BackButton text="Back to detail page" :to="`/detail-page/${house.id}`" />
  <div class="container">
    <span class="error" v-if="errorMessage">{{ errorMessage }}</span>
    <HouseForm
      :house="house"
      :isEditMode="true"
      @save="saveHouse"
      @remove-image="removeImage"
    />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  padding: 30px;

  background-image: url("/img_background@3x.png");
  background-size: 66.66% 100%;
  background-position: right center;
  background-repeat: no-repeat;
}
.error {
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
  display: block;
}

@media (max-width: 768px) {
  .container {
    /* padding: 15px; */
    background-size: 100% 50%;
    background-position: center bottom;
    background-repeat: no-repeat;
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
    background-color: var(--bg-1);
  }
}
</style>
