import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f9fc",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "#475569",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              border: "4px solid #e2e8f0",
              borderTopColor: "#e11d48",
              margin: "0 auto 14px",
              animation: "spin 0.8s linear infinite",
            }}
          />

          <p
            style={{
              margin: 0,
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Loading Nari-Shield...
          </p>

          <style>
            {`
              @keyframes spin {
                to {
                  transform: rotate(360deg);
                }
              }
            `}
          </style>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}