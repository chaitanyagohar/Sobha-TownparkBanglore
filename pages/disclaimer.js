import Head from 'next/head';
import Link from 'next/link';

export default function Disclaimer() {
  return (
    <>
      <Head>
        <title>Disclaimer - Sobha Town Park</title>
      </Head>
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <img src="/images/logo-sobha.png" alt="Company Logo" className="h-10 w-auto" />
          </Link>
          <Link href="/" className="text-white bg-[#d3af37] hover:brightness-95 font-semibold px-4 py-2 rounded-md">
              Back to Home
          </Link>
        </div>
      </header>
      <main className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold mb-6">Disclaimer</h1>
          <div className="space-y-4 text-gray-700">
            <p>The content provided on this website is for informational purposes only and does not constitute a legal offer. The company, its agents, and employees are not liable for any consequences of any action taken by the viewer relying on marketing material/brochures, etc.</p>
            <p>We are an authorized marketing partner for this project. The information on this website, including project details, floor plans, prices, and images, is sourced from the property developer and is subject to change without prior notice.</p>
            <p>The images shown are for illustrative purposes and represent an artist's impression of the property. The actual properties may vary from these representations.</p>
            <p>By providing your contact information on our website, you consent to being contacted by our sales representatives via call, SMS, or email, overriding any DNC/NDNC registration.</p>
            <p>This project is registered under RERA, and all property transactions will be governed by the terms and conditions of the agreement for sale between the developer and the purchaser.</p>
          </div>
        </div>
      </main>
    </>
  );
}