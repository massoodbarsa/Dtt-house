export function transformHouseData(houseData) {
  return {
    price: Number(houseData.price) || 0,
    bedrooms: Number(houseData.rooms?.bedrooms || houseData.bedrooms) || 0,
    bathrooms: Number(houseData.rooms?.bathrooms || houseData.bathrooms) || 0,
    size: Number(houseData.size) || 0,
    streetName: houseData.location?.street || houseData.streetName || "",
    houseNumber:
      String(houseData.location?.houseNumber || houseData.houseNumber) || "",
    numberAddition:
      houseData.location?.houseNumberAddition || houseData.numberAddition || "",
    zip: houseData.location?.zip || houseData.zip || "",
    city: houseData.location?.city || houseData.city || "",
    constructionYear: Number(houseData.constructionYear) || 0,
    hasGarage: houseData.hasGarage === true || houseData.hasGarage === "true",
    description: houseData.description || "",
  };
}
