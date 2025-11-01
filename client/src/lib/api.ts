export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Something went wrong");
  }

  return res.json();
}
