import {
  Home,
  Bot,
  Brain,
  ShieldAlert,
  KeyRound,
  Users,
  MapPin,
  History,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      label: "Dashboard",
      icon: Home,
      path: "/home",
    },
    {
      label: "AI Assistant",
      icon: Bot,
      path: "/ai-chat",
    },
    {
      label: "Analyze Situation",
      icon: Brain,
      path: "/analyze",
    },
    {
      label: "SOS",
      icon: ShieldAlert,
      path: "/sos",
      danger: true,
    },
    {
      label: "Safety Word",
      icon: KeyRound,
      path: "/safety-word",
    },
    {
      label: "Trusted Contacts",
      icon: Users,
      path: "/contacts",
    },
    {
      label: "Location",
      icon: MapPin,
      path: "/location",
    },
    {
      label: "Incident History",
      icon: History,
      path: "/history",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  function handleNavigation(path) {
    navigate(path);
    setMobileMenuOpen(false);
  }

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
    setMobileMenuOpen(false);
  }

  const displayName = user?.name || "User";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f9fc",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {/* Mobile Header */}
      <header
        style={{
          display: "none",
          height: "68px",
          padding: "0 18px",
          background: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
        className="mobile-header"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "11px",
              background: "#e11d48",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShieldCheck size={22} color="#ffffff" />
          </div>

          <strong
            style={{
              fontSize: "17px",
              color: "#0f172a",
            }}
          >
            Nari-Shield
          </strong>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "11px",
            border: "1px solid #e2e8f0",
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          {mobileMenuOpen ? (
            <X size={21} color="#334155" />
          ) : (
            <Menu size={21} color="#334155" />
          )}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: "255px",
          background: "#ffffff",
          borderRight: "1px solid #e2e8f0",
          display: "flex",
          flexDirection: "column",
          zIndex: 1100,
        }}
        className={`nari-sidebar ${
          mobileMenuOpen ? "mobile-open" : ""
        }`}
      >
        {/* Logo */}
        <div
          style={{
            height: "76px",
            padding: "0 22px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "13px",
              background: "#e11d48",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <ShieldCheck size={25} color="#ffffff" />
          </div>

          <div>
            <div
              style={{
                fontSize: "17px",
                fontWeight: "800",
                color: "#0f172a",
              }}
            >
              Nari-Shield
            </div>

            <div
              style={{
                fontSize: "11px",
                color: "#94a3b8",
                marginTop: "2px",
              }}
            >
              AI Safety Platform
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav
          style={{
            flex: 1,
            padding: "18px 12px",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              padding: "0 10px 10px",
              fontSize: "11px",
              fontWeight: "700",
              color: "#94a3b8",
              textTransform: "uppercase",
              letterSpacing: "0.7px",
            }}
          >
            Safety Tools
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "11px 12px",
                  marginBottom: "4px",
                  borderRadius: "11px",
                  border: "none",
                  background: active
                    ? item.danger
                      ? "#fff1f2"
                      : "#fef2f2"
                    : "transparent",
                  color: active
                    ? item.danger
                      ? "#e11d48"
                      : "#be123c"
                    : item.danger
                    ? "#e11d48"
                    : "#475569",
                  fontSize: "13px",
                  fontWeight: active ? "700" : "600",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Area */}
        <div
          style={{
            padding: "15px",
            borderTop: "1px solid #f1f5f9",
          }}
        >
          <button
            onClick={() => handleNavigation("/profile")}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "11px",
              padding: "10px",
              border: "none",
              background: "#f8fafc",
              borderRadius: "12px",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#e11d48",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "800",
                fontSize: "14px",
                flexShrink: 0,
              }}
            >
              {displayName.charAt(0).toUpperCase()}
            </div>

            <div
              style={{
                flex: 1,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#0f172a",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {displayName}
              </div>

              <div
                style={{
                  fontSize: "11px",
                  color: "#94a3b8",
                  marginTop: "2px",
                }}
              >
                View profile
              </div>
            </div>
          </button>

          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "10px",
              border: "none",
              background: "transparent",
              color: "#64748b",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        style={{
          marginLeft: "255px",
          minHeight: "100vh",
          padding: "30px",
        }}
        className="nari-main"
      >
        <Outlet />
      </main>

      {/* Responsive CSS */}
      <style>
        {`
          @media (max-width: 900px) {
            .mobile-header {
              display: flex !important;
            }

            .nari-sidebar {
              transform: translateX(-100%);
              transition: transform 0.25s ease;
              width: 270px !important;
              top: 68px !important;
              box-shadow: 8px 0 30px rgba(15, 23, 42, 0.12);
            }

            .nari-sidebar.mobile-open {
              transform: translateX(0);
            }

            .nari-main {
              margin-left: 0 !important;
              padding: 22px 16px !important;
            }
          }

          @media (max-width: 600px) {
            .nari-main {
              padding: 18px 12px !important;
            }
          }
        `}
      </style>
    </div>
  );
}