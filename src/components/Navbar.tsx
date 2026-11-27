"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/verify", label: "Verify" },
  ];

  return (
    <nav className="nav glass">
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
    </nav>
  );
}
