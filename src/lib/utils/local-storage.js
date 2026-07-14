const KEY = "product_filters";

export function getProductFilters() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setProductFilters(filters) {
  if (!filters) return clearProductFilters();
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(KEY, JSON.stringify(filters));
}

export function clearProductFilters() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(KEY);
}
