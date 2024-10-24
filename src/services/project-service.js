import { requestBackend } from "../lib/axios";

export function findAllRequest() {
  const config = {
    method: "GET",
    url: "/api/projects",
  };
  return requestBackend(config);
}

export function findAllSummaryRequest() {
  const config = {
    method: "GET",
    url: "/api/projects/summary",
    withCredentials: true,
  };
  return requestBackend(config);
}
