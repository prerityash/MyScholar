"use client";

import { useState } from "react";
import VerificationForm from "@/components/VerificationForm";
import ReportView from "@/components/ReportView";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/context/AuthContext";

export default function VerifyPage() {
  const [report, setReport] = useState(null);
  const { user, loading } = useAuth();

  const isBlurred = !loading && !user;

  const handleResult = (newReport) => {
    setReport(newReport);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  const handleReset = () => {
    setReport(null);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return (
    <div className="auth-wrapper">
      <div className={`page-container ${isBlurred ? "auth-blurred" : ""}`} style={{ maxWidth: 900 }}>
        {report ? (
          <ReportView report={report} onReset={handleReset} />
        ) : (
          <>
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
              <VerificationForm onResult={handleResult} />
            </div>
          </>
        )}
      </div>

      {/* Auth Modal Overlay when user is not logged in */}
      {isBlurred && <AuthModal />}
    </div>
  );
}
