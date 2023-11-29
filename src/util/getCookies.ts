import { loginAndGetCookies } from "util/loginAndGetCookies";
import { NextApiRequest } from "next";

export async function getCookies(
  req: NextApiRequest,
  cookieToGet: string
): Promise<string> {
  let cookies = req.headers.cookie || "";
  if (!cookies) {
    cookies = await loginAndGetCookies();
  }
  const cookieRegex = new RegExp(`${cookieToGet}=([^;]+)`, "i");
  const cookieMatch = cookies.match(cookieRegex);
  if (cookieMatch && cookieMatch[1]) {
    return `${cookieToGet}=${cookieMatch[1]}`;
  } else {
    throw new Error(`Unable to retrieve the ${cookieToGet} cookie.`);
  }
}
