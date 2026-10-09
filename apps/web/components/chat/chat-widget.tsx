"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PaperPlaneTilt, Translate, User, Sparkle, WarningCircle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type SimMessage = {
  id: string;
  role: "customer" | "assistant" | "staff" | "system";
  content: string;
  verified?: boolean;
};

const demoMessages: SimMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content: "Asc! Welcome to Hilaac Electronics. Waxaan kaa caawin karaa su'aalahaaga ku saabsan alaabtayada. Maxaad doonaysaa?",
    verified: false,
  },
];

const demoResponses: Record<string, string[]> = {
  galaxy: [
    "Samsung Galaxy A54 5G (128GB) waa **$349**. Hadda wuu jiraa — 50MP camera, 5000mAh battery. Ma kaa caawiyaa dalab samaynta?",
    "Waxaan xaqiijiyay: Samsung Galaxy A54 waxaa laga heli karaa bakhaarka hadda qiimahiisuna waa $349.",
  ],
  tv: [
    'Samsung 43" Crystal UHD 4K TV waa **$429**. Waxaa ku jira Smart TV iyo HDR. Hadda wuu diyaar yahay.',
  ],
  headphones: [
    "Sony WH-1000XM5 headphones waa **$299**. Wireless, 30-saac battery, noise-cancelling. Hadda wuu jiraa.",
  ],
  iphone: [
    "Apple iPhone 15 (128GB) waa **$799**. Waxaa hadhay tiro yar — low stock. Haddii aad xiisaynayso, fadlan dalab dhaqso u samee.",
  ],
  laptop: [
    'Dell Inspiron 15 hadda ma jiro — waa **out of stock**. Ma doonaysaa inaan kula taliyo beddel?',
  ],
  macbook: [
    "MacBook Air M3 waa **unavailable** catalog-kayaga hadda. Kuma xaqiijin karno macluumaadka. Fadlan la xiriir staff si ay kaaga caawiyaan.",
  ],
  tablet: [
    "Samsung Galaxy Tab S9 waa **$599**. 11\" AMOLED, 256GB, S Pen included. Hadda wuu jiraa.",
  ],
  jbl: [
    "JBL Charge 5 speaker waa **$149**. IP67 waterproof, 20-saac battery. Hadda wuu jiraa.",
  ],
  default: [
    "Mahadsanid su'aashaada! Aan eego macluumaadka aan hayno — hal daqiiqo fadlan.",
  ],
};

function matchResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("galaxy") || lower.includes("a54") || lower.includes("samsung phone")) return demoResponses.galaxy![0]!;
  if (lower.includes("tv") || lower.includes("television") || lower.includes("samsung 43")) return demoResponses.tv![0]!;
  if (lower.includes("headphone") || lower.includes("sony") || lower.includes("wh-1000")) return demoResponses.headphones![0]!;
  if (lower.includes("iphone") || lower.includes("apple phone")) return demoResponses.iphone![0]!;
  if (lower.includes("laptop") || lower.includes("dell") || lower.includes("inspiron")) return demoResponses.laptop![0]!;
  if (lower.includes("macbook") || lower.includes("mac")) return demoResponses.macbook![0]!;
  if (lower.includes("tablet") || lower.includes("tab") || lower.includes("galaxy tab")) return demoResponses.tablet![0]!;
  if (lower.includes("speaker") || lower.includes("jbl")) return demoResponses.jbl![0]!;
  if (lower.includes("qiimo") || lower.includes("price") || lower.includes("waa imisa")) return demoResponses.default![0]!;
  return demoResponses.default![0]!;
}

export function ChatWidget() {
  const [messages, setMessages] = useState<SimMessage[]>(demoMessages);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState<"so" | "en">("so");
  const [isThinking, setIsThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;

    const userMsg: SimMessage = {
      id: `msg-${Date.now()}`,
      role: "customer",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsThinking(true);

    // Simulate response delay
    setTimeout(() => {
      const response = matchResponse(text);
      const aiMsg: SimMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: response,
        verified: !response.includes("unavailable") && !response.includes("out of stock") && !response.includes("Kuma xaqiijin karno"),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 1200);
  }

  return (
    <div
      className="flex flex-col rounded-lg border shadow-sm overflow-hidden"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* Chat header */}
      <div
        className="flex items-center gap-3 border-b px-4 py-3"
        style={{ borderColor: "var(--border)" }}
      >
        <Sparkle className="size-5 text-saffron" />
        <span className="font-heading text-sm font-semibold text-foreground">
          Hilaac Sales Assistant
        </span>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setLanguage(language === "so" ? "en" : "so")}
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors",
              "hover:bg-surface-subtle"
            )}
            aria-label={`Switch to ${language === "so" ? "English" : "Somali"}`}
          >
            <Translate className="size-3" />
            {language === "so" ? "SO" : "EN"}
          </button>
          <Badge variant="warning">Demo</Badge>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4" style={{ minHeight: 320, maxHeight: 480 }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex gap-3",
              msg.role === "customer" && "justify-end"
            )}
          >
            {msg.role !== "customer" && (
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-muted">
                {msg.role === "assistant" ? (
                  <Sparkle className="size-4 text-saffron" />
                ) : (
                  <User className="size-4 text-muted-foreground" />
                )}
              </div>
            )}
            <div
              className={cn(
                "max-w-[80%] rounded-lg px-4 py-2.5 text-sm",
                msg.role === "customer"
                  ? "bg-saffron text-obsidian"
                  : "text-foreground"
              )}
              style={
                msg.role !== "customer"
                  ? { backgroundColor: "var(--surface-subtle)" }
                  : undefined
              }
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
              {msg.verified !== undefined && (
                <span
                  className={cn(
                    "mt-1 inline-flex items-center gap-1 text-[11px]",
                    msg.verified ? "text-success" : "text-muted-foreground"
                  )}
                >
                  {msg.verified
                    ? "Verified catalog data"
                    : msg.role === "assistant" && "Unverified — human review needed"}
                </span>
              )}
            </div>
            {msg.role === "customer" && (
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-saffron/20">
                <User className="size-4 text-saffron" />
              </div>
            )}
          </div>
        ))}
        {isThinking && (
          <div className="flex gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-muted">
              <Sparkle className="size-4 text-saffron" />
            </div>
            <div
              className="rounded-lg px-4 py-2.5 text-sm"
              style={{ backgroundColor: "var(--surface-subtle)" }}
            >
              <span className="inline-flex gap-1">
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0ms" }} />
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "150ms" }} />
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "300ms" }} />
              </span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div
        className="flex items-center gap-2 border-t p-3"
        style={{ borderColor: "var(--border)" }}
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={
            language === "so"
              ? "Ku qor su'aashaada halkan..."
              : "Type your question here..."
          }
          className="flex-1"
        />
        <Button
          onClick={handleSend}
          size="icon"
          disabled={!input.trim() || isThinking}
          aria-label="Send message"
        >
          <PaperPlaneTilt className="size-4" />
        </Button>
      </div>

      {/* Abstention notice */}
      <div
        className="flex items-center gap-2 border-t px-4 py-2 text-[11px]"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--surface-subtle)",
          color: "var(--muted-foreground)",
        }}
      >
        <WarningCircle className="size-3" />
        If catalog data is unavailable, this assistant will say so instead of inventing an answer.
      </div>
    </div>
  );
}