<script setup>
import { ref, reactive } from "vue";
import { useHousesStore } from "../stores/houses";
import HouseForm from "../components/HouseForm.vue";
import BackButton from "../components/BackButton.vue";
import { useRouter } from "vue-router";

const store = useHousesStore();
const router = useRouter();

const getEmptyForm = () => ({
  image: "",
  price: "",
  rooms: { bedrooms: "", bathrooms: "" },
  size: "",
  description: "",
  location: {
    street: "",
    houseNumber: "",
    houseNumberAddition: "",
    city: "",
    zip: "",
  },
  constructionYear: "",
  hasGarage: "",
});

const house = reactive(getEmptyForm());

const saveHouse = async (houseData, imageFile) => {
  const payload = {
    price: Number(houseData.price) || 0,
    bedrooms: Number(houseData.rooms.bedrooms) || 0,
    bathrooms: Number(houseData.rooms.bathrooms) || 0,
    size: Number(houseData.size) || 0,
    streetName: houseData.location.street,
    houseNumber: String(houseData.location.houseNumber),
    numberAddition: houseData.location.houseNumberAddition || "",
    zip: houseData.location.zip,
    city: houseData.location.city,
    constructionYear: Number(houseData.constructionYear) || 0,
    hasGarage: houseData.hasGarage === "true" || houseData.hasGarage === true,
    description: houseData.description,
  };

  try {
    const createdHouse = await store.createHouse(payload, imageFile);
    console.log("House created:", createdHouse);
    Object.assign(house, getEmptyForm());
    router.push(`/detail-page/${createdHouse.id}`);
  } catch (err) {
    console.error("Failed to create house:", err);
  }
};
</script>

<template>
  <BackButton text="Back to review" :to="`/`" />
  <div class="container">
    <HouseForm :house="house" @save="saveHouse" />
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
