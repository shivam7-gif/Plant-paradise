"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { ArrowLeft, Check, CreditCard, Truck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
    { id: 1, title: "Shipping", icon: Truck },
    { id: 2, title: "Payment", icon: CreditCard },
    { id: 3, title: "Confirmation", icon: Check },
];

export default function CheckoutPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    const nextStep = () => {
        if (currentStep === 2) {
            setIsProcessing(true);
            setTimeout(() => {
                setIsProcessing(false);
                setCurrentStep(3);
            }, 2000);
        } else {
            setCurrentStep((prev) => Math.min(prev + 1, 3));
        }
    };

    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans text-neutral-900 dark:text-neutral-50">
            <Header title="Checkout" />

            <main className="max-w-6xl mx-auto px-4 py-8">
                <Link
                    href="/marketplace"
                    className="inline-flex items-center gap-2 text-neutral-500 hover:text-emerald-500 transition-colors mb-8"
                >
                    <ArrowLeft size={16} />
                    Back to Shopping
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Checkout Flow */}
                    <div className="lg:col-span-8">
                        {/* Steps Indicator */}
                        <div className="flex items-center justify-between mb-12 relative">
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-neutral-200 dark:bg-neutral-800 -z-10"></div>
                            {steps.map((step) => (
                                <div
                                    key={step.id}
                                    className={cn(
                                        "flex flex-col items-center gap-2 bg-neutral-50 dark:bg-neutral-950 px-4",
                                        currentStep >= step.id ? "text-emerald-600" : "text-neutral-400"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                                            currentStep >= step.id
                                                ? "border-emerald-600 bg-emerald-600 text-white"
                                                : "border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900"
                                        )}
                                    >
                                        <step.icon size={18} />
                                    </div>
                                    <span className="text-sm font-medium hidden sm:block">
                                        {step.title}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Step Content */}
                        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm min-h-[400px]">
                            <AnimatePresence mode="wait">
                                {currentStep === 1 && (
                                    <motion.div
                                        key="shipping"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-2xl font-bold font-headline">Shipping Details</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-neutral-500">First Name</label>
                                                <input type="text" className="w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="John" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-neutral-500">Last Name</label>
                                                <input type="text" className="w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Doe" />
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-sm font-medium text-neutral-500">Address</label>
                                                <input type="text" className="w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="123 Green Street" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-neutral-500">City</label>
                                                <input type="text" className="w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="New York" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-neutral-500">Postal Code</label>
                                                <input type="text" className="w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="10001" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 2 && (
                                    <motion.div
                                        key="payment"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-2xl font-bold font-headline">Payment Method</h2>

                                        <div className="p-4 border border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-xl flex items-start gap-3">
                                            <ShieldCheck className="text-emerald-600 dark:text-emerald-400 mt-1" />
                                            <div>
                                                <h4 className="font-bold text-emerald-900 dark:text-emerald-400">Secure Transaction</h4>
                                                <p className="text-sm text-emerald-700 dark:text-emerald-500">Your payment information is encrypted and secure.</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-neutral-500">Card Number</label>
                                                <input type="text" className="w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="0000 0000 0000 0000" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-neutral-500">Expiry</label>
                                                    <input type="text" className="w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="MM/YY" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-neutral-500">CVC</label>
                                                    <input type="text" className="w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="123" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 3 && (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center text-center py-12"
                                    >
                                        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
                                            <Check size={40} className="text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <h2 className="text-3xl font-bold font-headline mb-2">Order Confirmed!</h2>
                                        <p className="text-neutral-500 dark:text-neutral-400 max-w-md mx-auto mb-8">
                                            Thank you for your purchase. We've sent a confirmation email to your inbox. Your plants will be on their way soon!
                                        </p>
                                        <Link
                                            href="/marketplace"
                                            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full transition-colors"
                                        >
                                            Continue Shopping
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Navigation Buttons */}
                        {currentStep < 3 && (
                            <div className="flex justify-between mt-8">
                                <button
                                    onClick={prevStep}
                                    disabled={currentStep === 1}
                                    className="px-6 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 font-medium text-neutral-600 dark:text-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={nextStep}
                                    disabled={isProcessing}
                                    className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2"
                                >
                                    {isProcessing ? "Processing..." : currentStep === 2 ? "Pay Now" : "Continue"}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    {currentStep < 3 && (
                        <div className="lg:col-span-4">
                            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm sticky top-24">
                                <h3 className="font-bold text-lg font-headline mb-6">Order Summary</h3>

                                <div className="space-y-4 mb-6">
                                    {/* Mock Items - In a real app, fetch from cart context */}
                                    <div className="flex gap-4">
                                        <div className="w-16 h-16 bg-neutral-100 rounded-lg overflow-hidden">
                                            <img src="/plant-1.jpg" alt="Plant" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm">Areca Palm</h4>
                                            <p className="text-neutral-500 text-xs">Indoor Plant</p>
                                            <p className="text-emerald-600 font-bold text-sm mt-1">₹499</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-16 h-16 bg-neutral-100 rounded-lg overflow-hidden">
                                            <img src="/plant-4.jpg" alt="Plant" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm">Money Plant</h4>
                                            <p className="text-neutral-500 text-xs">Indoor Plant</p>
                                            <p className="text-emerald-600 font-bold text-sm mt-1">₹299</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-neutral-500">Subtotal</span>
                                        <span className="font-medium">₹798</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-neutral-500">Shipping</span>
                                        <span className="font-medium text-emerald-600">Free</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold pt-2">
                                        <span>Total</span>
                                        <span>₹798</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
