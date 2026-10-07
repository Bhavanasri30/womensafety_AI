import { useEffect, useRef, useState } from "react";
import { Bot, Mic, Send, User, Volume2 } from "lucide-react";
import { sendChatMessage } from "../services/safety";
import { startVoiceRecognition, isVoiceSupported } from "../services/voice";
import LanguageSelector from "../components/LanguageSelector";
import ApiError from "../components/ApiError";
import LoadingButton from "../components/LoadingButton";

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello. I’m your Nari-Shield safety assistant. Tell me what is happening, and I’ll provide practical safety guidance.",
    },
  ]);

  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState("english");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function handleSend() {
    const text = message.trim();

    if (!text || loading) {
      return;
    }

    setError("");

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        text,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await sendChatMessage(text, language);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text:
            response?.answer ||
            "I could not generate a response right now. Please try again.",
          sources: response?.sources || [],
          emergency: response?.emergency || false,
        },
      ]);
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          "Unable to connect to the safety assistant. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleSend();
  }

  function handleVoice() {
    if (!isVoiceSupported()) {
      setError("Voice recognition is not supported in this browser.");
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    setError("");

    recognitionRef.current = startVoiceRecognition({
      language:
        language === "telugu"
          ? "te-IN"
          : language === "hindi"
            ? "hi-IN"
            : "en-IN",

      onStart: () => {
        setListening(true);
      },

      onResult: (transcript) => {
        setMessage((previous) =>
          previous ? `${previous} ${transcript}` : transcript
        );
      },

      onError: (voiceError) => {
        setError(voiceError);
        setListening(false);
      },

      onEnd: () => {
        setListening(false);
      },
    });
  }

  function speakText(text) {
    if (!window.speechSynthesis) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang =
      language === "telugu"
        ? "te-IN"
        : language === "hindi"
          ? "hi-IN"
          : "en-IN";

    window.speechSynthesis.speak(utterance);
  }

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        height: "calc(100vh - 110px)",
        minHeight: "600px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          padding: "18px 20px",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "18px 18px 0 0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "14px",
              background: "#fff1f2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Bot size={23} color="#e11d48" />
          </div>

          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "18px",
                color: "#0f172a",
              }}
            >
              AI Safety Assistant
            </h1>

            <p
              style={{
                margin: "3px 0 0",
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              Private safety guidance powered by RAG
            </p>
          </div>
        </div>

        <LanguageSelector
          value={language}
          onChange={setLanguage}
        />
      </div>

      {/* Error */}
      {error && (
        <div style={{ padding: "12px 20px 0" }}>
          <ApiError
            message={error}
            onRetry={() => setError("")}
          />
        </div>
      )}

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px 20px",
          background: "#f8fafc",
          borderLeft: "1px solid #e2e8f0",
          borderRight: "1px solid #e2e8f0",
        }}
      >
        {messages.map((item, index) => {
          const isUser = item.role === "user";

          return (
            <div
              key={`${item.role}-${index}`}
              style={{
                display: "flex",
                justifyContent: isUser ? "flex-end" : "flex-start",
                marginBottom: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: isUser ? "row-reverse" : "row",
                  alignItems: "flex-start",
                  gap: "10px",
                  maxWidth: "78%",
                }}
              >
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    flexShrink: 0,
                    borderRadius: "11px",
                    background: isUser ? "#e11d48" : "#e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isUser ? (
                    <User size={17} color="#ffffff" />
                  ) : (
                    <Bot size={17} color="#475569" />
                  )}
                </div>

                <div>
                  <div
                    style={{
                      padding: "13px 15px",
                      borderRadius: isUser
                        ? "16px 5px 16px 16px"
                        : "5px 16px 16px 16px",
                      background: isUser ? "#e11d48" : "#ffffff",
                      color: isUser ? "#ffffff" : "#334155",
                      border: isUser
                        ? "none"
                        : "1px solid #e2e8f0",
                      fontSize: "14px",
                      lineHeight: 1.65,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {item.text}
                  </div>

                  {!isUser && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginTop: "7px",
                        paddingLeft: "4px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => speakText(item.text)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          border: "none",
                          background: "transparent",
                          color: "#64748b",
                          fontSize: "11px",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        <Volume2 size={13} />
                        Listen
                      </button>

                      {item.emergency && (
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: "700",
                            color: "#dc2626",
                          }}
                        >
                          Emergency guidance
                        </span>
                      )}
                    </div>
                  )}

                  {!isUser &&
                    Array.isArray(item.sources) &&
                    item.sources.length > 0 && (
                      <div
                        style={{
                          marginTop: "9px",
                          padding: "10px 12px",
                          borderRadius: "10px",
                          background: "#f1f5f9",
                          fontSize: "11px",
                          color: "#64748b",
                        }}
                      >
                        <strong
                          style={{
                            color: "#475569",
                          }}
                        >
                          Sources
                        </strong>

                        <div style={{ marginTop: "4px" }}>
                          {item.sources.map((source, sourceIndex) => (
                            <div key={sourceIndex}>
                              {typeof source === "string"
                                ? source
                                : source?.source ||
                                  source?.title ||
                                  `Source ${sourceIndex + 1}`}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "11px",
                background: "#e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Bot size={17} />
            </div>

            AI assistant is thinking...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Composer */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "15px",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderTop: "none",
          borderRadius: "0 0 18px 18px",
        }}
      >
        <button
          type="button"
          onClick={handleVoice}
          disabled={loading}
          title={listening ? "Stop listening" : "Speak"}
          style={{
            width: "46px",
            height: "46px",
            flexShrink: 0,
            borderRadius: "13px",
            border: "1px solid #e2e8f0",
            background: listening ? "#fff1f2" : "#f8fafc",
            color: listening ? "#e11d48" : "#475569",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          <Mic size={20} />
        </button>

        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={
            listening
              ? "Listening..."
              : "Describe what is happening..."
          }
          disabled={loading}
          style={{
            flex: 1,
            height: "46px",
            minWidth: 0,
            borderRadius: "13px",
            border: "1px solid #e2e8f0",
            background: "#f8fafc",
            padding: "0 14px",
            outline: "none",
            color: "#0f172a",
            fontSize: "14px",
          }}
        />

        <LoadingButton
          type="submit"
          loading={loading}
          disabled={!message.trim() || loading}
          style={{
            width: "46px",
            height: "46px",
            flexShrink: 0,
            border: "none",
            borderRadius: "13px",
            background:
              !message.trim() || loading ? "#cbd5e1" : "#e11d48",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor:
              !message.trim() || loading
                ? "not-allowed"
                : "pointer",
            padding: 0,
          }}
        >
          {!loading && <Send size={19} />}
        </LoadingButton>
      </form>
    </div>
  );
}