// Security headers configuration

export function getSecurityHeaders() {
  return {
    // Prevent XSS attacks
    "X-XSS-Protection": "1; mode=block",

    // Prevent clickjacking
    "X-Frame-Options": "SAMEORIGIN",

    // Prevent MIME type sniffing
    "X-Content-Type-Options": "nosniff",

    // Referrer policy
    "Referrer-Policy": "strict-origin-when-cross-origin",

    // Content Security Policy
    "Content-Security-Policy": [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://vercel.live https://va.vercel-scripts.com",
      "frame-ancestors 'self'",
    ].join("; "),

    // Permissions policy
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  }
}
