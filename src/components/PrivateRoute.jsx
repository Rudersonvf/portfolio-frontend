import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

import * as authService from "../services/auth-service";


const PrivateRoute = ({ children, roles }) => {
  const isAuthenticated = authService.isAuthenticated();
  const hasRoles = roles ? authService.hasAnyRoles(roles) : true;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && !hasRoles) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

PrivateRoute.propTypes = {
  roles: PropTypes.array,
  children: PropTypes.node,
};

export default PrivateRoute;
