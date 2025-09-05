import { ref } from "vue";
import { useRouter } from "vue-router";
import { useHousesStore } from "@/stores/houses";
import { toast } from "vue3-toastify";

export function useDeleteHouse() {
  const store = useHousesStore();
  const router = useRouter();
  const showModal = ref(false);
  const houseToDelete = ref(null);

  const deleteHouse = (house) => {
    houseToDelete.value = house;
    showModal.value = true;
  };

  const cancelDelete = () => {
    houseToDelete.value = null;
    showModal.value = false;
  };

  const confirmDelete = async () => {
    if (houseToDelete.value) {
      try {
        const result = await store.deleteHouse(houseToDelete.value.id);

        if (result.success) {
          toast.success("House deleted successfully!");
          houseToDelete.value = null;
          showModal.value = false;
          setTimeout(() => {
            router.push("/");
          }, 3000);
        } else {
          toast.error("You are not allowed to delete this item.");
        }
      } catch (err) {
        toast.error(err.message || "Unexpected error deleting the house.");
      }
    }
  };

  return {
    showModal,
    houseToDelete,
    deleteHouse,
    cancelDelete,
    confirmDelete,
  };
}
