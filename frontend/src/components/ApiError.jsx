import { AlertCircle, RefreshCw } from "lucide-react";

export default function ApiError({
  message = "Unable to connect to the server.",
  onRetry,
}) {
  return (
    <div
      style={{
        width: "100%",
        padding: "18px",
        borderRadius: "16px",
        background: "#fff1f2",
        border: "1px solid #fecdd3",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "12px",
          background: "#ffe4e6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <AlertCircle size={22} color="#e11d48" />
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: "14px",
            fontWeight: "700",
            color: "#9f1239",
            marginBottom: "4px",
          }}
        >
          Something went wrong
        </div>

        <div
          style={{
            fontSize: "13px",
            lineHeight: 1.5,
            color: "#881337",
          }}
        >
          {message}
        </div>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            padding: "9px 13px",
            border: "1px solid #fda4af",
            borderRadius: "10px",
            background: "#ffffff",
            color: "#be123c",
            fontSize: "12px",
            fontWeight: "700",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <RefreshCw size={15} />
          Retry
        </button>
      )}
    </div>
  );
}