import { Outlet } from "react-router-dom";
import PublicRoute from "./PublicRoute";

export default function PublicLayout() {
  return (
    <PublicRoute>
      <Outlet />
    </PublicRoute>
  );
}