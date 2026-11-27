// ==============================================================================
// [Unit I: Routing and Navigation - File-based Routing (/verify)]
// [Unit II: Data Fetching - Client-side Rendering (State & Interactive UI)]
// ==============================================================================

"use client";

import { useState } from "react";
import VerificationForm from "@/components/VerificationForm";
import ReportView from "@/components/ReportView";

export default function VerifyPage() {
  // [Unit II: Client-side Rendering - Local React State Management]
  const [report, setReport] = useState(null);

  return (
    <main className="container page-content" style={{ maxWidth: 900 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 className="hero-title" style={{ fontSize: "2rem", marginBottom: 8 }}>
          Scholarship Credibility Analyzer
        </h1>
        <p className="hero-subtitle" style={{ fontSize: "1rem" }}>
          Analyze any scholarship opportunity against 8 fraud and deceptive pattern detectors.
        </p>
        <div style={{ marginTop: 8, fontSize: "0.8125rem", color: "var(--text-muted)" }}>
          📚 <strong>Syllabus Focus:</strong> [Unit I: File-based Routing] · [Unit II: Client-side Rendering & Fetch API] · [Unit III: Route Handler Integration]
        </div>
      </div>

      <div className="card">
        {!report ? (
          <VerificationForm onResult={setReport} />
        ) : (
          <ReportView report={report} onReset={() => setReport(null)} />
        )}
      </div>
    </main>
  );
}
