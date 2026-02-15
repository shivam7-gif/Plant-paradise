import { Header } from "@/components/layout/header";
import ChatClientPage from "./client-page";

export default function ChatPage() {
  return (
    <div className="flex h-svh flex-col">
      <Header title="GreenAI" />
      <main className="flex-1 overflow-hidden">
          <ChatClientPage />
      </main>
    </div>
  );
}
