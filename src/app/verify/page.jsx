"use client";

import { useState } from "react";
import VerificationForm from "@/components/VerificationForm";
import ReportView from "@/components/ReportView";

export default function VerifyPage() {
  const [report, setReport] = useState(null);

  if (report) {
    return (
      <div className="page-container" style={{ maxWidth: 900 }}>
        <ReportView report={report} onReset={() => setReport(null)} />
      </div>
    );
  }

  return (
    <div className="page-container" style={{ maxWidth: 900 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: "1.75rem", marginBottom: 8 }}>
          🔍 Verify a Scholarship
        </h1>
        <p style={{ color: "var(--text-secondary)", margin: 0 }}>
          Paste the scholarship details below and we&apos;ll analyze it for red flags.
          The more information you provide, the more thorough the analysis.
        </p>
      </div>

      <div className="card">
        <VerificationForm onResult={setReport} />
      </div>
    </div>
  );
}
