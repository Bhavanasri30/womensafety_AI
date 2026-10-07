import { useEffect, useState } from "react";
import {
  History as HistoryIcon,
  AlertTriangle,
  ShieldCheck,
  Trash2,
  Clock,
  MapPin,
} from "lucide-react";
import { getIncidents, clearIncidents } from "../services/safety";
import ConfirmDialog from "../components/ConfirmDialog";
import ApiError from "../components/ApiError";

export default function History() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    setLoading(true);
    setError("");

    try {
      const response = await getIncidents();

      setIncidents(Array.isArray(response) ? response : []);
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          "Unable to load incident history."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleClearHistory() {
    setClearing(true);
    setError("");
    setSuccess("");

    try {
      await clearIncidents();

      setIncidents([]);
      setShowClearConfirm(false);
      setSuccess("Incident history cleared successfully.");
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          "Unable to clear incident history."
      );
    } finally {
      setClearing(false);
    }
  }

  function formatDate(value) {
    if (!value) return "Date unavailable";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return String(value);
    }

    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  function severityStyle(severity) {
    const value = String(severity || "").toLowerCase();

    if (value === "critical") {
      return {
        background: "#fee2e2",
        color: "#991b1b",
      };
    }

    if (value === "high") {
      return {
        background: "#ffedd5",
        color: "#c2410c",
      };
    }

    if (value === "medium") {
      return {
        background: "#fef3c7",
        color: "#92400e",
      };
    }

    return {
      background: "#dcfce7",
      color: "#166534",
    };
  }

  const highRiskCount = incidents.filter((incident) => {
    const severity = String(incident.severity || "").toLowerCase();

    return severity === "high" || severity === "critical";
  }).length;

  const sosCount = incidents.filter(
    (incident) =>
      String(incident.sos_status || "").toLowerCase() === "confirmed"
  ).length;

  return (
    <div
      style={{
        maxWidth: "950px",
        margin: "0 auto",
        paddingBottom: "40px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "20px",
          marginBottom: "24px",
        }}
      >
        <div>
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
            <HistoryIcon size={25} color="#e11d48" />
          </div>

          <h1
            style={{
              margin: "0 0 7px",
              fontSize: "28px",
              color: "#0f172a",
            }}
          >
            Incident History
          </h1>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "14px",
              lineHeight: 1.6,
            }}
          >
            Review situations previously analyzed or recorded through
            Nari-Shield.
          </p>
        </div>

        {incidents.length > 0 && (
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            disabled={clearing}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "10px 14px",
              borderRadius: "11px",
              border: "1px solid #fecdd3",
              background: "#fff1f2",
              color: "#dc2626",
              fontSize: "12px",
              fontWeight: "700",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            <Trash2 size={15} />
            Clear History
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div style={{ marginBottom: "18px" }}>
          <ApiError
            message={error}
            onRetry={loadHistory}
          />
        </div>
      )}

      {/* Success */}
      {success && (
        <div
          style={{
            padding: "13px 15px",
            marginBottom: "18px",
            borderRadius: "13px",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            color: "#166534",
            fontSize: "13px",
          }}
        >
          {success}
        </div>
      )}

      {/* Statistics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(190px, 1fr))",
          gap: "14px",
          marginBottom: "22px",
        }}
      >
        <StatCard
          icon={<HistoryIcon size={20} />}
          label="Total Incidents"
          value={incidents.length}
        />

        <StatCard
          icon={<AlertTriangle size={20} />}
          label="High Risk"
          value={highRiskCount}
        />

        <StatCard
          icon={<ShieldCheck size={20} />}
          label="SOS Confirmed"
          value={sosCount}
        />
      </div>

      {/* History */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "20px",
          padding: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "9px",
            marginBottom: "18px",
          }}
        >
          <HistoryIcon size={19} color="#e11d48" />

          <h2
            style={{
              margin: 0,
              fontSize: "18px",
              color: "#0f172a",
            }}
          >
            Previous Incidents
          </h2>
        </div>

        {loading ? (
          <div
            style={{
              padding: "40px 10px",
              textAlign: "center",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Loading incident history...
          </div>
        ) : incidents.length === 0 ? (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              borderRadius: "16px",
              background: "#f8fafc",
              border: "1px dashed #cbd5e1",
            }}
          >
            <HistoryIcon
              size={32}
              color="#94a3b8"
              style={{ marginBottom: "10px" }}
            />

            <strong
              style={{
                display: "block",
                marginBottom: "5px",
                fontSize: "14px",
                color: "#475569",
              }}
            >
              No incidents recorded
            </strong>

            <span
              style={{
                fontSize: "12px",
                color: "#94a3b8",
              }}
            >
              Your analyzed or confirmed incidents will appear here.
            </span>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {incidents.map((incident, index) => (
              <div
                key={incident.id || incident._id || index}
                style={{
                  padding: "18px",
                  borderRadius: "16px",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                }}
              >
                {/* Top */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "15px",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        flexShrink: 0,
                        borderRadius: "11px",
                        background: "#fff1f2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AlertTriangle
                        size={18}
                        color="#e11d48"
                      />
                    </div>

                    <div style={{ minWidth: 0 }}>
                      <strong
                        style={{
                          display: "block",
                          fontSize: "14px",
                          color: "#0f172a",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {incident.risk_type ||
                          "Safety incident"}
                      </strong>

                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          marginTop: "4px",
                          fontSize: "11px",
                          color: "#94a3b8",
                        }}
                      >
                        <Clock size={12} />
                        {formatDate(
                          incident.created_at ||
                            incident.timestamp ||
                            incident.date
                        )}
                      </span>
                    </div>
                  </div>

                  <span
                    style={{
                      flexShrink: 0,
                      padding: "6px 10px",
                      borderRadius: "999px",
                      fontSize: "11px",
                      fontWeight: "800",
                      textTransform: "capitalize",
                      ...severityStyle(incident.severity),
                    }}
                  >
                    {incident.severity || "unknown"}
                  </span>
                </div>

                {/* Situation */}
                <div
                  style={{
                    padding: "13px",
                    borderRadius: "12px",
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    marginBottom: "12px",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: "13px",
                      lineHeight: 1.6,
                      color: "#475569",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {incident.situation ||
                      "No situation description available."}
                  </p>
                </div>

                {/* Bottom details */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    fontSize: "11px",
                    color: "#64748b",
                  }}
                >
                  {incident.sos_status && (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "6px 9px",
                        borderRadius: "8px",
                        background:
                          String(incident.sos_status).toLowerCase() ===
                          "confirmed"
                            ? "#fee2e2"
                            : "#f1f5f9",
                        color:
                          String(incident.sos_status).toLowerCase() ===
                          "confirmed"
                            ? "#991b1b"
                            : "#64748b",
                        fontWeight: "700",
                      }}
                    >
                      <ShieldCheck size={12} />
                      SOS: {incident.sos_status}
                    </span>
                  )}

                  {incident.location && (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "6px 9px",
                        borderRadius: "8px",
                        background: "#f1f5f9",
                      }}
                    >
                      <MapPin size={12} />
                      Location available
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Privacy note */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "16px",
          color: "#94a3b8",
          fontSize: "11px",
        }}
      >
        <ShieldCheck size={14} />
        Your incident history belongs to your account.
      </div>

      <ConfirmDialog
        open={showClearConfirm}
        title="Clear Incident History"
        message="Are you sure you want to permanently clear your incident history?"
        confirmText="Clear History"
        cancelText="Cancel"
        loading={clearing}
        onConfirm={handleClearHistory}
        onCancel={() => setShowClearConfirm(false)}
      />
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div
      style={{
        padding: "18px",
        borderRadius: "16px",
        background: "#ffffff",
        border: "1px solid #e2e8f0",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "12px",
          background: "#fff1f2",
          color: "#e11d48",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "12px",
        }}
      >
        {icon}
      </div>

      <span
        style={{
          display: "block",
          fontSize: "12px",
          color: "#64748b",
          marginBottom: "4px",
        }}
      >
        {label}
      </span>

      <strong
        style={{
          fontSize: "24px",
          color: "#0f172a",
        }}
      >
        {value}
      </strong>
    </div>
  );
}