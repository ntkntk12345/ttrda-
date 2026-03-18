globalThis.__timing__.logStart('Load chunks/_/session');import { scryptSync, timingSafeEqual, randomBytes, createCipheriv, createHash, createDecipheriv } from 'node:crypto';
import { l as setCookie, m as deleteCookie, n as getCookie } from './nitro.mjs';

const ADMIN_USERNAME_SALT = "13e930ba16d2cdc7138954662f71d9e5";
const ADMIN_USERNAME_HASH = "9c547bae18ed070f6fcb4a8ea6b68ac7adada23aa94c0cce47dc26f4f49be0270a45165d5b5cb79bd757b5f7797f12bbc0068ec6270d2eebcc803619d578e979";
const ADMIN_PASSWORD_SALT = "25dd4cf47d72792970cf9457aca4bc96";
const ADMIN_PASSWORD_HASH = "4169dbbd66b2327f65eb7450e000746a2859c5efe4fa3bfa093c7833e8c11ff8f6755a61647d0b7ee94570921c47c517d4f7c55b9899c4d79adc39960641961d";
const SESSION_SECRET = "0fea92590ed64fcd9aeffc6bcaa1b8153230dbd15f4548184a74e6437501f35b";
function hashValue(value, salt) {
  return scryptSync(value, salt, 64);
}
function safeEqual(actual, expectedHex) {
  const expected = Buffer.from(expectedHex, "hex");
  if (actual.length !== expected.length) {
    return false;
  }
  return timingSafeEqual(actual, expected);
}
function verifyAdminCredentials(username, password) {
  const normalizedUsername = username.trim();
  const usernameHash = hashValue(normalizedUsername, ADMIN_USERNAME_SALT);
  const passwordHash = hashValue(password, ADMIN_PASSWORD_SALT);
  return safeEqual(usernameHash, ADMIN_USERNAME_HASH) && safeEqual(passwordHash, ADMIN_PASSWORD_HASH);
}

const SESSION_COOKIE_NAME = "phimhayz_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;
const SESSION_KEY = createHash("sha256").update(SESSION_SECRET).digest();
function encryptPayload(payload) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", SESSION_KEY, iv);
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(payload), "utf8"),
    cipher.final()
  ]);
  const tag = cipher.getAuthTag();
  return [
    iv.toString("base64url"),
    tag.toString("base64url"),
    encrypted.toString("base64url")
  ].join(".");
}
function decryptPayload(token) {
  const [ivPart, tagPart, dataPart] = token.split(".");
  if (!ivPart || !tagPart || !dataPart) {
    return null;
  }
  try {
    const decipher = createDecipheriv(
      "aes-256-gcm",
      SESSION_KEY,
      Buffer.from(ivPart, "base64url")
    );
    decipher.setAuthTag(Buffer.from(tagPart, "base64url"));
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(dataPart, "base64url")),
      decipher.final()
    ]).toString("utf8");
    const payload = JSON.parse(decrypted);
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
function createAdminSession(event) {
  const issuedAt = Date.now();
  const expiresAt = issuedAt + SESSION_TTL_SECONDS * 1e3;
  const token = encryptPayload({
    sub: "admin",
    iat: issuedAt,
    exp: expiresAt
  });
  setCookie(event, SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    expires: new Date(expiresAt)
  });
}
function clearAdminSession(event) {
  deleteCookie(event, SESSION_COOKIE_NAME, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/"
  });
}
function getAdminSession(event) {
  const token = getCookie(event, SESSION_COOKIE_NAME);
  if (!token) {
    return null;
  }
  return decryptPayload(token);
}
function isAdminAuthenticated(event) {
  return Boolean(getAdminSession(event));
}

export { clearAdminSession as a, createAdminSession as c, isAdminAuthenticated as i, verifyAdminCredentials as v };;globalThis.__timing__.logEnd('Load chunks/_/session');
//# sourceMappingURL=session.mjs.map
