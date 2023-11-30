const credentials = {
  username: process.env.AEROQUAL_USERNAME,
  password: process.env.AEROQUAL_PASSWORD
};
export async function loginAndGetCookies(): Promise<string> {
  const loginUrl = "https://cloud.aeroqual.com/V2/login";
  const loginResponse = await fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials),
    credentials: "include"
  });
  if (!loginResponse.ok) {
    throw new Error("Login to aeroqual failed");
  }
  const setCookieHeader = loginResponse.headers.get("set-cookie");
  return setCookieHeader ?? "";
}
