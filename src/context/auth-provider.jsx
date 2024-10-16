import * as authService from "../services/auth-service";

import { createContext, useContext, useEffect, useState } from "react";

import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = authService.getAccessToken();
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const login = (token) => {
    authService.saveAccessToken(token);
    setAuthToken(token);
  };

  const logout = () => {
    authService.logout();
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
