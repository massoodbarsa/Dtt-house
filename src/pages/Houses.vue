<script setup>
import { onMounted } from "vue";
import { useHousesStore } from "../stores/houses";

const store = useHousesStore();

onMounted(() => {
  store.fetchAll();
});
</script>

<template>
  <section class="home">
    <div class="row">
      <h1>Houses</h1>
      <button class="btn">
        <span style="font-size: larger; margin-right: 5px">+</span>CREATE NEW
      </button>
    </div>
    <div class="row">
      <div class="search-wrapper">
        <span class="search-icon">
          <img src="/ic_search@3x.png" alt="Logo" width="20px"
        /></span>
        <input type="text" class="search" placeholder="Search for a house" />
      </div>
      <section>
        <button class="btn" style="border-radius: 5px 0 0 5px">Price</button>
        <button
          class="btn"
          style="
            border-radius: 0 5px 5px 0;
            background-color: var(--color-tertiary);
          "
        >
          Size
        </button>
      </section>
    </div>

    <p v-if="store.isLoading">Loading...</p>

    <ul v-else>
      <li v-for="house in store.items" :key="house.id">
        {{ house.address }}, {{ house.city }} – €{{ house.price }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
.home {
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 20px;
  padding-bottom: 20px;
}

.row {
  display: flex;
  justify-content: space-between;
  justify-items: center;
  color: var(--color-text-primary);
  margin-top: 10px;
}

.btn {
  font-size: --button-desktop;
  height: 50px;
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
  padding: 15px 15px 15px 35px; /* space for icon */
  font-size: 14px;
  outline: none;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 25px;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 16px;
  color: #555;
}
</style>
