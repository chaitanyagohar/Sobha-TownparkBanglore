// pages/_document.js

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sobha Town Park', // IMPORTANT: Keep your actual site name
    url: 'https://www.sobha-townparkproject.com/', // IMPORTANT: Replace with your actual domain
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.sobha-townparkproject.com/?s={search_term_string}', // IMPORTANT: Replace with your actual domain
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Html lang="en">
      <Head>
        {/* Sitelinks Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* End Sitelinks Structured Data */}
      </Head>
      <body>
        {/* The GTM noscript tag that was here has been removed. */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}