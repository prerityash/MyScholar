import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <h1>
          Protect Yourself from{" "}
          <span className="gradient-text">Scholarship Scams</span>
        </h1>
        <p>
          ScholarShield analyzes scholarship listings for suspicious patterns —
          misleading domains, payment demands, fake organizations, copied
          content, and deceptive language — so you can apply with confidence.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link href="/verify" className="btn btn-primary">
            🔍 Verify a Scholarship
          </Link>
          <Link href="/dashboard" className="btn btn-ghost">
            📊 View Dashboard
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="page-container">
        <div className="feature-grid">
          <div className="card">
            <div className="feature-icon" style={{ background: "rgba(239,68,68,0.15)", color: "var(--accent-red)" }}>
              🌐
            </div>
            <div className="feature-title">Domain Analysis</div>
            <div className="feature-desc">
              Detects suspicious TLDs, typosquatting, IP-based URLs, missing
              HTTPS, and excessive subdomains that mimic legitimate
              institutions.
            </div>
          </div>

          <div className="card">
            <div className="feature-icon" style={{ background: "rgba(249,115,22,0.15)", color: "var(--accent-orange)" }}>
              💳
            </div>
            <div className="feature-title">Payment Detection</div>
            <div className="feature-desc">
              Flags any mention of application fees, wire transfers,
              cryptocurrency payments, or credit card requests — legitimate
              scholarships are always free.
            </div>
          </div>

          <div className="card">
            <div className="feature-icon" style={{ background: "rgba(234,179,8,0.15)", color: "var(--accent-yellow)" }}>
              🏛️
            </div>
            <div className="feature-title">Organization Verification</div>
            <div className="feature-desc">
              Checks for fake official-sounding names, vague descriptions, free
              email providers, and other signs of fictitious sponsoring
              organizations.
            </div>
          </div>

          <div className="card">
            <div className="feature-icon" style={{ background: "rgba(59,130,246,0.15)", color: "var(--accent-blue)" }}>
              📄
            </div>
            <div className="feature-title">Content Analysis</div>
            <div className="feature-desc">
              Identifies copy-pasted scam templates, placeholder text, generic
              phrases, and suspiciously short descriptions commonly used in
              fraudulent listings.
            </div>
          </div>

          <div className="card">
            <div className="feature-icon" style={{ background: "rgba(6,182,212,0.15)", color: "var(--accent-cyan)" }}>
              🗣️
            </div>
            <div className="feature-title">Language Analysis</div>
            <div className="feature-desc">
              Spots urgency tactics, too-good-to-be-true promises, excessive
              capitalization, and high-pressure language designed to rush
              applicants.
            </div>
          </div>

          <div className="card">
            <div className="feature-icon" style={{ background: "rgba(34,197,94,0.15)", color: "var(--accent-green)" }}>
              🔒
            </div>
            <div className="feature-title">Data Harvesting Detection</div>
            <div className="feature-desc">
              Alerts you when applications request SSNs, bank details,
              passwords, or other sensitive information that legitimate
              scholarships never require upfront.
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div style={{ marginTop: 80, textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: 40 }}>
            How It <span className="gradient-text">Works</span>
          </h2>
          <div className="stats-grid">
            <div className="card stat-card">
              <div className="stat-number gradient-text">1</div>
              <div className="stat-label">Paste Scholarship Info</div>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: 8 }}>
                Enter the name, URL, description, and details of the scholarship
                you want to verify.
              </p>
            </div>
            <div className="card stat-card">
              <div className="stat-number gradient-text">2</div>
              <div className="stat-label">AI-Powered Analysis</div>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: 8 }}>
                Our engine runs 7+ analysis modules checking for known scam
                patterns and red flags.
              </p>
            </div>
            <div className="card stat-card">
              <div className="stat-number gradient-text">3</div>
              <div className="stat-label">Get Your Report</div>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: 8 }}>
                Receive a detailed risk score, categorized red flags, and
                actionable safety recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className="card glow-border"
          style={{ textAlign: "center", padding: 48, marginTop: 48, marginBottom: 48 }}
        >
          <h2 style={{ marginTop: 0 }}>Ready to verify?</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>
            Don&apos;t fall for a fake scholarship. Analyze it in seconds.
          </p>
          <Link href="/verify" className="btn btn-primary">
            Start Verification →
          </Link>
        </div>
      </section>
    </>
  );
}
