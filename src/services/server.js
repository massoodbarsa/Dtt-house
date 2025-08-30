// services/server.js
export async function server(
  path,
  { method = "GET", body, headers = {} } = {}
) {
  const url = `${import.meta.env.VITE_API_BASE}${path}`;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": import.meta.env.VITE_API_KEY,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} – ${text || res.statusText}`);
  }
  return res.json().catch(() => null);
}
