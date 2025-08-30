<script setup>
import { onMounted } from "vue";
import { useHousesStore } from "../stores/houses";

const store = useHousesStore();

onMounted(() => {
  store.fetchAll();
});
</script>

<template>
  <section>
    <h1>Available Houses</h1>

    <p v-if="store.isLoading">Loading...</p>

    <ul v-else>
      <li v-for="house in store.items" :key="house.id">
        {{ house.address }}, {{ house.city }} – €{{ house.price }}
      </li>
    </ul>
  </section>
</template>

<style scoped></style>
