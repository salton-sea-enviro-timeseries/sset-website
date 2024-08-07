interface Credentials {
  username?: string;
  password?: string;
}

export class CookieManager {
  private static instance: CookieManager;
  private cookie: string | null = null;
  private cookiePromise: Promise<string> | null = null;

  private constructor() {}

  public static getInstance(): CookieManager {
    if (!CookieManager.instance) {
      CookieManager.instance = new CookieManager();
    }
    return CookieManager.instance;
  }

  public async getCookie(credentials: Credentials): Promise<string> {
    if (this.cookie) {
      return this.cookie;
    }
    if (!this.cookiePromise) {
      this.cookiePromise = this.fetchCookie(credentials);
    }
    this.cookie = await this.cookiePromise;
    return this.cookie;
  }
  private async fetchCookie(credentials: Credentials): Promise<string> {
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
}

export default CookieManager;
