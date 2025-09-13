<script setup>
import { useActiveRoute } from "../composables/useActiveRoute";
const { isActive: isHousesRoute } = useActiveRoute();
</script>
<template>
  <header class="header">
    <nav class="nav">
      <RouterLink
        :to="{ name: 'Houses' }"
        :class="isHousesRoute ? 'header-active' : 'header-inactive'"
      >
        Houses
      </RouterLink>

      <RouterLink
        to="/about"
        class="header-inactive"
        active-class="header-active"
        exact-active-class="header-active"
      >
        About
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  background: var(--bg-2);
  border-bottom: 1px solid #eee;
  z-index: 10;
  padding-left: 15%;
  padding-right: 15%;
  padding-top: 20px;
  padding-bottom: 20px;
  color: var(--color-text-secondary);
}

.nav {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 40px;
}
</style>
