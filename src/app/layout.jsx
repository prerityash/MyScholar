// ==============================================================================
// [Unit I: Fundamentals of Next.js - Project Structure & App Router]
// [Unit I: Routing and Navigation - Root Layout (layout.jsx)]
// [Unit II: Rendering Strategies - Server-Side Rendering (SSR)]
// ==============================================================================

import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "MyScholar - Scholarship Scam & Credibility Verification",
  description:
    "AI-powered scholarship verification engine detecting scam patterns, phishing, advance-fee fraud, and deceptive listings.",
};

// [Unit II: Server Components - RootLayout executes on the server]
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Inline script to prevent theme flash */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('myscholar_theme');
                  var theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
        {/* [Unit I: Routing and Navigation - Shared Layout Navbar] */}
        <Navbar />

        {/* [Unit I: App Router - Page content rendered into layout] */}
        {children}

        {/* Footer with Syllabus Attribution */}
        <footer
          style={{
            borderTop: "1px solid var(--border-color)",
            padding: "24px 0",
            marginTop: 48,
            textAlign: "center",
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
          }}
        >
          <div className="container">
            <p style={{ margin: "0 0 6px" }}>
              MyScholar — Next.js Academic Demonstration Project
            </p>
            <p style={{ margin: 0, opacity: 0.8 }}>
              Covers Unit I (App Router & Routing), Unit II (Rendering & Data Fetching), Unit III (APIs & Server Actions), Unit IV (Auth & Database Integration)
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
