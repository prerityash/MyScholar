// ==============================================================================
// [Unit I: Routing and Navigation - Error and Loading UI (error.jsx)]
// Must be a Client Component to catch runtime errors in child route segments.
// ==============================================================================

"use client";

import { useEffect } from "react";

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    console.error("Captured by Next.js Error UI boundary:", error);
  }, [error]);

  return (
    <div className="container" style={{ padding: "80px 24px", textAlign: "center", maxWidth: 600 }}>
      <div style={{ fontSize: "3rem", marginBottom: 16 }}>⚠️</div>
      <h2 style={{ marginBottom: 12 }}>Something went wrong!</h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: 24, fontSize: "0.95rem" }}>
        {error?.message || "An unexpected error occurred while processing this request."}
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button className="btn btn-primary" onClick={() => reset()}>
          🔄 Try Again
        </button>
        <a href="/" className="btn btn-ghost">
          Return Home
        </a>
      </div>
      <p style={{ marginTop: 20, color: "var(--text-muted)", fontSize: "0.8125rem" }}>
        [Unit I: Error and Loading UI - React Error Boundary]
      </p>
    </div>
  );
}
