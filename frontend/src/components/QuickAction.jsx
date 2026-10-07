import { ArrowRight } from "lucide-react";

export default function QuickAction({
  icon,
  title,
  description,
  onClick,
  danger = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "15px",
        border: danger
          ? "1px solid #fecdd3"
          : "1px solid #e2e8f0",
        borderRadius: "15px",
        background: danger ? "#fff1f2" : "#ffffff",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "12px",
          background: danger ? "#ffe4e6" : "#f8fafc",
          color: danger ? "#e11d48" : "#475569",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "14px",
            fontWeight: "750",
            color: danger ? "#9f1239" : "#0f172a",
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: "4px",
            fontSize: "12px",
            lineHeight: 1.45,
            color: "#64748b",
          }}
        >
          {description}
        </div>
      </div>

      <ArrowRight
        size={18}
        color={danger ? "#e11d48" : "#94a3b8"}
        style={{ flexShrink: 0 }}
      />
    </button>
  );
}