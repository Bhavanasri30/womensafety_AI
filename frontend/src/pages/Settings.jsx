import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings as SettingsIcon,
  User,
  ShieldCheck,
  Moon,
  Sun,
  Bell,
  LockKeyhole,
  Users,
  MapPin,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import ConfirmDialog from "../components/ConfirmDialog";

export default function Settings() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [notifications, setNotifications] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  function handleLogout() {
    logout();
    setShowLogoutConfirm(false);
    navigate("/login", { replace: true });
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
          <SettingsIcon size={25} color="#e11d48" />
        </div>

        <h1
          style={{
            margin: "0 0 7px",
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          Settings
        </h1>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Manage your account, safety preferences, and app experience.
        </p>
      </div>

      {/* Account */}
      <SettingsSection title="Account">
        <SettingsRow
          icon={<User size={19} />}
          title="Profile"
          description="Update your name and account information."
          onClick={() => navigate("/profile")}
        />

        <SettingsRow
          icon={<LockKeyhole size={19} />}
          title="Security"
          description="Manage security-related settings."
          onClick={() => navigate("/security")}
        />
      </SettingsSection>

      {/* Safety */}
      <SettingsSection title="Safety">
        <SettingsRow
          icon={<ShieldCheck size={19} />}
          title="Safety Word"
          description="Configure your private safety word."
          onClick={() => navigate("/safety-word")}
        />

        <SettingsRow
          icon={<Users size={19} />}
          title="Trusted Contacts"
          description="Manage people you trust."
          onClick={() => navigate("/contacts")}
        />

        <SettingsRow
          icon={<MapPin size={19} />}
          title="Safety Location"
          description="Manage your saved safety location."
          onClick={() => navigate("/location")}
        />
      </SettingsSection>

      {/* Appearance */}
      <SettingsSection title="Appearance & Preferences">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "15px",
            padding: "17px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "13px",
            }}
          >
            <div style={iconBoxStyle}>
              {theme === "dark" ? (
                <Moon size={19} />
              ) : (
                <Sun size={19} />
              )}
            </div>

            <div>
              <strong style={titleStyle}>
                Dark Mode
              </strong>

              <span style={descriptionStyle}>
                Switch between light and dark appearance.
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            style={{
              width: "48px",
              height: "27px",
              borderRadius: "999px",
              border: "none",
              background: theme === "dark" ? "#e11d48" : "#cbd5e1",
              padding: "3px",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <span
              style={{
                display: "block",
                width: "21px",
                height: "21px",
                borderRadius: "50%",
                background: "#ffffff",
                transform:
                  theme === "dark"
                    ? "translateX(21px)"
                    : "translateX(0)",
                transition: "transform 0.2s ease",
              }}
            />
          </button>
        </div>

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
            }}
          >
            <div style={iconBoxStyle}>
              <Bell size={19} />
            </div>

            <div>
              <strong style={titleStyle}>
                Notifications
              </strong>

              <span style={descriptionStyle}>
                Enable safety-related app notifications.
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setNotifications((current) => !current)
            }
            aria-label="Toggle notifications"
            style={{
              width: "48px",
              height: "27px",
              borderRadius: "999px",
              border: "none",
              background: notifications ? "#e11d48" : "#cbd5e1",
              padding: "3px",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                display: "block",
                width: "21px",
                height: "21px",
                borderRadius: "50%",
                background: "#ffffff",
                transform: notifications
                  ? "translateX(21px)"
                  : "translateX(0)",
                transition: "transform 0.2s ease",
              }}
            />
          </button>
        </div>
      </SettingsSection>

      {/* Logout */}
      <button
        type="button"
        onClick={() => setShowLogoutConfirm(true)}
        style={{
          width: "100%",
          height: "50px",
          marginTop: "8px",
          borderRadius: "14px",
          border: "1px solid #fecdd3",
          background: "#fff1f2",
          color: "#dc2626",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "9px",
          fontSize: "14px",
          fontWeight: "700",
          cursor: "pointer",
        }}
      >
        <LogOut size={18} />
        Sign Out
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "7px",
          marginTop: "18px",
          color: "#94a3b8",
          fontSize: "11px",
        }}
      >
        <ShieldCheck size={14} />
        Nari-Shield AI
      </div>

      <ConfirmDialog
        open={showLogoutConfirm}
        title="Sign Out"
        message="Are you sure you want to sign out of your Nari-Shield account?"
        confirmText="Sign Out"
        cancelText="Cancel"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </div>
  );
}

function SettingsSection({ title, children }) {
  return (
    <section
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "20px",
        padding: "20px 24px",
        marginBottom: "18px",
      }}
    >
      <h2
        style={{
          margin: "0 0 4px",
          fontSize: "15px",
          color: "#64748b",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {title}
      </h2>

      {children}
    </section>
  );
}

function SettingsRow({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "15px",
        padding: "17px 0",
        border: "none",
        borderTop: "1px solid #f1f5f9",
        background: "transparent",
        cursor: "pointer",
        textAlign: "left",
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
        <div style={iconBoxStyle}>
          {icon}
        </div>

        <div>
          <strong style={titleStyle}>
            {title}
          </strong>

          <span style={descriptionStyle}>
            {description}
          </span>
        </div>
      </div>

      <ChevronRight
        size={18}
        color="#94a3b8"
        style={{ flexShrink: 0 }}
      />
    </button>
  );
}

const iconBoxStyle = {
  width: "40px",
  height: "40px",
  flexShrink: 0,
  borderRadius: "12px",
  background: "#fff1f2",
  color: "#e11d48",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const titleStyle = {
  display: "block",
  fontSize: "14px",
  color: "#0f172a",
  marginBottom: "4px",
};

const descriptionStyle = {
  display: "block",
  fontSize: "12px",
  color: "#64748b",
  lineHeight: 1.5,
};