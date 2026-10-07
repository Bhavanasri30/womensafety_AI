import { AlertTriangle, X } from "lucide-react";

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = true,
  onConfirm,
  onCancel,
}) {
  if (!open) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        background: "rgba(15, 23, 42, 0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backdropFilter: "blur(4px)",
      }}
      onClick={onCancel}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#ffffff",
          borderRadius: "22px",
          padding: "28px",
          boxShadow: "0 20px 60px rgba(15, 23, 42, 0.25)",
          position: "relative",
        }}
      >
        <button
          onClick={onCancel}
          aria-label="Close dialog"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "34px",
            height: "34px",
            border: "none",
            borderRadius: "10px",
            background: "#f8fafc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <X size={18} color="#64748b" />
        </button>

        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "15px",
            background: danger ? "#fff1f2" : "#f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "18px",
          }}
        >
          <AlertTriangle
            size={26}
            color={danger ? "#e11d48" : "#475569"}
          />
        </div>

        <h2
          style={{
            margin: "0 0 8px",
            fontSize: "20px",
            fontWeight: "800",
            color: "#0f172a",
          }}
        >
          {title}
        </h2>

        <p
          style={{
            margin: "0 0 24px",
            fontSize: "14px",
            lineHeight: 1.6,
            color: "#64748b",
          }}
        >
          {message}
        </p>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: "13px",
              borderRadius: "11px",
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              color: "#334155",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: "13px",
              borderRadius: "11px",
              border: "none",
              background: danger ? "#e11d48" : "#0f172a",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}