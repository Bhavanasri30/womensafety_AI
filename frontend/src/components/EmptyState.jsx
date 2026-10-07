import { ShieldCheck } from "lucide-react";

export default function EmptyState({
  title = "Nothing here yet",
  message = "Your information will appear here when available.",
  actionText,
  onAction,
}) {
  return (
    <div
      style={{
        width: "100%",
        padding: "45px 24px",
        borderRadius: "20px",
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        textAlign: "center",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "62px",
          height: "62px",
          margin: "0 auto 18px",
          borderRadius: "18px",
          background: "#fff1f2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ShieldCheck size={30} color="#e11d48" />
      </div>

      <h3
        style={{
          margin: "0 0 8px",
          fontSize: "18px",
          fontWeight: "800",
          color: "#0f172a",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          fontSize: "13px",
          lineHeight: 1.6,
          color: "#64748b",
        }}
      >
        {message}
      </p>

      {actionText && onAction && (
        <button
          onClick={onAction}
          style={{
            marginTop: "20px",
            padding: "11px 18px",
            border: "none",
            borderRadius: "11px",
            background: "#e11d48",
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          {actionText}
        </button>
      )}
    </div>
  );
}