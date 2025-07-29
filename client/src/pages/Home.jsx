import React from "react";
import { Link } from "react-router-dom";
import HomeHeader from "../components/HomeHeader";
const Home = () => {
  return (
    <>
      <HomeHeader />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section
          id="home"
          className="container mx-auto px-6 py-32 md:py-40 text-center"
        >
          {/* Animated decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-100 rounded-full filter blur-xl opacity-70 dark:bg-blue-900 dark:opacity-30 animate-float"></div>
          <div className="absolute bottom-1/4 right-10 w-24 h-24 bg-blue-100 rounded-full filter blur-xl opacity-70 dark:bg-blue-900 dark:opacity-30 animate-float-delay"></div>

          {/* Tagline */}
          <div className="flex items-center justify-center mb-4 animate-fade-in">
            <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-full px-4 py-1.5 text-xs sm:text-sm md:text-md font-medium shadow-sm hover:shadow-md transition-shadow duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
                  clipRule="evenodd"
                />
              </svg>
              Discover the Future of Wildlife
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 dark:text-white mb-6 leading-tight animate-fade-in-up">
            Where Nature Meets
            <br className="hidden md:block" />
            <span className="relative inline-block mt-2 md:mt-0">
              Digital Innovation
            </span>
          </h1>

          {/* Subheading */}
          <h3 className="text-sm sm:text-md md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 animate-fade-in-up delay-100">
            Immerse yourself in a curated collection of amazing animals, brought
            to life <br className="hidden md:block" />
            through cutting-edge technology and interactive experiences.
          </h3>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 animate-fade-in-up delay-200">
            <Link
              to="/gallery"
              className="flex items-center justify-center px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <span className="mr-2">Explore Gallery</span>
              <span className="arrow-icon transform group-hover:translate-x-1 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Link>

            <a
              href="#about"
              className="px-8 py-3 md:px-10 md:py-4 border-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              Learn More
            </a>
          </div>

          {/* Hero Image or Animal Collection or Illustration would go here */}
        </section>

        {/* About Section */}
        <section id="about" className="relative overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-green-100 rounded-full filter blur-3xl opacity-30 dark:bg-green-900 dark:opacity-20"></div>

          <div className="container mx-auto px-6 py-20 md:py-32">
            <div className="max-w-6xl mx-auto">
              {/* Section Title */}
              <div className="text-center mb-16 animate-fade-in-up">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                  About{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    Zoolyst
                  </span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto rounded-full"></div>
              </div>

              {/* Content Grid */}
              <div className="grid lg:grid-cols-3 gap-12 items-start">
                {/* Text Content */}
                <div className="space-y-6 animate-fade-in-up delay-100 lg:col-span-2">
                  <p className="text-md md:text-lg text-gray-600 dark:text-gray-300">
                    Zoolyst redefines wildlife education through cutting-edge
                    digital experiences. Our platform delivers{" "}
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      instant access
                    </span>{" "}
                    to comprehensive animal profiles, combining scientific
                    accuracy with immersive storytelling to create meaningful
                    connections between people and nature.
                  </p>

                  <p className="text-md md:text-lg text-gray-600 dark:text-gray-300">
                    Every piece of content undergoes rigorous review by our{" "}
                    <span className="font-medium text-green-600 dark:text-green-400">
                      team of wildlife biologists
                    </span>
                    , ensuring the information you discover is both trustworthy
                    and engaging. From students to researchers, we provide tools
                    that adapt to various learning needs and styles.
                  </p>

                  <p className="text-md md:text-lg text-gray-600 dark:text-gray-300">
                    The animal kingdom is constantly evolving, and so are we.
                    With{" "}
                    <span className="font-medium text-purple-600 dark:text-purple-400">
                      monthly updates
                    </span>{" "}
                    featuring new species, behavioral insights, and conservation
                    breakthroughs, Zoolyst keeps you at the forefront of
                    wildlife discovery while supporting global preservation
                    efforts.
                  </p>

                  <div className="pt-4 flex justify-center lg:justify-start">
                    <Link
                      to="/gallery"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                    >
                      Start Exploring
                    </Link>
                  </div>
                </div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 gap-6 animate-fade-in-up delay-200">
                  {[
                    {
                      icon: (
                        <svg
                          className="w-8 h-8 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          ></path>
                        </svg>
                      ),
                      title: "Fast Access",
                      description:
                        "Instant loading of high-quality animal profiles with detailed information.",
                    },
                    {
                      icon: (
                        <svg
                          className="w-8 h-8 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          ></path>
                        </svg>
                      ),
                      title: "Verified Data",
                      description:
                        "All information is carefully researched and verified by wildlife experts.",
                    },
                    {
                      icon: (
                        <svg
                          className="w-8 h-8 text-purple-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                      ),
                      title: "Regular Updates",
                      description:
                        "New species and features added monthly to keep content fresh.",
                    },
                  ].map((card, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">{card.icon}</div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                            {card.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats or Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-fade-in-up delay-300">
                {[
                  { number: "100+", label: "Species" },
                  { number: "24/7", label: "Access" },
                  { number: "4K", label: "Quality" },
                  { number: "Interactive", label: "Experiences" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
                  >
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {item.number}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="bg-white dark:bg-gray-800 py-16 md:py-32"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3 md:mb-4">
                Get In Touch
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Have questions or feedback? We'd love to hear from you.
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Contact Info */}
              <div className="space-y-4 md:space-y-6 flex flex-col justify-center">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-0.5">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-1 sm:mb-2">
                      Email Us
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      info@zoolyst.vercel.app
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      support@zoolyst.vercel.app
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-0.5">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-1 sm:mb-2">
                      Call Us
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      +63-970-6553264
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      Mon-Fri: 9am-5pm
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-0.5">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-1 sm:mb-2">
                      Visit Us
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      Purok 4, Brgy Biyan
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      Calauag, Quezon, Philippines
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white dark:bg-gray-700 p-4 sm:p-6 rounded-xl shadow-md">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6">
                  Send Us a Message
                </h3>
                <form className="space-y-3 sm:space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="3"
                      className="w-full px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
