<script setup>
import { RouterView } from "vue-router";
import Header from "@/components/Header.vue";
</script>

<template>
  <div class="app-container">
    <Header />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
}
.main-content {
  flex: 1;
  padding-left: 15%;
  padding-right: 15%;
  padding-top: 20px;
  padding-bottom: 20px;
}

@media (max-width: 768px) {
  .main-content {
    padding-left: 5px;
    padding-right: 5px;
  }
}
</style>
