import { SidebarTrigger } from "@/components/ui/sidebar"
import { Flame } from "lucide-react";
import { currentStreak } from "@/lib/placeholder-data";

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm md:px-8">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <h1 className="font-headline text-2xl font-semibold text-foreground">
        {title}
      </h1>
      <div className="ml-auto flex items-center gap-2">
        <Flame className="size-6 text-primary" />
        <span className="text-xl font-bold text-primary">{currentStreak}</span>
      </div>
    </header>
  )
}
