import { requestBackend } from "../lib/axios";

export function findAllRequest() {
  return requestBackend({
    method: "GET",
    url: "/api/messages",
    withCredentials: true,
  });
}

export function findByIdRequest(id) {
  return requestBackend({
    method: "GET",
    url: `/api/messages/${id}`,
    withCredentials: true,
  });
}

export function postRequest(data) {
  return requestBackend({
    method: "POST",
    url: "/api/messages",
    data,
  });
}

export function updateRequest(id, data) {
  return requestBackend({
    method: "PUT",
    url: `/api/messages/${id}`,
    withCredentials: true,
    data,
  });
}

export function deleteRequest(id) {
  return requestBackend({
    method: "DELETE",
    url: `/api/messages/${id}`,
    withCredentials: true,
  });
}
