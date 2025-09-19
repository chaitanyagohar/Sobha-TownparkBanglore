import Head from 'next/head';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>Thank You! - Sobha Town Park</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full"
        >
          <div className="flex justify-center mb-6">
            <FaCheckCircle className="text-green-500 text-6xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Thank You!</h1>
          <p className="text-gray-600 text-lg mb-8">
            Your submission has been received. Our team will get in touch with you shortly.
          </p>
          <Link href="/" legacyBehavior>
            <a className="inline-block bg-[#d3af37] text-white px-8 py-3 rounded-full font-semibold text-lg transition-transform transform hover:scale-105">
              Back to Home
            </a>
          </Link>
        </motion.div>
      </div>
    </>
  );
}
