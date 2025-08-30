import { defineStore } from "pinia";
import { server } from "../services/server";

export const useHousesStore = defineStore("houses", {
  state: () => ({
    items: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchAll() {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await server("/houses");
        console.log("Fetched from API:", data);
        this.items = Array.isArray(data) ? data : [];
      } catch (e) {
        this.error = e.message;
        console.error("Fetch error:", e);
      } finally {
        this.isLoading = false;
      }
    },

    async deleteHouse(id) {
      console.log(id);
      /*Not autorized */
      // try {
      //   await server(`/houses/${id}`, { method: "DELETE" });
      //   this.items = this.items.filter((h) => h.id !== id); // update local state
      //   console.log(`House ${id} deleted`);
      // } catch (e) {
      //   console.error("Delete error:", e);
      //   this.error = e.message;
      // }

      this.items = this.items.filter((h) => h.id !== id);
      console.log(`House ${id} removed from store`);
    },

    async editHouse(updatedHouse) {
      const index = this.items.findIndex((h) => h.id === updatedHouse.id);

      if (index !== -1) {
        // Optimistic update
        this.items[index] = { ...this.items[index], ...updatedHouse };
      }

      // Prepare form data as API expects
      const body = new URLSearchParams({
        price: updatedHouse.price || 0,
        bedrooms: updatedHouse.rooms?.bedrooms || 0,
        bathrooms: updatedHouse.rooms?.bathrooms || 0,
        size: updatedHouse.size || 0,

        zip: updatedHouse.location?.zip || "",
        city: updatedHouse.location?.city || "",

        description: updatedHouse.description || "",
      });

      try {
        const data = await server(`/houses/${updatedHouse.id}`, {
          method: "POST", // API uses POST for edit
          body: body, // pass URLSearchParams directly
        });

        // Update local state with response from API
        if (index !== -1) this.items[index] = data;

        return data;
      } catch (err) {
        console.error("Failed to update house:", err);
        throw err;
      }
    },
    async uploadImage(houseId, file) {
      const formData = new FormData();
      formData.append("image", file);

      // Use server helper
      const data = await server(`/houses/${houseId}/upload`, {
        method: "POST",
        body: formData,
      });

      // Update local state
      const index = this.items.findIndex((h) => h.id === houseId);
      if (index !== -1) {
        this.items[index] = { ...this.items[index], ...data };
      }

      return data;
    },
  },
});
