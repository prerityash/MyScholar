// ==============================================================================
// [Unit IV: Authentication and Authorization - Session Management & Auth Concepts]
// [Unit IV: Authentication and Authorization - Role-based Access Control]
// ==============================================================================

import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "myscholar_session";

// [Unit IV: Authentication Concepts - Credentials Verification]
export async function authenticateUser(username, password) {
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (username === "admin" && password === adminPassword) {
    return {
      id: "usr_admin",
      username: "admin",
      role: "admin", // [Unit IV: Role-based Access Control]
    };
  }

  if (username === "student" && password === "student123") {
    return {
      id: "usr_student",
      username: "student",
      role: "student", // [Unit IV: Role-based Access Control]
    };
  }

  return null;
}

// [Unit IV: Session Management - Cookie Creation]
export async function createSession(user) {
  const cookieStore = await cookies();
  const sessionData = JSON.stringify({
    id: user.id,
    username: user.username,
    role: user.role,
    issuedAt: Date.now(),
  });

  // Store in HTTP-only session cookie
  cookieStore.set(SESSION_COOKIE_NAME, sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

// [Unit IV: Session Management - Reading Session]
export async function getSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!sessionCookie?.value) return null;

  try {
    return JSON.parse(sessionCookie.value);
  } catch {
    return null;
  }
}

// [Unit IV: Session Management - Destroy Session / Logout]
export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
