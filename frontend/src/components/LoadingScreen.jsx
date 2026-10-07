import { ShieldCheck } from "lucide-react";

export default function LoadingScreen({ message = "Loading Nari-Shield..." }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f7f9fc",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "68px",
            height: "68px",
            margin: "0 auto 20px",
            borderRadius: "20px",
            background: "#fff1f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ShieldCheck size={36} color="#e11d48" />
        </div>

        <div
          style={{
            width: "38px",
            height: "38px",
            margin: "0 auto 16px",
            borderRadius: "50%",
            border: "4px solid #e2e8f0",
            borderTopColor: "#e11d48",
            animation: "nariShieldSpin 0.8s linear infinite",
          }}
        />

        <h2
          style={{
            margin: "0 0 6px",
            fontSize: "18px",
            fontWeight: "750",
            color: "#0f172a",
          }}
        >
          Nari-Shield AI
        </h2>

        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: "#64748b",
          }}
        >
          {message}
        </p>

        <style>
          {`
            @keyframes nariShieldSpin {
              to {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </div>
    </div>
  );
}