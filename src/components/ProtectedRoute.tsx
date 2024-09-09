import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    authenticated: boolean,
    children: JSX.Element
}
const ProtectedRoute = ({ authenticated, children }: ProtectedRouteProps) => {
 
  // console.log(authenticated, "protected")
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
