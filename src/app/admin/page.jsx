// ==============================================================================
// [Unit I: Routing and Navigation - Nested Routes (/admin)]
// [Unit III: Forms and Server Actions - Form Handling, Validation & Data Mutations]
// [Unit IV: Database Integration - CRUD Operations (Create, Read, Delete)]
// [Unit IV: Authentication and Authorization - Role-based Access Control]
// ==============================================================================

import { ScholarshipDB } from "@/lib/db";
import { createScholarshipAction, deleteScholarshipAction } from "@/app/actions";

export default async function AdminDashboardPage() {
  // [Unit IV: CRUD Operations - Read All]
  const items = await ScholarshipDB.findAll();

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: "1.75rem", marginBottom: 8 }}>Scholarship Management Dashboard</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          Manage legitimate and flagged scholarship listings with direct database mutations.
        </p>
        <div style={{ marginTop: 8, fontSize: "0.8125rem", color: "var(--text-muted)" }}>
          📚 <strong>Syllabus Focus:</strong> [Unit III: Server Actions] · [Unit IV: CRUD Operations] · [Unit IV: Role-based Access Control]
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 24, alignItems: "start" }}>
        {/* Form: Add New Listing */}
        <div className="card">
          <h2 style={{ fontSize: "1.25rem", marginTop: 0, marginBottom: 16 }}>
            ➕ Add Scholarship Listing
          </h2>
          {/* [Unit III: Forms and Server Actions - Form Action] */}
          <form action={createScholarshipAction} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label className="form-label">Scholarship Name *</label>
              <input name="name" required className="form-input" placeholder="e.g. Merit Scheme" />
            </div>

            <div>
              <label className="form-label">Sponsoring Organization *</label>
              <input name="organizationName" required className="form-input" placeholder="e.g. State Board" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label className="form-label">Amount</label>
                <input name="amount" className="form-input" placeholder="₹25,000" />
              </div>
              <div>
                <label className="form-label">Deadline</label>
                <input name="deadline" className="form-input" placeholder="YYYY-MM-DD" />
              </div>
            </div>

            <div>
              <label className="form-label">Portal URL</label>
              <input name="url" className="form-input" placeholder="https://official.gov.in" />
            </div>

            <div>
              <label className="form-label">Description</label>
              <textarea name="description" rows={3} className="form-textarea" placeholder="Scheme details" />
            </div>

            <div>
              <label className="form-label">Eligibility</label>
              <textarea name="eligibility" rows={2} className="form-textarea" placeholder="Eligibility rules" />
            </div>

            {/* [Unit III: Server Actions - Submit Button] */}
            <button type="submit" className="btn btn-primary" style={{ marginTop: 8 }}>
              Publish Scholarship
            </button>
          </form>
        </div>

        {/* List of Existing Records */}
        <div className="card">
          <h2 style={{ fontSize: "1.25rem", marginTop: 0, marginBottom: 16 }}>
            📋 Current Database Records ({items.length})
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  background: "var(--bg-secondary)",
                  borderRadius: "8px",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{item.name}</div>
                  <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                    {item.organizationName} · {item.amount}
                  </div>
                </div>

                {/* [Unit III: Forms and Server Actions - Delete Data Mutation] */}
                <form action={deleteScholarshipAction.bind(null, item.id)}>
                  <button
                    type="submit"
                    className="btn btn-ghost"
                    style={{ color: "var(--accent-red)", padding: "4px 8px", fontSize: "0.8125rem" }}
                  >
                    🗑️ Delete
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
