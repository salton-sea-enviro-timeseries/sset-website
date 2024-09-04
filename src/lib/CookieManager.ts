interface Credentials {
  username?: string;
  password?: string;
}

export class CookieManager {
  private static instance: CookieManager;
  private cookieCache: Map<string, string> = new Map(); // Cache cookies per credential set
  private cookiePromiseCache: Map<string, Promise<string>> = new Map(); // // Cache cookie promises per credential set

  private constructor() {}
  // Singleton instance
  public static getInstance(): CookieManager {
    if (!CookieManager.instance) {
      CookieManager.instance = new CookieManager();
    }
    return CookieManager.instance;
  }
  // Generate a unique key for the credentials
  private getCredentialsKey(credentials: Credentials): string {
    return `${credentials.username}:${credentials.password}`;
  }
  // Fetch cookie using credentials
  public async getCookie(credentials: Credentials): Promise<string> {
    const credentialsKey = this.getCredentialsKey(credentials);

    // If Cookie exists in cache, return it
    if (this.cookieCache.has(credentialsKey)) {
      return this.cookieCache.get(credentialsKey) as string;
    }
    //If cookie promise is in progress, return the promise
    if (this.cookiePromiseCache.has(credentialsKey)) {
      return this.cookiePromiseCache.get(credentialsKey) as Promise<string>;
    }

    // Fetch cookie and cache it
    const cookiePromise = this.fetchCookie(credentials);
    this.cookiePromiseCache.set(credentialsKey, cookiePromise);

    const cookie = await cookiePromise;
    this.cookieCache.set(credentialsKey, cookie);

    // Clear the promise cache once fulfilled
    this.cookiePromiseCache.delete(credentialsKey);

    return cookie;
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
