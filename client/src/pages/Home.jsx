  import React from 'react'
  import { Link } from 'react-router-dom'
  import HomeHeader from '../components/HomeHeader'
  const Home = () => {
    return (
      <>
        <HomeHeader />
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
          {/* Hero Section */}
          <section id='home' className='container mx-auto px-6 py-32 md:py-40 text-center'>
            {/* Animated decorative elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-blue-100 rounded-full filter blur-xl opacity-70 dark:bg-blue-900 dark:opacity-30 animate-float"></div>
            <div className="absolute bottom-1/4 right-10 w-24 h-24 bg-blue-100 rounded-full filter blur-xl opacity-70 dark:bg-blue-900 dark:opacity-30 animate-float-delay"></div>
            
            {/* Tagline */}
            <div className='flex items-center justify-center mb-4 animate-fade-in'>
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
                to='/gallery' 
                className="flex items-center justify-center px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <span className="mr-2">Explore Gallery</span>
                <span className="arrow-icon transform group-hover:translate-x-1 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
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

          <section id='about' className="relative overflow-hidden">
            {/* Decorative background elements */}

            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-green-100 rounded-full filter blur-3xl opacity-30 dark:bg-green-900 dark:opacity-20"></div>
  
            <div className='container mx-auto px-6 py-20 md:py-32'>
              <div className="max-w-4xl mx-auto">
                {/* Section Title */}
                <div className="text-center mb-16 animate-fade-in-up">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                    About <span className="text-blue-600 dark:text-blue-400">Zoolyst</span>
                  </h2>
                </div>
      
              {/* Content Grid */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="space-y-6 animate-fade-in-up delay-100">
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Zoolyst is a digital wildlife experience crafted to educate,
                    inspire, and connect people with the wonders of the animal kingdom.
                    Our mission is to showcase diverse species from around the world
                    through a vibrant and interactive platform.
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Whether you're a student, teacher, researcher, or animal enthusiast,
                    Zoolyst provides a curated gallery that blends science, design, and
                    technology to bring animals to life.
                  </p>
                  <div className="pt-4">
                    <Link 
                      to="/gallery" 
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                    >
                      Start Exploring
                    </Link>
                  </div>
                </div>
                
                {/* Visual Element - Replace with your preferred image/illustration */}
                <div className="relative animate-fade-in-up delay-200">
                  <div className="relative aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden shadow-xl">
                    {/* Placeholder for about image - replace with actual image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                      <svg className="w-1/2 h-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -z-10 -top-6 -right-6 w-32 h-32 bg-blue-200 rounded-full opacity-20 dark:opacity-10"></div>
                  <div className="absolute -z-10 -bottom-6 -left-6 w-40 h-40 bg-green-200 rounded-full opacity-20 dark:opacity-10"></div>
                </div>
              </div>
              
              {/* Stats or Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-fade-in-up delay-300">
                {[
                  { number: '100+', label: 'Species' },
                  { number: '24/7', label: 'Access' },
                  { number: '4K', label: 'Quality' },
                  { number: 'Interactive', label: 'Experiences' }
                ].map((item, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{item.number}</p>
                    <p className="text-gray-600 dark:text-gray-300">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        </main>
      </>
    )
  }

  export default Home