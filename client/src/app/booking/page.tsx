"use client";

import { Header } from "@/components/layout/header";
import { Star, Calendar, Clock, ArrowRight, X, Phone, Video, MapPin, Check, Zap, Sparkles, Scan, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Mock Experts Data
const experts = [
  {
    id: 1,
    name: "Dr. Nikhil",
    specialty: "Plant Pathologist",
    rating: 4.9,
    reviews: 124,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    price: "₹499 / 30m",
    availability: "Available Today",
    location: "Online",
    tags: ["Diagnosis", "Treatment Plan"],
  },
  {
    id: 2,
    name: "Shivam Rawat",
    specialty: "Landscape Architect",
    rating: 4.8,
    reviews: 89,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    price: "₹999 / 1h",
    availability: "Available Tomorrow",
    location: "Online / On-site",
    tags: ["Garden Design", "Layout"],
  },
  {
    id: 3,
    name: "Priyanshu",
    specialty: "Indoor Plant Expert",
    rating: 5.0,
    reviews: 210,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    price: "₹299 / 15m",
    availability: "Available Today",
    location: "Online",
    tags: ["Quick Advice", "Care Tips"],
  },
  {
    id: 4,
    name: "Mukul",
    specialty: "Soil Scientist",
    rating: 4.7,
    reviews: 56,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    price: "₹599 / 45m",
    availability: "Next Week",
    location: "Online",
    tags: ["Soil Analysis", "Fertilizers"],
  },
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM"
];

export default function BookingPage() {
  const [selectedExpert, setSelectedExpert] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleBookClick = (expert: any) => {
    setSelectedExpert(expert);
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleClose = () => {
    setSelectedExpert(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans text-neutral-900 dark:text-neutral-50 pb-20">
      <Header title="Consultation" />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-headline bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
          >
            Expert Care & AI Solutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-neutral-500 max-w-2xl mx-auto text-lg"
          >
            Choose between instant AI analysis or schedule a session with a certified botanist.
          </motion.p>
        </div>

        {/* AI Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <Link href="/identify" className="group">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-emerald-900 to-teal-900 rounded-3xl p-8 text-white relative overflow-hidden h-full flex flex-col justify-between border border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 transform group-hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Scan size={120} />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/20">
                  <Zap className="text-emerald-400" size={24} />
                </div>
                <h3 className="text-2xl font-bold font-headline mb-2">Instant Diagnosis</h3>
                <p className="text-emerald-100 mb-6 max-w-sm">
                  Use our advanced AI scanner to instantly identify diseases, pests, and get immediate treatment steps.
                </p>
              </div>
              <div className="flex items-center gap-2 text-emerald-300 font-bold group-hover:gap-4 transition-all">
                Start Scanning <ArrowRight size={18} />
              </div>
            </motion.div>
          </Link>

          <Link href="/chat" className="group">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-8 text-white relative overflow-hidden h-full flex flex-col justify-between border border-neutral-700 hover:shadow-2xl hover:shadow-neutral-500/20 transition-all duration-300 transform group-hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <MessageSquare size={120} />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/20">
                  <Sparkles className="text-purple-400" size={24} />
                </div>
                <h3 className="text-2xl font-bold font-headline mb-2">Plant Assistant AI</h3>
                <p className="text-neutral-300 mb-6 max-w-sm">
                  Chat with our botanical AI for instant advice on care schedules, watering, and general plant queries.
                </p>
              </div>
              <div className="flex items-center gap-2 text-purple-300 font-bold group-hover:gap-4 transition-all">
                Chat Now <ArrowRight size={18} />
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Experts Section */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold font-headline">Certified Experts</h2>
          <div className="h-px bg-neutral-200 dark:bg-neutral-800 flex-1 ml-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experts.map((expert, index) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/50 transition-all hover:shadow-xl hover:shadow-emerald-500/10 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>

              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-1 ml-auto">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} size={12} className={cn("fill-current", star <= Math.round(expert.rating) ? "text-yellow-400" : "text-neutral-200")} />
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full border-4 border-white dark:border-neutral-800 shadow-md overflow-hidden">
                    <img src={expert.image} className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-4 border-white dark:border-neutral-900 rounded-full"></span>
                </div>
                <h3 className="text-xl font-bold font-headline mb-1">{expert.name}</h3>
                <p className="text-sm text-emerald-600 font-medium mb-3">{expert.specialty}</p>

                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {expert.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-md text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500 flex items-center gap-2"><MapPin size={14} /> Location</span>
                  <span className="font-medium">{expert.location}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500 flex items-center gap-2"><Clock size={14} /> Next Slot</span>
                  <span className="font-medium text-emerald-600">{expert.availability}</span>
                </div>
                <div className="flex justify-between text-sm items-center mt-4">
                  <span className="text-lg font-bold">{expert.price}</span>
                </div>
              </div>

              <button
                onClick={() => handleBookClick(expert)}
                className="w-full mt-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-bold hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white transition-colors duration-300 shadow-lg shadow-neutral-900/20"
              >
                Book Now
              </button>
            </motion.div>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {selectedExpert && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-neutral-900 shadow-2xl z-50 p-8 overflow-y-auto"
            >
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500">
                  <img src={selectedExpert.image} alt={selectedExpert.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-headline">{selectedExpert.name}</h2>
                  <p className="text-emerald-600 text-sm">{selectedExpert.specialty}</p>
                </div>
              </div>

              {step === 1 && (
                <div className="space-y-8">
                  <div>
                    <h3 className="font-bold mb-4 flex items-center gap-2"><Calendar size={18} className="text-emerald-500" /> Select Date</h3>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <span key={d} className="text-neutral-400 py-2">{d}</span>)}
                      {Array.from({ length: 30 }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedDate(i + 1)}
                          className={cn(
                            "aspect-square rounded-lg flex items-center justify-center transition-colors",
                            selectedDate === i + 1
                              ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                              : "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                          )}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-4 flex items-center gap-2"><Clock size={18} className="text-emerald-500" /> Select Time</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            "py-2 px-3 rounded-lg border text-sm font-medium transition-colors",
                            selectedTime === time
                              ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
                              : "border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/50"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      disabled={!selectedDate || !selectedTime}
                      onClick={() => setStep(2)}
                      className="w-full py-4 bg-emerald-600 disabled:bg-neutral-300 dark:disabled:bg-neutral-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                    >
                      Continue <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 text-center py-12">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={40} className="text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold font-headline">Booking Confirmed!</h3>
                  <p className="text-neutral-500">
                    You are scheduled with {selectedExpert.name} on <br />
                    <span className="text-emerald-600 font-bold block mt-2">Feb {selectedDate}, {selectedTime}</span>
                  </p>
                  <div className="pt-8">
                    <button onClick={handleClose} className="w-full py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-bold">
                      Done
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}