import Head from 'next/head';
import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms & Conditions - Sobha Town Park</title>
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
          <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
          <div className="space-y-4 text-gray-700">
            <p>Please read these terms and conditions carefully before using our website.</p>
            <h2 className="text-2xl font-semibold pt-4">1. Acceptance of Terms</h2>
            <p>By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
            <h2 className="text-2xl font-semibold pt-4">2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on Sobha Town Park's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
            <h2 className="text-2xl font-semibold pt-4">3. Disclaimer</h2>
            <p>The materials on this website are provided on an 'as is' basis. Sobha Town Park makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            <h2 className="text-2xl font-semibold pt-4">4. Limitations</h2>
            <p>In no event shall Sobha Town Park or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.</p>
          </div>
        </div>
      </main>
    </>
  );
}