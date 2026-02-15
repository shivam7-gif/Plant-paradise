"use client";

import Link from "next/link";
import { Leaf, Mail, Lock, ArrowRight, Github, Chrome } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
    return (
        <div className="w-full min-h-screen flex items-stretch bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
            {/* Left: Decorative Visual */}
            <div className="hidden lg:flex w-1/2 relative bg-neutral-900 overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0"
                >
                    <img
                        src="/plant-photo-1.jpg"
                        alt="Login Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent z-10" />

                <div className="relative z-20 flex flex-col justify-between p-12 w-full text-white">
                    <Link href="/" className="flex items-center gap-2 w-fit">
                        <div className="bg-emerald-500/20 p-2 rounded-full backdrop-blur-sm border border-emerald-500/30">
                            <Leaf className="text-emerald-400" size={24} />
                        </div>
                        <span className="text-xl font-bold font-headline">Plant Paradise</span>
                    </Link>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2 className="text-4xl font-bold font-headline mb-4">Welcome Back</h2>
                        <p className="text-neutral-300 max-w-md text-lg leading-relaxed">
                            "The love of gardening is a seed once sown that never dies."
                        </p>
                        <p className="mt-4 text-emerald-400 font-medium">– Gertrude Jekyll</p>
                    </motion.div>
                </div>
            </div>

            {/* Right: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 relative">
                <div className="absolute top-0 right-0 p-8 hidden md:block">
                    <span className="text-neutral-500 dark:text-neutral-400 text-sm">Don't have an account?</span>
                    <Link href="/signup" className="ml-2 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                        Sign up
                    </Link>
                </div>

                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <Link href="/" className="lg:hidden inline-flex items-center gap-2 mb-8">
                            <Leaf className="text-emerald-500" size={24} />
                            <span className="text-xl font-bold font-headline">Plant Paradise</span>
                        </Link>
                        <h1 className="text-3xl font-bold font-headline mb-2">Sign in to your account</h1>
                        <p className="text-neutral-500 dark:text-neutral-400">Enter your details to access your garden.</p>
                    </div>

                    <div className="space-y-4">
                        <button className="w-full flex items-center justify-center gap-3 py-3 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                            <Chrome size={20} />
                            <span className="text-sm font-medium">Continue with Google</span>
                        </button>
                        <button className="w-full flex items-center justify-center gap-3 py-3 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                            <Github size={20} />
                            <span className="text-sm font-medium">Continue with Github</span>
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-neutral-200 dark:border-neutral-800"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-neutral-50 dark:bg-neutral-950 px-2 text-neutral-500">Or continue with email</span>
                        </div>
                    </div>

                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Password</label>
                                <Link href="#" className="text-xs font-medium text-emerald-600 hover:text-emerald-500">Forgot password?</Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all flex items-center justify-center gap-2">
                            Sign In <ArrowRight size={18} />
                        </button>
                    </form>

                    <p className="text-center text-sm text-neutral-500 lg:hidden">
                        Don't have an account?
                        <Link href="/signup" className="ml-1 font-medium text-emerald-600 hover:text-emerald-500">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
