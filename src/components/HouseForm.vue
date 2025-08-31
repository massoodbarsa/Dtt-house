<script setup>
import { ref, reactive, toRaw, watch } from "vue";

const props = defineProps({
  house: { type: Object, required: true },
  isEditMode: { type: Boolean, default: false },
});

const emit = defineEmits(["save", "upload-image", "remove-image"]);

const fileInput = ref(null);
const newImageFile = ref(null);
const errors = reactive({});

// Validate individual field
const validateField = (field) => {
  const currentYear = new Date().getFullYear();
  if (field === "street") {
    errors.street = !props.house.location.street
      ? "Street name is required"
      : "";
  } else if (field === "houseNumber") {
    errors.houseNumber = !props.house.location.houseNumber
      ? "House number is required"
      : "";
  } else if (field === "zip") {
    const zipRegex = /^\d{4}\s[A-Z]{2}$/;
    errors.zip = !props.house.location.zip
      ? "Postal code is required"
      : !zipRegex.test(props.house.location.zip)
      ? "Postal code must be 4 digits, a space, and 2 capital letters (e.g., 1234 AB)"
      : "";
  } else if (field === "city") {
    errors.city = !props.house.location.city ? "City is required" : "";
  } else if (field === "image") {
    errors.image = !props.house.image ? "Image is required" : "";
  } else if (field === "price") {
    errors.price =
      !props.house.price || props.house.price <= 0
        ? "Price must be a positive number"
        : "";
  } else if (field === "size") {
    errors.size =
      !props.house.size || props.house.size <= 0
        ? "Size must be a positive number"
        : "";
  } else if (field === "hasGarage") {
    errors.hasGarage =
      props.house.hasGarage === "" || props.house.hasGarage === null
        ? "Garage selection is required"
        : "";
  } else if (field === "bedrooms") {
    errors.bedrooms =
      !props.house.rooms.bedrooms || props.house.rooms.bedrooms <= 0
        ? "Number of bedrooms must be a positive number"
        : "";
  } else if (field === "bathrooms") {
    errors.bathrooms =
      !props.house.rooms.bathrooms || props.house.rooms.bathrooms <= 0
        ? "Number of bathrooms must be a positive number"
        : "";
  } else if (field === "constructionYear") {
    errors.constructionYear =
      !props.house.constructionYear ||
      props.house.constructionYear < 1900 ||
      props.house.constructionYear > currentYear
        ? `Construction year must be a 4-digit year between 1900 and ${currentYear}`
        : "";
  } else if (field === "description") {
    errors.description = !props.house.description
      ? "Description is required"
      : "";
  }
};

// Validate all fields for form submission
const validateForm = () => {
  const currentYear = new Date().getFullYear();
  errors.street = !props.house.location.street ? "Street name is required" : "";
  errors.houseNumber = !props.house.location.houseNumber
    ? "House number is required"
    : "";
  errors.zip = !props.house.location.zip ? "Postal code is required" : "";
  errors.city = !props.house.location.city ? "City is required" : "";
  errors.image = !props.house.image ? "Image is required" : "";
  errors.price =
    !props.house.price || props.house.price <= 0
      ? "Price must be a positive number"
      : "";
  errors.size =
    !props.house.size || props.house.size <= 0
      ? "Size must be a positive number"
      : "";
  errors.hasGarage =
    props.house.hasGarage === "" || props.house.hasGarage === null
      ? "Garage selection is required"
      : "";
  errors.bedrooms =
    !props.house.rooms.bedrooms || props.house.rooms.bedrooms <= 0
      ? "Number of bedrooms must be a positive number"
      : "";
  errors.bathrooms =
    !props.house.rooms.bathrooms || props.house.rooms.bathrooms <= 0
      ? "Number of bathrooms must be a positive number"
      : "";
  errors.constructionYear =
    !props.house.constructionYear ||
    props.house.constructionYear < 1900 ||
    props.house.constructionYear > currentYear
      ? `Construction year must be a 4-digit year between 1900 and ${currentYear}`
      : "";
  errors.description = !props.house.description
    ? "Description is required"
    : "";

  return Object.values(errors).every((error) => error === "");
};

// Watch for changes in fields
watch(
  () => props.house.location.street,
  () => validateField("street")
);
watch(
  () => props.house.location.houseNumber,
  () => validateField("houseNumber")
);
watch(
  () => props.house.location.zip,
  () => validateField("zip")
);
watch(
  () => props.house.location.city,
  () => validateField("city")
);
watch(
  () => props.house.image,
  () => validateField("image")
);
watch(
  () => props.house.price,
  () => validateField("price")
);
watch(
  () => props.house.size,
  () => validateField("size")
);
watch(
  () => props.house.hasGarage,
  () => validateField("hasGarage")
);
watch(
  () => props.house.rooms.bedrooms,
  () => validateField("bedrooms")
);
watch(
  () => props.house.rooms.bathrooms,
  () => validateField("bathrooms")
);
watch(
  () => props.house.constructionYear,
  () => validateField("constructionYear")
);
watch(
  () => props.house.description,
  () => validateField("description")
);

// Handle image selection
const handleImageUpload = async (e) => {
  if (!e.target.files || !e.target.files[0]) return;
  const file = e.target.files[0];
  newImageFile.value = file;
  props.house.image = URL.createObjectURL(file);
  validateField("image"); // Validate image field
  emit("upload-image", file);
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const removeImage = () => {
  props.house.image = "";
  newImageFile.value = null;
  validateField("image"); // Validate image field
  emit("remove-image");
};

const saveHouse = () => {
  if (validateForm()) {
    emit("save", toRaw(props.house), newImageFile.value);
  }
};
</script>
<template>
  <div class="edit-house">
    <h1>{{ isEditMode ? "Edit listing" : "Create listing" }}</h1>
    <div class="form-group">
      <label>Street name</label>
      <input placeholder="Enter street name" v-model="house.location.street" />
      <span class="error" v-if="errors.street">{{ errors.street }}</span>
    </div>
    <section class="input-double">
      <div>
        <label>House Number*</label>
        <input
          placeholder="Enter house number"
          v-model="house.location.houseNumber"
        />
        <span class="error" v-if="errors.houseNumber">{{
          errors.houseNumber
        }}</span>
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
      <span class="error" v-if="errors.zip">{{ errors.zip }}</span>
    </div>
    <div class="form-group">
      <label>City*</label>
      <input placeholder="eg. Utrecht" v-model="house.location.city" />
      <span class="error" v-if="errors.city">{{ errors.city }}</span>
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
      <span class="error" v-if="errors.image">{{ errors.image }}</span>
    </div>
    <div class="form-group">
      <label>Price* </label>
      <input placeholder="eg. €15000" type="number" v-model="house.price" />
      <span class="error" v-if="errors.price">{{ errors.price }}</span>
    </div>
    <section class="input-double">
      <div class="form-group">
        <label>Size*</label>
        <input placeholder="eg. 60m2" type="number" v-model="house.size" />
        <span class="error" v-if="errors.size">{{ errors.size }}</span>
      </div>
      <div class="form-group">
        <label>Garage*</label>
        <select v-model="house.hasGarage">
          <option disabled value="">Select</option>
          <option :value="true">Yes</option>
          <option :value="false">No</option>
        </select>
        <span class="error" v-if="errors.hasGarage">{{
          errors.hasGarage
        }}</span>
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
        <span class="error" v-if="errors.bedrooms">{{ errors.bedrooms }}</span>
      </div>
      <div class="form-group">
        <label>Bathrooms*</label>
        <input
          placeholder="Enter amount"
          type="number"
          v-model="house.rooms.bathrooms"
        />
        <span class="error" v-if="errors.bathrooms">{{
          errors.bathrooms
        }}</span>
      </div>
    </section>
    <div class="form-group">
      <label>Construction date*</label>
      <input
        placeholder="eg. 1990"
        type="number"
        v-model="house.constructionYear"
      />
      <span class="error" v-if="errors.constructionYear">{{
        errors.constructionYear
      }}</span>
    </div>
    <div class="form-group">
      <label>Description*</label>
      <textarea
        v-model="house.description"
        placeholder="Enter description"
      ></textarea>
      <span class="error" v-if="errors.description">{{
        errors.description
      }}</span>
    </div>
    <button class="btn-save" @click="saveHouse">
      {{ isEditMode ? "SAVE" : "POST" }}
    </button>
  </div>
</template>

<style scoped>
.edit-house {
  max-width: 400px;
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
.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
  min-height: 20px;
  width: 100%;
}
</style>
