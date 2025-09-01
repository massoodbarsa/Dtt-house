<script setup>
import { RouterView } from "vue-router";
import Header from "@/components/Header.vue";
</script>

<template>
  <div class="app-container">
    <!-- Desktop Header -->
    <Header class="desktop-header" />

    <main class="main-content">
      <RouterView />
      <footer class="mobile-footer">
        <button>
          <img src="/ic_clear_white@3x.png" alt="clear" width="18" />
        </button>
        <button>
          <img src="/ic_clear_white@3x.png" alt="clear" width="18" />
        </button>
      </footer>
    </main>

    <!-- Mobile Footer -->
  </div>
</template>
<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container takes at least the full viewport height */
}

.main-content {
  flex: 1; /* Allow main content to grow and push footer down */
  padding-left: 15%;
  padding-right: 15%;
  padding-top: 20px;
  padding-bottom: 20px;
}

/* Hide footer by default (desktop) */
.mobile-footer {
  display: none;
}

/* Mobile styles */
@media (max-width: 768px) {
  .desktop-header {
    display: none;
  }
  .main-content {
    padding-left: 5px;
    padding-right: 5px;
    padding-bottom: 70px; /* Add padding to prevent content from being hidden under the fixed footer */
  }
  .mobile-footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    border-top: 1px solid #ddd;
    background: #fff;
    position: fixed; /* Use fixed to stick to the viewport bottom */
    bottom: 0;
    left: 0;
    right: 0; /* Ensure footer spans full width */
    z-index: 1000; /* Ensure footer stays above other content */
  }
  .mobile-footer button {
    background: none;
    border: none;
    cursor: pointer;
  }
}
</style>
