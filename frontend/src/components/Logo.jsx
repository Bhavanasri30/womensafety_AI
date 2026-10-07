import { ShieldCheck } from "lucide-react";

export default function Logo({
  size = "medium",
  showText = true,
}) {
  const sizes = {
    small: {
      box: 36,
      icon: 20,
      title: 15,
      subtitle: 9,
    },
    medium: {
      box: 44,
      icon: 25,
      title: 17,
      subtitle: 10,
    },
    large: {
      box: 58,
      icon: 32,
      title: 21,
      subtitle: 11,
    },
  };

  const current = sizes[size] || sizes.medium;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "11px",
      }}
    >
      <div
        style={{
          width: `${current.box}px`,
          height: `${current.box}px`,
          borderRadius: size === "large" ? "17px" : "13px",
          background: "#e11d48",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <ShieldCheck
          size={current.icon}
          color="#ffffff"
          strokeWidth={2.4}
        />
      </div>

      {showText && (
        <div>
          <div
            style={{
              fontSize: `${current.title}px`,
              fontWeight: "800",
              color: "#0f172a",
              lineHeight: 1.2,
            }}
          >
            Nari-Shield
          </div>

          <div
            style={{
              marginTop: "3px",
              fontSize: `${current.subtitle}px`,
              fontWeight: "600",
              color: "#94a3b8",
              letterSpacing: "0.2px",
            }}
          >
            AI Safety Platform
          </div>
        </div>
      )}
    </div>
  );
}