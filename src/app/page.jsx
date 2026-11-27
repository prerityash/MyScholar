// ==============================================================================
// [Unit I: Fundamentals of Next.js - App Router & File-based Routing (page.jsx)]
// [Unit II: Rendering Strategies - Server-Side Rendering (SSR) & Static Site Generation (SSG)]
// [Unit II: Data Fetching - Server Components]
// ==============================================================================

import Link from "next/link";
import HeroSlideshow from "@/components/HeroSlideshow";

export default function HomePage() {
  return (
    <main className="container page-content">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <span className="badge badge-safe">
              🛡️ Next.js Full-Stack Architecture
            </span>

            <h1 className="hero-title">
              Verify Before You Apply.{" "}
              <span className="gradient-text">Protect Your Future.</span>
            </h1>

            <p className="hero-subtitle">
              Every year students lose millions to scholarship application fees,
              fake foundations, and identity harvesting scams. MyScholar inspects
              scholarship details in real time against known fraud patterns.
            </p>

            <div className="hero-actions">
              {/* [Unit I: Navigation - Next.js Link component] */}
              <Link href="/verify" className="btn btn-primary">
                🔍 Verify a Scholarship Now
              </Link>
              <Link href="/scholarships" className="btn btn-ghost">
                Browse Verified Directory →
              </Link>
            </div>
          </div>

          <div className="hero-media">
            {/* [Unit II: Client-side Rendering - Interactive Slideshow] */}
            <HeroSlideshow />
          </div>
        </div>
      </section>

      {/* Syllabus Topics Interactive Map */}
      <section style={{ margin: "48px 0" }}>
        <h2 style={{ fontSize: "1.375rem", marginBottom: 20 }}>
          📚 Project Syllabus Implementation Map
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          <div className="card" style={{ borderLeft: "4px solid var(--accent-blue)" }}>
            <h3 style={{ fontSize: "1.05rem", marginTop: 0 }}>Unit I: Fundamentals & Routing</h3>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              • App Router & Layouts (<code>layout.jsx</code>)<br />
              • Dynamic Routes (<code>/scholarships/[id]</code>)<br />
              • Nested Routes (<code>/admin</code>)<br />
              • Error & Loading UI (<code>loading.jsx</code>, <code>error.jsx</code>, <code>not-found.jsx</code>)
            </p>
          </div>

          <div className="card" style={{ borderLeft: "4px solid var(--accent-green)" }}>
            <h3 style={{ fontSize: "1.05rem", marginTop: 0 }}>Unit II: Rendering & Fetching</h3>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              • Server Components (SSR / SSG)<br />
              • Incremental Static Regeneration (ISR 60s)<br />
              • Client Components (<code>"use client"</code>)<br />
              • Server-side vs Client-side Data Fetching
            </p>
          </div>

          <div className="card" style={{ borderLeft: "4px solid var(--accent-yellow)" }}>
            <h3 style={{ fontSize: "1.05rem", marginTop: 0 }}>Unit III: APIs & Server Actions</h3>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              • REST Route Handlers (GET/POST/DELETE)<br />
              • Dynamic Route Handlers (<code>/api/scholarships/[id]</code>)<br />
              • Server Actions (<code>actions.js</code>)<br />
              • Form Handling, Validation & Data Mutations
            </p>
          </div>

          <div className="card" style={{ borderLeft: "4px solid var(--accent-red)" }}>
            <h3 style={{ fontSize: "1.05rem", marginTop: 0 }}>Unit IV: Auth & Database</h3>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              • Role-based Access Control (Admin / Student)<br />
              • Protected Routes & Middleware (<code>middleware.js</code>)<br />
              • Database Connectivity & CRUD (<code>db.js</code>)<br />
              • Data Validation & Environment Variables
            </p>
          </div>
        </div>
      </section>

      {/* How it works 3-step grid */}
      <section style={{ margin: "40px 0" }}>
        <h2 style={{ fontSize: "1.375rem", marginBottom: 20 }}>How MyScholar Verification Works</h2>
        <div className="steps-grid">
          <div className="card step-card">
            <div className="step-number">1</div>
            <h3 className="step-title">Paste Listing Details</h3>
            <p className="step-description">
              Provide scholarship details, portal links, fee requirements, or contact emails.
            </p>
          </div>

          <div className="card step-card">
            <div className="step-number">2</div>
            <h3 className="step-title">Heuristic Risk Analysis</h3>
            <p className="step-description">
              Checks domain authenticity, fee demands, credential harvesting, and suspicious urgency.
            </p>
          </div>

          <div className="card step-card">
            <div className="step-number">3</div>
            <h3 className="step-title">Score & Safe Action</h3>
            <p className="step-description">
              Receive a 0-100 risk score with categorized flags and official safety recommendations.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
