// src/lib/data-pipeline/aq/aeroqual/auth.ts

import type { AeroqualCredentials } from "./types";

const LOGIN_URL = "https://api.cloud.aeroqual.com/v2/login";

const cachedCookies = new Map<string, string>();

function formatCookieHeader(setCookie: string): string {
  return setCookie
    .split(",")
    .map((cookie) => cookie.split(";")[0])
    .join("; ");
}

function getDefaultCredentials(): AeroqualCredentials {
  return {
    username: process.env.AEROQUAL_USERNAME,
    password: process.env.AEROQUAL_PASSWORD
  };
}

function getCredentialCacheKey(credentials: AeroqualCredentials) {
  return credentials.username ?? "unknown-user";
}

export async function getAeroqualAuthCookie(
  credentials: AeroqualCredentials = getDefaultCredentials()
): Promise<string> {
  if (!credentials.username || !credentials.password) {
    throw new Error("Missing Aeroqual username or password");
  }

  const cacheKey = getCredentialCacheKey(credentials);
  const cachedCookie = cachedCookies.get(cacheKey);

  if (cachedCookie) return cachedCookie;

  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      Username: credentials.username,
      Password: credentials.password,
      RememberMe: true
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Login error:", errorText);
    throw new Error(`Aeroqual login failed: ${response.status}`);
  }

  const setCookie = response.headers.get("set-cookie");

  if (!setCookie) {
    throw new Error("No cookie returned from Aeroqual login");
  }

  const formattedCookie = formatCookieHeader(setCookie);

  cachedCookies.set(cacheKey, formattedCookie);

  return formattedCookie;
}
