import { LoaderCircle } from "lucide-react";

export default function LoadingButton({
  children,
  loading = false,
  disabled = false,
  onClick,
  type = "button",
  style = {},
}) {
  const isDisabled = loading || disabled;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      style={{
        width: "100%",
        minHeight: "48px",
        border: "none",
        borderRadius: "12px",
        background: isDisabled ? "#fda4af" : "#e11d48",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "9px",
        fontSize: "14px",
        fontWeight: "700",
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.85 : 1,
        transition: "0.2s ease",
        ...style,
      }}
    >
      {loading && (
        <LoaderCircle
          size={18}
          style={{
            animation: "nariButtonSpin 0.8s linear infinite",
          }}
        />
      )}

      {loading ? "Please wait..." : children}

      <style>
        {`
          @keyframes nariButtonSpin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </button>
  );
}