<template>
  <header class="header">
    <nav class="nav">
      <RouterLink
        to="/"
        class="nav__link"
        active-class="is-active"
        exact-active-class="is-active"
      >
        Houses
      </RouterLink>
      <RouterLink
        to="/about"
        class="nav__link"
        active-class="is-active"
        exact-active-class="is-active"
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
  background: #fff;
  border-bottom: 1px solid #eee;
  z-index: 10;
}

.nav {
  max-width: 1100px;
  margin: 0 auto;
  padding: 12px;
  display: flex;
  gap: 16px;
}

.nav__link {
  text-decoration: none;
  color: #333;
  padding: 6px 8px;
  transition: color 0.2s, border-color 0.2s;
}

.nav__link:hover {
  color: #0077cc;
}

.nav__link.is-active {
  border-bottom: 2px solid #000;
  font-weight: 600;
}
</style>
