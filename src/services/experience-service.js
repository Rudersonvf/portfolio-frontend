import { requestBackend } from "../lib/axios";

export function findAllRequest() {
  return requestBackend({
    method: "GET",
    url: "/api/experiences",
  });
}

export function insertRequest(data) {
  return requestBackend({
    method: "POST",
    url: "/api/experiences",
    withCredentials: true,
    data,
  });
}

export function updateRequest(id, data) {
  return requestBackend({
    method: "PUT",
    url: `/api/experiences/${id}`,
    withCredentials: true,
    data,
  });
}

export function deleteRequest(id) {
  return requestBackend({
    method: "DELETE",
    url: `/api/experiences/${id}`,
    withCredentials: true,
  });
}
