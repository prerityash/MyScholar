// ==============================================================================
// [Unit I: Routing and Navigation - Nested Routes & Layouts (/admin/layout.jsx)]
// [Unit IV: Authentication and Authorization - Protected Routes Layout]
// ==============================================================================

import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { logoutAction } from "@/app/actions";

export default async function AdminLayout({ children }) {
  // [Unit IV: Session Management - Server-side check]
  const session = await getSession();

  // [Unit IV: Role-based Access Control (RBAC)]
  if (!session || session.role !== "admin") {
    redirect("/login?callbackUrl=/admin");
  }

  return (
    <div className="container page-content">
      {/* Nested Layout Sub-header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 20px",
          background: "var(--bg-secondary)",
          borderRadius: "12px",
          border: "1px solid var(--border-color)",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <span className="badge badge-caution" style={{ marginRight: 8 }}>
            🛡️ Admin Portal
          </span>
          <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            Signed in as: <strong>{session.username}</strong> ({session.role})
          </span>
        </div>

        {/* [Unit III: Forms and Server Actions - Logout Action] */}
        <form action={logoutAction}>
          <button type="submit" className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: "0.8125rem" }}>
            Sign Out
          </button>
        </form>
      </div>

      {/* [Unit I: Nested Route Child Page] */}
      {children}
    </div>
  );
}
