<template>
  <section class="container">
    <!-- Mobile-only header -->
    <div class="mobile-header">
      <h1>About</h1>
    </div>

    <!-- Desktop content remains unchanged -->
    <h1>About DTT Real Estate</h1>
    <p class="text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <p class="text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </p>

    <h2>Design and Development</h2>

    <div class="logo-section">
      <img src="/img_logo_dtt@3x.png" alt="Logo" class="logo" />
      <section class="logo-text">
        <p>By DTT</p>
        <a href="https://www.d-tt.nl" target="_blank" rel="noopener noreferrer">
          www.d-tt.nl
        </a>
      </section>
    </div>
  </section>
</template>

<style scoped>
/* Hide mobile header on desktop */
.mobile-header,
.mobile-footer {
  display: none;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
}

.text {
  text-align: left;
  line-height: 2rem;
}

.logo-section {
  display: flex;
  gap: 3rem;
  align-items: center;
  margin-top: 10px;
}

.logo {
  width: 200px;
  height: 80px;
}

.logo-text a {
  color: blue;
  text-decoration: underline;
}

/* Mobile-specific styles */
@media screen and (max-width: 768px) {
  /* Mobile-only header */
  .mobile-header {
    display: block;
    margin-bottom: 1rem;
    align-self: center;
  }

  /* Stack logo section vertically */
  .logo-section {
    /* flex-direction: column; */
    gap: 1rem;
  }

  /* Mobile footer */
  .mobile-footer {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
    padding: 10px 0;
    background-color: #f2f2f2;
    border-top: 1px solid #ccc;
  }
}
</style>
