"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Filter,
  X,
  Menu,
  Heart,
  Star,
  Truck,
  Shield,
  Headphones,
  Leaf,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Loader2,
  Plus,
  ArrowRight,
} from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Types
interface Plant {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description?: string;
}

const categories = [
  { id: "all", name: "All Plants", icon: "🌿" },
  { id: "indoor", name: "Indoor", icon: "🏠" },
  { id: "outdoor", name: "Outdoor", icon: "🌳" },
  { id: "bundle", name: "Bundles", icon: "🎁" },
];

const priceRanges = [
  { id: "all", label: "Any Price" },
  { id: "under500", label: "< ₹500" },
  { id: "500-1000", label: "₹500-1k" },
  { id: "above1000", label: "> ₹1k" },
];

const plantImages = [
  "/plant-1.jpg", "/plant-2.jpg", "/plant-3.jpg", "/plant-4.jpg",
  "/plant-photo-1.jpg", "/plant-photo-2.jpg", "/plant-photo-3.jpg",
  'plant-5.jpg', 'plant-6.jpg', 'plant-7.jpg', 'plant-8.jpg',
  'plant-9.png', 'plant-10.jpg', 'plant-11.jpg',
];

// Placeholder Data if API fails
const placeholderPlants: Plant[] = [
  { id: "1", name: "Areca Palm", price: 499, originalPrice: 699, image: plantImages[0], category: "indoor", rating: 4.8, reviews: 1240 },
  { id: "2", name: "Snake Plant", price: 399, originalPrice: 599, image: plantImages[1], category: "indoor", rating: 4.7, reviews: 980 },
  { id: "3", name: "Peace Lily", price: 599, originalPrice: 799, image: plantImages[2], category: "indoor", rating: 4.9, reviews: 1500 },
  { id: "4", name: "Money Plant", price: 299, originalPrice: 499, image: plantImages[3], category: "indoor", rating: 4.6, reviews: 2100 },
  { id: "5", name: "Bamboo Palm", price: 899, originalPrice: 1199, image: plantImages[4], category: "outdoor", rating: 4.5, reviews: 620 },
  { id: "6", name: "Garden Combo", price: 1299, originalPrice: 1799, image: plantImages[5], category: "bundle", rating: 4.9, reviews: 430 },
];

export default function Marketplace() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call or use real one
      // const response = await axios.get("http://localhost:9000/api/testing/flowers");
      // if (response.data && Array.isArray(response.data)) setPlants(response.data);
      // else 
      setTimeout(() => setPlants(placeholderPlants), 1000); // Fallback for demo
    } catch (err) {
      setError("Failed to load plants");
      setPlants(placeholderPlants); // Fallback
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const addToCart = () => setCartCount((prev) => prev + 1);

  const filteredPlants = plants.filter((plant) => {
    const matchesCategory = selectedCategory === "all" || plant.category === selectedCategory;
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase());
    let matchesPrice = true;
    if (selectedPrice === "under500") matchesPrice = plant.price < 500;
    else if (selectedPrice === "500-1000") matchesPrice = plant.price >= 500 && plant.price <= 1000;
    else if (selectedPrice === "above1000") matchesPrice = plant.price > 1000;

    return matchesCategory && matchesPrice && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans text-neutral-900 dark:text-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="text-emerald-500" size={28} />
            <span className="text-xl font-bold font-headline hidden md:block">Plant Paradise</span>
          </Link>

          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type="text"
              placeholder="Search plants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border-none focus:ring-2 focus:ring-emerald-500 transition-all font-body text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <Link href="/orders" className="relative p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors" title="My Orders">
              <Truck size={20} className="text-neutral-600 dark:text-neutral-400" />
            </Link>
            <button className="relative p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Premium Hero Section */}
      <section className="relative h-[60vh] overflow-hidden bg-neutral-950 flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 to-transparent z-10"></div>
        <img
          src="/hero-plants.jpg"
          alt="Hero Plant"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 w-full flex flex-col items-start justify-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-emerald-500/30"
          >
            Editor's Choice
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold font-headline text-white mb-6 leading-tight"
          >
            Bring Nature <br /> Indoors.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-300 max-w-lg text-lg mb-8 leading-relaxed"
          >
            Discover our curated collection of rare, air-purifying plants that transform your space into a living sanctuary.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => {
              const element = document.getElementById('product-grid');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-emerald-600/30"
          >
            Shop Now <ArrowRight size={18} />
          </motion.button>
        </div>
      </section>

      <main id="product-grid" className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-8 flex-shrink-0">
          <div>
            <h3 className="font-bold text-lg mb-4 font-headline">Categories</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center gap-3 text-sm font-medium",
                    selectedCategory === cat.id
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                  )}
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 font-headline">Price Range</h3>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setSelectedPrice(range.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                    selectedPrice === range.id
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-emerald-500"
                  )}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-headline">
              {selectedCategory === 'all' ? 'All Plants' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <span className="text-sm text-neutral-500">{filteredPlants.length} items</span>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-emerald-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredPlants.map((plant) => (
                  <motion.div
                    key={plant.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => router.push(`/marketplace/${plant.id}`)}
                    className="group relative bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-colors cursor-pointer"
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative">
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(plant.id);
                        }}
                        className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-black transition-colors"
                      >
                        <Heart size={18} className={cn(wishlist.includes(plant.id) && "fill-rose-500 text-rose-500")} />
                      </button>

                      {/* Quick Add Button */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/marketplace/${plant.id}`);
                          }}
                          className="w-full bg-white/90 dark:bg-black/90 backdrop-blur-md text-emerald-600 dark:text-emerald-400 font-semibold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-white transition-all"
                        >
                          <Plus size={18} />
                          Quick Add
                        </button>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-lg font-headline truncate">{plant.name}</h3>
                        <div className="flex items-center gap-1 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                          <Star size={10} className="fill-current" />
                          {plant.rating}
                        </div>
                      </div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 capitalize mb-3">{plant.category}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-emerald-600 dark:text-emerald-500">₹{plant.price}</span>
                        {plant.originalPrice > plant.price && (
                          <span className="text-sm text-neutral-400 line-through">₹{plant.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
