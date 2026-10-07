import { useState } from "react";
import {
  ScanSearch,
  AlertTriangle,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { analyzeSituation } from "../services/safety";
import ApiError from "../components/ApiError";
import LoadingButton from "../components/LoadingButton";

export default function Analyze() {
  const [situation, setSituation] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAnalyze(event) {
    event.preventDefault();

    if (!situation.trim()) {
      setError("Please describe the situation first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await analyzeSituation(situation.trim());
      setResult(response);
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          "Unable to analyze the situation. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function getSeverityStyle(severity) {
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

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        paddingBottom: "40px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            background: "#fff1f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "14px",
          }}
        >
          <ScanSearch size={25} color="#e11d48" />
        </div>

        <h1
          style={{
            margin: "0 0 7px",
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          Analyze Your Situation
        </h1>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          Describe what is happening. Nari-Shield will identify the
          situation's risk type and severity to support your safety decision.
        </p>
      </div>

      {/* Input Card */}
      <form
        onSubmit={handleAnalyze}
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "20px",
          padding: "24px",
          boxShadow: "0 5px 18px rgba(15, 23, 42, 0.04)",
        }}
      >
        <label
          style={{
            display: "block",
            marginBottom: "9px",
            fontSize: "14px",
            fontWeight: "700",
            color: "#334155",
          }}
        >
          What is happening?
        </label>

        <textarea
          value={situation}
          onChange={(event) => {
            setSituation(event.target.value);
            if (error) setError("");
          }}
          placeholder="Example: A person keeps following me whenever I leave my office..."
          rows={7}
          disabled={loading}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            background: "#f8fafc",
            color: "#0f172a",
            fontSize: "14px",
            lineHeight: 1.6,
            outline: "none",
            resize: "vertical",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "15px",
            marginTop: "16px",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: "#94a3b8",
            }}
          >
            Your description is sent to the safety analysis service.
          </span>

          <LoadingButton
            type="submit"
            loading={loading}
            disabled={loading || !situation.trim()}
            style={{
              minWidth: "145px",
              height: "46px",
              border: "none",
              borderRadius: "12px",
              background:
                loading || !situation.trim()
                  ? "#cbd5e1"
                  : "#e11d48",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "700",
              cursor:
                loading || !situation.trim()
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {!loading && (
              <>
                <ScanSearch size={17} />
                Analyze
              </>
            )}
          </LoadingButton>
        </div>
      </form>

      {/* Error */}
      {error && (
        <div style={{ marginTop: "18px" }}>
          <ApiError
            message={error}
            onRetry={() => setError("")}
          />
        </div>
      )}

      {/* Result */}
      {result && (
        <div
          style={{
            marginTop: "22px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "20px",
            padding: "24px",
            boxShadow: "0 5px 18px rgba(15, 23, 42, 0.04)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <Activity size={21} color="#e11d48" />

            <h2
              style={{
                margin: 0,
                fontSize: "19px",
                color: "#0f172a",
              }}
            >
              Analysis Result
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(210px, 1fr))",
              gap: "14px",
              marginBottom: "18px",
            }}
          >
            {/* Risk Type */}
            <div
              style={{
                padding: "18px",
                borderRadius: "15px",
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "9px",
                  color: "#64748b",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              >
                <ShieldCheck size={16} />
                RISK TYPE
              </div>

              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "800",
                  color: "#0f172a",
                  lineHeight: 1.4,
                }}
              >
                {result.risk_type || "Not available"}
              </div>

              {result.risk_confidence !== undefined && (
                <div
                  style={{
                    marginTop: "7px",
                    fontSize: "12px",
                    color: "#64748b",
                  }}
                >
                  Confidence:{" "}
                  {typeof result.risk_confidence === "number"
                    ? `${(result.risk_confidence * 100).toFixed(1)}%`
                    : result.risk_confidence}
                </div>
              )}
            </div>

            {/* Severity */}
            <div
              style={{
                padding: "18px",
                borderRadius: "15px",
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "9px",
                  color: "#64748b",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              >
                <AlertTriangle size={16} />
                SEVERITY
              </div>

              <span
                style={{
                  display: "inline-block",
                  padding: "7px 12px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: "800",
                  textTransform: "capitalize",
                  ...getSeverityStyle(result.severity),
                }}
              >
                {result.severity || "Not available"}
              </span>

              {result.severity_confidence !== undefined && (
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "12px",
                    color: "#64748b",
                  }}
                >
                  Confidence:{" "}
                  {typeof result.severity_confidence === "number"
                    ? `${(result.severity_confidence * 100).toFixed(1)}%`
                    : result.severity_confidence}
                </div>
              )}
            </div>
          </div>

          {/* SOS Recommendation */}
          {result.sos_recommended !== undefined && (
            <div
              style={{
                padding: "15px 17px",
                borderRadius: "14px",
                background: result.sos_recommended
                  ? "#fff1f2"
                  : "#f0fdf4",
                border: result.sos_recommended
                  ? "1px solid #fecdd3"
                  : "1px solid #bbf7d0",
                color: result.sos_recommended
                  ? "#9f1239"
                  : "#166534",
                marginBottom: "18px",
                fontSize: "13px",
                lineHeight: 1.6,
              }}
            >
              <strong>
                {result.sos_recommended
                  ? "SOS is recommended."
                  : "SOS is not currently recommended."}
              </strong>{" "}
              You remain in control of whether to start the SOS flow.
            </div>
          )}

          {/* Recommendation */}
          {result.recommended_action && (
            <div
              style={{
                padding: "18px",
                borderRadius: "15px",
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <h3
                style={{
                  margin: "0 0 8px",
                  fontSize: "15px",
                  color: "#334155",
                }}
              >
                Recommended Action
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "#475569",
                  whiteSpace: "pre-wrap",
                }}
              >
                {result.recommended_action}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}