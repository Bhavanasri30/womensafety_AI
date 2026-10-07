import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  User,
  Mail,
  LockKeyhole,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { registerUser } from "../services/auth";
import LoadingButton from "../components/LoadingButton";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await registerUser(
        form.name.trim(),
        form.email.trim(),
        form.password
      );

      navigate("/login", {
        replace: true,
        state: {
          message: "Account created successfully. Please sign in.",
        },
      });
    } catch (err) {
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Registration failed. Please try again.";

      setError(
        typeof message === "string"
          ? message
          : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background:
          "linear-gradient(135deg, #fff1f5 0%, #f8fafc 50%, #eef2ff 100%)",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "470px",
          background: "#ffffff",
          borderRadius: "24px",
          padding: "38px",
          boxShadow: "0 20px 60px rgba(15, 23, 42, 0.12)",
          border: "1px solid #f1f5f9",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "20px",
              background: "#e11d48",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 25px rgba(225, 29, 72, 0.25)",
              marginBottom: "16px",
            }}
          >
            <ShieldCheck size={34} color="#ffffff" strokeWidth={2} />
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "800",
              color: "#0f172a",
            }}
          >
            Create Account
          </h1>

          <p
            style={{
              margin: "8px 0 0",
              color: "#64748b",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            Start using Nari-Shield AI safely
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              padding: "12px 14px",
              marginBottom: "20px",
              borderRadius: "12px",
              background: "#fff1f2",
              border: "1px solid #fecdd3",
              color: "#be123c",
              fontSize: "13px",
              lineHeight: 1.5,
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
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
                placeholder="Enter your full name"
                autoComplete="name"
                disabled={loading}
                style={{
                  width: "100%",
                  height: "48px",
                  padding: "0 14px 0 44px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  outline: "none",
                  background: "#f8fafc",
                  color: "#0f172a",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
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
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                disabled={loading}
                style={{
                  width: "100%",
                  height: "48px",
                  padding: "0 14px 0 44px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  outline: "none",
                  background: "#f8fafc",
                  color: "#0f172a",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "700",
                color: "#334155",
              }}
            >
              Password
            </label>

            <div style={{ position: "relative" }}>
              <LockKeyhole
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
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                autoComplete="new-password"
                disabled={loading}
                style={{
                  width: "100%",
                  height: "48px",
                  padding: "0 14px 0 44px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  outline: "none",
                  background: "#f8fafc",
                  color: "#0f172a",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: "22px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "700",
                color: "#334155",
              }}
            >
              Confirm Password
            </label>

            <div style={{ position: "relative" }}>
              <CheckCircle2
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
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                autoComplete="new-password"
                disabled={loading}
                style={{
                  width: "100%",
                  height: "48px",
                  padding: "0 14px 0 44px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  outline: "none",
                  background: "#f8fafc",
                  color: "#0f172a",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>

          {/* Register */}
          <LoadingButton
            type="submit"
            loading={loading}
            disabled={loading}
            style={{
              width: "100%",
              height: "50px",
              borderRadius: "12px",
              border: "none",
              background: "#e11d48",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 8px 20px rgba(225, 29, 72, 0.2)",
            }}
          >
            {!loading && (
              <>
                Create Account
                <ArrowRight size={18} />
              </>
            )}
          </LoadingButton>
        </form>

        {/* Login */}
        <div
          style={{
            marginTop: "24px",
            paddingTop: "22px",
            borderTop: "1px solid #f1f5f9",
            textAlign: "center",
            fontSize: "14px",
            color: "#64748b",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#e11d48",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            Sign In
          </Link>
        </div>

        {/* Security */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "7px",
            marginTop: "20px",
            color: "#94a3b8",
            fontSize: "12px",
          }}
        >
          <ShieldCheck size={15} />
          Your information is securely protected
        </div>
      </div>
    </div>
  );
}