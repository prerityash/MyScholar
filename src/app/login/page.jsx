// ==============================================================================
// [Unit I: Routing and Navigation - File-based Routing (/login)]
// [Unit III: Forms and Server Actions - Form Handling with Server Action]
// [Unit IV: Authentication and Authorization - Authentication Concepts & Session Management]
// ==============================================================================

"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions";

export default function LoginPage() {
  // [Unit III: Forms and Server Actions - Form Action State Hook]
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <main className="container page-content" style={{ maxWidth: 440, margin: "40px auto" }}>
      <div className="card">
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: 8 }}>Sign In to MyScholar</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            Enter credentials to access protected routes and roles.
          </p>
        </div>

        {/* Demo Credentials Helper Box */}
        <div
          style={{
            padding: "12px",
            background: "var(--bg-secondary)",
            borderRadius: "8px",
            fontSize: "0.8125rem",
            marginBottom: 20,
            border: "1px dashed var(--border-color)",
          }}
        >
          <div><strong>🔑 Demo Accounts:</strong></div>
          <div>• Admin: <code>admin</code> / <code>admin123</code> (Protected Management)</div>
          <div>• Student: <code>student</code> / <code>student123</code> (Directory Access)</div>
        </div>

        {/* [Unit III: Forms and Server Actions - Form Handling] */}
        <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label className="form-label">Username</label>
            <input
              name="username"
              required
              className="form-input"
              placeholder="e.g. admin or student"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              required
              className="form-input"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {state?.error && (
            <div style={{ color: "var(--accent-red)", fontSize: "0.875rem" }}>
              ⚠️ {state.error}
            </div>
          )}

          <button type="submit" className="btn btn-primary" disabled={isPending}>
            {isPending ? "Authenticating…" : "Sign In"}
          </button>
        </form>

        <p style={{ marginTop: 20, textAlign: "center", color: "var(--text-muted)", fontSize: "0.75rem" }}>
          [Unit IV: Authentication & Session Management with HTTP-only Cookies]
        </p>
      </div>
    </main>
  );
}
