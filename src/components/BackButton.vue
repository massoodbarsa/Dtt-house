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
  <section style="display: flex; align-items: center; gap: 20px">
    <img
      src="/ic_back_grey@3x.png"
      alt="Back"
      style="width: 30px; height: 30px; padding-top: 1px; cursor: pointer"
      @click="goBack"
    />
    <h3>{{ text }}</h3>
  </section>
</template>

<style scoped>
h3 {
  margin: 0;
  font-size: 18px;
}
</style>
