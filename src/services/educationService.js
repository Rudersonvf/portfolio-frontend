import { requestBackend } from "../lib/axios";

export function findAllRequest() {
  const config = {
    method: "GET",
    url: "/api/educations",
  };
  return requestBackend(config);
}
