<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  text: { type: String, default: "Back to review page" },
  to: { type: String, required: true },
});

const router = useRouter();

const goBack = () => {
  router.push(props.to);
};
</script>

<template>
  <section style="display: flex; align-items: center; gap: 20px; padding: 10px">
    <img src="/ic_back_grey@3x.png" alt="Back" class="image" @click="goBack" />
    <p class="back-button-label">{{ text }}</p>
  </section>
</template>

<style scoped>
.image {
  width: 30px;
  height: 30px;
  padding-top: 1px;
  cursor: pointer;
}
</style>
