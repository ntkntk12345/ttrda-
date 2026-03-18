import "server-only";

import { scryptSync, timingSafeEqual } from "node:crypto";

const ADMIN_USERNAME_SALT = "13e930ba16d2cdc7138954662f71d9e5";
const ADMIN_USERNAME_HASH =
  "9c547bae18ed070f6fcb4a8ea6b68ac7adada23aa94c0cce47dc26f4f49be0270a45165d5b5cb79bd757b5f7797f12bbc0068ec6270d2eebcc803619d578e979";
const ADMIN_PASSWORD_SALT = "25dd4cf47d72792970cf9457aca4bc96";
const ADMIN_PASSWORD_HASH =
  "4169dbbd66b2327f65eb7450e000746a2859c5efe4fa3bfa093c7833e8c11ff8f6755a61647d0b7ee94570921c47c517d4f7c55b9899c4d79adc39960641961d";

export const SESSION_SECRET =
  "0fea92590ed64fcd9aeffc6bcaa1b8153230dbd15f4548184a74e6437501f35b";

function hashValue(value: string, salt: string) {
  return scryptSync(value, salt, 64);
}

function safeEqual(actual: Buffer, expectedHex: string) {
  const expected = Buffer.from(expectedHex, "hex");

  if (actual.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(actual, expected);
}

export function verifyAdminCredentials(username: string, password: string) {
  const normalizedUsername = username.trim();
  const usernameHash = hashValue(normalizedUsername, ADMIN_USERNAME_SALT);
  const passwordHash = hashValue(password, ADMIN_PASSWORD_SALT);

  return (
    safeEqual(usernameHash, ADMIN_USERNAME_HASH) &&
    safeEqual(passwordHash, ADMIN_PASSWORD_HASH)
  );
}
