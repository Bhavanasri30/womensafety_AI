import { Mic, MicOff } from "lucide-react";

export default function VoiceStatus({
  listening = false,
  text = "",
}) {
  if (!listening && !text) {
    return null;
  }

  return (
    <div
      style={{
        width: "100%",
        padding: "12px 14px",
        borderRadius: "13px",
        background: listening ? "#fff1f2" : "#f8fafc",
        border: listening
          ? "1px solid #fecdd3"
          : "1px solid #e2e8f0",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "34px",
          height: "34px",
          borderRadius: "9px",
          background: listening ? "#ffe4e6" : "#e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {listening ? (
          <Mic size={17} color="#e11d48" />
        ) : (
          <MicOff size={17} color="#64748b" />
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "12px",
            fontWeight: "700",
            color: listening ? "#be123c" : "#475569",
          }}
        >
          {listening ? "Listening..." : "Voice captured"}
        </div>

        {text && (
          <div
            style={{
              marginTop: "3px",
              fontSize: "12px",
              color: "#64748b",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {text}
          </div>
        )}
      </div>
    </div>
  );
}