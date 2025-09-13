// utils/uploadHouseImageUtil.js
import { uploadHouseImage } from "../services/uploadImage";

export async function handleHouseImageUpload(houseId, imageFile) {
  if (!imageFile) return null;

  try {
    const result = await uploadHouseImage(houseId, imageFile);

    if (result && result.imageUrl) {
      // Cache-busting for immediate update
      return `${result.imageUrl}?t=${Date.now()}`;
    } else {
      // fallback if API fails or imageUrl is missing
      return URL.createObjectURL(imageFile);
    }
  } catch (err) {
    console.error("Image upload failed:", err);
    // fallback
    return URL.createObjectURL(imageFile);
  }
}
