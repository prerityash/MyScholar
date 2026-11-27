"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/verify", label: "Verify" },
    { href: "/reports", label: "Reports" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav className="nav glass">
      <Link href="/" className="nav-brand" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="shield-icon">🛡️</div>
        <span className="gradient-text">ScholarShield</span>
      </Link>

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
    </nav>
  );
}
