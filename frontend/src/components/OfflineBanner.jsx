import { WifiOff } from "lucide-react";

export default function OfflineBanner() {
  return (
    <div
      style={{
        width: "100%",
        padding: "11px 14px",
        borderRadius: "12px",
        background: "#fff7ed",
        border: "1px solid #fed7aa",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        color: "#9a3412",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <WifiOff size={18} />

      <span
        style={{
          fontSize: "13px",
          fontWeight: "600",
        }}
      >
        Internet connection unavailable. Some safety features may not work
        until you're back online.
      </span>
    </div>
  );
}