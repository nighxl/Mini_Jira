export function saveTokens({ access, refresh }) {
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
}

export function clearTokens() {
  localStorage.clear();
}

export function isLoggedIn() {
  return !!localStorage.getItem("access");
}

// Backend should set this when user logs in (extend login response)
export function isAdmin() {
  return localStorage.getItem("is_staff") === "true";
}
