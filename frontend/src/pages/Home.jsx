import { useNavigate } from "react-router-dom";
import {
  ShieldAlert,
  MessageCircle,
  ScanSearch,
  KeyRound,
  Users,
  MapPin,
  History,
  ArrowRight,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      title: "AI Safety Assistant",
      description: "Get safety guidance for your situation.",
      icon: MessageCircle,
      path: "/ai-chat",
    },
    {
      title: "Analyze Situation",
      description: "Understand the risk type and severity.",
      icon: ScanSearch,
      path: "/analyze",
    },
    {
      title: "Safety Word",
      description: "Use a secret word to request help.",
      icon: KeyRound,
      path: "/safety-word",
    },
    {
      title: "Trusted Contacts",
      description: "Manage people you can rely on.",
      icon: Users,
      path: "/contacts",
    },
    {
      title: "Location",
      description: "Manage your saved safety location.",
      icon: MapPin,
      path: "/location",
    },
    {
      title: "Incident History",
      description: "Review your previous safety incidents.",
      icon: History,
      path: "/history",
    },
  ];

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "10px 0 40px",
      }}
    >
      {/* Welcome */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #e11d48 0%, #be123c 55%, #9f1239 100%)",
          borderRadius: "24px",
          padding: "32px",
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
          marginBottom: "24px",
          boxShadow: "0 15px 40px rgba(190, 18, 60, 0.2)",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            right: "-40px",
            top: "-60px",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "700px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 12px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.14)",
              fontSize: "12px",
              fontWeight: "700",
              marginBottom: "16px",
            }}
          >
            <ShieldCheck size={15} />
            NARI-SHIELD AI
          </div>

          <h1
            style={{
              margin: "0 0 10px",
              fontSize: "32px",
              lineHeight: 1.2,
              fontWeight: "800",
            }}
          >
            Hello, {user?.name || "there"} 👋
          </h1>

          <p
            style={{
              margin: 0,
              maxWidth: "620px",
              fontSize: "15px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            Your safety companion is ready. Understand risky situations,
            receive guidance, and access your safety tools when you need them.
          </p>
        </div>
      </section>

      {/* SOS */}
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          padding: "24px",
          marginBottom: "28px",
          borderRadius: "20px",
          background: "#fff7ed",
          border: "1px solid #fed7aa",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              flexShrink: 0,
              borderRadius: "16px",
              background: "#dc2626",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShieldAlert size={27} color="#ffffff" />
          </div>

          <div>
            <h2
              style={{
                margin: "0 0 5px",
                fontSize: "18px",
                color: "#7f1d1d",
              }}
            >
              Need immediate help?
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: "13px",
                color: "#9a3412",
                lineHeight: 1.5,
              }}
            >
              Open the SOS flow to review your safety information and request
              help.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/sos")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 18px",
            border: "none",
            borderRadius: "12px",
            background: "#dc2626",
            color: "#ffffff",
            fontWeight: "700",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Open SOS
          <ArrowRight size={17} />
        </button>
      </section>

      {/* Section title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "22px",
              color: "#0f172a",
            }}
          >
            Safety Tools
          </h2>

          <p
            style={{
              margin: "5px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Everything you need in one place.
          </p>
        </div>

        <Activity size={22} color="#e11d48" />
      </div>

      {/* Feature cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
        }}
      >
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <button
              key={feature.path}
              type="button"
              onClick={() => navigate(feature.path)}
              style={{
                textAlign: "left",
                border: "1px solid #e2e8f0",
                borderRadius: "18px",
                padding: "22px",
                background: "#ffffff",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                boxShadow: "0 5px 18px rgba(15, 23, 42, 0.04)",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = "translateY(-3px)";
                event.currentTarget.style.boxShadow =
                  "0 12px 28px rgba(15, 23, 42, 0.09)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = "translateY(0)";
                event.currentTarget.style.boxShadow =
                  "0 5px 18px rgba(15, 23, 42, 0.04)";
              }}
            >
              <div
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "14px",
                  background: "#fff1f2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "17px",
                }}
              >
                <Icon size={23} color="#e11d48" />
              </div>

              <h3
                style={{
                  margin: "0 0 7px",
                  fontSize: "16px",
                  color: "#0f172a",
                }}
              >
                {feature.title}
              </h3>

              <p
                style={{
                  margin: "0 0 16px",
                  fontSize: "13px",
                  lineHeight: 1.6,
                  color: "#64748b",
                }}
              >
                {feature.description}
              </p>

              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#e11d48",
                  fontSize: "13px",
                  fontWeight: "700",
                }}
              >
                Open
                <ArrowRight size={15} />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}