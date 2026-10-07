export default function Divider({ text }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "100%",
        margin: "20px 0",
      }}
    >
      <div
        style={{
          flex: 1,
          height: "1px",
          background: "#e2e8f0",
        }}
      />

      {text && (
        <span
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: "#94a3b8",
          }}
        >
          {text}
        </span>
      )}

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