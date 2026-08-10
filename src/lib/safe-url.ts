const schemePattern = /^[a-z][a-z\d+.-]*:/i;

export function safeUrl(value: string | undefined): string | null {
  const candidate = value?.trim();

  if (!candidate || /[\u0000-\u0020]/.test(candidate)) {
    return null;
  }

  if (!schemePattern.test(candidate)) {
    return candidate.startsWith("//") ||
      candidate.startsWith("\\") ||
      candidate.startsWith("/\\")
      ? null
      : candidate;
  }

  try {
    const url = new URL(candidate);
    return url.protocol === "http:" || url.protocol === "https:"
      ? candidate
      : null;
  } catch {
    return null;
  }
}
