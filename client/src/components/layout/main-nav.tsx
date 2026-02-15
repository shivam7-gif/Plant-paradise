"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Award, BookOpen, Bot, Heart, Home, Image, LucideIcon, ShoppingBag } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

const navItems: { href: string; label: string; icon: LucideIcon, tooltip: string }[] = [
  { href: "/", label: "Dashboard", icon: Home, tooltip: "Dashboard" },
  { href: "/journal", label: "Plant Journal", icon: BookOpen, tooltip: "Plant Journal" },
  { href: "/identify", label: "Identification", icon: Image, tooltip: "Plant Identification" },
  { href: "/diagnose", label: "Health Diagnosis", icon: Heart, tooltip: "Health Diagnosis" },
  { href: "/chat", label: "AI Assistant", icon: Bot, tooltip: "AI Assistant" },
  { href: "/marketplace", label: "Marketplace", icon: ShoppingBag, tooltip: "Marketplace" },
  { href: "/achievements", label: "Achievements", icon: Award, tooltip: "Achievements" },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            tooltip={item.tooltip}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
