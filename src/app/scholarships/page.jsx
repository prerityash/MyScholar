// ==============================================================================
// [Unit I: Routing and Navigation - File-based Routing (/scholarships)]
// [Unit II: Rendering Strategies - Incremental Static Regeneration (ISR)]
// [Unit II: Data Fetching - Server Components & Server-side Data Fetching]
// ==============================================================================

import Link from "next/link";
import { ScholarshipDB } from "@/lib/db";

// [Unit II: Rendering Strategies - Incremental Static Regeneration (ISR)]
// Revalidate page content every 60 seconds
export const revalidate = 60;

// [Unit II: Data Fetching - Server Components (Async Server Component)]
export default async function ScholarshipsPage() {
  // [Unit II: Server-side Data Fetching directly from Database Layer]
  const scholarships = await ScholarshipDB.findAll();

  return (
    <main className="container page-content">
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 className="hero-title" style={{ fontSize: "2rem", marginBottom: 8 }}>
              Verified Scholarship Directory
            </h1>
            <p className="hero-subtitle" style={{ fontSize: "1rem" }}>
              Pre-vetted educational grants and government funding opportunities.
            </p>
          </div>
          <Link href="/verify" className="btn btn-primary">
            🔍 Verify New Listing
          </Link>
        </div>

        {/* Syllabus Tag Banner */}
        <div style={{ marginTop: 12, fontSize: "0.8125rem", color: "var(--text-muted)", padding: "8px 12px", background: "var(--bg-secondary)", borderRadius: "8px", border: "1px dashed var(--border-color)" }}>
          📚 <strong>Syllabus Focus:</strong> [Unit I: File-based Routing] · [Unit II: Server Components & Server-side Data Fetching] · [Unit II: ISR (revalidate = 60s)]
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
        {scholarships.map((s) => (
          <div key={s.id} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span className={`badge ${s.status === "verified" ? "badge-safe" : "badge-danger"}`}>
                  {s.status === "verified" ? "✓ Verified Legit" : "⚠ Flagged"}
                </span>
                <span style={{ fontSize: "0.8125rem", color: "var(--accent-green)", fontWeight: 600 }}>
                  {s.amount}
                </span>
              </div>

              <h3 style={{ fontSize: "1.125rem", marginBottom: 8 }}>{s.name}</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: 8 }}>
                🏛️ {s.organizationName}
              </p>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: 16 }}>
                {s.description.length > 120 ? s.description.substring(0, 120) + "…" : s.description}
              </p>
            </div>

            {/* [Unit I: Navigation - Next.js Link to Dynamic Route] */}
            <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Deadline: {s.deadline}
              </span>
              <Link
                href={`/scholarships/${s.id}`}
                className="btn btn-ghost"
                style={{ padding: "6px 12px", fontSize: "0.8125rem" }}
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
