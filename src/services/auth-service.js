import QueryString from "qs";
import { CLIENT_ID, CLIENT_SECRET } from "../config/index";
import { requestBackend } from "../lib/axios";
import * as accessTokenManager from "../utils/access-token-manager";
import { jwtDecode } from "jwt-decode";

export function loginRequest(loginData) {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET),
  };

  const requestBody = QueryString.stringify({
    ...loginData,
    grant_type: "password",
  });

  const config = {
    method: "POST",
    url: "/oauth2/token",
    data: requestBody,
    headers,
  };

  return requestBackend(config);
}

export function logout() {
  accessTokenManager.remove();
}

export function saveAccessToken(token) {
  accessTokenManager.save(token);
}

export function getAccessToken() {
  return accessTokenManager.get();
}

export function getAccessTokenPayLoad() {
  try {
    const token = accessTokenManager.get();
    return token == null ? undefined : jwtDecode(token);
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return undefined;
  }
}

export function isAuthenticated() {
  let tokenPayLoad = getAccessTokenPayLoad();
  return tokenPayLoad && tokenPayLoad.exp * 1000 > Date.now();
}

export function hasAnyRoles(roles) {
  if (roles.length === 0) {
    return true;
  }

  const tokenPayLoad = getAccessTokenPayLoad();

  if (tokenPayLoad !== undefined) {
    return roles.some((role) => tokenPayLoad.authorities.includes(role));
  }
  return false;
}
