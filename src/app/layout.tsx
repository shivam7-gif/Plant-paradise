import type { Metadata } from 'next';
import './globals.css';
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { MainNav } from '@/components/layout/main-nav';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Plant Paradise',
  description: 'Your digital haven for plant care and growth.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=Belleza&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
          <Sidebar collapsible="icon">
            <SidebarHeader className="p-4">
                <Button variant="ghost" className="h-10 w-full justify-start px-2" asChild>
                    <Link href="/">
                        <Icons.logo className="size-6 text-primary" />
                        <span className="font-headline text-xl">Plant Paradise</span>
                    </Link>
                </Button>
            </SidebarHeader>
            <SidebarContent>
                <MainNav />
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            {children}
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
