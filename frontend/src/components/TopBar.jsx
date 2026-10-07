import { Bell, ShieldCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NotificationCenter from "./NotificationCenter";

export default function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const pageTitles = {
    "/home": "Dashboard",
    "/ai-chat": "AI Safety Assistant",
    "/analyze": "Analyze Situation",
    "/sos": "Emergency SOS",
    "/safety-word": "Safety Word",
    "/contacts": "Trusted Contacts",
    "/location": "Location",
    "/history": "Incident History",
    "/settings": "Settings",
    "/profile": "Profile",
    "/security": "Security",
  };

  const title = pageTitles[location.pathname] || "Nari-Shield";

  return (
    <header
      style={{
        width: "100%",
        minHeight: "62px",
        marginBottom: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <ShieldCheck size={19} color="#e11d48" />

          <span
            style={{
              fontSize: "12px",
              fontWeight: "700",
              color: "#e11d48",
            }}
          >
            NARI-SHIELD AI
          </span>
        </div>

        <h1
          style={{
            margin: "5px 0 0",
            fontSize: "24px",
            fontWeight: "800",
            color: "#0f172a",
          }}
        >
          {title}
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <NotificationCenter />

        <button
          onClick={() => navigate("/profile")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "9px",
            padding: "5px 10px 5px 5px",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            background: "#ffffff",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "#e11d48",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "13px",
              fontWeight: "800",
            }}
          >
            {(user?.name || "U").charAt(0).toUpperCase()}
          </div>

          <span
            style={{
              maxWidth: "130px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: "13px",
              fontWeight: "700",
              color: "#334155",
            }}
          >
            {user?.name || "User"}
          </span>
        </button>
      </div>
    </header>
  );
}