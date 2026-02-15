"use client";

import { useRef, useState, useEffect } from "react";
// @ts-ignore
import { useFormState } from "react-dom";
import { useToast } from "@/hooks/use-toast";
import { sendMessageAction, type ChatState } from "./actions";
import { Send, User, Bot, Sparkles, Image as ImageIcon, Loader2, MoreVertical, Paperclip } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const initialState: ChatState = {
  messages: [],
};

export default function ChatClientPage() {
  const [state, formAction] = useFormState(sendMessageAction, initialState);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    if (state.messages.length > 0 && state.messages[state.messages.length - 1].role === 'assistant') {
      setIsTyping(false);
    }
  }, [state.messages]);

  const handleSubmit = (formData: FormData) => {
    if (!input.trim()) return;
    setIsTyping(true);
    setInput("");
    formAction(formData);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] max-h-[800px] w-full max-w-6xl mx-auto rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 shadow-2xl border border-neutral-200 dark:border-neutral-800">
      {/* Sidebar (Hidden on mobile for now, can be toggleable) */}
      <div className="hidden md:flex w-80 bg-neutral-50 dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 flex-col">
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
          <h2 className="text-xl font-bold font-headline flex items-center gap-2">
            <Sparkles className="text-emerald-500" size={20} />
            Plant AI
          </h2>
          <p className="text-xs text-neutral-500 mt-1">Your personal botanist</p>
        </div>
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {/* Mock History */}
          <button className="w-full text-left p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-emerald-500/50 transition-colors">
            <p className="font-medium text-sm truncate">How to care for Monstera?</p>
            <p className="text-xs text-neutral-500 mt-1">2 mins ago</p>
          </button>
          <button className="w-full text-left p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-neutral-600 dark:text-neutral-400">
            <p className="font-medium text-sm truncate">Yellow leaves on Rose</p>
            <p className="text-xs text-neutral-500 mt-1">Yesterday</p>
          </button>
        </div>
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
          <button className="w-full py-2 px-4 rounded-xl border border-neutral-200 dark:border-neutral-800 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
            New Chat
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50 dark:bg-black relative">
        {/* Decorative Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)]"></div>

        {/* Header */}
        <div className="px-6 py-4 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
              <Bot size={20} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Botanist AI</h3>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Online
              </p>
            </div>
          </div>
          <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors">
            <MoreVertical size={20} className="text-neutral-500" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10" ref={scrollRef}>
          {state.messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
              <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4">
                <Sparkles size={40} className="text-neutral-400" />
              </div>
              <p className="text-lg font-medium">Ask me anything about plants!</p>
              <p className="text-sm">Try "Why are my leaves turning yellow?"</p>
            </div>
          )}

          <AnimatePresence>
            {state.messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={cn(
                  "flex gap-4 max-w-[80%]",
                  message.role === "user" ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border",
                  message.role === "user"
                    ? "bg-neutral-200 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700"
                    : "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800"
                )}>
                  {message.role === "user" ? <User size={14} /> : <Bot size={14} className="text-emerald-600 dark:text-emerald-400" />}
                </div>

                <div className={cn(
                  "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                  message.role === "user"
                    ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-tr-sm border border-neutral-200 dark:border-neutral-700"
                    : "bg-emerald-600 text-white rounded-tl-sm shadow-emerald-500/20"
                )}>
                  {message.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 max-w-[80%]"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800">
                <Bot size={14} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="p-4 rounded-2xl rounded-tl-sm bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/50 dark:bg-black/50 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 z-10">
          <form action={handleSubmit} className="flex gap-2 max-w-4xl mx-auto relative">
            <button type="button" className="p-3 text-neutral-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              <Paperclip size={20} />
            </button>
            <button type="button" className="p-3 text-neutral-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              <ImageIcon size={20} />
            </button>

            <div className="flex-1 relative">
              <input
                type="text"
                name="message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="w-full h-full pl-4 pr-12 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none shadow-sm transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-600/20"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
