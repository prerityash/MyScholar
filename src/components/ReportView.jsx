"use client";

const SEVERITY_COLORS = {
  critical: "var(--accent-red)",
  high: "var(--accent-orange)",
  medium: "var(--accent-yellow)",
  low: "var(--accent-blue)",
  safe: "var(--accent-green)",
};

const RISK_COLORS = {
  safe: "var(--accent-green)",
  caution: "var(--accent-yellow)",
  suspicious: "var(--accent-orange)",
  dangerous: "var(--accent-red)",
};

function ScoreCircle({ score, level }) {
  const color = RISK_COLORS[level];
  return (
    <div style={{ textAlign: "center" }}>
      <div
        className="score-circle"
        style={{ borderColor: color, color }}
      >
        {score}
        <span style={{ fontSize: "0.625rem", fontWeight: 500, opacity: 0.8 }}>/ 100</span>
      </div>
      <div style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--text-muted)", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        Trust Score
      </div>
    </div>
  );
}

function RiskBadge({ level }) {
  const labels = {
    safe: "✓ Legitimate (Safe)",
    caution: "⚠ Caution (Minor Concerns)",
    suspicious: "⚠ Suspicious Listing",
    dangerous: "✕ High Risk Scam",
  };
  return <span className={`badge badge-${level}`}>{labels[level]}</span>;
}

function RiskMeter({ score, level }) {
  return (
    <div className="risk-meter">
      <div
        className="risk-meter-fill"
        style={{
          width: `${Math.max(4, score)}%`,
          background: RISK_COLORS[level],
          transition: "width 0.8s ease-in-out, background 0.3s ease",
        }}
      />
    </div>
  );
}

export default function ReportView({ report, onReset }) {
  const sortedFlags = [...(report.redFlags || [])].sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    return order[a.severity] - order[b.severity];
  });

  const findings = report.findings || [];
  const categoryPanels = report.categoryPanels || [];

  return (
    <div>
      {/* Header Card */}
      <div className="report-header">
        <div>
          <h2 style={{ margin: "0 0 8px", fontSize: "1.5rem" }}>
            {report.scholarship.name}
          </h2>
          <RiskBadge level={report.riskLevel} />
        </div>
        <ScoreCircle score={report.overallRiskScore} level={report.riskLevel} />
      </div>

      <RiskMeter score={report.overallRiskScore} level={report.riskLevel} />

      {/* Structured Summary & Findings */}
      <div className="card" style={{ marginTop: 24 }}>
        <h3 style={{ marginTop: 0, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
          📋 Analysis Summary & Key Findings
        </h3>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 16px" }}>
          {report.summary}
        </p>

        {/* Structured Findings List */}
        <div style={{ marginTop: 12 }}>
          {findings.map((finding) => (
            <div
              key={finding.id}
              className={`finding-card severity-${finding.severity}`}
            >
              <span className="finding-icon">
                {finding.severity === "critical"
                  ? "🚨"
                  : finding.severity === "high"
                    ? "⚠️"
                    : finding.severity === "medium"
                      ? "⚡"
                      : finding.severity === "safe"
                        ? "✅"
                        : "ℹ️"}
              </span>
              <div className="finding-content">
                <div className="finding-title">{finding.title}</div>
                <p className="finding-desc">{finding.description}</p>
                {finding.evidence && (
                  <div className="finding-evidence">
                    Matched text: &ldquo;{finding.evidence}&rdquo;
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Threat Assessment Breakdown (Panels & Bars Without Point Deductions) */}
      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ margin: "0 0 4px" }}>🛡️ Threat Assessment by Category</h3>
          <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--text-muted)" }}>
            Severity bars across evaluated scholarship verification vectors:
          </p>
        </div>

        <div className="threat-panel-grid">
          {categoryPanels.map((item) => (
            <div key={item.key} className="threat-row">
              <div className="threat-row-header">
                <span className="threat-row-label">{item.label}</span>
                <span className={`threat-badge ${item.severity}`}>
                  {item.status}
                </span>
              </div>

              {/* Progress bar representing threat level */}
              <div className="threat-bar-track">
                <div
                  className="threat-bar-fill"
                  style={{
                    width: `${item.barWidth}%`,
                    background: SEVERITY_COLORS[item.severity],
                  }}
                />
              </div>

              <div className="threat-desc">{item.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Red Flag Items */}
      <div style={{ marginTop: 16 }}>
        <h3 style={{ marginBottom: 16 }}>
          🚩 Detected Red Flags ({sortedFlags.length})
        </h3>
        {sortedFlags.length === 0 ? (
          <div className="card">
            <p style={{ color: "var(--text-muted)", margin: 0, textAlign: "center" }}>
              ✅ No red flags detected across all categories
            </p>
          </div>
        ) : (
          sortedFlags.map((f) => (
            <div key={f.id} className={`flag-card severity-${f.severity}`}>
              <div className="flag-severity" style={{ color: SEVERITY_COLORS[f.severity] }}>
                {f.severity} alert
              </div>
              <div className="flag-title">{f.title}</div>
              <div className="flag-description">{f.description}</div>
              <div className="flag-evidence">{f.evidence}</div>
            </div>
          ))
        )}
      </div>

      {/* Recommendations */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ marginTop: 0, marginBottom: 16 }}>💡 Recommendations</h3>
        <ul className="rec-list">
          {(report.recommendations || []).map((rec, i) => (
            <li key={i} className="rec-item">
              <span className="rec-icon">✓</span>
              {rec}
            </li>
          ))}
        </ul>
      </div>

      {/* Meta Footer */}
      <div
        style={{
          marginTop: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
          Report ID: {report.id} · Verified: {new Date(report.verifiedAt).toLocaleString()}
        </span>
        {onReset && (
          <button className="btn btn-ghost" onClick={onReset}>
            ← Analyze Another
          </button>
        )}
      </div>
    </div>
  );
}
