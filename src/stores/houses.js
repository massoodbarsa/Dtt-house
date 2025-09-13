import { defineStore } from "pinia";
import { server } from "../services/server";
import { uploadHouseImage } from "../services/uploadImage";
import { transformHouseData } from "../utils/transformHouseData";

export const useHousesStore = defineStore("houses", {
  state: () => ({
    items: [],
    isLoading: false,
    error: null,
    favorites: JSON.parse(localStorage.getItem("favorites")) || [], //load from localStorage
  }),

  actions: {
    async fetchAll() {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await server("/houses");

        this.items = Array.isArray(data) ? data : [];
      } catch (e) {
        this.error = e.message;
        console.error("Fetch error:", e);
      } finally {
        this.isLoading = false;
      }
    },

    // Fetch a single house by ID
    async fetchHouse(id) {
      // Check if house already exists
      const existing = this.items.find((h) => h.id === id);
      if (existing) return existing;

      this.isLoading = true;
      this.error = null;

      try {
        const data = await server(`/houses/${id}`);

        if (!data || !data.id) {
          throw new Error("Invalid house data from API");
        }

        // Add or replace in store
        const index = this.items.findIndex((h) => h.id === data.id);
        if (index !== -1) {
          this.items[index] = data;
        } else {
          this.items.push(data);
        }

        return data; // return the house
      } catch (err) {
        console.error("Fetch single house error:", err);
        this.error = err.message;
        return null;
      } finally {
        this.isLoading = false;
      }
    },

    // Delete
    async deleteHouse(id) {
      try {
        await server(`/houses/${id}`, { method: "DELETE" });
        this.items = this.items.filter((h) => h.id !== id); // update local state
        return { success: true };
      } catch (e) {
        console.error("Delete error:", e);
        this.error = e.message;
        return { success: false, error: e.message };
      }
    },

    async saveHouse(houseData, imageFile = null, isEdit = false) {
      const payload = transformHouseData();

      try {
        const endpoint = isEdit ? `/houses/${houseData.id}` : "/houses";
        const method = "POST";

        const data = await server(endpoint, { method, body: payload });

        // Handle null or invalid response
        const responseData =
          data && typeof data === "object" && data.id
            ? data
            : { ...payload, id: houseData.id || null };
        if (!responseData.id) {
          console.warn(
            "saveHouse: Invalid API response, using fallback ID:",
            houseData.id
          );
        }

        if (isEdit) {
          const index = this.items.findIndex((h) => h.id === houseData.id);
          if (index !== -1) {
            this.items[index] = { ...this.items[index], ...responseData };
          }
        } else {
          this.items.push(responseData);
        }

        if (imageFile) {
          try {
            const result = await uploadHouseImage(responseData.id, imageFile);
            responseData.image =
              result.imageUrl || URL.createObjectURL(imageFile);
          } catch (err) {
            console.error("Image upload failed:", err);
          }
        }

        return responseData;
      } catch (err) {
        console.error(
          `saveHouse: Failed to ${isEdit ? "update" : "create"} house:`,
          err
        );
        if (isEdit) {
          const index = this.items.findIndex((h) => h.id === houseData.id);
          if (index !== -1) {
            await this.fetchAll(); // Revert state
          }
        }
        throw err;
      }
    },

    addFavorite(house) {
      // Add house to favorites if not already present
      if (!this.favorites.some((fav) => fav.id === house.id)) {
        this.favorites.push(house);
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
      }
    },
    removeFavorite(id) {
      // Remove house from favorites by ID
      this.favorites = this.favorites.filter((fav) => fav.id !== id);
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
  },
});
