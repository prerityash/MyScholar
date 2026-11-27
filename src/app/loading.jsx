// ==============================================================================
// [Unit I: Routing and Navigation - Error and Loading UI (loading.jsx)]
// Next.js App Router automatically renders this Suspense boundary while
// server components and nested routes fetch data.
// ==============================================================================

export default function Loading() {
  return (
    <div className="container" style={{ padding: "80px 24px", textAlign: "center" }}>
      <div className="spinner" style={{ width: 40, height: 40, margin: "0 auto 16px" }} />
      <h3 style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
        Loading MyScholar content…
      </h3>
      <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
        [Unit I: Error and Loading UI - App Router Suspense fallback]
      </p>
    </div>
  );
}
