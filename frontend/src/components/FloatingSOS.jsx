import { ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FloatingSOS() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/sos")}
      aria-label="Open emergency SOS"
      style={{
        position: "fixed",
        right: "24px",
        bottom: "82px",
        width: "58px",
        height: "58px",
        borderRadius: "50%",
        border: "4px solid #ffffff",
        background: "#dc2626",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 2500,
        boxShadow: "0 8px 28px rgba(220, 38, 38, 0.35)",
      }}
    >
      <ShieldAlert size={27} />
    </button>
  );
}