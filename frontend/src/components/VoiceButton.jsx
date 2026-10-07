import { Mic, MicOff } from "lucide-react";
import { useState } from "react";
import {
  isVoiceSupported,
  startVoiceRecognition,
  stopVoiceRecognition,
} from "../services/voice";

export default function VoiceButton({
  language = "en-IN",
  onResult,
  onError,
  size = "medium",
}) {
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const dimensions =
    size === "small"
      ? { width: 40, height: 40, icon: 18 }
      : { width: 48, height: 48, icon: 21 };

  function handleVoice() {
    if (!isVoiceSupported()) {
      onError?.("Voice recognition is not supported in this browser.");
      return;
    }

    if (listening) {
      stopVoiceRecognition(recognition);
      setRecognition(null);
      setListening(false);
      return;
    }

    const instance = startVoiceRecognition({
      language,

      onStart: () => {
        setListening(true);
      },

      onResult: (text) => {
        onResult?.(text);
      },

      onEnd: () => {
        setListening(false);
        setRecognition(null);
      },

      onError: (error) => {
        setListening(false);
        setRecognition(null);
        onError?.(error);
      },
    });

    setRecognition(instance);
  }

  return (
    <button
      type="button"
      onClick={handleVoice}
      aria-label={listening ? "Stop voice input" : "Start voice input"}
      title={listening ? "Stop listening" : "Voice input"}
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        borderRadius: "50%",
        border: listening
          ? "2px solid #e11d48"
          : "1px solid #e2e8f0",
        background: listening ? "#fff1f2" : "#ffffff",
        color: listening ? "#e11d48" : "#475569",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        flexShrink: 0,
        transition: "all 0.2s ease",
        boxShadow: listening
          ? "0 0 0 5px rgba(225, 29, 72, 0.08)"
          : "none",
      }}
    >
      {listening ? (
        <MicOff size={dimensions.icon} />
      ) : (
        <Mic size={dimensions.icon} />
      )}
    </button>
  );
}