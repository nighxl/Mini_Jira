// ✅ Save tokens + role info
export function saveTokens(data) {
  if (data.access) localStorage.setItem("access", data.access);
  if (data.refresh) localStorage.setItem("refresh", data.refresh);

  if (data.is_staff !== undefined) {
    // normalize to "true"/"false"
    localStorage.setItem("is_staff", data.is_staff ? "true" : "false");
  }
}

// ✅ Clear tokens
export function clearTokens() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("is_staff");
  localStorage.removeItem("login_role");
}

// ✅ Check if logged in
export function isLoggedIn() {
  return !!localStorage.getItem("access");
}

// ✅ Check if admin
export function isAdmin() {
  return localStorage.getItem("is_staff") === "true";
}
