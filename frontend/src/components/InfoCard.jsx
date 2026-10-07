import { Info } from "lucide-react";

export default function InfoCard({
  title = "Information",
  message,
}) {
  return (
    <div
      style={{
        width: "100%",
        padding: "18px",
        borderRadius: "16px",
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "10px",
          background: "#e0f2fe",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Info size={19} color="#0284c7" />
      </div>

      <div>
        <div
          style={{
            fontSize: "14px",
            fontWeight: "750",
            color: "#0f172a",
            marginBottom: "4px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: "13px",
            lineHeight: 1.55,
            color: "#64748b",
          }}
        >
          {message}
        </div>
      </div>
    </div>
  );
}