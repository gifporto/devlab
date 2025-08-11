import { useState, useEffect } from 'react';
import './index.css'

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isDark, setIsDark] = useState(false);

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
      const scrollPosition = window.pageYOffset + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    // Saat load, cek mode sebelumnya di localStorage
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="bg-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-bg backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-primary">DevLab</div>
              <div className="ml-2 text-sm text-text"> AMDigital</div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex space-x-8">
                {['home', 'about', 'services', 'portfolio', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollTo(item)}
                    className={`px-3 py-2 text-sm font-medium transition-colors relative
    ${activeSection === item
                        ? 'text-primary font-semibold border-b-2 border-primary'
                        : 'text-text hover:text-primary border-b-2 border-transparent'
                      }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>

                ))}
                <button
                  onClick={toggleTheme}
                  className="px-3 py-1 rounded border"
                  style={{
                    borderColor: "var(--color-primary)",
                    color: "var(--color-primary)"
                  }}
                >
                  {isDark ? "☀️" : "🌙"}
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-text hover:text-primary"
              >
                {!mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden bg-bg border-t border-gray-200 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {['home', 'about', 'services', 'portfolio', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  scrollTo(item);
                  setMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 text-base font-medium text-text hover:text-primary hover:bg-gray-50 w-full text-left ${activeSection === item ? 'text-primary' : ''
                  }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center bg-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-text mb-6">
              <span className="gradient-text">DevLab</span>
              <br />
              <span className="text-3xl md:text-4xl text-text">Adi Multi Digital</span>
            </h1>
            <p className="text-xl md:text-2xl text-text mb-8 max-w-3xl mx-auto">
              Your trusted software agent for developing and delivering custom systems and applications
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollTo('portfolio')}
                className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/70 transition-colors inline-flex items-center justify-center"
              >
                View Our Work
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="border-2 border-primary text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text mb-4">About DevLab</h2>
            <p className="text-xl text-text max-w-3xl mx-auto">
              We are a specialized software development agency focused on creating innovative solutions
              that drive business growth and digital transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-text mb-6">Our Mission</h3>
              <p className="text-text mb-6 leading-relaxed">
                At DevLab - Adi Multi Digital (AMD), we bridge the gap between complex business requirements
                and cutting-edge technology solutions. Our team specializes in developing custom systems and
                applications that are tailored to meet your specific needs.
              </p>
              <p className="text-text leading-relaxed">
                We combine technical expertise with deep understanding of business processes to deliver
                solutions that not only work flawlessly but also drive real business value.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-primary/10">
              <h4 className="text-2xl font-bold text-text mb-4">Our Expertise</h4>
              <div className="space-y-3">
                {[
                  'Web & Mobile Technology',
                  'System Security',
                  'API Integration',
                  'Cloud Services',
                  'SaaS Solutions'
                ].map((item) => (
                  <div key={item} className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span className="text-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">
              Comprehensive technology solutions for your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Web Development',
                description: 'Custom web applications built with modern technologies and frameworks',
                icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
              },
              {
                title: 'Mobile Development',
                description: 'Native and cross-platform mobile applications for iOS and Android',
                icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
              },
              {
                title: 'System Security',
                description: 'Comprehensive security solutions to protect your digital assets',
                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
              }
            ].map((service, index) => (
              <div key={index} className="bg-bg p-8 rounded-xl shadow-sm hover:shadow-lg transition-all card-hover">
                <div className="mb-6">
                  <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={service.icon}></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-text mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text mb-4">Our Portfolio</h2>
            <p className="text-xl text-gray-600">
              Successful projects that showcase our expertise and commitment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: 'E-Sign Application',
                description: 'Digital signature solution for secure document signing and verification',
                tags: ['Laravel', 'React/Vue.js', 'Digital Certificates'],
                demoUrl: 'https://demo-esign.devlab-amd.com',
                icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
                bgColor: 'bg-blue-50',
                iconColor: 'text-primary'
              },
              {
                title: 'Tracer Study Survey',
                description: 'Comprehensive survey system for university alumni tracking and analysis',
                tags: ['Laravel', 'React/Vue.js', 'MySQL', 'Analytics Dashboard'],
                demoUrl: 'https://demo-tracer.devlab-amd.com',
                icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
                bgColor: 'bg-green-50',
                iconColor: 'text-green-600'
              },
              {
                title: 'Academic System',
                description: 'Complete school management system for academic administration',
                tags: ['React', 'Laravel', 'PostgreSQL', 'Real-time Features'],
                demoUrl: 'https://demo-academic.devlab-amd.com',
                icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm0 0l9-5-9-5-9 5 9 5z',
                bgColor: 'bg-purple-50',
                iconColor: 'text-purple-600'
              },
              {
                title: 'Quality Monitoring Dashboard',
                description: 'Real-time quality monitoring system for university performance tracking and analytics',
                tags: ['React', 'Laravel', 'MySQL', 'Chart', 'Real-time Analytics'],
                demoUrl: 'https://demo-quality.devlab-amd.com',
                icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
                bgColor: 'bg-orange-50',
                iconColor: 'text-orange-600'
              }
            ].map((project, index) => (
              <div key={index} className="bg-bg rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden card-hover">
                <div className={`${project.bgColor} flex items-center justify-center h-48`}>
                  <svg className={`w-24 h-24 ${project.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={project.icon}></path>
                  </svg>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-text mb-4">{project.title}</h3>
                  <p className="text-text mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-primary/5 text-primary text-sm rounded-full">{tag}</span>
                    ))}
                  </div>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    View Demo
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-primary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text mb-4">Let's Work Together</h2>
            <p className="text-xl text-text">
              Ready to transform your ideas into powerful digital solutions?
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-text mb-8">Get In Touch</h3>
              <div className="space-y-6">
                <div className="flex items-center text-text">
                  <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>devlab@amdigital.id</span>
                </div>
                <div className="flex items-center text-text">
                  <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span>+6281292888954 - Supriyanto (devlab manager)</span>
                </div>
                <div className="flex items-center text-text">
                  <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>Yogyakarta, Indonesia</span>
                </div>
              </div>
            </div>

            <div className="bg-white backdrop-blur-sm p-8 rounded-xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-100 border border-white/30 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-100 border border-white/30 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-100 border border-white/30 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="w-full bg-primary/10 text-primary py-3 px-6 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
                  onClick={() => alert('Contact form integration with your backend required')}
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">DevLab</div>
            <div className="text-gray-400 mb-4">Adi Multi Digital (AMD)</div>
            <p className="text-gray-400 mb-8">
              Transforming ideas into powerful digital solutions
            </p>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} DevLab Adi Multi Digital. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;