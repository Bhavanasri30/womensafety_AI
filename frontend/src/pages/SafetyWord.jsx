import { useEffect, useRef, useState } from "react";

import {
  KeyRound,
  Mic,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Volume2,
  ShieldAlert,
} from "lucide-react";

import {
  saveSafetyWord,
  getSafetyWordStatus,
  checkSafetyWord,
  prepareSOS,
} from "../services/safety";

import {
  startVoiceRecognition,
  isVoiceSupported,
} from "../services/voice";

import LoadingButton from "../components/LoadingButton";

export default function SafetyWord() {
  const [word, setWord] = useState("");
  const [configured, setConfigured] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [listening, setListening] = useState(false);
  const [sosPreparing, setSosPreparing] = useState(false);

  const recognitionRef = useRef(null);

  // ============================================================
  // LOAD SAFETY WORD STATUS
  // ============================================================

  useEffect(() => {
    loadStatus();

    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  async function loadStatus() {
    try {
      const response = await getSafetyWordStatus();

      setConfigured(Boolean(response?.configured));
    } catch (error) {
      setStatus(
        error?.response?.data?.detail ||
          "Unable to load safety word status."
      );
    } finally {
      setLoading(false);
    }
  }

  // ============================================================
  // SAVE SAFETY WORD
  // ============================================================

  async function handleSave(event) {
    event.preventDefault();

    const value = word.trim();

    if (!value) {
      setStatus("Please enter a safety word.");
      return;
    }

    setSaving(true);
    setStatus("");

    try {
      await saveSafetyWord(value);

      setConfigured(true);
      setWord("");
      setStatus("Safety word saved successfully.");
    } catch (error) {
      setStatus(
        error?.response?.data?.detail ||
          "Unable to save the safety word."
      );
    } finally {
      setSaving(false);
    }
  }

  // ============================================================
  // VOICE RESULT
  // ============================================================

  async function handleVoiceResult(transcript) {
    setMessage(transcript);
    setStatus("");

    try {
      const response = await checkSafetyWord(transcript);

      if (response?.detected) {
        setStatus(
          "Safety word detected. Preparing emergency SOS..."
        );

        setSosPreparing(true);

        // Prepare SOS using the existing backend SOS service
        const sosResponse = await prepareSOS(
          "Safety word detected. User requested emergency assistance."
        );

        // Store the prepared SOS information
        sessionStorage.setItem(
          "nari_safety_word_sos",
          JSON.stringify(sosResponse)
        );

        /*
         * Open the SOS page.
         *
         * SOS.jsx will detect that this SOS was triggered
         * through the Safety Word and open its normal
         * confirmation dialog.
         */
        window.location.href = "/sos";
      } else {
        setStatus("Safety word was not detected.");
      }
    } catch (error) {
      setStatus(
        error?.response?.data?.detail ||
          "Unable to check the safety word."
      );
    } finally {
      setSosPreparing(false);
    }
  }

  // ============================================================
  // START / STOP VOICE RECOGNITION
  // ============================================================

  function handleVoice() {
    if (!isVoiceSupported()) {
      setStatus(
        "Voice recognition is not supported in this browser."
      );

      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    setStatus("");

    recognitionRef.current = startVoiceRecognition({
      language: "en-IN",

      onStart: () => {
        setListening(true);
      },

      onResult: (transcript) => {
        handleVoiceResult(transcript);
      },

      onError: (error) => {
        setStatus(error);
        setListening(false);
      },

      onEnd: () => {
        setListening(false);
      },
    });
  }

  // ============================================================
  // TEXT TO SPEECH
  // ============================================================

  function speakSafetyWordInfo() {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
      "Your safety word is a private word that you can use when you need help."
    );

    utterance.lang = "en-IN";

    window.speechSynthesis.speak(utterance);
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
          <KeyRound size={25} color="#e11d48" />
        </div>

        <h1
          style={{
            margin: "0 0 7px",
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          Safety Word
        </h1>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          Set a private word that can be recognized when you
          need assistance.
        </p>
      </div>

      {/* STATUS */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "16px 18px",
          marginBottom: "20px",
          borderRadius: "15px",
          background: configured ? "#f0fdf4" : "#fff7ed",
          border: configured
            ? "1px solid #bbf7d0"
            : "1px solid #fed7aa",
        }}
      >
        {configured ? (
          <CheckCircle2 size={21} color="#16a34a" />
        ) : (
          <AlertCircle size={21} color="#ea580c" />
        )}

        <div>
          <strong
            style={{
              display: "block",
              fontSize: "14px",
              color: configured ? "#166534" : "#9a3412",
            }}
          >
            {loading
              ? "Checking status..."
              : configured
              ? "Safety word is active"
              : "Safety word is not configured"}
          </strong>

          <span
            style={{
              display: "block",
              marginTop: "3px",
              fontSize: "12px",
              color: "#64748b",
            }}
          >
            {configured
              ? "You can test it using voice recognition below."
              : "Create one below to enable safety word detection."}
          </span>
        </div>
      </div>

      {/* SET SAFETY WORD */}

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "20px",
          padding: "24px",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            margin: "0 0 7px",
            fontSize: "18px",
            color: "#0f172a",
          }}
        >
          {configured
            ? "Update Safety Word"
            : "Create Safety Word"}
        </h2>

        <p
          style={{
            margin: "0 0 18px",
            fontSize: "13px",
            color: "#64748b",
            lineHeight: 1.6,
          }}
        >
          Choose a simple word or phrase that is easy for you
          to remember but difficult for others to guess.
        </p>

        <form onSubmit={handleSave}>
          <input
            type="text"
            value={word}
            onChange={(event) => {
              setWord(event.target.value);
              setStatus("");
            }}
            placeholder="Enter your private safety word"
            disabled={saving}
            style={{
              width: "100%",
              height: "48px",
              padding: "0 14px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              background: "#f8fafc",
              color: "#0f172a",
              fontSize: "14px",
              outline: "none",
              marginBottom: "14px",
            }}
          />

          <LoadingButton
            type="submit"
            loading={saving}
            disabled={saving || !word.trim()}
            style={{
              width: "100%",
              height: "46px",
              border: "none",
              borderRadius: "12px",
              background:
                saving || !word.trim()
                  ? "#cbd5e1"
                  : "#e11d48",
              color: "#ffffff",
              fontWeight: "700",
              cursor:
                saving || !word.trim()
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {!saving && (
              <>
                <ShieldCheck size={17} />
                Save Safety Word
              </>
            )}
          </LoadingButton>
        </form>
      </div>

      {/* VOICE DETECTION */}

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
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "15px",
          }}
        >
          <div>
            <h2
              style={{
                margin: "0 0 7px",
                fontSize: "18px",
                color: "#0f172a",
              }}
            >
              Voice Safety Word Detection
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: "13px",
                color: "#64748b",
                lineHeight: 1.6,
              }}
            >
              Speak naturally. Nari-Shield converts your speech
              to text and checks whether your configured safety
              word is present.
            </p>
          </div>

          <button
            type="button"
            onClick={speakSafetyWordInfo}
            style={{
              width: "40px",
              height: "40px",
              flexShrink: 0,
              borderRadius: "11px",
              border: "1px solid #e2e8f0",
              background: "#f8fafc",
              color: "#475569",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            title="Listen"
          >
            <Volume2 size={18} />
          </button>
        </div>

        {/* MICROPHONE */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "22px",
            padding: "15px",
            borderRadius: "14px",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
          }}
        >
          <button
            type="button"
            onClick={handleVoice}
            disabled={!configured || sosPreparing}
            style={{
              width: "50px",
              height: "50px",
              flexShrink: 0,
              borderRadius: "15px",
              border: "none",
              background: listening
                ? "#dc2626"
                : "#e11d48",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor:
                configured && !sosPreparing
                  ? "pointer"
                  : "not-allowed",
              opacity:
                configured && !sosPreparing ? 1 : 0.5,
            }}
            title={
              listening
                ? "Stop listening"
                : "Start voice detection"
            }
          >
            <Mic size={22} />
          </button>

          <div style={{ minWidth: 0 }}>
            <strong
              style={{
                display: "block",
                fontSize: "13px",
                color: "#334155",
              }}
            >
              {sosPreparing
                ? "Preparing emergency SOS..."
                : listening
                ? "Listening..."
                : "Tap the microphone to speak"}
            </strong>

            <span
              style={{
                display: "block",
                marginTop: "4px",
                fontSize: "12px",
                color: "#94a3b8",
              }}
            >
              {message || "No voice input yet"}
            </span>
          </div>
        </div>

        {/* STATUS MESSAGE */}

        {status && (
          <div
            style={{
              marginTop: "15px",
              padding: "12px 14px",
              borderRadius: "12px",
              background:
                sosPreparing ? "#fff7ed" : "#f8fafc",
              border: "1px solid #e2e8f0",
              color: "#475569",
              fontSize: "13px",
              lineHeight: 1.5,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {sosPreparing && (
              <ShieldAlert
                size={17}
                color="#dc2626"
              />
            )}

            {status}
          </div>
        )}
      </div>
    </div>
  );
}