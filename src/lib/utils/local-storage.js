const KEY = "product_filters";

function getCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name + "=([^;]*)"),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name, value) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/`;
}

function deleteCookie(name) {
  document.cookie = `${name}=; path=/; max-age=0`;
}

export function getProductFilters() {
  if (typeof window === "undefined") return null;
  try {
    const raw = getCookie(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setProductFilters(filters) {
  deleteCookie(KEY);
  if (typeof window === "undefined") return;

  if (!filters) return;

  setCookie(KEY, JSON.stringify(filters));
}

export function clearProductFilters() {
  if (typeof window === "undefined") return;
  deleteCookie(KEY);
}
