<template>
  <header class="header">
    <nav class="nav">
      <RouterLink to="/" class="nav__logo">
        <img src="/img_logo_dtt@3x.png" alt="Logo" width="120px" />
      </RouterLink>

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
  background: var(--bg-2);
  border-bottom: 1px solid #eee;
  z-index: 10;
  padding-left: 10%;
  padding-right: 10%;
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

.nav__link {
  text-decoration: none;
  color: var(--color-tertiary);
  padding: 6px 8px;
  /* transition: color 0.2s, border-color 0.2s; */
}

.nav__link:hover {
  color: #0077cc;
}

.nav__link.is-active {
  font-weight: 600;
  color: var(--color-text-primary);
}
</style>
