<script setup>
import { ref, reactive, onMounted } from "vue";
import { useHousesStore } from "../stores/houses";
import { useRoute } from "vue-router";
import HouseForm from "../components/HouseForm.vue";
import BackButton from "../components/BackButton.vue";

const store = useHousesStore();
const route = useRoute();
const houseId = Number(route.params.id);

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

const uploadImage = async (file) => {
  try {
    const data = await store.uploadImage(houseId, file);
    console.log("Image uploaded:", data);
    if (data.image) {
      house.image = data.image;
    }
  } catch (err) {
    console.error("Image upload failed:", err);
  }
};

const removeImage = () => {
  house.image = "";
};

const saveHouse = (houseData) => {
  store.editHouse(houseData);
};
</script>

<template>
  <div class="container">
    <div style="margin-top: 10px; margin-bottom: 30px">
      <BackButton text="Back to detail page" :to="`/detail-page/${house.id}`" />
    </div>
    <HouseForm
      :house="house"
      :isEditMode="true"
      @save="saveHouse"
      @upload-image="uploadImage"
      @remove-image="removeImage"
    />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  padding: 30px 0;
  background-image: url("/img_background@3x.png");
  background-size: 66.66% 100%;
  background-position: right center;
  background-repeat: no-repeat;
}
</style>
