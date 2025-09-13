import { defineStore } from "pinia";
import { server } from "../services/server";

import { transformHouseData } from "../utils/transformHouseData";
import { handleHouseImageUpload } from "../utils/uploadHouseImageUtil";

export const useHousesStore = defineStore("houses", {
  state: () => ({
    items: [],
    isLoading: false,
    error: null,
    favoriteIds: JSON.parse(localStorage.getItem("favorites")) || [], //load from localStorage
  }),

  getters: {
    favorites: (state) => {
      // map IDs to actual items in the store
      return state.favoriteIds
        .map((id) => state.items.find((h) => h.id === id))
        .filter(Boolean); // remove null/undefined if item deleted
    },
  },

  actions: {
    async fetchAll() {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await server("/houses");

        this.items = Array.isArray(data) ? data : [];

        // Clean up favorites: remove any house that no longer exists
        this.favorites = (
          JSON.parse(localStorage.getItem("favorites")) || []
        ).filter((fav) => this.items.some((item) => item.id === fav.id));
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
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
      let payload = transformHouseData(houseData);

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
          console.warn("saveHouse: Invalid API response", houseData.id);
        }

        if (imageFile) {
          responseData.image = await handleHouseImageUpload(
            responseData.id,
            imageFile
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

    addFavorite(id) {
      if (!this.favoriteIds.includes(id)) {
        this.favoriteIds.push(id);
        localStorage.setItem("favorites", JSON.stringify(this.favoriteIds));
      }
    },
    removeFavorite(id) {
      this.favoriteIds = this.favoriteIds.filter((favId) => favId !== id);
      localStorage.setItem("favorites", JSON.stringify(this.favoriteIds));
    },
  },
});
