
const API_BASE = "/api";

export const getToken = () => localStorage.getItem("token");

export const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "API error");
  }

  return res.json();
};

export const login = (email, password) =>
  apiFetch("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const register = (email, password) =>
  apiFetch("/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const getProfile = () => apiFetch("/profile");
export const saveCard = (card) =>
  apiFetch("/cards", {
    method: "POST",
    body: JSON.stringify(card),
  });

export const getCards = () => apiFetch("/cards");
export const toggleFavorite = (cardId) =>
  apiFetch(`/cards/${cardId}/favorite`, { method: "PATCH" });
