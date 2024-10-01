import { Route, Navigate } from "react-router-dom";

function PrivateRoute({ children }: any) {
  const token: any = localStorage.getItem("access_token");
  if (!token) return <Navigate to={"/login"} />;
  return children;
}

export default PrivateRoute;
