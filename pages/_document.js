import { Html, Head, Main, NextScript } from 'next/document'

// Your Google Tag Manager ID
const GTM_ID = 'GTM-XXXXXXX';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Tag Manager Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
        {/* End Google Tag Manager Script */}

        {/* --- ADDED: Sitelinks Structured Data --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              'name': 'Sobha Town Park',
              'url': 'https://www.yourclientdomain.com/', // IMPORTANT: Replace with your actual domain
              'potentialAction': {
                '@type': 'SearchAction',
                'target': {
                  '@type': 'EntryPoint',
                  'urlTemplate': 'https://www.yourclientdomain.com/?s={search_term_string}' // IMPORTANT: Replace with your actual domain
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        {/* --- End Sitelinks Structured Data --- */}
      </Head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

