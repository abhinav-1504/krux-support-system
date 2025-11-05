"use client";
import { Message } from "@/types";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useChat } from "@/contexts/ChatContext";
import { MessageBubble } from "@/components/MessageBubble";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import LoginForm from "@/components/LoginForm";
import { useToast } from "@/components/ui/use-toast";
import { handleBotResponse } from "@/lib/botLogic";

export default function CustomerChat() {
  const { user, login, logout } = useAuth();
  const { conversations, addMessage, updateConversation } = useChat();
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations[conversationId || ""]]);

  useEffect(() => {
    if (user?.role === "customer") {
      const id = `conv_${user.phone}`;
      setConversationId(id);
      if (!conversations[id]) updateConversation(id, []);
    }
  }, [user, conversations]);

  const handleSend = async () => {
    if (!input.trim() || !conversationId) return;

    addMessage(conversationId, {
      text: input,
      sender: "customer",
      timestamp: new Date().toISOString(),
    });
    setInput("");

    const botReply = await handleBotResponse(input, user!);
    addMessage(conversationId, {
      text: botReply,
      sender: "bot",
      timestamp: new Date().toISOString(),
    });

    if (botReply.toLowerCase().includes("escalating")) {
      const ticketId = `ticket_${Date.now()}`;
      updateConversation(ticketId, conversations[conversationId] || []);
      toast({
        title: "Ticket Created",
        description: `Your ticket ID: ${ticketId}`,
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="p-4 bg-blue-600 text-white shadow-xl flex justify-between items-center">
        <h2 className="text-xl font-bold">KRUX Support</h2>
        <Button variant="ghost" onClick={logout}>
          Logout
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {(conversations[conversationId || ""] || []).map((m, i) => (
          <MessageBubble key={i} message={m} isOwn={m.sender === "customer"} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t shadow-lg flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          placeholder="Ask about loans, status, documents..."
          className="flex-1"
        />
        <Button
          onClick={handleSend}
          size="icon"
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
