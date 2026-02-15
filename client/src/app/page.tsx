"use client";

import { Header } from '@/components/layout/header';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import {
  BookOpen,
  Image as ImageIcon,
  Heart,
  Bot,
  ShieldCheck,
  Zap,
  Leaf,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ReminderToast } from '@/components/reminder-toast';

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const features = [
    {
      title: "AI Identification",
      description: "Instantly identify any plant with a single photo. Our advanced AI recognizes over 10,000 species with 98% accuracy.",
      link: "/identify",
      icon: <ImageIcon className="h-6 w-6 text-emerald-500" />
    },
    {
      title: "Health Diagnosis",
      description: "Spot diseases early. Snap a picture and get instant treatment advice.",
      link: "/diagnose",
      icon: <Heart className="h-6 w-6 text-rose-500" />
    },
    {
      title: "Smart Journal",
      description: "Track growth, water schedules, and milestones.",
      link: "/journal",
      icon: <BookOpen className="h-6 w-6 text-blue-500" />
    },
    {
      title: "AI Assistant",
      description: "24/7 expert care advice at your fingertips.",
      link: "/chat",
      icon: <Bot className="h-6 w-6 text-purple-500" />
    },
    {
      title: "Marketplace",
      description: "Buy and sell plants, seeds, and tools from our community.",
      link: "/marketplace",
      icon: <Leaf className="h-6 w-6 text-amber-500" />
    },
    {
      title: "Community",
      description: "Connect with other plant lovers and share your journey.",
      link: "/community",
      icon: <Zap className="h-6 w-6 text-yellow-500" />
    }
  ];

  const testimonials = [
    {
      quote: "This app saved my fiddle leaf fig! The diagnosis was spot on and the treatment plan worked perfectly.",
      name: "Sarah Chen",
      title: "Urban Jungle Enthusiast",
    },
    {
      quote: "I've never been able to keep plants alive until I found Plant Paradise. The reminders are a lifesaver.",
      name: "Marcus Rodriguez",
      title: "Beginner Gardener",
    },
    {
      quote: "The identification feature is incredibly accurate. I use it on all my hikes now!",
      name: "Emily Watson",
      title: "Nature Lover",
    },
    {
      quote: "Connecting with local gardeners through the Booking feature has transformed my backyard.",
      name: "David Kim",
      title: "Homeowner",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950 overflow-x-hidden">
      <Header title="Plant Paradise" />
      <ReminderToast />

      {/* Hero Section */}
      <section ref={targetRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 w-full h-full bg-neutral-50 dark:bg-neutral-950 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 container px-4 md:px-6 flex flex-col items-center text-center space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-neutral-200 bg-white dark:bg-neutral-900 dark:border-neutral-800 px-3 py-1 text-sm text-neutral-950 dark:text-neutral-50 shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            <span className="font-medium">AI-Powered Plant Care</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 font-headline"
          >
            Nurture Your <br />
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Green Sanctuary</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-body"
          >
            Join thousands of plant lovers who use our AI technology to identify, diagnose, and care for their plants. Your personal botanist, right in your pocket.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Link href="/identify" className="inline-flex h-12 items-center justify-center rounded-full bg-neutral-950 dark:bg-neutral-50 px-8 text-sm font-medium text-neutral-50 dark:text-neutral-950 shadow transition-colors hover:bg-neutral-900/90 dark:hover:bg-neutral-50/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/marketplace" className="inline-flex h-12 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-8 text-sm font-medium text-neutral-950 dark:text-neutral-50 shadow-sm transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50">
              Browse Marketplace
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section - Hover Effect Grid */}
      <section className="py-24 bg-white dark:bg-neutral-950 relative z-20">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline mb-4">Everything you need to grow</h2>
            <p className="mx-auto max-w-[700px] text-neutral-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-neutral-400 font-body">
              Powerful tools designed to help you and your plants thrive.
            </p>
          </div>

          <HoverEffect items={features} />
        </div>
      </section>

      {/* Stats / Interactive Section */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-900">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm">
              <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">10,000+</h3>
              <p className="text-neutral-500 dark:text-neutral-400">Species Database</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">98%</h3>
              <p className="text-neutral-500 dark:text-neutral-400">Identification Accuracy</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm">
              <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Instant</h3>
              <p className="text-neutral-500 dark:text-neutral-400">AI Diagnosis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section - Infinite Scroll */}
      <section className="py-24 overflow-hidden bg-white dark:bg-neutral-950">
        <div className="container px-4 md:px-6 mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center font-headline">Loved by Planters</h2>
        </div>
        <div className="h-[20rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </section>

      <footer className="py-12 bg-neutral-950 text-neutral-400">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6 text-emerald-500" />
                <span className="text-xl font-bold text-white">Plant Paradise</span>
              </Link>
              <p className="text-sm">
                Your digital haven for plant care and growth.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Features</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/identify" className="hover:text-emerald-400 transition-colors">Identification</Link></li>
                <li><Link href="/diagnose" className="hover:text-emerald-400 transition-colors">Health Check</Link></li>
                <li><Link href="/journal" className="hover:text-emerald-400 transition-colors">Plant Journal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog" className="hover:text-emerald-400 transition-colors">Blog</Link></li>
                <li><Link href="/community" className="hover:text-emerald-400 transition-colors">Community</Link></li>
                <li><Link href="/help" className="hover:text-emerald-400 transition-colors">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-sm">
            © {new Date().getFullYear()} Plant Paradise. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}