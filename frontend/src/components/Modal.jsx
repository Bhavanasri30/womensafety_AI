import { X } from "lucide-react";

export default function Modal({
  open,
  title,
  children,
  onClose,
  maxWidth = "500px",
}) {
  if (!open) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9997,
        background: "rgba(15, 23, 42, 0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          width: "100%",
          maxWidth,
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#ffffff",
          borderRadius: "22px",
          boxShadow: "0 20px 60px rgba(15, 23, 42, 0.25)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 22px",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "19px",
              fontWeight: "800",
              color: "#0f172a",
            }}
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: "36px",
              height: "36px",
              border: "none",
              borderRadius: "10px",
              background: "#f8fafc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={19} color="#64748b" />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "22px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}