import { ArrowRight } from "lucide-react";

export default function FeatureCard({
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
        minHeight: "150px",
        padding: "20px",
        borderRadius: "18px",
        border: danger
          ? "1px solid #fecdd3"
          : "1px solid #e2e8f0",
        background: danger ? "#fff1f2" : "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        boxShadow: "0 5px 20px rgba(15, 23, 42, 0.04)",
      }}
    >
      <div
        style={{
          width: "46px",
          height: "46px",
          borderRadius: "13px",
          background: danger ? "#ffe4e6" : "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: danger ? "#e11d48" : "#475569",
          marginBottom: "15px",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "15px",
            fontWeight: "800",
            color: danger ? "#9f1239" : "#0f172a",
          }}
        >
          {title}
        </h3>

        <ArrowRight
          size={17}
          color={danger ? "#e11d48" : "#94a3b8"}
        />
      </div>

      <p
        style={{
          margin: "7px 0 0",
          fontSize: "12px",
          lineHeight: 1.55,
          color: "#64748b",
        }}
      >
        {description}
      </p>
    </button>
  );
}