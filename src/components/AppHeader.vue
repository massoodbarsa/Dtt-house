<template>
  <header class="header">
    <nav class="nav">
      <RouterLink to="/" class="nav__logo">
        <img src="/img_logo_dtt@3x.png" alt="Logo" width="120px" />
      </RouterLink>
      <RouterLink
        to="/"
        class="header-inactive"
        active-class="header-active"
        exact-active-class="header-active"
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
<script setup>
// no imports needed, RouterLink is globally available from vue-router
</script>

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
