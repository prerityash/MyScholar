"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ScholarshipRecord, VerificationReport } from "@/lib/types";
import ReportView from "@/components/ReportView";

export default function ReportsPage() {
  const [records, setRecords] = useState<ScholarshipRecord[]>([]);
  const [selected, setSelected] = useState<VerificationReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reports")
      .then((r) => r.json())
      .then((data) => {
        setRecords(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (selected) {
    return (
      <div className="page-container" style={{ maxWidth: 900 }}>
        <ReportView report={selected} onReset={() => setSelected(null)} />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: "1.75rem", marginBottom: 8 }}>📄 Verification Reports</h1>
        <p style={{ color: "var(--text-secondary)", margin: 0 }}>
          Browse all previously analyzed scholarships.
        </p>
      </div>

      {loading ? (
        <div className="empty-state">
          <div className="spinner" style={{ margin: "0 auto" }} />
          <p style={{ marginTop: 16 }}>Loading reports…</p>
        </div>
      ) : records.length === 0 ? (
        <div className="empty-state card">
          <div style={{ fontSize: "3rem", marginBottom: 12 }}>📭</div>
          <h3 style={{ marginBottom: 8 }}>No Reports Yet</h3>
          <p>Analyze a scholarship to see reports here.</p>
          <Link href="/verify" className="btn btn-primary" style={{ marginTop: 16 }}>
            Verify a Scholarship
          </Link>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: "auto" }}>
          <table className="report-table">
            <thead>
              <tr>
                <th>Scholarship</th>
                <th>Organization</th>
                <th>Risk Level</th>
                <th>Score</th>
                <th>Flags</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec.id}>
                  <td className="name-cell">{rec.report.scholarship.name}</td>
                  <td>{rec.report.scholarship.organizationName || "—"}</td>
                  <td>
                    <span className={`badge badge-${rec.report.riskLevel}`}>
                      {rec.report.riskLevel}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{rec.report.overallRiskScore}</td>
                  <td>{rec.report.redFlags.length}</td>
                  <td>{new Date(rec.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-ghost"
                      style={{ padding: "6px 14px", fontSize: "0.8125rem" }}
                      onClick={() => setSelected(rec.report)}
                    >
                      View →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
