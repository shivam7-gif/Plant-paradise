import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Leaf, Droplet, Sun, Star, Heart, LucideIcon, Flame } from "lucide-react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const achievementIcons: { [key: string]: LucideIcon } = {
  leaf: Leaf,
  droplet: Droplet,
  sun: Sun,
  star: Star,
  heart: Heart,
  flame: Flame,
};
