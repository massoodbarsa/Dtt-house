<script setup>
import { ref, reactive, toRaw } from "vue";

const props = defineProps({
  house: { type: Object, required: true },
  isEditMode: { type: Boolean, default: false },
});

const emit = defineEmits(["save", "upload-image", "remove-image"]);

const fileInput = ref(null);
const newImageFile = ref(null);

// Handle image selection
const handleImageUpload = async (e) => {
  if (!e.target.files || !e.target.files[0]) return;
  const file = e.target.files[0];
  newImageFile.value = file;
  props.house.image = URL.createObjectURL(file);
  emit("upload-image", file);
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const removeImage = () => {
  props.house.image = "";
  newImageFile.value = null;
  emit("remove-image");
};

const saveHouse = () => {
  emit("save", toRaw(props.house), newImageFile.value);
};
</script>

<template>
  <div class="edit-house">
    <h1>{{ isEditMode ? "Edit listing" : "Create listing" }}</h1>
    <div class="form-group">
      <label>Street name</label>
      <input placeholder="Enter street name" v-model="house.location.street" />
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
        <label>Addition (optional)</label>
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
        <label>Garage*</label>
        <select v-model="house.hasGarage">
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
          placeholder="Enter amount"
          type="number"
          v-model="house.rooms.bathrooms"
        />
      </div>
    </section>
    <div class="form-group">
      <label>Construction date*</label>
      <input
        placeholder="eg. 1990"
        type="number"
        v-model="house.constructionYear"
      />
    </div>
    <div class="form-group">
      <label>Description*</label>
      <textarea
        v-model="house.description"
        placeholder="Enter description"
      ></textarea>
    </div>
    <button class="btn-save" @click="saveHouse">
      {{ isEditMode ? "SAVE" : "POST" }}
    </button>
  </div>
</template>

<style scoped>
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
