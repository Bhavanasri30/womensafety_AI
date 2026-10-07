import { CircleHelp, X } from "lucide-react";
import { useState } from "react";

export default function HelpButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div
          style={{
            position: "fixed",
            right: "24px",
            bottom: "82px",
            width: "300px",
            maxWidth: "calc(100vw - 32px)",
            padding: "20px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "18px",
            boxShadow: "0 15px 45px rgba(15, 23, 42, 0.16)",
            zIndex: 3000,
            fontFamily: "Inter, Arial, sans-serif",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "16px",
                fontWeight: "800",
                color: "#0f172a",
              }}
            >
              Need Help?
            </h3>

            <button
              onClick={() => setOpen(false)}
              style={{
                width: "30px",
                height: "30px",
                border: "none",
                borderRadius: "8px",
                background: "#f8fafc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X size={17} color="#64748b" />
            </button>
          </div>

          <p
            style={{
              margin: "0 0 15px",
              fontSize: "13px",
              lineHeight: 1.6,
              color: "#64748b",
            }}
          >
            Use the AI Safety Assistant for guidance, Analyze Situation to
            understand a risk, or SOS when you need immediate help.
          </p>

          <div
            style={{
              padding: "12px",
              borderRadius: "11px",
              background: "#fff1f2",
              color: "#9f1239",
              fontSize: "12px",
              lineHeight: 1.5,
              fontWeight: "600",
            }}
          >
            If you are in immediate danger, contact local emergency services
            or a trusted person.
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        aria-label="Help"
        style={{
          position: "fixed",
          right: "24px",
          bottom: "24px",
          width: "46px",
          height: "46px",
          borderRadius: "50%",
          border: "none",
          background: "#0f172a",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 8px 25px rgba(15, 23, 42, 0.2)",
          zIndex: 3001,
        }}
      >
        {open ? <X size={21} /> : <CircleHelp size={21} />}
      </button>
    </>
  );
}