import { useNavigate } from "react-router-dom";
import { ShieldAlert, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          textAlign: "center",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "24px",
          padding: "42px 28px",
          boxShadow: "0 15px 40px rgba(15, 23, 42, 0.08)",
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            margin: "0 auto 20px",
            borderRadius: "20px",
            background: "#fff1f2",
            color: "#e11d48",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ShieldAlert size={36} />
        </div>

        <div
          style={{
            fontSize: "64px",
            lineHeight: 1,
            fontWeight: "800",
            color: "#0f172a",
            marginBottom: "12px",
          }}
        >
          404
        </div>

        <h1
          style={{
            margin: "0 0 10px",
            fontSize: "24px",
            color: "#0f172a",
          }}
        >
          Page Not Found
        </h1>

        <p
          style={{
            margin: "0 auto 26px",
            maxWidth: "390px",
            fontSize: "14px",
            lineHeight: 1.7,
            color: "#64748b",
          }}
        >
          The page you are looking for does not exist or may have been moved.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "11px 17px",
              borderRadius: "11px",
              border: "1px solid #e2e8f0",
              background: "#ffffff",
              color: "#475569",
              fontWeight: "700",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            <ArrowLeft size={17} />
            Go Back
          </button>

          <button
            type="button"
            onClick={() => navigate("/home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "11px 17px",
              borderRadius: "11px",
              border: "none",
              background: "#e11d48",
              color: "#ffffff",
              fontWeight: "700",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            <Home size={17} />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}