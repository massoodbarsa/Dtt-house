<script setup>
import { reactive } from "vue";
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
  try {
    const createdHouse = await store.saveHouse(houseData, imageFile, false); // isEdit = false for create
    console.log("House created:", createdHouse);
    Object.assign(house, getEmptyForm());
    router.push(`/detail-page/${createdHouse.id}`);
  } catch (err) {
    console.error("Failed to create house:", err);
  }
};
</script>

<template>
  <div class="container">
    <section style="margin-bottom: 20px">
      <BackButton text="Back to review" :to="`/`" />
    </section>
    <HouseForm :house="house" @save="saveHouse" />
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
  /* display: flex; */
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
