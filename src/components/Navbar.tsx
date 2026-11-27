"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/verify", label: "Verify" },
  ];

  return (
    <nav className="nav glass">
      <Link href="/" className="nav-brand" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="shield-icon">🛡️</div>
        <span className="gradient-text">MyScholar</span>
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
