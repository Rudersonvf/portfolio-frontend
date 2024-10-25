import { requestBackend } from "../lib/axios";

export function findAllRequest() {
  return requestBackend({
    method: "GET",
    url: "/api/projects",
  });
}

export function findAllSummaryRequest() {
  return requestBackend({
    method: "GET",
    url: "/api/projects/summary",
    withCredentials: true,
  });
}

export function findByIdRequest(id) {
  return requestBackend({
    method: "GET",
    url: `/api/projects/${id}`,
    withCredentials: true,
  });
}

export function insertRequest(data) {
  return requestBackend({
    method: "POST",
    url: `/api/projects`,
    withCredentials: true,
    data,
  });
}

export function updateRequest(id, data) {
  return requestBackend({
    method: "PUT",
    url: `/api/projects/${id}`,
    withCredentials: true,
    data,
  });
}

export function deleteRequest(id) {
  return requestBackend({
    method: "DELETE",
    url: `/api/projects/${id}`,
    withCredentials: true,
  });
}
