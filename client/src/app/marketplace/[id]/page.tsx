"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Star, Truck, Shield, ArrowLeft, Heart, Share2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Mock Data (Ideally this would come from an API or Context)
const plantImages = [
  "/plant-1.jpg", "/plant-2.jpg", "/plant-3.jpg", "/plant-4.jpg",
  "/plant-photo-1.jpg", "/plant-photo-2.jpg", "/plant-photo-3.jpg",
  'plant-5.jpg', 'plant-6.jpg', 'plant-7.jpg', 'plant-8.jpg',
  'plant-9.png', 'plant-10.jpg', 'plant-11.jpg',
];

const mockPlants = [
  { id: "1", name: "Areca Palm", price: 499, originalPrice: 699, image: plantImages[0], category: "indoor", rating: 4.8, reviews: 1240, description: "The Areca Palm is a popular indoor palm known for its air-purifying qualities and lush, feathery fronds. It adds a tropical touch to any room and is relatively easy to care for." },
  { id: "2", name: "Snake Plant", price: 399, originalPrice: 599, image: plantImages[1], category: "indoor", rating: 4.7, reviews: 980, description: "Snake Plants are known for their architectural look and indestructibility. They are excellent air purifiers and can tolerate low light and irregular watering." },
  // ... add more if needed to match ID
];

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [plant, setPlant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    // Simulate fetching plant
    const foundPlant = mockPlants.find(p => p.id === id) || {
      // Fallback for demo if ID doesn't match mock data
      id: id,
      name: "Premium Plant",
      price: 599,
      originalPrice: 899,
      image: plantImages[0],
      category: "Indoor",
      rating: 4.5,
      reviews: 120,
      description: "This is a premium selected plant known for its vibrant foliage and easy care routine. Perfect for both beginners and experienced gardeners."
    };
    setPlant(foundPlant);
  }, [id]);

  if (!plant) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const handleBuyNow = () => {
    // Add logic to add to cart context here
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans text-neutral-900 dark:text-neutral-50 pb-20">
      <Header title="Product Details" />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-emerald-500 transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-[4/5] bg-white rounded-3xl overflow-hidden shadow-sm border border-neutral-100 dark:border-neutral-800 relative group"
            >
              <img
                src={plant.image}
                alt={plant.name}
                className="w-full h-full object-cover"
              />
              <button className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-md rounded-full hover:bg-white transition-colors shadow-sm">
                <Heart size={20} className="text-neutral-600 hover:text-rose-500 transition-colors" />
              </button>
            </motion.div>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {[plant.image, "/plant-photo-1.jpg", "/plant-photo-2.jpg"].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-emerald-500' : 'border-transparent'}`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">
                  {plant.category}
                </span>
                <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                  <Star size={14} className="fill-current" />
                  {plant.rating} ({plant.reviews} reviews)
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold font-headline text-neutral-900 dark:text-neutral-50 mb-4">
                {plant.name}
              </h1>

              <div className="flex items-end gap-3 mb-6">
                <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-500">₹{plant.price}</span>
                {plant.originalPrice > plant.price && (
                  <span className="text-xl text-neutral-400 line-through mb-1">₹{plant.originalPrice}</span>
                )}
                <span className="text-sm text-green-600 font-medium mb-1">
                  {Math.round(((plant.originalPrice - plant.price) / plant.originalPrice) * 100)}% OFF
                </span>
              </div>

              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg">
                {plant.description}
              </p>
            </div>

            <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

            {/* Features Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                <Truck className="text-emerald-600" />
                <div>
                  <p className="font-bold text-sm">Free Delivery</p>
                  <p className="text-xs text-neutral-500">Orders over ₹499</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                <Shield className="text-emerald-600" />
                <div>
                  <p className="font-bold text-sm">Gurantee</p>
                  <p className="text-xs text-neutral-500">7-day replacement</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-l-full"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-r-full"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="text-sm text-neutral-500">
                  <span className="font-bold text-emerald-600">In Stock</span> - Ready to ship
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-4 border-2 border-emerald-600 text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all">
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40 transition-all transform active:scale-95"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
