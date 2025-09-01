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
        <RouterLink
          to="/"
          class="footer-link"
          active-class="is-active"
          exact-active-class="is-active"
        >
          <img
            :src="
              $route.path === '/'
                ? '/ic_mobile_navigarion_home_active@3x.png'
                : '/ic_mobile_navigarion_home@3x.png'
            "
            alt="Home"
            class="image-icon"
          />
        </RouterLink>
        <RouterLink
          to="/about"
          class="footer-link"
          active-class="is-active"
          exact-active-class="is-active"
        >
          <img
            :src="
              $route.path === '/about'
                ? '/ic_mobile_navigarion_info_active@3x.png'
                : '/ic_mobile_navigarion_info@3x.png'
            "
            alt="Info"
            class="image-icon"
          />
        </RouterLink>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px 15%;
}

.mobile-footer {
  display: none;
}

.footer-link {
  padding: 8px;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.footer-link:hover {
  opacity: 1;
}

.footer-link.is-active {
  opacity: 1;
}

.image-icon {
  width: 20px;
  height: 20px;
}

/* Mobile styles */
@media (max-width: 768px) {
  .desktop-header {
    display: none;
  }

  .main-content {
    padding: 20px 5px 70px;
  }

  .mobile-footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    border-top: 1px solid #ddd;
    background: var(--bg-2);
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    animation: fadeIn 0.5s ease-in-out;
  }

  .footer-link {
    padding: 8px;
    border-radius: 5px;
  }

  .image-icon {
    width: 18px;
    height: 18px;
  }
}

/* Fade-in animation for mobile footer */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
