"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  // The navbar remains hidden until the user is successfully logged in
  if (loading || !user) {
    return null;
  }

  const links = [
    { href: "/", label: "Home" },
    { href: "/verify", label: "Verify" },
  ];

  return (
    <nav className="nav glass">
      <div className="nav-inner">
        <Link href="/" className="nav-brand" style={{ textDecoration: "none", color: "inherit" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="MyScholar Logo"
            className="brand-logo"
          />
          <span className="gradient-text">MyScholar</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
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

          {/* Light / Dark Mode Toggle button placed BEFORE user info / sign out */}
          <ThemeToggle />

          {/* User Info Pill & Logout */}
          <div className="nav-user-pill">
            <span className="nav-user-avatar">
              {(user.name || user.email || "U")[0].toUpperCase()}
            </span>
            <span className="nav-user-name" title={user.email}>
              {user.name || user.email}
            </span>
            <button
              type="button"
              onClick={logout}
              className="btn-logout"
              title="Sign out"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
