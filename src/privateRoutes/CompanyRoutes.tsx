import React from "react";
import { Navigate } from "react-router-dom";

export default function CompnayPrivateRoutes({ children }: any) {
  const accessRole: any = localStorage.getItem("roleID");
  if (accessRole != 1) return <Navigate to={"/access_denied"} />;

  return children;
}
