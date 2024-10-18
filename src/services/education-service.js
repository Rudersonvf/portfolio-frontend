import { requestBackend } from "../lib/axios";

export function findAllRequest() {
  return requestBackend({
    method: "GET",
    url: "/api/educations",
  });
}

export function insertRequest(data) {
  return requestBackend({
    method: "POST",
    url: "/api/educations",
    withCredentials: true,
    data,
  });
}

export function updateRequest(id, data) {
  return requestBackend({
    method: "PUT",
    url: `/api/educations/${id}`,
    withCredentials: true,
    data,
  });
}

export function deleteRequest(id) {
  return requestBackend({
    method: "DELETE",
    url: `/api/educations/${id}`,
    withCredentials: true,
  });
}
