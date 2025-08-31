<script setup>
import { ref, reactive, toRaw } from "vue";
import { useHousesStore } from "../stores/houses";

const store = useHousesStore();

const fileInput = ref(null);

const house = reactive({
  image: "",
  price: "",
  rooms: { bedrooms: "", bathrooms: "" },
  size: "",
  description: "",
  location: {
    street: "",
    houseNumber: "",
    houseNumberAddition: "",
    city: "",
    zip: "",
  },
  constructionYear: "",
  hasGarage: "",
});

const newImageFile = ref(null);

// Handle image selection
const handleImageUpload = async (e) => {
  if (!e.target.files || !e.target.files[0]) return;

  const file = e.target.files[0];
  newImageFile.value = file;

  // Show preview
  house.image = URL.createObjectURL(file);
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const removeImage = () => {
  house.image = "";
  newImageFile.value = null;
};

// Save new house
const saveHouse = async () => {
  const payload = {
    price: Number(house.price) || 0,
    bedrooms: Number(house.bedrooms) || 0,
    bathrooms: Number(house.bathrooms) || 0,
    size: Number(house.size) || 0,
    streetName: house.location.street,
    houseNumber: String(house.location.houseNumber),
    numberAddition: house.location.houseNumberAddition || "",
    zip: house.location.zip,
    city: house.location.city,
    constructionYear: Number(house.constructionYear) || 0,
    hasGarage: house.hasGarage === "true" || house.hasGarage === true,
    description: house.description,
  };
  console.log(payload);

  try {
    // Pass payload and selected image file to store
    const createdHouse = await store.createHouse(payload, newImageFile.value);
    console.log("House created:", createdHouse);
  } catch (err) {
    console.error("Failed to create house:", err);
  }

  store.createHouse(payload);
};
</script>

<template>
  <div class="container">
    <div class="edit-house">
      <h1>Create listing</h1>

      <div class="form-group">
        <label>Street name</label>
        <input
          placeholder="Enter street name"
          v-model="house.location.street"
        />
      </div>

      <section class="input-double">
        <div>
          <label>House Number*</label>
          <input
            placeholder="Enter house number"
            v-model="house.location.houseNumber"
          />
        </div>
        <div>
          <label>Addition(optional)</label>
          <input
            placeholder="eg. A"
            v-model="house.location.houseNumberAddition"
          />
        </div>
      </section>

      <div class="form-group">
        <label>Postal code*</label>
        <input placeholder="eg. 1000 AA" v-model="house.location.zip" />
      </div>

      <div class="form-group">
        <label>City*</label>
        <input placeholder="eg. Utrecht" v-model="house.location.city" />
      </div>

      <!-- Image upload -->
      <div class="form-group">
        <p>Upload picture (PNG or JPG)*</p>
        <span style="position: relative" v-if="house.image">
          <img
            :src="house.image"
            alt="House preview"
            class="house-image"
            style="width: 200px"
          />

          <img
            src="/ic_clear_white@3x.png"
            alt="Remove image"
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
        <div v-if="!house.image" class="upload-wrapper">
          <!-- Hidden file input -->
          <input
            placeholder="Enter description"
            type="file"
            ref="fileInput"
            style="display: none"
            @change="handleImageUpload"
          />

          <!-- Custom image as upload button -->
          <img
            src="/ic_upload@3x.png"
            alt="Upload"
            class="upload-btn"
            @click="triggerFileInput"
          />
        </div>
        <!-- <input    placeholder="Enter description" type="file" @change="handleImageUpload" /> -->
      </div>

      <div class="form-group">
        <label>Price* </label>
        <input placeholder="eg. €15000" type="number" v-model="house.price" />
      </div>

      <section class="input-double">
        <div class="form-group">
          <label>Size*</label>
          <input placeholder="eg. 60m2" type="number" v-model="house.size" />
        </div>
        <div class="form-group">
          <label> Garage*</label>
          <select v-model="house.hasGarage" placeholder="eg. 60m2">
            <option disabled value="">Select</option>
            <option :value="true">Yes</option>
            <option :value="false">No</option>
          </select>
        </div>
      </section>

      <section class="input-double">
        <div class="form-group">
          <label>Bedrooms*</label>
          <input
            placeholder="Enter amount"
            type="number"
            v-model="house.rooms.bedrooms"
          />
        </div>

        <div class="form-group">
          <label>Bathrooms*</label>
          <input
            type="text"
            v-model="house.rooms.bathrooms"
            placeholder="Enter amount"
          />
        </div>
      </section>

      <div class="form-group">
        <label>Construction date*</label>
        <input
          type="text"
          v-model="house.constructionYear"
          placeholder="eg. 1990"
        />
      </div>

      <div class="form-group">
        <label>Description*</label>
        <textarea
          v-model="house.description"
          placeholder="Enter description"
        ></textarea>
      </div>

      <button class="btn-save" @click="saveHouse">POST</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  padding: 30px 0;
  background-image: url("/img_background@3x.png");
  background-size: 66.66% 100%;
  background-position: right center;
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
  border: none;
  margin: 10px 0;
  width: 100%;
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

.upload-btn {
  width: 30px;
  height: 30px;
  cursor: pointer;
  border: 1px dashed gray;
  padding: 30px;
}
</style>
