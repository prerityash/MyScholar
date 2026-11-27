"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardStats, RedFlagCategory } from "@/lib/types";

const CATEGORY_LABELS: Record<RedFlagCategory, string> = {
  misleading_domain: "Misleading Domain",
  payment_demand: "Payment Demands",
  fake_organization: "Fake Organization",
  copied_content: "Copied Content",
  suspicious_language: "Suspicious Language",
  urgency_pressure: "Urgency / Pressure",
  data_harvesting: "Data Harvesting",
  unrealistic_promise: "Unrealistic Promises",
};

const CATEGORY_ICONS: Record<RedFlagCategory, string> = {
  misleading_domain: "🌐",
  payment_demand: "💳",
  fake_organization: "🏛️",
  copied_content: "📄",
  suspicious_language: "🗣️",
  urgency_pressure: "⏰",
  data_harvesting: "🔒",
  unrealistic_promise: "✨",
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="spinner" style={{ margin: "0 auto" }} />
          <p style={{ marginTop: 16 }}>Loading dashboard…</p>
        </div>
      </div>
    );
  }

  if (!stats || stats.totalAnalyzed === 0) {
    return (
      <div className="page-container">
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: "1.75rem", marginBottom: 8 }}>📊 Dashboard</h1>
          <p style={{ color: "var(--text-secondary)", margin: 0 }}>
            Analytics overview of all scholarship verifications.
          </p>
        </div>

        <div className="empty-state card">
          <div style={{ fontSize: "3rem", marginBottom: 12 }}>📊</div>
          <h3 style={{ marginBottom: 8 }}>No Data Yet</h3>
          <p>Verify some scholarships to see analytics here.</p>
          <Link href="/verify" className="btn btn-primary" style={{ marginTop: 16 }}>
            Verify a Scholarship
          </Link>
        </div>
      </div>
    );
  }

  const total = stats.totalAnalyzed;
  const safePercent = total > 0 ? ((stats.safe / total) * 100).toFixed(0) : "0";
  const dangerPercent = total > 0 ? (((stats.suspicious + stats.dangerous) / total) * 100).toFixed(0) : "0";

  return (
    <div className="page-container">
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: "1.75rem", marginBottom: 8 }}>📊 Dashboard</h1>
        <p style={{ color: "var(--text-secondary)", margin: 0 }}>
          Analytics overview of all scholarship verifications.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-number gradient-text">{stats.totalAnalyzed}</div>
          <div className="stat-label">Total Analyzed</div>
        </div>
        <div className="card stat-card">
          <div className="stat-number" style={{ color: "var(--accent-green)" }}>{stats.safe}</div>
          <div className="stat-label">Safe</div>
        </div>
        <div className="card stat-card">
          <div className="stat-number" style={{ color: "var(--accent-yellow)" }}>{stats.caution}</div>
          <div className="stat-label">Caution</div>
        </div>
        <div className="card stat-card">
          <div className="stat-number" style={{ color: "var(--accent-orange)" }}>{stats.suspicious}</div>
          <div className="stat-label">Suspicious</div>
        </div>
        <div className="card stat-card">
          <div className="stat-number" style={{ color: "var(--accent-red)" }}>{stats.dangerous}</div>
          <div className="stat-label">Dangerous</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Distribution */}
        <div className="card">
          <h3 style={{ marginTop: 0, marginBottom: 16 }}>🎯 Risk Distribution</h3>
          <div style={{ display: "flex", gap: 4, height: 24, borderRadius: 6, overflow: "hidden", marginBottom: 16 }}>
            {stats.safe > 0 && (
              <div style={{ flex: stats.safe, background: "var(--accent-green)", borderRadius: 4 }} title={`Safe: ${stats.safe}`} />
            )}
            {stats.caution > 0 && (
              <div style={{ flex: stats.caution, background: "var(--accent-yellow)", borderRadius: 4 }} title={`Caution: ${stats.caution}`} />
            )}
            {stats.suspicious > 0 && (
              <div style={{ flex: stats.suspicious, background: "var(--accent-orange)", borderRadius: 4 }} title={`Suspicious: ${stats.suspicious}`} />
            )}
            {stats.dangerous > 0 && (
              <div style={{ flex: stats.dangerous, background: "var(--accent-red)", borderRadius: 4 }} title={`Dangerous: ${stats.dangerous}`} />
            )}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
              <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 2, background: "var(--accent-green)", marginRight: 8 }} />
              Safe: {safePercent}%
            </div>
            <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
              <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 2, background: "var(--accent-red)", marginRight: 8 }} />
              At Risk: {dangerPercent}%
            </div>
          </div>
        </div>

        {/* Top Red Flags */}
        <div className="card">
          <h3 style={{ marginTop: 0, marginBottom: 16 }}>🚩 Most Common Red Flags</h3>
          {stats.topRedFlags.length === 0 ? (
            <p style={{ color: "var(--text-muted)", margin: 0 }}>No red flags detected yet.</p>
          ) : (
            stats.topRedFlags.map((item, i) => (
              <div key={item.category} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: "1.25rem" }}>{CATEGORY_ICONS[item.category]}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                    {CATEGORY_LABELS[item.category]}
                  </div>
                  <div className="risk-meter" style={{ marginTop: 4 }}>
                    <div
                      className="risk-meter-fill"
                      style={{
                        width: `${(item.count / stats.topRedFlags[0].count) * 100}%`,
                        background: i === 0 ? "var(--accent-red)" : i === 1 ? "var(--accent-orange)" : "var(--accent-blue)",
                      }}
                    />
                  </div>
                </div>
                <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-secondary)" }}>
                  {item.count}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="card" style={{ marginTop: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ margin: 0 }}>🕐 Recent Analyses</h3>
          <Link href="/reports" className="btn btn-ghost" style={{ padding: "6px 14px", fontSize: "0.8125rem" }}>
            View All →
          </Link>
        </div>
        {stats.recentReports.length === 0 ? (
          <p style={{ color: "var(--text-muted)", margin: 0 }}>No recent reports.</p>
        ) : (
          <div style={{ display: "grid", gap: 8 }}>
            {stats.recentReports.slice(0, 5).map((report) => (
              <div
                key={report.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "12px 16px",
                  background: "var(--bg-secondary)",
                  borderRadius: 10,
                }}
              >
                <span className={`badge badge-${report.riskLevel}`}>{report.riskLevel}</span>
                <span style={{ flex: 1, fontWeight: 500 }}>{report.scholarship.name}</span>
                <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                  Score: {report.overallRiskScore} · {report.redFlags.length} flags
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
