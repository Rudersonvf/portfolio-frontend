export function save(token) {
  localStorage.setItem("@token", token);
}

export function get() {
  return localStorage.getItem("@token");
}

export function remove() {
  localStorage.removeItem("@token");
}
