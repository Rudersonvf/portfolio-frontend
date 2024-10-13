import { requestBackend } from "../lib/axios";

export function findAllRequest() {
  const config = {
    method: "GET",
    url: "/api/messages",
  };
  return requestBackend(config);
}
