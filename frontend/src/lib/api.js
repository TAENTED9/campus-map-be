/**
 * API Helper - Communicates with the FastAPI backend
 *
 * In development, Next.js rewrites /api/* to http://localhost:8000/api/*
 * In production, update BASE_URL to your deployed backend URL.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

async function fetchAPI(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || `API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API call failed: ${endpoint}`, error);
    throw error;
  }
}

// ── Location Endpoints ────────────────────────────────────

export async function getAllLocations(category = null) {
  const params = category ? `?category=${category}` : "";
  return fetchAPI(`/api/locations/${params}`);
}

export async function getLocation(id) {
  return fetchAPI(`/api/locations/${id}`);
}

export async function getCategories() {
  return fetchAPI("/api/locations/categories");
}

// ── Search Endpoint ───────────────────────────────────────

export async function searchLocations(query, limit = 10) {
  return fetchAPI(`/api/search/?q=${encodeURIComponent(query)}&limit=${limit}`);
}

// ── Direction Endpoints ───────────────────────────────────

export async function getDirections(fromId, toId) {
  return fetchAPI(`/api/directions/find?from_id=${fromId}&to_id=${toId}`);
}

export async function getDirectionsFrom(fromId) {
  return fetchAPI(`/api/directions/?from_location=${fromId}`);
}

export async function getPopularRoutes() {
  return fetchAPI("/api/directions/popular");
}

export async function getAllDirections() {
  return fetchAPI("/api/directions/");
}
