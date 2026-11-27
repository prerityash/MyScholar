// ==============================================================================
// [Unit IV: Authentication and Authorization - Authorization & RBAC]
// UI displayed when a non-admin role tries to access protected /admin routes.
// ==============================================================================

import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="container page-content" style={{ textAlign: "center", maxWidth: 500 }}>
      <div className="card">
        <div style={{ fontSize: "3rem", marginBottom: 12 }}>🚫</div>
        <h1 style={{ fontSize: "1.5rem", marginBottom: 8 }}>Access Denied (403)</h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: 20, fontSize: "0.95rem" }}>
          Your current user role does not have authorization to view this protected resource.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link href="/login" className="btn btn-primary">
            Sign In with Admin Account
          </Link>
          <Link href="/" className="btn btn-ghost">
            Back to Home
          </Link>
        </div>
        <p style={{ marginTop: 20, color: "var(--text-muted)", fontSize: "0.75rem" }}>
          [Unit IV: Role-based Access Control (RBAC) & Protected Routes]
        </p>
      </div>
    </main>
  );
}
