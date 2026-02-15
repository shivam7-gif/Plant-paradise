"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PlantParadise() {
  const [activeSection, setActiveSection] = useState("home");
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "features",
        "how-it-works",
        "marketplace",
        "services",
        "why-us",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-cream font-sans text-forest overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-md border-b border-primary-green/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-2xl font-playfair font-bold text-primary-green cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <span className="text-3xl">🌿</span>
            Plant Paradise
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {[
              { id: "features", label: "Features" },
              { id: "how-it-works", label: "How It Works" },
              { id: "marketplace", label: "Marketplace" },
              { id: "services", label: "Services" },
              { id: "why-us", label: "Why Us" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-all relative ${
                  activeSection === item.id
                    ? "text-accent-green"
                    : "text-primary-green"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-green"
                  />
                )}
              </button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block bg-primary-green text-cream px-6 py-2.5 rounded-full font-semibold hover:bg-accent-green transition-all"
          >
            Get Started
          </motion.button>

          <button className="md:hidden text-2xl">☰</button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden"
      >
        <motion.div
          className="absolute top-20 right-[-100px] w-[500px] h-[500px] rounded-full bg-light-green/40 blur-3xl"
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="font-playfair text-5xl md:text-7xl font-bold text-primary-green mb-6 leading-tight"
              style={{ opacity, scale }}
            >
              Discover the{" "}
              <span className="text-accent-green block">Green World</span>{" "}
              Around You
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-forest/80 mb-8 leading-relaxed"
            >
              Instantly identify any plant with AI-powered technology. Get
              personalized care tips, connect with expert gardeners, and build
              your perfect garden paradise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-green text-cream px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-2xl transition-all"
              >
                <span>🔍</span> Identify a Plant
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-primary-green text-primary-green px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-green hover:text-cream transition-all"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full aspect-square bg-gradient-to-br from-light-green to-sage rounded-[40px] shadow-2xl flex items-center justify-center overflow-hidden">
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-9xl"
              >
                🌿
              </motion.div>
              <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full"
                style={{
                  backgroundImage: "url('/hero-plants-1.jpg')",
                  backgroundColor: "rgba(255,255,255,0.85)",
                  backgroundBlendMode: "overlay",
                }}
              >
                <p className="font-playfair text-primary-green font-semibold">
                  AI Plant Recognition
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-24 px-6 bg-gradient-to-b from-light-green/50 to-cream"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-5xl font-bold text-primary-green mb-4">
              Powerful Features for Plant Lovers
            </h2>
            <p className="text-xl text-forest/70 max-w-2xl mx-auto">
              Everything you need to identify, care for, and grow your plant
              collection
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "📸",
                title: "Instant AI Recognition",
                description:
                  "Simply snap a photo of any plant leaf and our advanced AI instantly identifies it with incredible accuracy. Get results in seconds with detailed botanical information.",
              },
              {
                icon: "📚",
                title: "Complete Plant Database",
                description:
                  "Access comprehensive information including scientific names, origins, descriptions, growth patterns, and interesting facts about thousands of plant species.",
              },
              {
                icon: "💧",
                title: "Personalized Care Plans",
                description:
                  "Receive tailored care instructions for sunlight, watering schedules, soil requirements, pest management, and propagation techniques specific to each plant.",
              },
              {
                icon: "🔔",
                title: "Smart Reminders",
                description:
                  "Never forget to water again! Get intelligent notifications based on your plant's specific needs, weather conditions, and growth stage.",
              },
              {
                icon: "🛒",
                title: "Plant Marketplace",
                description:
                  "Buy and sell plants directly with our community. Find rare species, share cuttings, and connect with fellow plant enthusiasts in your area.",
              },
              {
                icon: "👨‍🌾",
                title: "Expert Gardeners",
                description:
                  "Book verified local gardeners for professional consultations, garden maintenance, or landscaping projects. Get expert help whenever you need it.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group"
              >
                <motion.div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-green to-sage origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-playfair text-2xl font-semibold text-primary-green mb-3">
                  {feature.title}
                </h3>
                <p className="text-forest/80 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-5xl font-bold text-primary-green mb-4">
              How Plant Paradise Works
            </h2>
            <p className="text-xl text-forest/70">
              From identification to cultivation in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {[
              {
                number: "1",
                title: "Scan Your Plant",
                description:
                  "Take a clear photo of the plant leaf using your phone or upload an existing image",
              },
              {
                number: "2",
                title: "Get Instant Results",
                description:
                  "Our AI analyzes the image and provides complete identification with botanical details",
              },
              {
                number: "3",
                title: "Care & Grow",
                description:
                  "Follow personalized care instructions, set reminders, and watch your garden thrive",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center relative"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 bg-primary-green text-cream rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg"
                >
                  {step.number}
                </motion.div>
                <h3 className="font-playfair text-2xl font-semibold text-primary-green mb-3">
                  {step.title}
                </h3>
                <p className="text-forest/80">{step.description}</p>

                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-[60%] text-4xl text-sage/30">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace */}
      <section id="marketplace" className="py-24 px-6 bg-light-green/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-playfair text-4xl font-bold text-primary-green mb-6">
                🛒 Thriving Plant Marketplace
              </h3>
              <p className="text-lg text-forest/80 mb-6 leading-relaxed">
                Join our vibrant community of plant enthusiasts buying and
                selling plants directly. Whether you're looking for rare
                species, sharing cuttings, or clearing space in your collection,
                our marketplace makes it easy.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Buy and sell plants with verified community members",
                  "Browse by location to find plants near you",
                  "Secure payment processing and buyer protection",
                  "Detailed plant health reports and photos",
                  "Rate and review sellers for trust and transparency",
                  "Local pickup or shipping options available",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-accent-green text-xl font-bold mt-1">
                      ✓
                    </span>
                    <span className="text-forest/80">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-green text-cream px-8 py-4 rounded-full font-semibold hover:bg-accent-green transition-all"
              >
                Explore Marketplace
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <div className="grid grid-cols-3 gap-4">
                {["🌵", "🪴", "🌱", "🌿", "🌺", "🌻"].map((emoji, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="aspect-square bg-light-green rounded-2xl flex items-center justify-center text-6xl cursor-pointer"
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-sage to-accent-green rounded-3xl p-12 shadow-2xl text-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="text-8xl mb-6"
              >
                👨‍🌾
              </motion.div>
              <div className="bg-white/90 rounded-2xl p-6 mb-4">
                <h4 className="font-playfair text-2xl font-bold text-primary-green">
                  Expert Gardener John
                </h4>
              </div>
              <div className="flex items-center justify-center gap-4 text-cream">
                <span className="text-3xl">⭐⭐⭐⭐⭐</span>
                <span className="text-xl font-semibold">4.9 Rating</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-playfair text-4xl font-bold text-primary-green mb-6">
                👨‍🌾 Professional Gardening Services
              </h3>
              <p className="text-lg text-forest/80 mb-6 leading-relaxed">
                Connect with verified, experienced gardeners in your area for
                personalized consultations, maintenance, and landscaping
                projects. Get professional help to transform your outdoor space.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Book nearby gardeners with verified credentials",
                  "Choose from consultations, maintenance, or full projects",
                  "View detailed profiles, reviews, and ratings",
                  "Get instant quotes and schedule appointments",
                  "Video consultations available for quick questions",
                  "Satisfaction guaranteed with our service promise",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-accent-green text-xl font-bold mt-1">
                      ✓
                    </span>
                    <span className="text-forest/80">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-green text-cream px-8 py-4 rounded-full font-semibold hover:bg-accent-green transition-all"
              >
                Find a Gardener
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        id="why-us"
        className="py-24 px-6 bg-gradient-to-b from-light-green/30 to-cream"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-5xl font-bold text-primary-green mb-4">
              Why Plant Paradise Stands Out
            </h2>
            <p className="text-xl text-forest/70">
              We're not just another plant app. Here's what makes us different.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "99.5% Accuracy Rate",
                description:
                  "Our AI model is trained on over 10 million plant images, delivering industry-leading identification accuracy that outperforms competitors by 15%.",
              },
              {
                icon: "⚡",
                title: "Lightning Fast Results",
                description:
                  "Get plant identification in under 3 seconds. Our optimized algorithms process images instantly, while others take 10-30 seconds.",
              },
              {
                icon: "🌍",
                title: "Global Plant Database",
                description:
                  "Access information on 400,000+ plant species from every continent, including rare and exotic varieties not found elsewhere.",
              },
              {
                icon: "🧠",
                title: "Smart Learning System",
                description:
                  "Our AI learns from every identification, continuously improving accuracy. Plus, it remembers your garden to provide personalized insights.",
              },
              {
                icon: "💬",
                title: "Community Support",
                description:
                  "Get help from expert botanists and passionate gardeners. Share knowledge, trade plants, and grow together as a community.",
              },
              {
                icon: "🔒",
                title: "Privacy First",
                description:
                  "Your garden data is yours alone. We never sell your information and use encryption to protect your personal plant collection.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 border-2 border-light-green hover:border-accent-green transition-all shadow-lg"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h4 className="font-playfair text-xl font-semibold text-primary-green mb-3">
                  {item.title}
                </h4>
                <p className="text-forest/80 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-primary-green to-accent-green relative overflow-hidden">
        <div className="absolute text-[15rem] opacity-5 top-1/2 left-[10%] -translate-y-1/2 -rotate-12">
          🌿
        </div>
        <div className="absolute text-[12rem] opacity-5 top-1/2 right-[10%] -translate-y-1/2 rotate-12">
          🌱
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="font-playfair text-5xl font-bold text-cream mb-6">
            Start Your Plant Journey Today
          </h2>
          <p className="text-xl text-cream/90 mb-10 leading-relaxed">
            Join over 500,000 plant lovers using Plant Paradise to identify,
            care for, and grow their perfect garden.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-cream text-primary-green px-10 py-5 rounded-full font-bold text-lg hover:bg-peach transition-all shadow-2xl"
          >
            Get Started Free 🌱
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-forest text-cream py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-playfair text-2xl font-bold mb-4">
                🌿 Plant Paradise
              </h3>
              <p className="text-cream/70 mb-6 leading-relaxed">
                Your AI-powered companion for plant identification, care, and
                community. Bringing nature and technology together.
              </p>
              <div className="flex gap-3">
                {["📘", "📸", "🐦", "📺"].map((emoji, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center hover:bg-accent-green transition-all"
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Download App", "API Access"],
              },
              {
                title: "Resources",
                links: [
                  "Plant Care Guide",
                  "Blog",
                  "Community Forum",
                  "Help Center",
                ],
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Contact", "Privacy Policy"],
              },
            ].map((column, index) => (
              <div key={index}>
                <h4 className="font-playfair text-lg font-semibold mb-4">
                  {column.title}
                </h4>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button className="text-cream/70 hover:text-cream hover:pl-1 transition-all">
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-cream/10 pt-8 text-center text-cream/60">
            <p>
              &copy; 2026 Plant Paradise. All rights reserved. Made with 💚 for
              plant lovers.
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap");

        :root {
          --primary-green: #2d5016;
          --accent-green: #4a7c2c;
          --light-green: #e8f5e0;
          --cream: #fff8f0;
          --sage: #9caf88;
          --forest: #1a3409;
          --peach: #ffb4a2;
          --terracotta: #d97757;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: "DM Sans", sans-serif;
          background: var(--cream);
          color: var(--forest);
        }

        .font-playfair {
          font-family: "Playfair Display", serif;
        }

        .bg-cream {
          background-color: var(--cream);
        }

        .bg-primary-green {
          background-color: var(--primary-green);
        }

        .bg-accent-green {
          background-color: var(--accent-green);
        }

        .bg-light-green {
          background-color: var(--light-green);
        }

        .bg-sage {
          background-color: var(--sage);
        }

        .bg-forest {
          background-color: var(--forest);
        }

        .bg-peach {
          background-color: var(--peach);
        }

        .text-cream {
          color: var(--cream);
        }

        .text-primary-green {
          color: var(--primary-green);
        }

        .text-accent-green {
          color: var(--accent-green);
        }

        .text-forest {
          color: var(--forest);
        }

        .border-primary-green {
          border-color: var(--primary-green);
        }

        .border-accent-green {
          border-color: var(--accent-green);
        }

        .border-light-green {
          border-color: var(--light-green);
        }

        .hover\\:bg-accent-green:hover {
          background-color: var(--accent-green);
        }

        .hover\\:bg-primary-green:hover {
          background-color: var(--primary-green);
        }

        .hover\\:border-accent-green:hover {
          border-color: var(--accent-green);
        }

        .from-light-green {
          --tw-gradient-from: var(--light-green);
        }

        .to-cream {
          --tw-gradient-to: var(--cream);
        }

        .to-sage {
          --tw-gradient-to: var(--sage);
        }

        .from-sage {
          --tw-gradient-from: var(--sage);
        }

        .to-accent-green {
          --tw-gradient-to: var(--accent-green);
        }

        .from-primary-green {
          --tw-gradient-from: var(--primary-green);
        }
      `}</style>
    </div>
  );
}
