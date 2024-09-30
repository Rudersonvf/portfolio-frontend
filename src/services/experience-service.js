import { axios } from "../lib/axios";

export function findAllRequest() {
  const config = {
    method: "GET",
    url: "/experiences",
  };
  return axios(config);
}
