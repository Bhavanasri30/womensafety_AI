import { CheckCircle, AlertCircle, X } from "lucide-react";

export default function Toast({
  message,
  type = "success",
  onClose,
}) {
  if (!message) {
    return null;
  }

  const isError = type === "error";

  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        zIndex: 9999,
        width: "min(380px, calc(100vw - 32px))",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "15px 16px",
        borderRadius: "14px",
        background: "#ffffff",
        border: `1px solid ${isError ? "#fecaca" : "#bbf7d0"}`,
        boxShadow: "0 12px 35px rgba(15, 23, 42, 0.15)",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "10px",
          background: isError ? "#fef2f2" : "#f0fdf4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {isError ? (
          <AlertCircle size={21} color="#dc2626" />
        ) : (
          <CheckCircle size={21} color="#16a34a" />
        )}
      </div>

      <div
        style={{
          flex: 1,
          fontSize: "14px",
          lineHeight: 1.5,
          fontWeight: "600",
          color: "#334155",
        }}
      >
        {message}
      </div>

      <button
        onClick={onClose}
        aria-label="Close notification"
        style={{
          width: "30px",
          height: "30px",
          border: "none",
          borderRadius: "8px",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        <X size={18} color="#64748b" />
      </button>
    </div>
  );
}