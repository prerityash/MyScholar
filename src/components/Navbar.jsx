// ==============================================================================
// [Unit I: Routing and Navigation - Navigation (<Link>, usePathname)]
// [Unit II: Data Fetching - Client Components ("use client")]
// ==============================================================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  // [Unit I: Navigation - Next.js usePathname hook for active link highlighting]
  const pathname = usePathname();

  // [Unit I: File-based Routing - Route navigation links]
  const links = [
    { href: "/", label: "Home" },
    { href: "/scholarships", label: "Directory" },
    { href: "/verify", label: "Verify Listing" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <nav className="nav glass">
      <div className="nav-inner">
        {/* [Unit I: Navigation - Next.js <Link> component for SPA client-side transitions] */}
        <Link href="/" className="nav-brand" style={{ textDecoration: "none", color: "inherit" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="MyScholar Logo"
            className="brand-logo"
          />
          <span className="gradient-text">MyScholar</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div className="nav-links">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
