import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { hasAnyRoles, isAuthenticated } from "../services/auth-service";

const PrivateRoute = ({ children, roles = [] }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (roles.length > 0 && !hasAnyRoles(roles)) {
    return <Navigate to="/forbidden" />;
  }

  return children;
};

PrivateRoute.propTypes = {
  roles: PropTypes.array,
  children: PropTypes.node,
};

export default PrivateRoute;
