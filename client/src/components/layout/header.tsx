"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Flame, Bell } from "lucide-react";
import { currentStreak } from "@/lib/placeholder-data";
import { Switch } from "@/components/ui/switch";
import { useState ,useEffect } from "react";
type HeaderProps = {
  title: string;
  showSidebarTrigger?: boolean;
};

export function Header({ title, showSidebarTrigger = false }: HeaderProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("dailyNotifications");
    if (saved) {
      setNotificationsEnabled(JSON.parse(saved));
    }
  }, []);

  const handleNotificationToggle = (checked: boolean) => {
    setNotificationsEnabled(checked);
    localStorage.setItem("dailyNotifications", JSON.stringify(checked));
  };

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm md:px-8">
      {showSidebarTrigger && (
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
      )}

      <h1 className="font-headline text-2xl font-semibold text-foreground">
        {title}
      </h1>

      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Bell className="size-5 text-muted-foreground" />
          <Switch
            checked={notificationsEnabled}
            onCheckedChange={handleNotificationToggle}
            aria-label="Toggle daily notifications"
          />
        </div>
        <div className="flex items-center gap-2">
          <Flame className="size-6 text-primary" />
          <span className="text-xl font-bold text-primary">
            {currentStreak}
          </span>
        </div>
      </div>
    </header>
  );
}
