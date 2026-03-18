import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "node:crypto";
import type { H3Event } from "h3";
import { deleteCookie, getCookie, setCookie } from "h3";

import { SESSION_SECRET } from "./credentials";

const SESSION_COOKIE_NAME = "phimhayz_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;
const SESSION_KEY = createHash("sha256").update(SESSION_SECRET).digest();

interface SessionPayload {
  sub: "admin";
  iat: number;
  exp: number;
}

function encryptPayload(payload: SessionPayload) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", SESSION_KEY, iv);
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(payload), "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return [
    iv.toString("base64url"),
    tag.toString("base64url"),
    encrypted.toString("base64url"),
  ].join(".");
}

function decryptPayload(token: string) {
  const [ivPart, tagPart, dataPart] = token.split(".");

  if (!ivPart || !tagPart || !dataPart) {
    return null;
  }

  try {
    const decipher = createDecipheriv(
      "aes-256-gcm",
      SESSION_KEY,
      Buffer.from(ivPart, "base64url"),
    );

    decipher.setAuthTag(Buffer.from(tagPart, "base64url"));

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(dataPart, "base64url")),
      decipher.final(),
    ]).toString("utf8");

    const payload = JSON.parse(decrypted) as SessionPayload;

    if (payload.sub !== "admin" || typeof payload.exp !== "number") {
      return null;
    }

    if (payload.exp <= Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function createAdminSession(event: H3Event) {
  const issuedAt = Date.now();
  const expiresAt = issuedAt + SESSION_TTL_SECONDS * 1000;
  const token = encryptPayload({
    sub: "admin",
    iat: issuedAt,
    exp: expiresAt,
  });

  setCookie(event, SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export function clearAdminSession(event: H3Event) {
  deleteCookie(event, SESSION_COOKIE_NAME, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export function getAdminSession(event: H3Event) {
  const token = getCookie(event, SESSION_COOKIE_NAME);

  if (!token) {
    return null;
  }

  return decryptPayload(token);
}

export function isAdminAuthenticated(event: H3Event) {
  return Boolean(getAdminSession(event));
}
