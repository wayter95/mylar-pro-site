export function clientIpFromHeaders(headers: Headers): string | null {
  const forwarded = headers.get("x-forwarded-for");

  if (forwarded) {
    const parts = forwarded
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    const trusted = parts[parts.length - 1];

    if (trusted) {
      return trusted;
    }
  }

  return headers.get("x-real-ip");
}
