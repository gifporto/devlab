import { useState, useEffect } from 'react';
import './index.css'
import { HeroParallax } from './components/ui/hero-parallax.tsx'
import project from './data/project.json'
import { HeroHighlight, Highlight } from './components/ui/hero-higlight.tsx';

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
  NavbarActions,
} from "@/components/ui/resizable-navbar.tsx"



const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "home" },
    { name: "About", link: "about" },
    { name: "Services", link: "services" },
    { name: "Contact", link: "contact" },
  ];

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
      <Navbar>
        <NavBody>
          <NavbarLogo />

          <NavItems
            items={navItems}
            onItemClick={() => setIsMobileMenuOpen(false)}
            // override onClick di NavItems:
            onItemClickCustom={(item) => {
              scrollTo(item);
              setIsMobileMenuOpen(false);
            }}
          />

          <NavbarActions>
            <NavbarButton
              onClick={toggleTheme}
              className="py-2 px-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? '🌞' : '🌙'}
            </NavbarButton>
          </NavbarActions>

        </NavBody>

        <MobileNav visible>
          <MobileNavHeader>
            <NavbarLogo />

            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            <NavItems
              items={navItems}
              onItemClick={() => setIsMobileMenuOpen(false)}
              onItemClickCustom={(item) => {
                scrollTo(item);
                setIsMobileMenuOpen(false);
              }}
              className="flex flex-col space-y-4"
            />

          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <section id="home">
        <HeroParallax products={project} />
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <HeroHighlight>
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
                  <Highlight className='text-white'>At DevLab - Adi Multi Digital (AMD)</Highlight>, we bridge the gap between complex business requirements
                  and cutting-edge technology solutions. Our team specializes in developing custom systems and
                  applications that are tailored to meet your specific needs.
                </p>
                <p className="text-text leading-relaxed">
                  We combine technical expertise with deep understanding of business processes to deliver
                  solutions that not only work flawlessly but also drive real business value.
                </p>

                <button
                  onClick={() => scrollTo('contact')}
                  className="mt-4 border-2 border-primary text-primary px-4 py-2 rounded-lg text-lg font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  Get In Touch
                </button>
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
        </HeroHighlight>
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
                icon: 'M3 4h18v16H3z M3 7h18 M6 11h12 M6 14h8 M6 17h10'
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
      <section id="portfolio" className="py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text mb-4">Our Portfolio</h2>
            <p className="text-xl text-gray-600">
              Successful projects that showcase our expertise and commitment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {project.map((project, index) => (
              <div key={index} className="bg-bg shadow-primary/15 outline-primary outline-1 rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden card-hover">
                <div className="flex items-center justify-center h-48 overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full object-contain"
                  />
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
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/70 transition-colors text-sm font-medium"
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
      <section id="contact" className="py-20 bg-primary/20">
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
            <div className="text-3xl font-bold text-primary mb-2">DevLab</div>
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