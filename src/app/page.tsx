import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Bot, Heart, Image, Leaf, LucideIcon, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { ReminderToast } from '@/components/reminder-toast';

const featureCards: { title: string; description: string; href: string; icon: LucideIcon }[] = [
  {
    title: 'Plant Journal',
    description: 'Track your plants\' progress with notes and photos.',
    href: '/journal',
    icon: BookOpen,
  },
  {
    title: 'AI Identification',
    description: 'Identify unknown plants from a single photo.',
    href: '/identify',
    icon: Image,
  },
  {
    title: 'Health Diagnosis',
    description: 'Analyze photos for potential health issues.',
    href: '/diagnose',
    icon: Heart,
  },
  {
    title: 'AI Assistant',
    description: 'Get personalized plant care advice from our chatbot.',
    href: '/chat',
    icon: Bot,
  },
  {
    title: 'Marketplace',
    description: 'Buy and sell plants, seeds, and tools.',
    href: '/marketplace',
    icon: ShoppingBag,
  },
  {
    title: 'Achievements',
    description: 'Earn badges for your green thumb milestones.',
    href: '/achievements',
    icon: Award,
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Header title="Dashboard" />
      <main className="flex-1 p-4 md:p-8">
        <ReminderToast />
        <div className="mx-auto grid max-w-6xl gap-8">
          <div className="space-y-2">
            <h1 className="font-headline text-3xl md:text-4xl">Welcome to Plant Paradise</h1>
            <p className="text-muted-foreground">Your digital haven for plant care and growth.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((feature) => (
              <Link href={feature.href} key={feature.title} className="group">
                <Card className="h-full transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-lg group-hover:-translate-y-1">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <feature.icon className="size-8 text-primary transition-transform group-hover:scale-110" />
                    <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
