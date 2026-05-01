// src/lib/data-pipeline/aq/aeroqual/auth.ts

const LOGIN_URL = "https://api.cloud.aeroqual.com/v2/login";

let cachedCookie: string | null = null;

function formatCookieHeader(setCookie: string): string {
  return setCookie
    .split(",")
    .map((cookie) => cookie.split(";")[0])
    .join("; ");
}

export async function getAeroqualAuthCookie(): Promise<string> {
  if (cachedCookie) return cachedCookie;

  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      Username: process.env.AEROQUAL_USERNAME,
      Password: process.env.AEROQUAL_PASSWORD,
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

  cachedCookie = formatCookieHeader(setCookie);

  return cachedCookie;
}
