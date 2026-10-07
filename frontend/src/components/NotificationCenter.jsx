import { Bell, X, CheckCircle, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      type: "info",
      title: "Welcome to Nari-Shield",
      message: "Your safety dashboard is ready.",
    },
    {
      id: 2,
      type: "success",
      title: "Safety tools available",
      message: "AI analysis, SOS and trusted contacts are ready to use.",
    },
  ];

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Notifications"
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
          position: "relative",
        }}
      >
        <Bell size={20} color="#475569" />

        {notifications.length > 0 && (
          <span
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#e11d48",
              border: "2px solid #ffffff",
            }}
          />
        )}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "52px",
            right: 0,
            width: "340px",
            maxWidth: "calc(100vw - 30px)",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "18px",
            boxShadow: "0 15px 45px rgba(15, 23, 42, 0.15)",
            zIndex: 2000,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "16px 18px",
              borderBottom: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "15px",
                fontWeight: "800",
                color: "#0f172a",
              }}
            >
              Notifications
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
              <X size={16} color="#64748b" />
            </button>
          </div>

          {notifications.map((notification) => {
            const success = notification.type === "success";

            return (
              <div
                key={notification.id}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "16px 18px",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: success ? "#ecfdf5" : "#fff7ed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {success ? (
                    <CheckCircle size={18} color="#059669" />
                  ) : (
                    <AlertTriangle size={18} color="#ea580c" />
                  )}
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      color: "#0f172a",
                    }}
                  >
                    {notification.title}
                  </div>

                  <div
                    style={{
                      marginTop: "4px",
                      fontSize: "12px",
                      lineHeight: 1.5,
                      color: "#64748b",
                    }}
                  >
                    {notification.message}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}