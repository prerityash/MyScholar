// ==============================================================================
// [Unit I: Routing and Navigation - Dynamic Routes (/scholarships/[id])]
// [Unit II: Data Fetching - Server-side Data Fetching with Route Params]
// [Unit II: Rendering Strategies - Server-Side Rendering (SSR)]
// ==============================================================================

import Link from "next/link";
import { notFound } from "next/navigation";
import { ScholarshipDB } from "@/lib/db";

// [Unit II: Server Components with Dynamic Parameters]
export default async function ScholarshipDetailPage({ params }) {
  // Await params per Next.js 16 conventions
  const { id } = await params;

  // [Unit II: Server-side Data Fetching]
  // [Unit IV: Database CRUD - Read by ID]
  const scholarship = await ScholarshipDB.findById(id);

  // [Unit I: Error and Loading UI - Trigger notFound boundary]
  if (!scholarship) {
    notFound();
  }

  return (
    <main className="container page-content" style={{ maxWidth: 800 }}>
      {/* [Unit I: Navigation - Link to parent route] */}
      <Link href="/scholarships" className="btn btn-ghost" style={{ marginBottom: 20 }}>
        ← Back to Directory
      </Link>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
          <span className={`badge ${scholarship.status === "verified" ? "badge-safe" : "badge-danger"}`}>
            {scholarship.status === "verified" ? "✓ Verified Legitimate" : "⚠ Flagged as Suspicious"}
          </span>
          <span style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--accent-green)" }}>
            {scholarship.amount}
          </span>
        </div>

        <h1 style={{ fontSize: "1.75rem", marginBottom: 8 }}>{scholarship.name}</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", marginBottom: 20 }}>
          🏛️ <strong>Organization:</strong> {scholarship.organizationName}
        </p>

        <div style={{ borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)", padding: "16px 0", margin: "20px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Deadline</div>
            <div style={{ fontWeight: 600 }}>{scholarship.deadline}</div>
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Official Portal</div>
            <div>
              {scholarship.url ? (
                <a href={scholarship.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-blue)" }}>
                  Visit Website ↗
                </a>
              ) : (
                "None specified"
              )}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: "1.125rem", marginBottom: 8 }}>📋 Overview</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{scholarship.description}</p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: "1.125rem", marginBottom: 8 }}>🎓 Eligibility Requirements</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{scholarship.eligibility}</p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: "1.125rem", marginBottom: 8 }}>📝 Application Process</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, whiteSpace: "pre-line" }}>
            {scholarship.applicationProcess}
          </p>
        </div>

        {scholarship.contactEmail && (
          <div style={{ padding: "12px 16px", background: "var(--bg-secondary)", borderRadius: "8px" }}>
            ✉️ <strong>Official Contact:</strong> {scholarship.contactEmail}
          </div>
        )}
      </div>

      <div style={{ marginTop: 16, fontSize: "0.8125rem", color: "var(--text-muted)", textAlign: "center" }}>
        [Unit I: Dynamic Routes - /scholarships/[id]] · [Unit II: Server-side Data Fetching]
      </div>
    </main>
  );
}
