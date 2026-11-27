import crypto from "crypto";

const COOKIE_NAME = "myscholar_session";
const SECRET = process.env.SESSION_SECRET || "myscholar-secure-auth-secret-key-2026";

export function createSessionToken(payload) {
  const data = JSON.stringify({ ...payload, timestamp: Date.now() });
  const iv = crypto.randomBytes(16);
  const key = crypto.createHash("sha256").update(SECRET).digest();
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(data, "utf8", "base64");
  encrypted += cipher.final("base64");
  return `${iv.toString("base64")}.${encrypted}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  try {
    const [ivB64, encrypted] = parts;
    const iv = Buffer.from(ivB64, "base64");
    const key = crypto.createHash("sha256").update(SECRET).digest();
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encrypted, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return JSON.parse(decrypted);
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
