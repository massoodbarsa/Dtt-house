<script setup>
const houses = [
  {
    id: 1,
    address: "Keizersgracht 123",
    city: "Amsterdam",
    price: 550000,
    size: 80,
    bedrooms: 2,
    bathrooms: 1,
    image: "https://via.placeholder.com/400x250?text=House+1",
  },
  {
    id: 2,
    address: "Prinsengracht 45",
    city: "Amsterdam",
    price: 725000,
    size: 120,
    bedrooms: 3,
    bathrooms: 2,
    image: "https://via.placeholder.com/400x250?text=House+2",
  },
  {
    id: 3,
    address: "Laan van Meerdervoort 88",
    city: "Den Haag",
    price: 450000,
    size: 70,
    bedrooms: 1,
    bathrooms: 1,
    image: "https://via.placeholder.com/400x250?text=House+3",
  },
];
</script>

<template>
  <section>
    <h1 class="title">Available Houses</h1>

    <div class="grid">
      <article v-for="house in houses" :key="house.id" class="card">
        <img :src="house.image" :alt="house.address" class="card__image" />

        <div class="card__body">
          <h2 class="card__title">{{ house.address }}</h2>
          <p class="card__location">{{ house.city }}</p>

          <ul class="card__details">
            <li><strong>Price:</strong> €{{ house.price.toLocaleString() }}</li>
            <li><strong>Size:</strong> {{ house.size }} m²</li>
            <li><strong>Bedrooms:</strong> {{ house.bedrooms }}</li>
            <li><strong>Bathrooms:</strong> {{ house.bathrooms }}</li>
          </ul>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s;
}
.card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}
.card__image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
.card__body {
  padding: 12px;
}
.card__title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}
.card__location {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}
.card__details {
  font-size: 14px;
  list-style: none;
  padding: 0;
  margin: 0;
}
.card__details li {
  margin-bottom: 4px;
}
</style>
