import { useState } from "react";
import {
  ShieldCheck,
  LockKeyhole,
  KeyRound,
  Users,
  Smartphone,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Security() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  function showMessage(text, type = "success") {
    setMessage(text);
    setMessageType(type);
  }

  function handleChangePassword() {
    showMessage(
      "Password change requires a dedicated backend endpoint. The current backend does not provide one.",
      "info"
    );
  }

  return (
    <div
      style={{
        maxWidth: "850px",
        margin: "0 auto",
        paddingBottom: "40px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "15px",
            background: "#fff1f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "14px",
          }}
        >
          <ShieldCheck size={25} color="#e11d48" />
        </div>

        <h1
          style={{
            margin: "0 0 7px",
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          Security
        </h1>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          Manage the safety and security features available in your account.
        </p>
      </div>

      {/* Message */}
      {message && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            padding: "13px 15px",
            marginBottom: "18px",
            borderRadius: "13px",
            background:
              messageType === "info" ? "#eff6ff" : "#f0fdf4",
            border:
              messageType === "info"
                ? "1px solid #bfdbfe"
                : "1px solid #bbf7d0",
            color:
              messageType === "info" ? "#1d4ed8" : "#166534",
            fontSize: "13px",
            lineHeight: 1.5,
          }}
        >
          {messageType === "info" ? (
            <AlertCircle size={18} />
          ) : (
            <CheckCircle2 size={18} />
          )}

          <span>{message}</span>
        </div>
      )}

      {/* Account Security */}
      <section
        style={sectionStyle}
      >
        <h2 style={sectionTitleStyle}>
          Account Security
        </h2>

        <SecurityRow
          icon={<LockKeyhole size={19} />}
          title="Change Password"
          description="Update your account password."
          action="Manage"
          onClick={handleChangePassword}
        />

        <SecurityRow
          icon={<KeyRound size={19} />}
          title="Safety Word"
          description="Manage your private safety word."
          action="Open"
          onClick={() => navigate("/safety-word")}
        />
      </section>

      {/* Safety Access */}
      <section
        style={sectionStyle}
      >
        <h2 style={sectionTitleStyle}>
          Safety Access
        </h2>

        <SecurityRow
          icon={<Users size={19} />}
          title="Trusted Contacts"
          description="Review people available in your SOS workflow."
          action="Open"
          onClick={() => navigate("/contacts")}
        />

        <SecurityRow
          icon={<Smartphone size={19} />}
          title="Authenticated Session"
          description="Your current session uses the Nari-Shield authentication token."
          action="Active"
          onClick={() =>
            showMessage(
              "Your current authenticated session is active.",
              "success"
            )
          }
        />
      </section>

      {/* Security status */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          padding: "18px",
          borderRadius: "16px",
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
        }}
      >
        <ShieldCheck
          size={22}
          color="#16a34a"
          style={{ flexShrink: 0 }}
        />

        <div>
          <strong
            style={{
              display: "block",
              marginBottom: "5px",
              fontSize: "14px",
              color: "#166534",
            }}
          >
            Account Security Active
          </strong>

          <p
            style={{
              margin: 0,
              fontSize: "12px",
              lineHeight: 1.6,
              color: "#15803d",
            }}
          >
            Nari-Shield protects authenticated API requests using your account
            session. Safety features such as trusted contacts and safety word
            remain linked to your authenticated account.
          </p>
        </div>
      </div>
    </div>
  );
}

function SecurityRow({
  icon,
  title,
  description,
  action,
  onClick,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "15px",
        padding: "17px 0",
        borderTop: "1px solid #f1f5f9",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "13px",
          minWidth: 0,
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            flexShrink: 0,
            borderRadius: "12px",
            background: "#fff1f2",
            color: "#e11d48",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>

        <div>
          <strong
            style={{
              display: "block",
              fontSize: "14px",
              color: "#0f172a",
              marginBottom: "4px",
            }}
          >
            {title}
          </strong>

          <span
            style={{
              display: "block",
              fontSize: "12px",
              color: "#64748b",
              lineHeight: 1.5,
            }}
          >
            {description}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onClick}
        style={{
          flexShrink: 0,
          padding: "8px 12px",
          borderRadius: "9px",
          border: "1px solid #e2e8f0",
          background: "#f8fafc",
          color: "#475569",
          fontSize: "12px",
          fontWeight: "700",
          cursor: "pointer",
        }}
      >
        {action}
      </button>
    </div>
  );
}

const sectionStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "20px",
  padding: "20px 24px",
  marginBottom: "18px",
};

const sectionTitleStyle = {
  margin: "0 0 4px",
  fontSize: "15px",
  color: "#64748b",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};