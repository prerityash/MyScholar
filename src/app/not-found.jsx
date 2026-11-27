// ==============================================================================
// [Unit I: Routing and Navigation - Error and Loading UI (not-found.jsx)]
// Rendered when notFound() is triggered or a route does not match.
// ==============================================================================

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container" style={{ padding: "80px 24px", textAlign: "center", maxWidth: 600 }}>
      <div style={{ fontSize: "4rem", fontWeight: 800, color: "var(--accent-red)", marginBottom: 8 }}>
        404
      </div>
      <h2 style={{ marginBottom: 12 }}>Resource Not Found</h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>
        The scholarship listing or page you requested could not be found.
      </p>
      <Link href="/" className="btn btn-primary">
        ← Back to MyScholar Home
      </Link>
      <p style={{ marginTop: 20, color: "var(--text-muted)", fontSize: "0.8125rem" }}>
        [Unit I: Error and Loading UI - Custom not-found.jsx]
      </p>
    </div>
  );
}
