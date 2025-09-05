import { defineStore } from "pinia";
import { server } from "../services/server";

export const useHousesStore = defineStore("houses", {
  state: () => ({
    items: [],
    isLoading: false,
    error: null,
    favorites: [],
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
      const payload = {
        price: Number(houseData.price) || 0,
        bedrooms: Number(houseData.rooms?.bedrooms || houseData.bedrooms) || 0,
        bathrooms:
          Number(houseData.rooms?.bathrooms || houseData.bathrooms) || 0,
        size: Number(houseData.size) || 0,
        streetName: houseData.location?.street || houseData.streetName || "",
        houseNumber:
          String(houseData.location?.houseNumber || houseData.houseNumber) ||
          "",
        numberAddition:
          houseData.location?.houseNumberAddition ||
          houseData.numberAddition ||
          "",
        zip: houseData.location?.zip || houseData.zip || "",
        city: houseData.location?.city || houseData.city || "",
        constructionYear: Number(houseData.constructionYear) || 0,
        hasGarage:
          houseData.hasGarage === true || houseData.hasGarage === "true",
        description: houseData.description || "",
      };

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
          const formData = new FormData();
          formData.append("image", imageFile);

          try {
            const uploadResponse = await fetch(
              `https://api.intern.d-tt.nl/api/houses/${
                responseData.id || houseData.id
              }/upload`,
              {
                method: "POST",
                headers: {
                  "X-Api-Key": import.meta.env.VITE_API_KEY,
                },
                body: formData,
              }
            );
            if (!uploadResponse.ok) {
              console.error(
                `saveHouse: Image upload failed with status: ${uploadResponse.status}`
              );
            } else {
              responseData.image = URL.createObjectURL(imageFile);
            }
          } catch (uploadErr) {
            console.error("saveHouse: Image upload error:", uploadErr);
            // Continue despite image upload failure
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
      }
    },
    removeFavorite(id) {
      // Remove house from favorites by ID
      this.favorites = this.favorites.filter((fav) => fav.id !== id);
    },
  },
});
