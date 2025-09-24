import React, { useState, useEffect, useRef } from "react";
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
  FiPlay,
  FiExternalLink,
} from "react-icons/fi";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleUp = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const AnimatedSection = ({ children, id, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
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

const WideGreenLightCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none w-[400px] h-[400px] rounded-full filter blur-[100px] opacity-30 z-0"
      style={{
        background:
          "radial-gradient(circle, rgba(46, 125, 50, 0.4) 0%, rgba(46, 125, 50, 0) 80%)",
        transform: `translate(calc(${position.x}px - 200px), calc(${position.y}px - 200px))`,
        transition: "transform 0.2s ease-out",
      }}
    />
  );
};

// Background Video Component
const BackgroundVideo = () => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Playlist of videos
  const videoSources = [
    "https://cdn.pixabay.com/video/2022/06/24/121952-724732135_large.mp4",
    "https://cdn.pixabay.com/video/2023/01/04/145320-786403437_tiny.mp4",
    "https://cdn.pixabay.com/video/2024/12/12/246390_large.mp4",
    "https://cdn.pixabay.com/video/2022/02/03/106567-673570274_large.mp4",
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, [currentVideoIndex]);

  // When a video ends, go to the next or loop back
  const handleVideoEnded = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === videoSources.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      {/* Fallback image in case video doesn't load */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop")',
          opacity: isLoaded ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
      />

      <video
        ref={videoRef}
        key={currentVideoIndex} // reload on change
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnded}
        onLoadedData={() => setIsLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <source src={videoSources[currentVideoIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20 z-20"></div>
    </div>
  );
};

// Enhanced sample animal data
const sampleAnimals = [
  {
    id: 1,
    name: "African Lion",
    scientificName: "Panthera leo",
    type: "Mammal",
    description:
      "The majestic king of the jungle, known for its impressive mane and powerful roar. Lions are social cats that live in prides and are apex predators in their ecosystem.",
    habitat: "Savannas, grasslands",
    diet: "Carnivore",
    lifespan: "10-14 years in wild",
    imageUrl:
      "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&h=400&fit=crop",
    features: ["Social animals", "Apex predator", "Nocturnal hunter"],
  },
  {
    id: 2,
    name: "Bald Eagle",
    scientificName: "Haliaeetus leucocephalus",
    type: "Bird",
    description:
      "America's national bird, symbolizing freedom and strength with its impressive 2.3m wingspan. Known for their incredible eyesight and fishing skills.",
    habitat: "Near water bodies",
    diet: "Carnivore",
    lifespan: "20-30 years",
    imageUrl:
      "https://images.unsplash.com/photo-1551085254-e96b210db58a?w=600&h=400&fit=crop",
    features: ["National symbol", "Excellent vision", "Monogamous"],
  },
  {
    id: 3,
    name: "Green Sea Turtle",
    scientificName: "Chelonia mydas",
    type: "Reptile",
    description:
      "Graceful marine reptiles that migrate thousands of miles across oceans. They play a crucial role in maintaining healthy seagrass beds and marine ecosystems.",
    habitat: "Tropical oceans",
    diet: "Herbivore",
    lifespan: "80-100 years",
    imageUrl:
      "https://d1jyxxz9imt9yb.cloudfront.net/medialib/4913/image/s768x1300/AdobeStock_381020782_449435_reduced.jpg",
    features: ["Long migrations", "Herbivorous", "Endangered"],
  },
  {
    id: 4,
    name: "Red-Eyed Tree Frog",
    scientificName: "Agalychnis callidryas",
    type: "Amphibian",
    description:
      "Vibrant amphibians with striking red eyes and colorful bodies found in rainforests. They are nocturnal and use their bright colors as a defense mechanism.",
    habitat: "Rainforests",
    diet: "Insectivore",
    lifespan: "5 years",
    imageUrl:
      "https://images.unsplash.com/photo-1559253664-ca249d4608c6?w=600&h=400&fit=crop",
    features: ["Nocturnal", "Colorful defense", "Tree dweller"],
  },
];

const AnimalFeatureCard = ({ animal }) => {
  return (
    <motion.div
      className="group relative bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-[#E0E0E0] cursor-pointer"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F8FFFE] to-[#F0F8F0] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

      {/* Content */}
      <div className="relative z-10">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={animal.imageUrl}
            alt={animal.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Type Badge */}
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="inline-flex items-center px-3 py-1.5 bg-white/95 backdrop-blur-sm text-[#2E7D32] text-sm font-semibold rounded-full border border-[#2E7D32] shadow-lg">
              {animal.type}
            </span>
          </div>

          {/* Scientific Name */}
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white/90 text-sm font-light bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
              {animal.scientificName}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-[#2E7D32] transition-colors duration-300">
              {animal.name}
            </h3>
            <p className="text-gray-600 leading-relaxed line-clamp-2">
              {animal.description}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#FFF8E1] rounded-lg flex items-center justify-center">
                <FiMapPin className="w-4 h-4 text-[#2E7D32]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Habitat</p>
                <p className="text-sm font-medium text-gray-700 truncate">
                  {animal.habitat}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#FFF8E1] rounded-lg flex items-center justify-center">
                <FiPlay className="w-4 h-4 text-[#2E7D32]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Diet</p>
                <p className="text-sm font-medium text-gray-700">
                  {animal.diet}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#FFF8E1] rounded-lg flex items-center justify-center">
                <FiCalendar className="w-4 h-4 text-[#2E7D32]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Lifespan</p>
                <p className="text-sm font-medium text-gray-700">
                  {animal.lifespan}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#FFF8E1] rounded-lg flex items-center justify-center">
                <FiZap className="w-4 h-4 text-[#2E7D32]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Features</p>
                <p className="text-sm font-medium text-gray-700">
                  {animal.features.length}
                </p>
              </div>
            </div>
          </div>

          {/* Features Tags */}
          <div className="flex flex-wrap gap-2">
            {animal.features.map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-1 bg-[#2E7D32]/10 text-[#2E7D32] text-xs font-medium rounded-full border border-[#2E7D32]/20"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Explore Button */}
          <div className="mt-4 pt-4 border-t border-[#E0E0E0]">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Learn more about {animal.name}
              </span>
              <div className="flex items-center space-x-1 text-[#2E7D32] group-hover:translate-x-1 transition-transform duration-300">
                <Link
                 to="/gallery"
                 className="text-sm font-medium">Explore</Link>
                <FiExternalLink className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Home = () => {
  const [activeLink, setActiveLink] = useState("home");
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          switch (entry.target.id) {
            case "home":
              setActiveLink("home");
              break;
            case "about":
              setActiveLink("about");
              break;
            case "contact":
              setActiveLink("contact");
              break;
            default:
              break;
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

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
      <WideGreenLightCursor />
      <HomeHeader activeLink={activeLink} setActiveLink={setActiveLink} />
      <main className="min-h-screen bg-white overflow-hidden">
        {/* Hero Section with Background Video */}
        <section
          id="home"
          ref={homeRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Background Video */}
          <BackgroundVideo />

          {/* Content Container */}
          <div className="container mx-auto px-6 py-32 md:py-40 text-center relative z-30">
            {/* Animated decorative elements */}
            <motion.div
              className="absolute top-20 left-10 w-20 h-20 bg-[#FFF8E1] rounded-full filter blur-xl opacity-50"
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-10 w-24 h-24 bg-[#E0E0E0] rounded-full filter blur-xl opacity-50"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            {/* Content */}
            <motion.div variants={containerVariants} className="relative z-40">
              {/* Tagline */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center mb-4"
              >
                <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white rounded-full px-4 py-1.5 text-xs sm:text-sm md:text-md font-medium shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30">
                  <FiZap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#FFF8E1]" />
                  Discover the Future of Wildlife
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-2xl "
              >
                Where Nature Meets
                <br className="hidden md:block" />
                <motion.span className="relative inline-block mt-2 md:mt-0 text-[#FFF8E1]">
                  Digital Innovation
                </motion.span>
              </motion.h1>

              {/* Subheading */}
              <motion.h3
                variants={itemVariants}
                className="text-sm sm:text-md md:text-xl text-white/90 max-w-3xl mx-auto mb-10 drop-shadow-lg"
              >
                Immerse yourself in a curated collection of amazing animals,
                brought to life <br className="hidden md:block" />
                through cutting-edge technology and interactive experiences.
              </motion.h3>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-20"
              >
                <Link
                  to="/gallery"
                  className="relative flex items-center justify-center px-8 py-3 md:px-10 md:py-4 
             bg-gradient-to-b from-[#0D5B10] via-[#187C19] to-[#69B31E] 
             text-white font-medium rounded-lg shadow-xl 
             hover:shadow-2xl transition-all duration-300 group 
             overflow-hidden"
                >
                  {/* Glossy highlight */}
                  <span className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent opacity-30" />

                  <motion.span
                    className="mr-2 relative z-10"
                    whileHover={{ x: 2 }}
                  >
                    Explore Gallery
                  </motion.span>
                  <motion.span
                    className="arrow-icon relative z-10"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  >
                    <FiArrowRight className="w-5 h-5" />
                  </motion.span>
                </Link>

                <motion.a
                  href="#about"
                  className="px-8 py-3 md:px-10 md:py-4 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-[#2E7D32] transition-all duration-300 backdrop-blur-sm bg-white/10"
                  whileHover={{
                    y: -2,
                    boxShadow: "0 8px 25px rgba(255, 255, 255, 0.2)",
                  }}
                >
                  Learn More
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Featured Animals Section */}
        <section
          id="featured"
          className="relative bg-gradient-to-b from-white to-[#F8FFFE] py-20 md:py-32"
        >
          <div className="container mx-auto px-6">
            <motion.div variants={fadeIn} className="text-center mb-16">
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
                whileInView={{ y: [20, 0], opacity: [0, 1] }}
                transition={{ duration: 0.6 }}
              >
                Featured <span className="text-[#2E7D32]">Wildlife</span>
              </motion.h2>
              <motion.p
                className="text-lg text-gray-600 max-w-2xl mx-auto"
                whileInView={{ y: [10, 0], opacity: [0, 1] }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Explore our curated collection of fascinating animals from
                around the world
              </motion.p>
            </motion.div>

            {/* Big Animal Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {sampleAnimals.map((animal, index) => (
                <motion.div
                  key={animal.id}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <AnimalFeatureCard animal={animal} />
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            <motion.div
              className="mt-12 text-center"
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link
                to="/gallery"
                className="inline-flex items-center px-8 py-3 bg-white text-[#2E7D32] font-medium rounded-lg shadow-lg hover:shadow-xl border-2 border-[#2E7D32] hover:bg-[#2E7D32] hover:text-white transition-all duration-300"
              >
                View All Animals
                <FiArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <AnimatedSection
          id="about"
          ref={aboutRef}
          className="relative overflow-hidden bg-white"
        >
          <motion.div
            className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#2E7D32] rounded-full filter blur-3xl opacity-10"
            animate={{
              rotate: [0, 5, 0],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <div className="container mx-auto px-6 py-20 md:py-32">
            <div className="max-w-6xl mx-auto">
              {/* Section Title */}
              <motion.div variants={fadeIn} className="text-center mb-16">
                <motion.h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
                  whileInView={{ y: [20, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  About <span className="text-[#2E7D32]">Zoolyst</span>
                </motion.h2>
                <motion.div
                  className="w-20 h-1 bg-[#2E7D32] mx-auto rounded-full"
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
                    "The animal kingdom is constantly evolving, and so are we. With monthly updates featuring new species, behavioral insights, and conservation breakthroughs, Zoolyst keeps you at the forefront of wildlife discovery while supporting global preservation efforts.",
                  ].map((text, index) => (
                    <motion.p
                      key={index}
                      variants={slideUp}
                      className="text-md md:text-lg text-gray-700"
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
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#2E7D32] hover:bg-[#1B5E20] transition-colors duration-300"
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
                      icon: <FiZap className="w-8 h-8 text-[#2E7D32]" />,
                      title: "Fast Access",
                      description:
                        "Instant loading of high-quality animal profiles with detailed information.",
                    },
                    {
                      icon: <FiShield className="w-8 h-8 text-[#2E7D32]" />,
                      title: "Verified Data",
                      description:
                        "All information is carefully researched and verified by wildlife experts.",
                    },
                    {
                      icon: <FiCalendar className="w-8 h-8 text-[#2E7D32]" />,
                      title: "Regular Updates",
                      description:
                        "New species and features added monthly to keep content fresh.",
                    },
                  ].map((card, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#2E7D32]"
                      whileHover={{
                        y: -5,
                        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
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
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {card.title}
                          </h3>
                          <p className="text-gray-600">{card.description}</p>
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
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center border border-[#E0E0E0]"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.p
                      className="text-3xl font-bold text-[#2E7D32] mb-2"
                      whileHover={{ scale: 1.1 }}
                    >
                      {item.number}
                    </motion.p>
                    <p className="text-gray-600">{item.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection
          id="contact"
          ref={contactRef}
          className="bg-white py-16 md:py-32"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              variants={fadeIn}
              className="max-w-4xl mx-auto text-center mb-12 md:mb-16"
            >
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4"
                whileInView={{ y: [20, 0], opacity: [0, 1] }}
                transition={{ duration: 0.6 }}
              >
                Get In Touch
              </motion.h2>
              <motion.p
                className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
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
                    icon: (
                      <FiMail className="w-5 h-5 sm:w-6 sm:h-6 text-[#2E7D32]" />
                    ),
                    title: "Email Us",
                    details: ["info@zoolyst.com", "support@zoolyst.com"],
                  },
                  {
                    icon: (
                      <FiPhone className="w-5 h-5 sm:w-6 sm:h-6 text-[#2E7D32]" />
                    ),
                    title: "Call Us",
                    details: ["+63-970-6553264", "Mon-Fri: 9am-5pm"],
                  },
                  {
                    icon: (
                      <FiMapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#2E7D32]" />
                    ),
                    title: "Visit Us",
                    details: [
                      "Purok 4, Brgy Biyan",
                      "Calauag, Quezon, Philippines",
                    ],
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex-shrink-0 mr-3 mt-0.5">{item.icon}</div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
                        {item.title}
                      </h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-xs sm:text-sm text-gray-600">
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
                    className="text-gray-500 hover:text-[#2E7D32] transition-colors duration-300"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.instagram.com/jay_p33333/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-[#2E7D32] transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="w-6 h-6" />
                  </a>
                  <a
                    href="https://github.com/Jayp33333"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-800 transition-colors duration-300"
                    aria-label="GitHub"
                  >
                    <FaGithub className="w-6 h-6" />
                  </a>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                variants={scaleUp}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-[#E0E0E0]"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                }}
              >
                <motion.h3
                  className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6"
                  whileInView={{ opacity: [0, 1], y: [10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  Send Us a Message
                </motion.h3>
                <form className="space-y-3 sm:space-y-4">
                  {[
                    {
                      id: "name",
                      label: "Name",
                      type: "text",
                      placeholder: "Your name",
                    },
                    {
                      id: "email",
                      label: "Email",
                      type: "email",
                      placeholder: "your@email.com",
                    },
                    {
                      id: "message",
                      label: "Message",
                      type: "textarea",
                      placeholder: "Your message...",
                    },
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
                        className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                      >
                        {field.label}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea
                          id={field.id}
                          rows="3"
                          className="w-full px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm border border-[#E0E0E0] rounded-md focus:ring-[#2E7D32] focus:border-[#2E7D32] bg-white text-gray-800"
                          placeholder={field.placeholder}
                        ></textarea>
                      ) : (
                        <input
                          type={field.type}
                          id={field.id}
                          className="w-full px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm border border-[#E0E0E0] rounded-md focus:ring-[#2E7D32] focus:border-[#2E7D32] bg-white text-gray-800"
                          placeholder={field.placeholder}
                        />
                      )}
                    </motion.div>
                  ))}
                  <motion.button
                    type="submit"
                    className="w-full text-xs sm:text-sm bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedSection>
      </main>
    </>
  );
};

export default Home;
