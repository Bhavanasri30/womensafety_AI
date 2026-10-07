import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PageHeader({
  title,
  subtitle,
  onBack,
  showLogo = true,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        marginBottom: "30px",
      }}
    >
      {onBack && (
        <button
          onClick={onBack}
          aria-label="Go back"
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <ArrowLeft size={20} color="#334155" />
        </button>
      )}

      {showLogo && (
        <div
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "14px",
            background: "#fff1f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <ShieldCheck size={25} color="#e11d48" />
        </div>
      )}

      <div>
        <h1
          style={{
            margin: 0,
            fontSize: "27px",
            fontWeight: "800",
            color: "#0f172a",
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            style={{
              margin: "5px 0 0",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}