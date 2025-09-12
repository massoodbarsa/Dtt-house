// Upload house image
export async function uploadHouseImage(houseId, file) {
  const formData = new FormData();
  formData.append("image", file);

  const url = `${import.meta.env.VITE_API_BASE}/houses/${houseId}/upload`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "X-Api-Key": import.meta.env.VITE_API_KEY,
    },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Image upload failed: HTTP ${res.status} – ${text}`);
  }

  return res.json().catch(() => null);
}
