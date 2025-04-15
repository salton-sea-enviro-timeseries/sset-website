export function addCacheBuster(url: string, key?: string | number): string {
  const cacheParam = `_cb=${key ?? Date.now()}`;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${cacheParam}`;
}
