import { Header } from "@/components/layout/header";
import DiagnoseClientPage from "./client-page";

export default function DiagnosePage() {
  return (
    <div className="flex flex-1 flex-col">
      <Header title="GreenAI Health Diagnosis" />
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto flex max-w-2xl flex-col gap-8">
            <div className="space-y-2 text-center">
                <h2 className="font-headline text-3xl">Is Your Plant Okay?</h2>
                <p className="text-muted-foreground">
                    Upload a photo of your plant, and our AI will analyze it for potential health issues.
                </p>
            </div>
            <DiagnoseClientPage />
        </div>
      </main>
    </div>
  );
}
