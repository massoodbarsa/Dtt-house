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
      try {
        await server(`/houses/${id}`, { method: "DELETE" });
        this.items = this.items.filter((h) => h.id !== id); // update local state
        console.log(`House ${id} deleted`);
      } catch (e) {
        console.error("Delete error:", e);
        this.error = e.message;
      }

      this.items = this.items.filter((h) => h.id !== id);
      console.log(`House ${id} removed from store`);
    },

    //Edit listing
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
          method: "PUT", // API uses POST for edit
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
    // async uploadImage(houseId, file) {
    //   const formData = new FormData();
    //   formData.append("image", file);

    //   // Use server helper
    //   const data = await server(`/houses/${houseId}/upload`, {
    //     method: "POST",
    //     body: formData,
    //   });

    //   // Update local state
    //   const index = this.items.findIndex((h) => h.id === houseId);
    //   if (index !== -1) {
    //     this.items[index] = { ...this.items[index], ...data };
    //   }

    //   return data;
    // },

    //Create listing
    async createHouse(payload, imageFile = null) {
      try {
        const createdHouse = await server("/houses", {
          method: "POST",
          body: {
            price: Number(payload.price) || 0,
            bedrooms: Number(payload.bedrooms) || 0,
            bathrooms: Number(payload.bathrooms) || 0,
            size: Number(payload.size) || 0,
            streetName: payload.streetName,
            houseNumber: String(payload.houseNumber),
            numberAddition: payload.numberAddition || "",
            zip: payload.zip,
            city: payload.city,
            constructionYear: Number(payload.constructionYear) || 0,
            hasGarage:
              payload.hasGarage === "true" || payload.hasGarage === true,
            description: payload.description,
          },
        });

        // Add to local store
        this.items.push(createdHouse);

        // Upload image if provided
        if (imageFile) {
          const formData = new FormData();
          formData.append("image", imageFile);

          await fetch(
            `https://api.intern.d-tt.nl/api/houses/${createdHouse.id}/upload`,
            {
              method: "POST",
              headers: {
                "X-Api-Key": import.meta.env.VITE_API_KEY,
              },
              body: formData,
            }
          );

          //  Assign local preview so UI updates immediately
          createdHouse.image = URL.createObjectURL(imageFile);
        }

        return createdHouse;
      } catch (err) {
        console.error("Failed to create house:", err);
        throw err;
      }
    },
  },
});
