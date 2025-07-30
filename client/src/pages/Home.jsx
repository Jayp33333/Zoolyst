import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import HomeHeader from "../components/HomeHeader";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  FiZap, 
  FiShield, 
  FiCalendar, 
  FiArrowRight, 
  FiMail, 
  FiPhone, 
  FiMapPin,
} from "react-icons/fi";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";

// Animation variants (keep the same as before)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const scaleUp = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const AnimatedSection = ({ children, id, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {children}
    </motion.section>
  );
};

const WideBlueLightCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none w-[400px] h-[400px] rounded-full filter blur-[100px] opacity-40"
      style={{
        background: 'radial-gradient(circle, rgba(80, 140, 255, 0.7) 0%, rgba(40, 90, 180, 0) 80%)',
        transform: `translate(calc(${position.x}px - 200px), calc(${position.y}px - 200px))`,
        transition: 'transform 0.2s ease-out'
      }}
    />
  );
};

const Home = () => {
    const [activeLink, setActiveLink] = useState('home');
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          switch(entry.target.id) {
            case 'home':
              setActiveLink('home');
              break;
            case 'about':
              setActiveLink('about');
              break;
            case 'contact':
              setActiveLink('contact');
              break;
            default:
              break;
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (homeRef.current) observer.observe(homeRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);
    if (contactRef.current) observer.observe(contactRef.current);

    return () => {
      if (homeRef.current) observer.unobserve(homeRef.current);
      if (aboutRef.current) observer.unobserve(aboutRef.current);
      if (contactRef.current) observer.unobserve(contactRef.current);
    };
  }, []);
  return (
    <>
      <WideBlueLightCursor />
      <HomeHeader activeLink={activeLink} setActiveLink={setActiveLink} />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        {/* Hero Section */}
        <section id="home" ref={homeRef} className="relative container mx-auto px-6 py-32 md:py-40 text-center">
          {/* Animated decorative elements */}
          <motion.div 
            className="absolute top-20 left-10 w-20 h-20 bg-blue-100 rounded-full filter blur-xl opacity-70 dark:bg-blue-900 dark:opacity-30"
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-10 w-24 h-24 bg-blue-100 rounded-full filter blur-xl opacity-70 dark:bg-blue-900 dark:opacity-30"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

          {/* Content */}
          <motion.div variants={containerVariants} className="relative z-10">
            {/* Tagline */}
            <motion.div variants={itemVariants} className="flex items-center justify-center mb-4">
              <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-full px-4 py-1.5 text-xs sm:text-sm md:text-md font-medium shadow-sm hover:shadow-md transition-shadow duration-300">
                <FiZap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500 dark:text-blue-400" />
                Discover the Future of Wildlife
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 dark:text-white mb-6 leading-tight"
            >
              Where Nature Meets
              <br className="hidden md:block" />
              <motion.span 
                className="relative inline-block mt-2 md:mt-0"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Digital Innovation
              </motion.span>
            </motion.h1>

            {/* Subheading */}
            <motion.h3 
              variants={itemVariants}
              className="text-sm sm:text-md md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10"
            >
              Immerse yourself in a curated collection of amazing animals, brought
              to life <br className="hidden md:block" />
              through cutting-edge technology and interactive experiences.
            </motion.h3>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6"
            >
              <Link
                to="/gallery"
                className="flex items-center justify-center px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <motion.span 
                  className="mr-2"
                  whileHover={{ x: 2 }}
                >
                  Explore Gallery
                </motion.span>
                <motion.span 
                  className="arrow-icon"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <FiArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>

              <motion.a
                href="#about"
                className="px-8 py-3 md:px-10 md:py-4 border-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-300"
                whileHover={{ 
                  y: -2,
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" ref={aboutRef} className="relative overflow-hidden">
          <motion.div 
            className="absolute -bottom-20 -right-20 w-80 h-80 bg-green-100 rounded-full filter blur-3xl opacity-30 dark:bg-green-900 dark:opacity-20"
            animate={{
              rotate: [0, 5, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          <div className="container mx-auto px-6 py-20 md:py-32">
            <div className="max-w-6xl mx-auto">
              {/* Section Title */}
              <motion.div 
                variants={fadeIn}
                className="text-center mb-16"
              >
                <motion.h2 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4"
                  whileInView={{ y: [20, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  About{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    Zoolyst
                  </span>
                </motion.h2>
                <motion.div 
                  className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                />
              </motion.div>

              {/* Content Grid */}
              <div className="grid lg:grid-cols-3 gap-12 items-start">
                {/* Text Content */}
                <motion.div 
                  variants={containerVariants}
                  className="space-y-6 lg:col-span-2"
                >
                  {[
                    "Zoolyst redefines wildlife education through cutting-edge digital experiences. Our platform delivers instant access to comprehensive animal profiles, combining scientific accuracy with immersive storytelling to create meaningful connections between people and nature.",
                    "Every piece of content undergoes rigorous review by our team of wildlife biologists, ensuring the information you discover is both trustworthy and engaging. From students to researchers, we provide tools that adapt to various learning needs and styles.",
                    "The animal kingdom is constantly evolving, and so are we. With monthly updates featuring new species, behavioral insights, and conservation breakthroughs, Zoolyst keeps you at the forefront of wildlife discovery while supporting global preservation efforts."
                  ].map((text, index) => (
                    <motion.p 
                      key={index}
                      variants={slideUp}
                      className="text-md md:text-lg text-gray-600 dark:text-gray-300"
                    >
                      {text}
                    </motion.p>
                  ))}

                  <motion.div 
                    variants={slideUp}
                    className="pt-4 flex justify-center lg:justify-start"
                  >
                    <Link
                      to="/gallery"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                    >
                      Start Exploring
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Cards Section */}
                <motion.div 
                  variants={containerVariants}
                  className="grid grid-cols-1 gap-6"
                >
                  {[
                    {
                      icon: <FiZap className="w-8 h-8 text-blue-500" />,
                      title: "Fast Access",
                      description: "Instant loading of high-quality animal profiles with detailed information.",
                    },
                    {
                      icon: <FiShield className="w-8 h-8 text-green-500" />,
                      title: "Verified Data",
                      description: "All information is carefully researched and verified by wildlife experts.",
                    },
                    {
                      icon: <FiCalendar className="w-8 h-8 text-purple-500" />,
                      title: "Regular Updates",
                      description: "New species and features added monthly to keep content fresh.",
                    },
                  ].map((card, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500"
                      whileHover={{ 
                        y: -5,
                        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)"
                      }}
                    >
                      <div className="flex items-start">
                        <motion.div 
                          className="flex-shrink-0 mr-4"
                          whileHover={{ rotate: 15 }}
                        >
                          {card.icon}
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                            {card.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Stats or Features */}
              <motion.div 
                variants={containerVariants}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
              >
                {[
                  { number: "100+", label: "Species" },
                  { number: "24/7", label: "Access" },
                  { number: "4K", label: "Quality" },
                  { number: "Interactive", label: "Experiences" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.p 
                      className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2"
                      whileHover={{ scale: 1.1 }}
                    >
                      {item.number}
                    </motion.p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef} className="bg-white dark:bg-gray-800 py-16 md:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              variants={fadeIn}
              className="max-w-4xl mx-auto text-center mb-12 md:mb-16"
            >
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3 md:mb-4"
                whileInView={{ y: [20, 0], opacity: [0, 1] }}
                transition={{ duration: 0.6 }}
              >
                Get In Touch
              </motion.h2>
              <motion.p 
                className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                whileInView={{ y: [10, 0], opacity: [0, 1] }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Have questions or feedback? We'd love to hear from you.
              </motion.p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12"
            >
              {/* Contact Info */}
              <motion.div 
                variants={slideUp}
                className="space-y-4 md:space-y-6 flex flex-col justify-center"
              >
                {[
                  {
                    icon: <FiMail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />,
                    title: "Email Us",
                    details: [
                      "info@zoolyst.com",
                      "support@zoolyst.com"
                    ]
                  },
                  {
                    icon: <FiPhone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />,
                    title: "Call Us",
                    details: [
                      "+63-970-6553264",
                      "Mon-Fri: 9am-5pm"
                    ]
                  },
                  {
                    icon: <FiMapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />,
                    title: "Visit Us",
                    details: [
                      "Purok 4, Brgy Biyan",
                      "Calauag, Quezon, Philippines"
                    ]
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex-shrink-0 mr-3 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-1 sm:mb-2">
                        {item.title}
                      </h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}

                {/* Social Media Icons */}
                <motion.div 
                  className="pt-4 flex justify-center md:justify-start space-x-6"
                  variants={fadeIn}
                >
                  <a 
                    href="https://www.facebook.com/johnpaul.jamito.585" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://www.instagram.com/jay_p33333/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://github.com/Jayp33333" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-300"
                    aria-label="GitHub"
                  >
                    <FaGithub className="w-6 h-6" />
                  </a>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div 
                variants={scaleUp}
                className="bg-white dark:bg-gray-700 p-4 sm:p-6 rounded-xl shadow-md"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                }}
              >
                <motion.h3 
                  className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6"
                  whileInView={{ opacity: [0, 1], y: [10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  Send Us a Message
                </motion.h3>
                <form className="space-y-3 sm:space-y-4">
                  {[
                    { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                    { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                    { id: "message", label: "Message", type: "textarea", placeholder: "Your message..." }
                  ].map((field, index) => (
                    <motion.div 
                      key={field.id}
                      variants={fadeIn}
                      custom={index}
                      initial="hidden"
                      whileInView="visible"
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <label
                        htmlFor={field.id}
                        className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        {field.label}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea
                          id={field.id}
                          rows="3"
                          className="w-full px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                          placeholder={field.placeholder}
                        ></textarea>
                      ) : (
                        <input
                          type={field.type}
                          id={field.id}
                          className="w-full px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                          placeholder={field.placeholder}
                        />
                      )}
                    </motion.div>
                  ))}
                  <motion.button
                    type="submit"
                    className="w-full text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;  