import { Component } from "react";
import { AlertTriangle, RefreshCw, ShieldCheck } from "lucide-react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            background: "#f7f9fc",
            fontFamily: "Inter, Arial, sans-serif",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "36px",
              background: "#ffffff",
              borderRadius: "24px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 15px 45px rgba(15, 23, 42, 0.08)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "68px",
                height: "68px",
                margin: "0 auto 20px",
                borderRadius: "20px",
                background: "#fff1f2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AlertTriangle size={34} color="#e11d48" />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              <ShieldCheck size={20} color="#e11d48" />

              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "800",
                  color: "#e11d48",
                }}
              >
                Nari-Shield AI
              </span>
            </div>

            <h1
              style={{
                margin: "0 0 10px",
                fontSize: "23px",
                fontWeight: "800",
                color: "#0f172a",
              }}
            >
              Something went wrong
            </h1>

            <p
              style={{
                margin: "0 auto 24px",
                maxWidth: "380px",
                fontSize: "14px",
                lineHeight: 1.6,
                color: "#64748b",
              }}
            >
              An unexpected error occurred. Please reload the application and
              try again.
            </p>

            <button
              onClick={this.handleReload}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "13px 22px",
                border: "none",
                borderRadius: "12px",
                background: "#e11d48",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              <RefreshCw size={18} />
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}