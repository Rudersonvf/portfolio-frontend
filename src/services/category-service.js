import { requestBackend } from "../lib/axios";

export function findAllRequest() {
  const config = {
    method: "GET",
    url: "/api/categories",
  };
  return requestBackend(config);
}

export function insertRequest(data) {
  const config = {
    method: "POST",
    url: "/api/categories",
    withCredentials: true,
    data: data,
  };

  return requestBackend(config);
}

export function deleteRequest(id) {
  const config = {
    method: "DELETE",
    url: `/api/categories/${id}`,
    withCredentials: true,
  };

  return requestBackend(config);
}
