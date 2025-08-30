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
  },
});
