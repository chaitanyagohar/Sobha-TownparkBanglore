// this site is designed by Gleam Sites and Being Marketed By Drootle Agency


import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaBars, FaTimes, FaCheckCircle, FaPhoneAlt, FaWhatsapp, FaFilePdf, FaCommentDots, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Script from 'next/script';
import Link from 'next/link'; // Import the Link component
import { useRouter } from 'next/router';

// --- Animation Variants ---
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeInOut" }
};

const staggerContainer = {
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" }}
};


// --- Your Project Data ---
const images = ['/images/hero1.webp','/images/hero2.webp','/images/hero3.webp'];
const heroHighlights = [
  'Pay 20% Now & 80% after 2 Years',
  '24 Months EMI Holiday Plan',
  'Possession in Dec 2029',
  'Spread Across: 60 Acres',
  'Structures: 12 Towers G+45',
  '80+ Astonishing Amenities',
];
const highlights = [
  '3 Massive Clubhouses',
  'New York themed Residence',
  '75%+ Open Space',
  'Exclusive Cricket Stadium',
  'Retail Mall',
  '100+ Aggregate Amenities',
];
const floorplans = [
  {id:1,title:'2 BHK',area:'1340 sq.ft',price:'₹ 1.69 Cr*',img:'/images/2-bhk.png'},
  {id:2,title:'3.5 BHK',area:'1856 sq.ft',price:'₹ 2.57 Cr*',img:'/images/3.5-bhk.png'},
  {id:3,title:'4 BHK',area:'2200 sq.ft',price:'₹ 3.48 Cr*',img:'/images/4-bhk.png'},
  {id:4,title:'4.5 BHK',area:'2800 sq.ft',price:'₹ 3.95 Cr*',img:'/images/4.5-bhk.png'},
];
const amenities = [
  { title: 'Olympic Swimming Pool', img: '/images/amenities/pool.jpg' },
  { title: 'Gymnasium', img: '/images/amenities/gym.jpg' },
  { title: 'Kids Play Area', img: '/images/amenities/kids-play.jpg' },
  { title: 'Jogging Track', img: '/images/amenities/jogging.jpg' },
  { title: 'Indoor Games', img: '/images/amenities/indoor-games.jpeg' },
  { title: 'Multipurpose Hall', img: '/images/amenities/hall.webp' },
];
const gallery = ['/images/g0.webp','/images/g1.webp','/images/g2.jpeg','/images/g3.jpg','/images/g4.webp','/images/g5.jpg'];

export default function Home(){
  // State management
  const router = useRouter(); 
  const [idx,setIdx] = useState(0);
  const [selectedPlan,setSelectedPlan] = useState(null);
  const [lightbox,setLightbox] = useState(null);
  const [form,setForm] = useState({name:'',phone:'',email:'',message:''});
  const [status,setStatus] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [showSideButton, setShowSideButton] = useState(false);
  const [showLightboxForm, setShowLightboxForm] = useState(false);


  // Hooks for Parallax Effect
  const aboutSectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
      target: aboutSectionRef,
      offset: ["start end", "end start"]
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  // Hero image slider effect
  useEffect(()=>{
    const t = setInterval(()=>setIdx(p=> (p+1)%images.length),4500);
    return ()=>clearInterval(t);
  },[]);

  // Gallery automatic slider effect
  useEffect(() => {
    const gallerySlider = setInterval(() => {
        setGalleryIdx(prev => (prev + 1) % gallery.length);
    }, 4000);
    return () => clearInterval(gallerySlider);
  }, [gallery.length]);
  
  // useEffect to show the lightbox form after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only show if it hasn't been closed manually
      if (!sessionStorage.getItem('lightboxClosed')) {
          setShowLightboxForm(true);
      }
    }, 3000);
    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  // Header scroll effect to also handle the side button visibility
  useEffect(() => {
    const handleScroll = () => { 
      setIsHeaderScrolled(window.scrollY > 50);
      setShowSideButton(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function onChange(e){ setForm({...form,[e.target.name]:e.target.value}) }

  async function submitForm(e){
    e.preventDefault();
    setStatus('sending');
    try{
      const res = await fetch('/api/contact',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
      if(res.ok){
        // On success, redirect to the thank you page
        router.push('/thank-you');
      } else {
        setStatus('error');
      }
    }catch(err){
      console.error(err);
      setStatus('error');
    }
  }

  const openLightbox = (e) => {
    e.preventDefault();
    setShowLightboxForm(true);
  };

  const closeLightbox = () => {
    setShowLightboxForm(false);
    sessionStorage.setItem('lightboxClosed', 'true');
  };


  // Gallery slider controls
  const nextSlide = () => { setGalleryIdx(prev => (prev + 1) % gallery.length) };
  const prevSlide = () => { setGalleryIdx(prev => (prev - 1 + gallery.length) % gallery.length) };

  return (
    <div className="min-h-screen text-gray-900 bg-white">
      <Head>
        <title>Sobha Town Park | Premium Residences, Hosur Road</title>
        <meta name="description" content="Explore Sobha Town Park, offering premium apartments on Hosur Road, Bangalore." />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Sobha Town Park | Premium Residences" />
        <meta property="og:description" content="Modern living with premier amenities at Attibele, Hosur Road." />
        <meta property="og:image" content="/images/hero2.jpeg" />
        <style jsx global>{`
          .btn-glare {
            position: relative;
            overflow: hidden;
            -webkit-transform: translateZ(0);
          }
          .btn-glare::after {
            content: '';
            position: absolute;
            top: 0;
            left: -150%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transform: skewX(-25deg);
            transition: left 0.8s cubic-bezier(0.23, 1, 0.32, 1);
          }
          .btn-glare:hover::after {
            left: 150%;
          }
        `}</style>
      </Head>

      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isHeaderScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <a href="#home"><img src="/images/logo-sobha.webp" alt="Company Logo" className="h-10 w-auto" /></a>
          </div>
          <nav className={`hidden lg:flex items-center gap-6 transition-colors duration-300 ${isHeaderScrolled ? 'text-gray-800' : 'text-white'}`}>
            <a href="#about" className="hover:text-[#d3af37]">About</a>
            <a href="#highlights" className="hover:text-[#d3af37]">Highlights</a>
            <a href="#floorplans" className="hover:text-[#d3af37]">Floorplans</a>
            <a href="#gallery" className="hover:text-[#d3af37]">Gallery</a>
            <a href="#contact" className="hover:text-[#d3af37]">Contact</a>
            <a href="tel:+918310162833" className={`flex items-center gap-2 border rounded-full px-4 py-2 transition-all duration-300 ${isHeaderScrolled ? 'border-[#d3af37] text-[#d3af37] hover:bg-[#d3af37]/10' : 'border-white text-white hover:bg-white/10'}`}>
              <FaPhoneAlt size={12} />
              <span>+91 8310162833</span>
            </a>
          </nav>
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`z-50 transition-colors duration-300 ${isHeaderScrolled ? 'text-black' : 'text-white'}`}>
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
       
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/60 z-40"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="lg:hidden fixed top-0 right-0 bottom-0 w-4/5 max-w-xs bg-white z-50 p-6 flex flex-col"
              >
                <button onClick={() => setIsMenuOpen(false)} className="self-end text-gray-700 mb-8">
                    <FaTimes size={24} />
                </button>
                <div className="flex flex-col items-start gap-6">
                    <a href="#about" className="text-2xl text-gray-800" onClick={() => setIsMenuOpen(false)}>About</a>
                    <a href="#highlights" className="text-2xl text-gray-800" onClick={() => setIsMenuOpen(false)}>Highlights</a>
                    <a href="#floorplans" className="text-2xl text-gray-800" onClick={() => setIsMenuOpen(false)}>Floorplans</a>
                    <a href="#gallery" className="text-2xl text-gray-800" onClick={() => setIsMenuOpen(false)}>Gallery</a>
                    <a href="#contact" className="text-2xl text-gray-800" onClick={() => setIsMenuOpen(false)}>Contact</a>
                    <a href="tel:+918310162833" className="text-2xl text-gray-800" onClick={() => setIsMenuOpen(false)}>Call Now</a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section id='home' className="relative h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0">
            {images.map((src,i)=> (
              <motion.img key={i} src={src} alt={'slide'+i} className="absolute inset-0 w-full h-full object-cover" initial={{opacity:0, scale: 1.1}} animate={{opacity: idx===i?1:0, scale: 1}} transition={{duration:1.5}}/>
            ))}
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center">
            <motion.div className="text-white" variants={staggerContainer} initial="initial" animate="whileInView">
              <motion.p variants={staggerItem} className="font-semibold">NEAR ELECTRONIC CITY, HOSUR ROAD, BANGALORE</motion.p>
              <motion.h1 variants={staggerItem} className="text-5xl md:text-6xl font-extrabold my-4">SOBHA TOWN PARK</motion.h1>
              <motion.ul variants={staggerContainer} className="space-y-2 my-6">
                {heroHighlights.map((text, i) => (
                  <motion.li variants={staggerItem} key={i} className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-400" />
                    <span>{text}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div variants={staggerItem} className="bg-black/50 border border-gray-600 rounded-lg p-3 my-6 max-w-lg">
                <p>2, 3.5, 4 & 4.5 BHK Apartments</p>
                <p className="text-xl font-bold mt-1">Starting Price : <span className="text-yellow-400">₹ 1.7 Cr*</span> Onwards</p>
              </motion.div>
              <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                <button onClick={openLightbox} className="bg-white text-black px-8 py-3 rounded-full font-semibold inline-block btn-glare">Download Brochure</button>
                <button onClick={openLightbox} className="lg:hidden bg-[#d3af37] text-white px-8 py-3 rounded-full font-semibold inline-block btn-glare">Book A Site Visit</button>
              </motion.div>
            </motion.div>
            <div className="hidden lg:flex justify-center">
               <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md">
                  <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Book A Site Visit</h3>
                  <form onSubmit={submitForm} className="space-y-4">
                    <input name="name" value={form.name} onChange={onChange} required placeholder="Name" className="w-full p-3 border border-gray-300 rounded-md" />
                    <input name="phone" value={form.phone} onChange={onChange} required placeholder="Mobile (+91)" className="w-full p-3 border border-gray-300 rounded-md" />
                    <input name="email" value={form.email} onChange={onChange} placeholder="Email (optional)" className="w-full p-3 border border-gray-300 rounded-md" />
                    <textarea name="message" value={form.message} onChange={onChange} placeholder="Message (optional)" rows={3} className="w-full p-3 border border-gray-300 rounded-md" />
                    <div className="text-xs text-gray-500">
                      <input type="checkbox" id="consent" className="mr-2" defaultChecked/>
                      <label htmlFor="consent">I authorize Sobha to contact me about this project.</label>
                    </div>
                    <div className="flex flex-col items-center">
                      <button type="submit" className="w-full bg-[#d3af37] text-white px-6 py-3 rounded-md font-semibold text-lg btn-glare">
                        {status==='sending'?'Submitting...':'Submit'}
                      </button>
                      {status==='sent' && <div className="text-green-600 mt-2">Thanks! We will contact you soon.</div>}
                      {status==='error' && <div className="text-red-600 mt-2">Error. Please try again.</div>}
                    </div>
                  </form>
               </div>
            </div>
          </div>
        </section>

        <motion.section ref={aboutSectionRef} id="about" className="py-20 bg-gray-50 overflow-hidden" {...fadeInUp}>
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm uppercase text-[#d3af37] font-semibold">About Us</div>
              <h2 className="text-3xl font-bold mt-4">Sobha Town Park</h2>
              <p className="mt-4 text-gray-700">Sobha Town Park is an upcoming, pre-launch futuristic residential project on Hosur Road in South Bangalore, offering premium 2, 3.5, 4 and 4.5 BHK apartments. Surrounded by verdant greenery and picturesque landscapes, the development promises a serene living experience.</p>
              <p className="mt-4 text-gray-700">Sobha Limited, renowned across India for its "Passion at Work" philosophy, continues to set new standards by delivering contemporary and thoughtfully designed living spaces.</p>
            </div>
            <div className="relative h-96 mt-12 md:mt-0">
                <img
                    src="/images/about2.jpg"
                    alt="Luxury apartment building exterior"
                    className="absolute top-0 right-0 w-4/5 h-full object-cover rounded-2xl shadow-xl"
                />
                <motion.img
                    src="/images/about1.webp"
                    alt="Swimming pool area at night"
                    style={{ y: parallaxY }}
                    className="absolute bottom-[-10%] left-0 w-3/5 h-auto object-cover rounded-2xl shadow-2xl border-4 md:border-8 border-white"
                />
            </div>
          </div>
        </motion.section>

        <motion.section id="highlights" className="py-20" {...fadeInUp}>
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
            <img src="/images/highlights.webp" alt="h" className="rounded-2xl h-96 w-full object-cover" />
            <div>
              <div className="text-sm uppercase text-[#d3af37] font-semibold">Highlights</div>
              <h3 className="text-3xl font-bold mt-4 mb-6">Discover the Finest Features</h3>
              <motion.ul variants={staggerContainer} initial="initial" whileInView="whileInView" className="space-y-4 text-gray-800">
                {highlights.map((h, i) => (
                  <motion.li variants={staggerItem} key={i} className="flex gap-3 items-center">
                    <FaCheckCircle className="text-[#d3af37] text-xl flex-shrink-0" />
                    <div>{h}</div>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </motion.section>

        <motion.section id="floorplans" className="py-20 bg-gray-50" {...fadeInUp}>
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-3xl font-bold mb-6 text-center">Typical Floorplans</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: '1000px' }}>
              {floorplans.map(p=> (
                <motion.div 
                  key={p.id} 
                  className="border rounded-xl overflow-hidden bg-white shadow-sm flex flex-col"
                  whileHover={{ y: -8, scale: 1.03, boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <img src={p.img} alt={p.title} className="w-full h-56 object-cover blur-md" />
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{p.title}</div>
                        <div className="text-sm text-gray-500">{p.area}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{p.price}</div>
                        <div className="text-xs text-gray-500">(Indicative)</div>
                      </div>
                    </div>
                    <div className="mt-auto pt-4 flex gap-2">
                      <button onClick={()=>setSelectedPlan(p)} className="flex-1 bg-[#d3af37] text-white py-2 rounded-md btn-glare">View Plan</button>
                      <button onClick={openLightbox} className="flex-1 border border-gray-300 text-center py-2 rounded-md">Download</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="amenities" className="py-20" {...fadeInUp}>
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-3xl font-bold mb-8 text-center">Amenities</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {amenities.map(({ title, img }, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden shadow-lg group h-48">
                  <img 
                    src={img} 
                    alt={title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h4 className="text-white font-bold text-lg transition-transform duration-300 ease-in-out group-hover:-translate-y-1">{title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
       
        <motion.section id="gallery" className="py-20 bg-gray-50" {...fadeInUp}>
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold mb-8">Gallery</h3>
          </div>
          <div className="relative w-full h-[45vh] md:h-[90vh] overflow-hidden bg-gray-200">
            <AnimatePresence initial={false}>
              <motion.img
                key={galleryIdx}
                src={gallery[galleryIdx]}
                alt={`Gallery image ${galleryIdx + 1}`}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute w-full h-full object-cover"
              />
            </AnimatePresence>

            <button onClick={prevSlide} className="absolute top-1/2 left-3 md:left-5 -translate-y-1/2 bg-white/60 p-2 rounded-full z-10 hover:bg-white transition-colors">
              <FaChevronLeft className="h-5 w-5 md:h-7 md:w-7 text-gray-800" />
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-3 md:right-5 -translate-y-1/2 bg-white/60 p-2 rounded-full z-10 hover:bg-white transition-colors">
              <FaChevronRight className="h-5 w-5 md:h-7 md:w-7 text-gray-800" />
            </button>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setGalleryIdx(i)}
                  className={`h-2 w-2 md:h-3 md:w-3 rounded-full transition-colors ${galleryIdx === i ? 'bg-white' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="contact" className="py-20" {...fadeInUp}>
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Contact & Enquiry</h3>
              <p className="text-gray-600 mb-6">Fill in your details and our sales team will contact you to schedule a site visit.</p>
              <form onSubmit={submitForm} className="space-y-4">
                <input name="name" value={form.name} onChange={onChange} required placeholder="Full name" className="w-full p-3 border rounded-md" />
                <input name="phone" value={form.phone} onChange={onChange} required placeholder="Mobile number" className="w-full p-3 border rounded-md" />
                <input name="email" value={form.email} onChange={onChange} placeholder="Email (optional)" className="w-full p-3 border rounded-md" />
                <textarea name="message" value={form.message} onChange={onChange} placeholder="Message (optional)" rows={4} className="w-full p-3 border rounded-md" />
                <div className="flex items-center gap-4">
                  <button type="submit" className="bg-[#d3af37] text-white px-6 py-3 rounded-md btn-glare">{status==='sending'?'Sending...':'Submit'}</button>
                  {status==='sent' && <div className="text-green-600">Thanks — we will contact you soon.</div>}
                  {status==='error' && <div className="text-red-600">Error. Try again later.</div>}
                </div>
              </form>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Project Office</h4>
              <p className="text-sm text-gray-600 mb-4">Attibele, Hosur Road, Bangalore</p>
              <div className="w-full h-80 rounded-lg overflow-hidden border">
                <iframe title="project-location" className="w-full h-full" loading="lazy" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.040659107959!2d77.72890681528655!3d12.841031321782618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6d95775f2861%3A0x83e5a59314412e84!2sSobha%20Town%20Park!5e0!3m2!1sen!2sin!4v1663505681603!5m2!1sen!2sin" />
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      
      <footer className="bg-gray-800 text-gray-300 text-sm">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <ul className="space-y-2 mb-6">
              <li>Project Registered under Government of India RERA Act 2016</li>
              <li>Marketed by AOC Leasing LLP</li>
              <li>RERA Project Registration No: PRM/KA/RERA/1251/308/PR/210518/004150</li>
              <li>Site Address: Electronic City, Bangalore</li>
          </ul>
          <p className="mb-8 text-gray-400">
            <strong>Disclaimer:</strong> We are an authorised marketing partner for this project. Provided content is given by respective owners and this website and content is for information purpose only and it does not constitute any offer to avail for any services. Prices mentioned are subject to change without prior notice and properties mentioned are subject to availability. You can expect a call, SMS or emails on details registered with us.
          </p>
          <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center">
            <p>© Copyright 2025 | All Rights Reserved.</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="hover:text-white">Terms & Conditions</Link>
              <Link href="/disclaimer" className="hover:text-white">Disclaimer</Link>
            </div>
          </div>
        </div>
      </footer>

      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setSelectedPlan(null)}>
          <div className="bg-white rounded-lg max-w-4xl w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-3 border-b">
              <div className="font-semibold">{selectedPlan.title} — {selectedPlan.area}</div>
              <button onClick={()=>setSelectedPlan(null)} className="px-3 py-1">×</button>
            </div>
            <div className="p-4"><img src={selectedPlan.img} alt={selectedPlan.title} className="w-full max-h-[70vh] object-contain" /></div>
          </div>
        </div>
      )}

      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setLightbox(null)}>
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <div className="bg-white rounded-md overflow-hidden">
              <div className="flex justify-end p-2"><button onClick={()=>setLightbox(null)} className="px-3 py-1 text-white bg-black/50 rounded-full">×</button></div>
              <img src={lightbox} alt="lightbox" className="w-full max-h-[80vh] object-contain bg-black" />
            </div>
          </div>
        </div>
      )}
      
      <AnimatePresence>
        {showLightboxForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="relative bg-white p-8 rounded-xl shadow-2xl w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
              >
                <FaTimes size={22} />
              </button>
              
              <div className="flex justify-center mb-5">
                <img src="/images/logo-sobha.webp" alt="Sobha Logo" className="h-12 w-auto" />
              </div>

              <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">Sobha Town Park</h3>
              <p className="text-center text-gray-500 mb-6">At Attibele, Hosur Road, Bangalore</p>
              
              <form onSubmit={submitForm} className="space-y-4">
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  placeholder="Name*"
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d3af37]"
                />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  required
                  placeholder="Mobile*"
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d3af37]"
                />
                <input
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d3af37]"
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Message"
                  rows={2}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d3af37]"
                />

                <div className="text-xs text-gray-500 flex items-start gap-2 pt-2">
                  <input type="checkbox" id="lightboxConsent" className="mt-1 accent-[#d3af37]" defaultChecked />
                  <label htmlFor="lightboxConsent">
                    I authorize company representatives to Call, SMS, Email or WhatsApp me about its products and offers. This consent overrides any registration for DNC/NDNC.
                  </label>
                </div>
                <div className="flex flex-col items-center pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#d3af37] text-white px-6 py-3 rounded-md font-semibold text-lg btn-glare transition-colors hover:brightness-95"
                  >
                    {status === 'sending' ? 'Submitting...' : 'Submit Now'}
                  </button>
                  {status === 'sent' && <div className="text-green-600 mt-2">Thanks! We will contact you soon.</div>}
                  {status === 'error' && <div className="text-red-600 mt-2">Error. Please try again.</div>}
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
     
      <AnimatePresence>
        {showSideButton && (
          <motion.div
            className="fixed z-30 right-[0] top-1/2 -translate-y-1/2 transform"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ ease: "easeInOut" }}
          >
            <button
              onClick={openLightbox}
              className="bg-red-600 text-white p-3 pr-5 rounded-l-lg shadow-lg flex items-center gap-2 -rotate-90 origin-bottom-right btn-glare"
            >
              <FaFilePdf />
              <span>Download Brochure</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MODIFIED: Moved button to the left --- */}
      {/* <button
        onClick={() => window.Tawk_API && window.Tawk_API.maximize()}
        className="fixed bottom-[80px] lg:bottom-5 left-5 z-40 bg-orange-500 text-white p-4 rounded-full shadow-lg btn-glare"
        aria-label="Chat with us"
      >
        <FaCommentDots size={22} />
      </button> */}

      <div className="fixed z-30 bottom-0 left-0 right-0 grid grid-cols-2 lg:hidden">
        <a
          href="https://wa.me/918310162833"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-4 flex items-center justify-center gap-3 text-lg font-semibold btn-glare"
        >
          <FaWhatsapp size={24} />
          <span>WhatsApp</span>
        </a>
        <a
          href="tel:+918310162833"
          className="bg-blue-600 text-white p-4 flex items-center justify-center gap-3 text-lg font-semibold btn-glare"
        >
          <FaPhoneAlt size={20} />
          <span>Call Us</span>
        </a>
      </div>

      {/* <Script
        strategy="lazyOnload"
        src="https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID"
      /> */}
    </div>
  )
}