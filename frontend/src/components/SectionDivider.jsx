export default function SectionDivider({ label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "100%",
        margin: "24px 0",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          flex: 1,
          height: "1px",
          background: "#e2e8f0",
        }}
      />

      <span
        style={{
          fontSize: "11px",
          fontWeight: "700",
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: "0.7px",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>

      <div
        style={{
          flex: 1,
          height: "1px",
          background: "#e2e8f0",
        }}
      />
    </div>
  );
}