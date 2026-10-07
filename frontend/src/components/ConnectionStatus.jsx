import { useEffect, useState } from "react";
import { Wifi, WifiOff } from "lucide-react";

export default function ConnectionStatus() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (online) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "min(430px, calc(100vw - 30px))",
        padding: "13px 16px",
        borderRadius: "14px",
        background: "#0f172a",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.25)",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <WifiOff size={19} />

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: "13px",
            fontWeight: "700",
          }}
        >
          You're offline
        </div>

        <div
          style={{
            marginTop: "2px",
            fontSize: "11px",
            opacity: 0.75,
          }}
        >
          Some Nari-Shield features may not be available.
        </div>
      </div>

      <Wifi size={17} style={{ opacity: 0.5 }} />
    </div>
  );
}