import { Globe2 } from "lucide-react";

export default function LanguageSelector({
  value = "english",
  onChange,
}) {
  const languages = [
    {
      value: "english",
      label: "English",
    },
    {
      value: "telugu",
      label: "తెలుగు",
    },
    {
      value: "hindi",
      label: "हिन्दी",
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <Globe2
        size={17}
        color="#64748b"
        style={{
          position: "absolute",
          left: "12px",
          pointerEvents: "none",
        }}
      />

      <select
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        style={{
          appearance: "none",
          padding: "10px 34px 10px 36px",
          border: "1px solid #e2e8f0",
          borderRadius: "11px",
          background: "#ffffff",
          color: "#334155",
          fontSize: "13px",
          fontWeight: "600",
          cursor: "pointer",
          outline: "none",
        }}
      >
        {languages.map((language) => (
          <option
            key={language.value}
            value={language.value}
          >
            {language.label}
          </option>
        ))}
      </select>
    </div>
  );
}