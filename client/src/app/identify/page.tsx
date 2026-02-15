"use client";

import IdentifyClientPage from "./client-page";
import { Header } from "@/components/layout/header";

export default function IdentifyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-emerald-500/30">
      <Header title="AI Scanner" />

      {/* Background Grid */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_800px_at_100%_200px,#10b9811a,transparent)]"></div>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold font-headline bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
              Plant Identification
            </h1>
            <p className="text-neutral-400 max-w-lg mx-auto font-body text-lg">
              Upload a photo to instantly analyze species, health, and care requirements using our advanced botanical AI.
            </p>
          </div>

          <IdentifyClientPage />
        </div>
      </main>
    </div>
  );
}
