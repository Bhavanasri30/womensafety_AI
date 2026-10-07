import { CheckCircle, AlertTriangle, ShieldAlert } from "lucide-react";

export default function StatusBadge({
  status,
  label,
}) {
  const normalizedStatus = String(status || "").toLowerCase();

  let icon = <CheckCircle size={15} />;
  let background = "#ecfdf5";
  let color = "#047857";
  let border = "#a7f3d0";

  if (
    normalizedStatus.includes("high") ||
    normalizedStatus.includes("critical") ||
    normalizedStatus.includes("danger")
  ) {
    icon = <ShieldAlert size={15} />;
    background = "#fff1f2";
    color = "#be123c";
    border = "#fecdd3";
  } else if (
    normalizedStatus.includes("medium") ||
    normalizedStatus.includes("warning")
  ) {
    icon = <AlertTriangle size={15} />;
    background = "#fffbeb";
    color = "#b45309";
    border = "#fde68a";
  }

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 10px",
        borderRadius: "999px",
        background,
        color,
        border: `1px solid ${border}`,
        fontSize: "12px",
        fontWeight: "700",
        whiteSpace: "nowrap",
      }}
    >
      {icon}
      {label || status}
    </span>
  );
}