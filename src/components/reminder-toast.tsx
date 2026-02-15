"use client";

import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { quirkyReminders } from "@/lib/placeholder-data";
import { Bell } from "lucide-react";

export function ReminderToast() {
  const { toast } = useToast();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const showReminder = () => {
    const reminder = quirkyReminders[Math.floor(Math.random() * quirkyReminders.length)];
    
    toast({
      title: (
        <div className="flex items-center gap-2">
          <Bell className="size-5 text-primary" />
          <span className="font-headline text-xl">Watering Reminder</span>
        </div>
      ),
      description: `“${reminder}”`,
      duration: 8000,
    });
  };

  useEffect(() => {
    // Show first reminder after 1 second
    const initialTimeoutId = setTimeout(showReminder, 1000);

    // Then show reminders every 30 seconds
    intervalRef.current = setInterval(showReminder, 30000);

    return () => {
        clearTimeout(initialTimeoutId);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };
  }, [toast]);

  return null;
}
