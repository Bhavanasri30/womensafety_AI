import { useEffect, useState } from "react";

import {
  ShieldAlert,
  MapPin,
  Users,
  CheckCircle2,
  AlertTriangle,
  PhoneCall,
  MessageSquare,
} from "lucide-react";

import { prepareSOS, confirmSOS } from "../services/safety";
import ConfirmDialog from "../components/ConfirmDialog";
import LoadingButton from "../components/LoadingButton";
import ApiError from "../components/ApiError";

export default function SOS() {
  const [situation, setSituation] = useState("");
  const [sosData, setSosData] = useState(null);
  const [result, setResult] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");

  // ============================================================
  // SAFETY WORD SOS TRIGGER
  // ============================================================

  useEffect(() => {
    const safetyWordSOS = sessionStorage.getItem(
      "nari_safety_word_sos"
    );

    if (!safetyWordSOS) {
      return;
    }

    try {
      const preparedSOS = JSON.parse(safetyWordSOS);

      // Remove it immediately so refresh does not trigger SOS again
      sessionStorage.removeItem("nari_safety_word_sos");

      setSosData(preparedSOS);

      setSituation(
        "Safety word detected. User requested emergency assistance."
      );

      // Automatically open the existing SOS confirmation dialog
      setShowConfirm(true);
    } catch (error) {
      console.error(
        "Unable to load safety word SOS:",
        error
      );

      sessionStorage.removeItem("nari_safety_word_sos");
    }
  }, []);

  // ============================================================
  // PREPARE SOS
  // ============================================================

  async function handlePrepareSOS() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await prepareSOS(
        situation.trim() ||
          "User requested SOS assistance."
      );

      setSosData(response);
      setShowConfirm(true);
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          "Unable to prepare SOS. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  // ============================================================
  // CONFIRM SOS
  // ============================================================

  async function handleConfirmSOS() {
    setConfirming(true);
    setError("");

    try {
      const emergencySituation =
        situation.trim() ||
        "User requested SOS assistance.";

      const response = await confirmSOS(
        emergencySituation,
        "user_requested",
        "high"
      );

      setResult(response);
      setShowConfirm(false);

      // --------------------------------------------------------
      // OPEN SMS FOR FIRST TRUSTED CONTACT
      // --------------------------------------------------------

      const sosPackage = response?.sos;

      const contacts =
        sosPackage?.trusted_contacts || [];

      const emergencyMessage =
        sosPackage?.emergency_message ||
        "🚨 NARI-SHIELD SOS ALERT\n\nI need help. Please contact me immediately.";

      if (contacts.length > 0) {
        const firstContact = contacts[0];

        const phoneNumber = firstContact.phone;

        sessionStorage.setItem(
          "nari_sos_contact_index",
          "0"
        );

        const smsUrl =
          `sms:${encodeURIComponent(phoneNumber)}` +
          `?body=${encodeURIComponent(
            emergencyMessage
          )}`;

        window.location.href = smsUrl;
      }
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          "Unable to confirm SOS. Please try again."
      );
    } finally {
      setConfirming(false);
    }
  }

  // ============================================================
  // CALL 112
  // ============================================================

  function handleCall112() {
    window.location.href = "tel:112";
  }

  // ============================================================
  // SEND TO NEXT CONTACT
  // ============================================================

  function handleSendToNextContact() {
    if (!result?.sos?.trusted_contacts) {
      return;
    }

    const contacts = result.sos.trusted_contacts;

    if (contacts.length === 0) {
      return;
    }

    const currentIndex = Number(
      sessionStorage.getItem(
        "nari_sos_contact_index"
      ) || "0"
    );

    const nextIndex = currentIndex + 1;

    if (nextIndex >= contacts.length) {
      sessionStorage.removeItem(
        "nari_sos_contact_index"
      );

      return;
    }

    sessionStorage.setItem(
      "nari_sos_contact_index",
      String(nextIndex)
    );

    const contact = contacts[nextIndex];

    const smsUrl =
      `sms:${encodeURIComponent(contact.phone)}` +
      `?body=${encodeURIComponent(
        result.sos.emergency_message
      )}`;

    window.location.href = smsUrl;
  }

  // ============================================================
  // UI
  // ============================================================

  return (
    <div
      style={{
        maxWidth: "850px",
        margin: "0 auto",
        paddingBottom: "40px",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "26px",
        }}
      >
        <div
          style={{
            width: "70px",
            height: "70px",
            margin: "0 auto 16px",
            borderRadius: "22px",
            background: "#fee2e2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ShieldAlert
            size={38}
            color="#dc2626"
          />
        </div>

        <h1
          style={{
            margin: "0 0 8px",
            fontSize: "30px",
            color: "#991b1b",
          }}
        >
          Emergency SOS
        </h1>

        <p
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            color: "#64748b",
            fontSize: "14px",
            lineHeight: 1.7,
          }}
        >
          Use SOS when you need immediate assistance.
          Your trusted contacts and current location can
          be included in the emergency message.
        </p>
      </div>

      {/* WARNING */}

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          padding: "16px",
          marginBottom: "20px",
          borderRadius: "15px",
          background: "#fff7ed",
          border: "1px solid #fed7aa",
          color: "#9a3412",
          fontSize: "13px",
          lineHeight: 1.6,
        }}
      >
        <AlertTriangle
          size={20}
          style={{
            flexShrink: 0,
            marginTop: "1px",
          }}
        />

        <div>
          <strong>
            SOS requires your confirmation.
          </strong>

          <br />

          Review the emergency information before
          sending it.
        </div>
      </div>

      {/* SITUATION */}

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "20px",
          padding: "24px",
          marginBottom: "20px",
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
          onChange={(event) =>
            setSituation(event.target.value)
          }
          placeholder="Briefly describe the situation..."
          rows={5}
          disabled={loading || confirming}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "13px",
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
            justifyContent: "flex-end",
            marginTop: "16px",
          }}
        >
          <LoadingButton
            type="button"
            loading={loading}
            disabled={loading || confirming}
            onClick={handlePrepareSOS}
            style={{
              minWidth: "170px",
              height: "48px",
              border: "none",
              borderRadius: "13px",
              background: "#dc2626",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "800",
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >
            {!loading && (
              <>
                <ShieldAlert size={18} />
                Prepare SOS
              </>
            )}
          </LoadingButton>
        </div>
      </div>

      {/* ERROR */}

      {error && (
        <div style={{ marginBottom: "20px" }}>
          <ApiError
            message={error}
            onRetry={() => setError("")}
          />
        </div>
      )}

      {/* PREPARED SOS INFORMATION */}

      {sosData && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          {/* LOCATION */}

          <div
            style={{
              padding: "20px",
              borderRadius: "17px",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "#eff6ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "13px",
              }}
            >
              <MapPin
                size={21}
                color="#2563eb"
              />
            </div>

            <h3
              style={{
                margin: "0 0 6px",
                fontSize: "15px",
                color: "#0f172a",
              }}
            >
              Location
            </h3>

            <p
              style={{
                margin: 0,
                fontSize: "13px",
                color: "#64748b",
                lineHeight: 1.5,
              }}
            >
              {sosData.location_status ||
                "Location information is being checked."}
            </p>
          </div>

          {/* CONTACTS */}

          <div
            style={{
              padding: "20px",
              borderRadius: "17px",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "#fdf2f8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "13px",
              }}
            >
              <Users
                size={21}
                color="#db2777"
              />
            </div>

            <h3
              style={{
                margin: "0 0 6px",
                fontSize: "15px",
                color: "#0f172a",
              }}
            >
              Trusted Contacts
            </h3>

            <p
              style={{
                margin: 0,
                fontSize: "13px",
                color: "#64748b",
                lineHeight: 1.5,
              }}
            >
              {sosData.contact_status ||
                "Trusted contact information is being checked."}
            </p>
          </div>
        </div>
      )}

      {/* CONFIRMED RESULT */}

      {result && (
        <div
          style={{
            padding: "22px",
            borderRadius: "18px",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "8px",
              color: "#166534",
            }}
          >
            <CheckCircle2 size={22} />

            <strong style={{ fontSize: "16px" }}>
              SOS request confirmed
            </strong>
          </div>

          <p
            style={{
              margin: "0 0 15px",
              fontSize: "13px",
              lineHeight: 1.6,
              color: "#166534",
            }}
          >
            Your emergency information has been
            prepared. Use the buttons below to contact
            your trusted contacts and emergency services.
          </p>

          {/* SMS BUTTONS */}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <button
              type="button"
              onClick={() => {
                sessionStorage.setItem(
                  "nari_sos_contact_index",
                  "0"
                );

                const contacts =
                  result?.sos?.trusted_contacts || [];

                if (contacts.length === 0) return;

                const contact = contacts[0];

                const smsUrl =
                  `sms:${encodeURIComponent(
                    contact.phone
                  )}` +
                  `?body=${encodeURIComponent(
                    result.sos.emergency_message
                  )}`;

                window.location.href = smsUrl;
              }}
              disabled={
                !result?.sos?.trusted_contacts?.length
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 16px",
                border: "none",
                borderRadius: "10px",
                background: "#2563eb",
                color: "#ffffff",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              <MessageSquare size={17} />
              Message Trusted Contact
            </button>

            {/* NEXT CONTACT */}

            {result?.sos?.trusted_contacts?.length >
              1 && (
              <button
                type="button"
                onClick={handleSendToNextContact}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 16px",
                  border:
                    "1px solid #2563eb",
                  borderRadius: "10px",
                  background: "#ffffff",
                  color: "#2563eb",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                <Users size={17} />
                Message Next Contact
              </button>
            )}
          </div>

          {/* CALL 112 */}

          <button
            type="button"
            onClick={handleCall112}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "10px",
              background: "#dc2626",
              color: "#ffffff",
              fontWeight: "800",
              cursor: "pointer",
            }}
          >
            <PhoneCall size={18} />
            Call 112
          </button>

          <div
            style={{
              marginTop: "12px",
              fontSize: "12px",
              color: "#64748b",
              lineHeight: 1.5,
            }}
          >
            The SMS button opens your phone's messaging
            app with the emergency message and location
            ready. You review and send it from your own
            phone.
          </div>
        </div>
      )}

      {/* EMERGENCY NOTE */}

      <div
        style={{
          textAlign: "center",
          color: "#94a3b8",
          fontSize: "12px",
          lineHeight: 1.6,
        }}
      >
        If you are in immediate danger, call 112 directly.
      </div>

      {/* CONFIRMATION DIALOG */}

      <ConfirmDialog
        open={showConfirm}
        title="Confirm SOS"
        message="Your emergency message, available location, and trusted-contact information will be prepared. Do you want to confirm the SOS?"
        confirmText="Confirm SOS"
        cancelText="Cancel"
        loading={confirming}
        onConfirm={handleConfirmSOS}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}