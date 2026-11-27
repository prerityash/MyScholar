"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function AuthModal() {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      if (isRegister) {
        await register(name, email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async () => {
    setError("");
    setLoading(true);
    try {
      // Try login first with demo account
      try {
        await login("student@myscholar.edu", "student123");
      } catch {
        // If not created yet, register it automatically
        await register("Scholar Student", "student@myscholar.edu", "student123");
      }
    } catch (err) {
      setError(err.message || "Failed to log in with demo account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay-backdrop">
      <div className="auth-modal-card">
        {/* Top-Right Light Mode Toggle */}
        <div style={{ position: "absolute", top: 16, right: 16 }}>
          <ThemeToggle />
        </div>

        {/* Header with Logo */}
        <div className="auth-card-header">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="MyScholar Logo"
            className="brand-logo"
            style={{ width: 48, height: 48, margin: "0 auto 12px" }}
          />
          <h2 className="auth-card-title">
            {isRegister ? "Join MyScholar" : "Welcome Back"}
          </h2>
          <p className="auth-card-subtitle">
            {isRegister
              ? "Create your account to verify scholarships safely"
              : "Sign in with yourcredentials to unlock the portal"}
          </p>
        </div>

        {/* Tab switch */}
        <div className="auth-tab-switch">
          <button
            type="button"
            className={`auth-tab-btn ${!isRegister ? "active" : ""}`}
            onClick={() => {
              setIsRegister(false);
              setError("");
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${isRegister ? "active" : ""}`}
            onClick={() => {
              setIsRegister(true);
              setError("");
            }}
          >
            Create Account
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="auth-error-banner">
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {isRegister && (
            <div className="form-group" style={{ marginBottom: 14 }}>
              <label className="form-label" style={{ fontSize: "0.8125rem" }}>
                Full Name
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
          )}

          <div className="form-group" style={{ marginBottom: 14 }}>
            <label className="form-label" style={{ fontSize: "0.8125rem" }}>
              Email Address *
            </label>
            <input
              type="email"
              required
              className="form-input"
              placeholder="student@example.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 20 }}>
            <label className="form-label" style={{ fontSize: "0.8125rem" }}>
              Password *
            </label>
            <input
              type="password"
              required
              minLength={6}
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={isRegister ? "new-password" : "current-password"}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", padding: "12px 16px" }}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" /> Authenticating...
              </>
            ) : isRegister ? (
              "Create Account & Unlock"
            ) : (
              "Sign In to Unlock Portal"
            )}
          </button>
        </form>

        {/* Demo Account Button */}
        <div style={{ marginTop: 18, borderTop: "1px solid var(--border-color)", paddingTop: 14 }}>
          <button
            type="button"
            onClick={handleQuickDemo}
            disabled={loading}
            className="btn btn-ghost"
            style={{
              width: "100%",
              justifyContent: "center",
              fontSize: "0.8125rem",
              padding: "8px 12px",
              color: "var(--accent-blue)",
              border: "1px dashed var(--accent-blue)",
            }}
          >
            ⚡ 1-Click Demo Student Login
          </button>
        </div>
      </div>
    </div>
  );
}
