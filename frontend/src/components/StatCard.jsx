import { TrendingUp } from "lucide-react";

export default function StatCard({
  icon,
  label,
  value,
  description,
  trend,
  danger = false,
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: danger
          ? "1px solid #fecdd3"
          : "1px solid #e2e8f0",
        borderRadius: "18px",
        padding: "20px",
        boxShadow: "0 5px 20px rgba(15, 23, 42, 0.04)",
        minWidth: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: danger ? "#fff1f2" : "#f8fafc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: danger ? "#e11d48" : "#475569",
          }}
        >
          {icon}
        </div>

        {trend && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "11px",
              fontWeight: "700",
              color: "#059669",
            }}
          >
            <TrendingUp size={14} />
            {trend}
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: "18px",
          fontSize: "26px",
          fontWeight: "850",
          color: "#0f172a",
        }}
      >
        {value}
      </div>

      <div
        style={{
          marginTop: "4px",
          fontSize: "13px",
          fontWeight: "700",
          color: "#475569",
        }}
      >
        {label}
      </div>

      {description && (
        <div
          style={{
            marginTop: "5px",
            fontSize: "11px",
            lineHeight: 1.5,
            color: "#94a3b8",
          }}
        >
          {description}
        </div>
      )}
    </div>
  );
}