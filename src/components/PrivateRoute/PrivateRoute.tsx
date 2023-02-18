import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  const currentUser = localStorage.getItem("user");

  return currentUser ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
