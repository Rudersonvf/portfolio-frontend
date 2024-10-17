import { requestBackend } from "../lib/axios";

export function findAllRequest() {
  return requestBackend({
    method: "GET",
    url: "/api/categories",
  });
}

export function insertRequest(data) {
  return requestBackend({
    method: "POST",
    url: "/api/categories",
    withCredentials: true,
    data,
  });
}

export function deleteRequest(id) {
  return requestBackend({
    method: "DELETE",
    url: `/api/categories/${id}`,
    withCredentials: true,
  });
}
