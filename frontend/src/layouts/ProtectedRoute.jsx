import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user = true, children }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
