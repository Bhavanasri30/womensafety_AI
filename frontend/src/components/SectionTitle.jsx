export default function SectionTitle({
  title,
  subtitle,
  action,
  onAction,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: "20px",
        marginBottom: "20px",
        flexWrap: "wrap",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: "20px",
            fontWeight: "800",
            color: "#0f172a",
          }}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            style={{
              margin: "5px 0 0",
              fontSize: "13px",
              lineHeight: 1.5,
              color: "#64748b",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {action && onAction && (
        <button
          onClick={onAction}
          style={{
            padding: "9px 14px",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            background: "#ffffff",
            color: "#475569",
            fontSize: "13px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          {action}
        </button>
      )}
    </div>
  );
}