import Script from 'next/script';

export default function Analytics() {
  // Only load analytics in production
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const plausibleSrc = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || 'https://plausible.io/js/script.js';

  if (!plausibleDomain) {
    return null;
  }

  return (
    <Script
      defer
      data-domain={plausibleDomain}
      src={plausibleSrc}
      strategy="afterInteractive"
    />
  );
}
