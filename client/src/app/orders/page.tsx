"use client";

import { Header } from "@/components/layout/header";
import { Check, Clock, Package, Truck, MapPin, ChevronRight, Box } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Mock Order Data
const orders = [
    {
        id: "ORD-7829-XJ",
        date: "Feb 10, 2026",
        total: "₹798.00",
        status: "In Transit",
        items: [
            { name: "Areca Palm", image: "/plant-1.jpg" },
            { name: "Money Plant", image: "/plant-4.jpg" }
        ],
        timeline: [
            { status: "Order Placed", date: "Feb 10, 10:30 AM", completed: true, icon: Box },
            { status: "Processing", date: "Feb 10, 02:15 PM", completed: true, icon: Clock },
            { status: "In Transit", date: "Feb 11, 09:00 AM", completed: true, current: true, icon: Truck },
            { status: "Delivered", date: "Estimated Feb 12", completed: false, icon: MapPin },
        ]
    },
    {
        id: "ORD-1102-AB",
        date: "Jan 25, 2026",
        total: "₹1,299.00",
        status: "Delivered",
        items: [
            { name: "Snake Plant Bundle", image: "/plant-2.jpg" }
        ],
        timeline: [
            { status: "Order Placed", date: "Jan 25", completed: true, icon: Box },
            { status: "Processing", date: "Jan 25", completed: true, icon: Clock },
            { status: "In Transit", date: "Jan 26", completed: true, icon: Truck },
            { status: "Delivered", date: "Jan 27", completed: true, current: false, icon: MapPin },
        ]
    }
];

export default function OrdersPage() {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans text-neutral-900 dark:text-neutral-50 pb-20">
            <Header title="My Orders" />

            <main className="max-w-5xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold font-headline mb-8">Track Your Greenery</h1>

                <div className="space-y-8">
                    {orders.map((order) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-neutral-900 rounded-3xl p-6 md:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden relative"
                        >
                            {/* Order Header */}
                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8 pb-6 border-b border-neutral-100 dark:border-neutral-800">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h2 className="text-xl font-bold font-headline">{order.id}</h2>
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                                            order.status === "Delivered"
                                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                        )}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-neutral-500 text-sm">Placed on {order.date} • Total: <span className="font-semibold text-neutral-900 dark:text-white">{order.total}</span></p>
                                </div>

                                <div className="flex -space-x-3">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="w-12 h-12 rounded-full border-2 border-white dark:border-neutral-900 overflow-hidden bg-neutral-100">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Animated Timeline */}
                            <div className="relative">
                                {/* Connecting Line Backplate */}
                                <div className="absolute top-5 left-0 w-full h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full hidden md:block"></div>

                                {/* Progress Line */}
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: order.status === "Delivered" ? "100%" : "66%" }}
                                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                                    className="absolute top-5 left-0 h-1 bg-emerald-500 rounded-full hidden md:block"
                                ></motion.div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 relative z-10">
                                    {order.timeline.map((step, index) => (
                                        <div key={index} className="flex md:flex-col items-center md:text-center gap-4 md:gap-4 relative group">
                                            {/* Vertical Line for Mobile */}
                                            {index !== order.timeline.length - 1 && (
                                                <div className="absolute left-[19px] top-10 bottom-[-32px] w-[2px] bg-neutral-100 dark:bg-neutral-800 md:hidden"></div>
                                            )}

                                            {/* Icon Bubble */}
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.2 * index }}
                                                className={cn(
                                                    "w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 z-10",
                                                    step.completed || step.current
                                                        ? "bg-emerald-500 border-white dark:border-neutral-900 text-white shadow-lg shadow-emerald-500/30"
                                                        : "bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-400"
                                                )}
                                            >
                                                <step.icon size={16} />
                                            </motion.div>

                                            {/* Text */}
                                            <div className="flex-1 md:flex-none">
                                                <h4 className={cn(
                                                    "font-bold text-sm mb-1 transition-colors",
                                                    step.completed || step.current ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-400"
                                                )}>
                                                    {step.status}
                                                </h4>
                                                <p className="text-xs text-neutral-500">{step.date}</p>
                                            </div>

                                            {/* Current Pulse Animation */}
                                            {step.current && (
                                                <span className="absolute top-0 right-0 md:left-1/2 md:-translate-x-1/2 md:-top-2 flex h-3 w-3">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="mt-10 flex gap-4 justify-end">
                                <Link href="/help" className="px-6 py-2 rounded-xl text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                                    Need Help?
                                </Link>
                                <Link href="/marketplace" className="px-6 py-2 rounded-xl text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20">
                                    Track Details
                                </Link>
                            </div>

                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
