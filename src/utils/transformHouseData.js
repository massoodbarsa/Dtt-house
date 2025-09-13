export function transformHouseData(houseData) {
  return {
    price: Number(houseData.price) || 0,
    bedrooms: Number(houseData.rooms?.bedrooms || houseData.bedrooms) || 0,
    bathrooms: Number(houseData.rooms?.bathrooms || houseData.bathrooms) || 0,
    size: Number(houseData.size) || 0,
    streetName: houseData.location?.street || "",
    houseNumber: String(houseData.location?.houseNumber || ""),
    numberAddition: houseData.location?.houseNumberAddition || "",
    zip: houseData.location?.zip || "",
    city: houseData.location?.city || "",
    constructionYear: Number(houseData.constructionYear) || 0,
    hasGarage: houseData.hasGarage === true || houseData.hasGarage === "true",
    description: houseData.description || "",
  };
}
