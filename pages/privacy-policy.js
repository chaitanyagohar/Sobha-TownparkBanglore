import Head from 'next/head';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Sobha Town Park</title>
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
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <div className="space-y-4 text-gray-700">
            <p>Your privacy is important to us. It is Sobha Town Park's policy to respect your privacy regarding any information we may collect from you across our website.</p>
            <h2 className="text-2xl font-semibold pt-4">1. Information We Collect</h2>
            <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We may collect information like your name, phone number, and email address when you fill out an enquiry form.</p>
            <h2 className="text-2xl font-semibold pt-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to contact you about your enquiry, provide you with information about our projects, and improve our services. We will not share your personally identifying information with third-parties, except where required by law.</p>
            <h2 className="text-2xl font-semibold pt-4">3. Data Security</h2>
            <p>We take the security of your data seriously and use commercially acceptable means to protect your personal information from loss or theft, as well as unauthorized access, disclosure, copying, use or modification.</p>
            <h2 className="text-2xl font-semibold pt-4">4. Your Consent</h2>
            <p>By using our site, you consent to our website's privacy policy. You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.</p>
          </div>
        </div>
      </main>
    </>
  );
}