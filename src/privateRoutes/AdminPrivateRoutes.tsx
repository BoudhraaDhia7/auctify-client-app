import { Navigate } from "react-router-dom";

export default function AdminPrivateRoute({ children }: any) {
  const accessRole: any = localStorage.getItem("roleID");
  if (accessRole != 2) return <Navigate to={"/access_denied"} />;

  return children;
}
