import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Save,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getCurrentUser } from "../services/auth";
import LoadingButton from "../components/LoadingButton";

export default function Profile() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    setFetching(true);
    setError("");

    try {
      const currentUser = await getCurrentUser();

      setForm({
        name: currentUser?.name || "",
        email: currentUser?.email || "",
      });
    } catch (err) {
      setForm({
        name: user?.name || "",
        email: user?.email || "",
      });

      setError(
        err?.response?.data?.detail ||
          "Unable to load your latest profile information."
      );
    } finally {
      setFetching(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSuccess("");
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    /*
      The current backend does not provide a profile-update endpoint.
      This page therefore validates and displays the current profile,
      without sending an unsupported request to the backend.
    */

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      setSuccess(
        "Profile details are ready. Profile update API is not available in the current backend."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: "760px",
        margin: "0 auto",
        paddingBottom: "40px",
      }}
    >
      {/* Header */}
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
          <User size={25} color="#e11d48" />
        </div>

        <h1
          style={{
            margin: "0 0 7px",
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          Profile
        </h1>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          View your Nari-Shield account information.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            padding: "13px 15px",
            marginBottom: "18px",
            borderRadius: "13px",
            background: "#fff1f2",
            border: "1px solid #fecdd3",
            color: "#be123c",
            fontSize: "13px",
            lineHeight: 1.5,
          }}
        >
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Success */}
      {success && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "9px",
            padding: "13px 15px",
            marginBottom: "18px",
            borderRadius: "13px",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            color: "#166534",
            fontSize: "13px",
            lineHeight: 1.5,
          }}
        >
          <CheckCircle2 size={18} />
          <span>{success}</span>
        </div>
      )}

      {/* Profile card */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "22px",
          padding: "26px",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            paddingBottom: "22px",
            marginBottom: "22px",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "20px",
              background: "#e11d48",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "23px",
              fontWeight: "800",
            }}
          >
            {form.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <strong
              style={{
                display: "block",
                fontSize: "17px",
                color: "#0f172a",
              }}
            >
              {form.name || "User"}
            </strong>

            <span
              style={{
                display: "block",
                marginTop: "4px",
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              Nari-Shield account
            </span>
          </div>
        </div>

        {fetching ? (
          <div
            style={{
              padding: "35px",
              textAlign: "center",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Loading profile...
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#334155",
                }}
              >
                Full Name
              </label>

              <div style={{ position: "relative" }}>
                <User
                  size={18}
                  color="#94a3b8"
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={loading}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: "22px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#334155",
                }}
              >
                Email Address
              </label>

              <div style={{ position: "relative" }}>
                <Mail
                  size={18}
                  color="#94a3b8"
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  disabled
                  style={{
                    ...inputStyle,
                    cursor: "not-allowed",
                    opacity: 0.75,
                  }}
                />
              </div>

              <span
                style={{
                  display: "block",
                  marginTop: "6px",
                  fontSize: "11px",
                  color: "#94a3b8",
                }}
              >
                Email cannot be changed using the current backend.
              </span>
            </div>

            {/* Save */}
            <LoadingButton
              type="submit"
              loading={loading}
              disabled={loading}
              style={{
                width: "100%",
                height: "47px",
                border: "none",
                borderRadius: "12px",
                background: "#e11d48",
                color: "#ffffff",
                fontWeight: "700",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {!loading && (
                <>
                  <Save size={17} />
                  Save Profile
                </>
              )}
            </LoadingButton>
          </form>
        )}
      </div>

      {/* Security note */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
          marginTop: "16px",
          padding: "16px",
          borderRadius: "15px",
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
        }}
      >
        <ShieldCheck
          size={19}
          color="#64748b"
          style={{ flexShrink: 0 }}
        />

        <p
          style={{
            margin: 0,
            fontSize: "12px",
            color: "#64748b",
            lineHeight: 1.6,
          }}
        >
          Your profile is linked to your authenticated Nari-Shield account.
          The current backend provides profile retrieval but does not expose
          a profile-update endpoint.
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  height: "47px",
  padding: "0 14px 0 44px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  background: "#f8fafc",
  color: "#0f172a",
  fontSize: "14px",
  outline: "none",
};