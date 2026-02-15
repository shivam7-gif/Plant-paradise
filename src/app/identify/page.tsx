import { Header } from "@/components/layout/header";
import IdentifyClientPage from "./client-page";

export default function IdentifyPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Header title="AI Plant Identification" />
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto flex max-w-2xl flex-col gap-8">
            <div className="space-y-2 text-center">
                <h2 className="font-headline text-3xl">What's that Plant?</h2>
                <p className="text-muted-foreground">
                    Upload a photo of a plant, and our AI will tell you what it is, along with care instructions.
                </p>
            </div>
            <IdentifyClientPage />
        </div>
      </main>
    </div>
  );
}
