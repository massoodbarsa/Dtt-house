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
      console.log(updatedHouse);

      const index = this.items.findIndex((h) => h.id === updatedHouse.id);

      // 🔹 optimistic update
      this.items[index] = { ...this.items[index], ...updatedHouse };

      console.log(this.items);

      try {
        // 🔹 send update to API
        const data = await server(`/houses/${updatedHouse.id}`, {
          method: "POST",
          body: JSON.stringify(updatedHouse),
        });

        // update with response from API
        this.items[index] = data;

        return data;
      } catch (e) {
        console.error("Failed to update house:", e);
        throw e;
      }
    },

    async uploadImage(houseId, file) {
      const formData = new FormData();
      formData.append("image", file);

      // Use server helper
      const data = await server(`/houses/${houseId}/upload`, {
        method: "POST",
        body: formData,
        // ⚠️ do NOT set Content-Type; server() will handle headers
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
