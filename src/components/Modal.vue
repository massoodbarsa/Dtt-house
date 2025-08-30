<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  show: { type: Boolean, default: false },
});

const emit = defineEmits(["close", "confirm"]);

const closeModal = () => emit("close");
const confirmAction = () => emit("confirm");
</script>

<template>
  <div v-if="show" class="modal-backdrop">
    <div class="modal-container">
      <h1>Delete listing</h1>
      <p>Are you sure you want to delete this listing?</p>
      <p>This action can not be undone</p>
      <div class="modal-actions">
        <button class="btn confirm" @click="confirmAction">YE, DELETE</button>
        <button class="btn cancel" @click="closeModal">GO BACK</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-container {
  background-color: white;
  padding: 30px 150px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
  margin-top: 200px;
}

.modal-actions {
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 30px;
}

.btn {
  padding: 16px;
  cursor: pointer;
  border: none;
  border-radius: 8px;
}

.btn.cancel {
  background-color: var(--color-secondary);
}

.btn.confirm {
  background-color: var(--color-primary);
}
</style>
