import Link from "next/link";
import HeroSlideshow from "@/components/HeroSlideshow";

export default function Home() {
  return (
    <div className="page-container">
      {/* Hero Section: 2-column split with 1:1 Slideshow on the right */}
      <section className="hero-split">
        <div className="hero-content">
          <h1>
            Protect Yourself from{" "}
            <span className="gradient-text">Scholarship Scams</span>
          </h1>
          <p>
            MyScholar analyzes scholarship listings for suspicious patterns —
            misleading domains, payment demands, fake organizations, copied
            content, and deceptive language — so you can apply with confidence.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <Link href="/verify" className="btn btn-primary">
              🔍 Verify a Scholarship
            </Link>
          </div>
        </div>

        {/* Right side 1:1 ratio Slideshow */}
        <div className="hero-visual">
          <HeroSlideshow />
        </div>
      </section>

      {/* How It Works (Scholarship Info & below) */}
      <section style={{ marginTop: 60, textAlign: "center" }}>
        <h2 style={{ fontSize: "2.25rem", fontWeight: 800, marginBottom: 40, letterSpacing: "-0.02em" }}>
          How It <span className="gradient-text">Works</span>
        </h2>
        <div className="stats-grid">
          <div className="card stat-card">
            <div className="stat-number gradient-text">1</div>
            <div className="stat-label">Paste Scholarship Info</div>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: 8, lineHeight: 1.6 }}>
              Enter the name, URL, description, and details of the scholarship
              you want to verify.
            </p>
          </div>
          <div className="card stat-card">
            <div className="stat-number gradient-text">2</div>
            <div className="stat-label">AI-Powered Analysis</div>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: 8, lineHeight: 1.6 }}>
              Our engine runs multi-vector heuristic checks for known scam
              patterns and red flags.
            </p>
          </div>
          <div className="card stat-card">
            <div className="stat-number gradient-text">3</div>
            <div className="stat-label">Get Your Report</div>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: 8, lineHeight: 1.6 }}>
              Receive a detailed risk score, categorized red flags, and
              actionable safety recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section style={{ marginTop: 48, marginBottom: 48 }}>
        <div
          className="card glow-border"
          style={{ textAlign: "center", padding: "48px 24px" }}
        >
          <h2 style={{ marginTop: 0, fontSize: "1.75rem", fontWeight: 700 }}>
            Ready to verify a scholarship?
          </h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: 540, margin: "12px auto 28px", lineHeight: 1.6 }}>
            Don&apos;t fall for a fake scholarship or advance fee scheme. Analyze any opportunity in seconds.
          </p>
          <Link href="/verify" className="btn btn-primary">
            Start Verification →
          </Link>
        </div>
      </section>
    </div>
  );
}
