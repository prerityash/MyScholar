"use client";

import Link from "next/link";
import HeroSlideshow from "@/components/HeroSlideshow";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();

  // If not logged in, we blur the background of the home page until user logs in
  const isBlurred = !loading && !user;

  return (
    <div className="auth-wrapper">
      {/* Background Home Page Content (blurred when not logged in) */}
      <div className={`page-container ${isBlurred ? "auth-blurred" : ""}`}>
        {/* Hero Section: 2-column split with 1:1 Slideshow on the right */}
        <section className="hero-split">
          <div className="hero-content">
            <h1>
              Protect Yourself from{" "}
              <span className="gradient-text">Scholarship Scams</span>
            </h1>
            <p>
              MyScholar analyzes scholarship listings for suspicious patterns,
              misleading domains, payment demands, fake organizations, copied
              content, and deceptive language <br></br>— so you can apply with confidence.
            </p>
            <div className="hero-cta-group">
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
        <section className="how-it-works-section">
          <div className="section-header">
            <h2>
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="section-subtitle">
              Our multi-vector verification process makes detecting suspicious scholarships simple, fast, and reliable.
            </p>
          </div>

          <div className="stats-grid">
            <div className="card stat-card">
              <div className="stat-number gradient-text">1</div>
              <div className="stat-label">Paste Scholarship Info</div>
              <p className="stat-desc">
                Enter the scholarship name, URL, application description, and details into our analyzer form.
              </p>
            </div>
            <div className="card stat-card">
              <div className="stat-number gradient-text">2</div>
              <div className="stat-label">AI-Powered Analysis</div>
              <p className="stat-desc">
                Our engine runs multi-vector heuristic checks for known scam patterns, fake domains, and fee demands.
              </p>
            </div>
            <div className="card stat-card">
              <div className="stat-number gradient-text">3</div>
              <div className="stat-label">Get Your Safety Report</div>
              <p className="stat-desc">
                Receive an instant trust score starting at 100 (deducting points for detected fraud), itemized red flags, and actionable recommendations.
              </p>
            </div>
          </div>
        </section>

        {/* Call To Action */}
        <section className="cta-section">
          <div className="card glow-border cta-card">
            <h2>
              Ready to verify a scholarship?
            </h2>
            <p>
              Don&apos;t fall for a fake scholarship or advance fee scheme. Analyze any opportunity in seconds.
            </p>
            <Link href="/verify" className="btn btn-primary">
              Start Verification →
            </Link>
          </div>
        </section>
      </div>

      {/* Login Modal Overlay (renders on top of blurred background until user logs in) */}
      {isBlurred && <AuthModal />}
    </div>
  );
}
