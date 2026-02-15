"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Bot, Send, User } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { askQuestionAction } from "./actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export default function ChatClientPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input || isPending) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    startTransition(async () => {
      setMessages(prev => [...prev, { role: 'system', content: '...' }]);
      const res = await askQuestionAction(input);
      if ('answer' in res) {
        setMessages(prev => {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1] = { role: 'assistant', content: res.answer };
          return updatedMessages;
        });
      } else {
        setMessages(prev => {
           const updatedMessages = [...prev];
           updatedMessages[updatedMessages.length - 1] = { role: 'system', content: `Error: ${res.error}` };
           return updatedMessages;
        });
      }
    });

    setTimeout(() => {
        if(scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, 100);
  };

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef as any}>
        <div className="mx-auto max-w-2xl space-y-6">
          {messages.length === 0 && (
            <div className="rounded-lg border p-8 text-center">
              <Bot className="mx-auto mb-4 size-12 text-primary" />
              <h2 className="font-headline text-2xl">AI Plant Assistant</h2>
              <p className="text-muted-foreground">Ask me anything about your plants!</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-4",
                message.role === 'user' ? "justify-end" : ""
              )}
            >
              {message.role === 'assistant' && (
                <Avatar>
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
              )}

              <div
                className={cn(
                  "max-w-md rounded-lg p-3",
                  message.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted",
                  message.role === 'system' && "bg-transparent text-muted-foreground italic text-center w-full"
                )}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>

               {message.role === 'user' && (
                <Avatar>
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t bg-background p-4">
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl items-center gap-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about plant care..."
            disabled={isPending}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!input || isPending}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
