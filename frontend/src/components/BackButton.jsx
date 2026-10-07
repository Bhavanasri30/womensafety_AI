import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton({ label = "Back" }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 14px",
        border: "1px solid #e2e8f0",
        borderRadius: "11px",
        background: "#ffffff",
        color: "#475569",
        fontSize: "13px",
        fontWeight: "700",
        cursor: "pointer",
      }}
    >
      <ArrowLeft size={17} />
      {label}
    </button>
  );
}