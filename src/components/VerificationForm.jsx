"use client";

import { useState } from "react";
import { scholarshipInputSchema, formatZodError } from "@/lib/schemas";

const INITIAL = {
  name: "",
  url: "",
  organizationName: "",
  description: "",
  amount: "",
  deadline: "",
  eligibility: "",
  contactEmail: "",
  applicationProcess: "",
};

const SAMPLE_PRESETS = [
  {
    label: "🇮🇳 PM-USP Central Sector Scheme (NSP)",
    tag: "Legitimate (DBT)",
    data: {
      name: "PM-USP Central Sector Scheme of Scholarship",
      url: "https://scholarships.gov.in",
      organizationName: "Ministry of Education, Government of India",
      description: "Central Sector Scheme of Scholarship for College and University Students (PM-USP) by the Department of Higher Education to provide financial assistance to meritorious students from economically weaker sections.",
      amount: "₹20,000 / year",
      deadline: "December 31, 2026",
      eligibility: "Students scoring above 80th percentile in relevant stream from Class XII board examinations with annual family income below ₹4.5 lakh.",
      contactEmail: "helpdesk-nsp@gov.in",
      applicationProcess: `1. Visit the official National Scholarship Portal (scholarships.gov.in).
2. Complete One-Time Registration (OTR).
3. Log in using the required credentials.
4. Search for PM-USP Central Sector Scheme of Scholarship.
5. Fill out the application form with academic, personal and bank details.
6. Upload the required documents, including Class 12 marksheet and family income certificate.`,
    },
  },
  {
    label: "🚨 Phishing & Advance Fee Scam",
    tag: "High Risk",
    data: {
      name: "International Academic Excellence Grant",
      url: "http://192.168.1.100/academic-grant.xyz",
      organizationName: "Global Council of Academic Affairs",
      description: "ACT FAST! CONGRATULATIONS YOU HAVE WON! We are giving away $50,000 cash grants! 100% GUARANTEED SCHOLARSHIP. Limited spots left! Don't miss out on this once in a lifetime chance!",
      amount: "$50,000",
      deadline: "Tonight only",
      eligibility: "No GPA requirement, everyone qualifies! No essay required.",
      contactEmail: "scholarshipawards9941@gmail.com",
      applicationProcess: "Requires a nominal $50 processing fee via wire transfer or cryptocurrency to release funds. Must supply Social Security Number and bank account details for verification.",
    },
  },
  {
    label: "⚠️ Typosquatting & Data Harvesting",
    tag: "Suspicious",
    data: {
      name: "FastWebb College Opportunity Fund",
      url: "https://apply.fastwebb-student.buzz/form",
      organizationName: "Federal Scholarship Commission",
      description: "Exclusive opportunity for all current college students. Guaranteed approval if you act now! Only 5 slots remaining.",
      amount: "$15,000",
      deadline: "Immediate",
      eligibility: "All undergraduate students",
      contactEmail: "helpdesk-grants@yahoo.com",
      applicationProcess: "Fill out the simple form with your driver's license number, date of birth, mother's maiden name, and submit a $20 handling fee.",
    },
  },
  {
    label: "✅ NSF Graduate Fellowship (US)",
    tag: "Legitimate",
    data: {
      name: "National Science Foundation Graduate Fellowship",
      url: "https://www.nsfgrfp.org",
      organizationName: "National Science Foundation",
      description: "The NSF Graduate Research Fellowship Program recognizes and supports outstanding graduate students pursuing research-based master's and doctoral degrees in STEM disciplines.",
      amount: "$37,000",
      deadline: "October 24, 2026",
      eligibility: "U.S. citizens, nationals, or permanent residents pursuing research STEM degrees.",
      contactEmail: "info@nsfgrfp.org",
      applicationProcess: "Online application submission including personal statements, transcripts, and 3 academic reference letters via official portal. Completely free to apply.",
    },
  },
];

export default function VerificationForm({ onResult }) {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const loadPreset = (data) => {
    setForm(data);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate form fields with Zod schema
    const validation = scholarshipInputSchema.safeParse(form);
    if (!validation.success) {
      setError(formatZodError(validation.error));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Verification failed");
      }
      onResult(data);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Preset Buttons */}
      <div style={{ marginBottom: 24, padding: "16px", background: "var(--bg-secondary)", borderRadius: "12px", border: "1px dashed var(--border-color)" }}>
        <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
          💡 Try Sample Scholarship Listings:
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {SAMPLE_PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              className="btn btn-ghost"
              style={{ padding: "6px 12px", fontSize: "0.8125rem", borderRadius: "8px" }}
              onClick={() => loadPreset(p.data)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="form-grid">
        {/* Row 1 */}
        <div className="form-group">
          <label className="form-label">Scholarship Name *</label>
          <input
            className="form-input"
            placeholder="e.g. National Merit Scholarship"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Website URL</label>
          <input
            className="form-input"
            placeholder="https://example.com/scholarship"
            value={form.url}
            onChange={(e) => update("url", e.target.value)}
          />
        </div>

        {/* Row 2 */}
        <div className="form-group">
          <label className="form-label">Organization Name</label>
          <input
            className="form-input"
            placeholder="Sponsoring organization"
            value={form.organizationName}
            onChange={(e) => update("organizationName", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Contact Email</label>
          <input
            className="form-input"
            type="email"
            placeholder="contact@organization.com"
            value={form.contactEmail}
            onChange={(e) => update("contactEmail", e.target.value)}
          />
        </div>

        {/* Row 3 */}
        <div className="form-group">
          <label className="form-label">Award Amount</label>
          <input
            className="form-input"
            placeholder="₹20,000 / $5,000"
            value={form.amount}
            onChange={(e) => update("amount", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Deadline</label>
          <input
            className="form-input"
            placeholder="March 31, 2026"
            value={form.deadline}
            onChange={(e) => update("deadline", e.target.value)}
          />
        </div>

        {/* Full-width textareas */}
        <div className="form-group full-width">
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            rows={4}
            placeholder="Paste the scholarship description here…"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </div>

        <div className="form-group full-width">
          <label className="form-label">Eligibility Requirements</label>
          <textarea
            className="form-textarea"
            rows={3}
            placeholder="Who is eligible to apply?"
            value={form.eligibility}
            onChange={(e) => update("eligibility", e.target.value)}
          />
        </div>

        <div className="form-group full-width">
          <label className="form-label">Application Process</label>
          <textarea
            className="form-textarea"
            rows={4}
            placeholder="How do you apply? What do they ask for?"
            value={form.applicationProcess}
            onChange={(e) => update("applicationProcess", e.target.value)}
          />
        </div>
      </div>

      {error && (
        <p style={{ color: "var(--accent-red)", marginTop: 12, fontSize: "0.875rem" }}>
          ⚠️ {error}
        </p>
      )}

      <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner" /> Analyzing…
            </>
          ) : (
            <>🔍 Analyze Scholarship</>
          )}
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => setForm(INITIAL)}
          disabled={loading}
        >
          Clear
        </button>
      </div>
    </form>
  );
}
