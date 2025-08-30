<script setup>
import { ref, reactive, onMounted, toRaw } from "vue";
import { useHousesStore } from "../stores/houses";
import { useRoute } from "vue-router";

const store = useHousesStore();
const route = useRoute();

// Get house ID from route params
const houseId = Number(route.params.id);

const house = reactive({
  id: null,
  image: "",
  price: 0,
  rooms: { bedrooms: 0, bathrooms: 0 },
  size: 0,
  description: "",
  location: {
    street: "",
    houseNumber: "",
    houseNumberAddition: "",
    city: "",
    zip: "",
  },
  constructionYear: 0,
  hasGarage: false,
});

const newImageFile = ref(null);

// Load house from store on mount
onMounted(() => {
  const found = store.items.find((h) => h.id === houseId);
  if (found) Object.assign(house, found);
});

// Handle image selection
const handleImageUpload = async (e) => {
  if (!e.target.files || !e.target.files[0]) return;

  const file = e.target.files[0];
  newImageFile.value = file;

  // Show preview
  house.image = URL.createObjectURL(file);
  try {
    const data = await store.uploadImage(houseId, file);
    console.log("Image uploaded:", data);

    if (data.image) {
      house.image = data.image;
    }
  } catch (err) {
    console.error("Image upload failed:", err);
  }
};

const removeImage = () => {
  house.image = ""; // Clear preview
  newImageFile.value = null; // Clear selected file
};

// Save changes
const saveHouse = () => {
  store.editHouse(toRaw(house));
};
</script>

<template>
  <div class="container">
    <div class="edit-house">
      <h1>Edit listing</h1>

      <div class="form-group">
        <label>Street name</label>
        <input v-model="house.location.street" />
      </div>
      <section class="input-double">
        <div>
          <label>House Number*</label>
          <input v-model="house.location.houseNumber" />
        </div>
        <div>
          <label>Addition(optional)</label>
          <input v-model="house.location.houseNumberAddition" />
        </div>
      </section>
      <div class="form-group">
        <label>Postal code*</label>
        <input v-model="house.location.zip" />
      </div>

      <div class="form-group">
        <label>City*</label>
        <input v-model="house.location.city" />
      </div>

      <!-- Image upload -->
      <div class="form-group">
        <p>Upload picture (PNG or JPG)*</p>
        <span style="position: relative">
          <img
            :src="house.image"
            alt="House"
            class="house-image"
            style="width: 200px"
          />

          <img
            v-if="house.image"
            src="/ic_clear_white@3x.png"
            alt="House"
            style="
              width: 30px;
              position: absolute;
              right: -10px;
              top: -10px;
              cursor: pointer;
            "
            @click="removeImage"
          />
        </span>
        <input type="file" @change="handleImageUpload" />
      </div>

      <div class="form-group">
        <label>Price* </label>
        <input type="number" v-model="house.price" />
      </div>

      <section class="input-double">
        <div class="form-group">
          <label>Size*</label>
          <input type="number" v-model="house.size" />
        </div>
        <div class="form-group">
          <label> Garage*</label>
          <select
            v-model="house.hasGarage"
            style="
              width: 200px;
              height: 45px;
              border: none;
              padding: 6px;
              margin: 10px;
            "
          >
            <option :value="true">Yes</option>
            <option :value="false">No</option>
          </select>
        </div>
      </section>

      <section class="input-double">
        <div class="form-group">
          <label>Bedrooms*</label>
          <input type="number" v-model="house.rooms.bedrooms" />
        </div>

        <div class="form-group">
          <label>Bathrooms*</label>
          <input type="number" v-model="house.rooms.bathrooms" />
        </div>
      </section>

      <div class="form-group">
        <label>Construction date*</label>
        <input type="number" v-model="house.constructionYear" />
      </div>

      <div class="form-group">
        <label>Description*</label>
        <textarea v-model="house.description"></textarea>
      </div>

      <button class="btn-save" @click="saveHouse">SAVE</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  padding: 30px 0;
  background-image: url("/img_background@3x.png");
  background-size: 66.66% 100%; /* 2/3 width, full height */
  background-position: right center; /* align to right */
  background-repeat: no-repeat;
}
.edit-house {
  max-width: 400px;
  padding-left: 15%;
  padding-right: 15%;
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  gap: 15px;
}

.house-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.input-double {
  display: flex;
  align-items: center;
  gap: 50px;
  justify-content: flex-start;
}

input,
select,
textarea {
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  border: none;
  margin: 10px 0;
}

textarea {
  resize: vertical;
  min-height: fit-content;
}

.btn-save {
  padding: 10px 20px;
  background-color: var(--color-primary);
  width: 50%;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
}
</style>
