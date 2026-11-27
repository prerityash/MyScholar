// ==============================================================================
// [Unit II: Data Fetching - Client Components ("use client")]
// [Unit II: Rendering Strategies - Client-side Rendering (Visual Metrics & Conditional UI)]
// ==============================================================================

"use client";

const CATEGORY_LABELS = {
  misleading_domain: "Misleading Domain",
  payment_demand: "Payment Demands",
  fake_organization: "Fake Organization",
  copied_content: "Copied Content",
  suspicious_language: "Suspicious Language",
  urgency_pressure: "Urgency / Pressure",
  data_harvesting: "Data Harvesting",
  unrealistic_promise: "Unrealistic Promises",
};

const SEVERITY_COLORS = {
  critical: "var(--accent-red)",
  high: "var(--accent-orange)",
  medium: "var(--accent-yellow)",
  low: "var(--accent-blue)",
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
    <div
      className="score-circle"
      style={{ borderColor: color, color }}
    >
      {score}
      <span style={{ fontSize: "0.625rem", fontWeight: 500, opacity: 0.8 }}>/ 100</span>
    </div>
  );
}

function RiskBadge({ level }) {
  const labels = { safe: "✓ Safe", caution: "⚠ Caution", suspicious: "⚠ Suspicious", dangerous: "✕ Dangerous" };
  return <span className={`badge badge-${level}`}>{labels[level]}</span>;
}

function RiskMeter({ score, level }) {
  return (
    <div className="risk-meter">
      <div
        className="risk-meter-fill"
        style={{
          width: `${score}%`,
          background: `linear-gradient(90deg, ${RISK_COLORS.safe}, ${RISK_COLORS[level]})`,
        }}
      />
    </div>
  );
}

export default function ReportView({ report, onReset }) {
  const sortedFlags = [...report.redFlags].sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    return order[a.severity] - order[b.severity];
  });

  const maxCatScore = Math.max(...Object.values(report.categoryScores), 1);

  return (
    <div>
      {/* Header */}
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

      {/* Summary */}
      <div className="card" style={{ marginTop: 24 }}>
        <h3 style={{ marginTop: 0, marginBottom: 8 }}>📋 Summary</h3>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
          {report.summary}
        </p>
      </div>

      {/* Category Breakdown */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ marginTop: 0, marginBottom: 16 }}>📊 Category Breakdown</h3>
        {Object.entries(report.categoryScores)
          .filter(([, score]) => score > 0)
          .sort(([, a], [, b]) => b - a)
          .map(([cat, score]) => (
            <div key={cat} className="category-bar">
              <span className="category-label">{CATEGORY_LABELS[cat]}</span>
              <div className="category-track">
                <div
                  className="category-fill"
                  style={{
                    width: `${(score / maxCatScore) * 100}%`,
                    background:
                      score > 20
                        ? "var(--accent-red)"
                        : score > 10
                          ? "var(--accent-orange)"
                          : score > 5
                            ? "var(--accent-yellow)"
                            : "var(--accent-blue)",
                  }}
                >
                  {score}
                </div>
              </div>
            </div>
          ))}
        {Object.values(report.categoryScores).every((s) => s === 0) && (
          <p style={{ color: "var(--text-muted)", margin: 0 }}>
            No category scores to display — the listing appears clean.
          </p>
        )}
      </div>

      {/* Red Flags */}
      <div style={{ marginTop: 16 }}>
        <h3 style={{ marginBottom: 16 }}>
          🚩 Red Flags ({report.redFlags.length})
        </h3>
        {sortedFlags.length === 0 ? (
          <div className="card">
            <p style={{ color: "var(--text-muted)", margin: 0, textAlign: "center" }}>
              ✅ No red flags detected
            </p>
          </div>
        ) : (
          sortedFlags.map((f) => (
            <div key={f.id} className={`flag-card severity-${f.severity}`}>
              <div className="flag-severity" style={{ color: SEVERITY_COLORS[f.severity] }}>
                {f.severity}
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
          {report.recommendations.map((rec, i) => (
            <li key={i} className="rec-item">
              <span className="rec-icon">✓</span>
              {rec}
            </li>
          ))}
        </ul>
      </div>

      {/* Meta */}
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
