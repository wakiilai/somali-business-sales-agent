import { ChatWidget } from "@/components/chat/chat-widget";

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Hilaac Electronics
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ask about our products in Somali or English
        </p>
      </div>
      <ChatWidget />
    </div>
  );
}