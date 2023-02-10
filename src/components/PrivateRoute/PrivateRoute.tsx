import { Navigate } from "react-router-dom";
import { auth } from "../../firebase/config";

const PrivateRoute = ({ children }: any) => {
  return auth.currentUser ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
