"use client";
import { toast } from "sonner"; // ← ONLY THIS
import { Message } from "@/types";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useChat } from "@/contexts/ChatContext";
import { TicketQueue } from "@/components/TicketQueue";
import { CustomerInfoPanel } from "@/components/CustomerInfoPanel";
import { QuickReplies } from "@/components/QuickReplies";
import { MessageBubble } from "@/components/MessageBubble";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Search } from "lucide-react";
import LoginForm from "@/components/LoginForm";

export default function SupportDashboard() {
  const { user, login, logout } = useAuth();
  const { conversations, addMessage } = useChat();
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const tickets = Object.keys(conversations).filter(
    (k) =>
      k.startsWith("ticket_") &&
      conversations[k].some((m) =>
        m.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleSend = () => {
    if (!input.trim() || !selectedTicket) return;
    addMessage(selectedTicket, {
      text: input,
      sender: "agent",
      timestamp: new Date().toISOString(),
    });
    setInput("");
    toast.success("Message Sent", {
      description: "Customer will see your reply instantly",
    });
  };

  if (!user || user.role !== "agent") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">
        <LoginForm role="agent" onLogin={(d) => login({ ...d, role: "agent" })} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className="w-80 bg-white border-r shadow-lg p-4 overflow-y-auto">
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="ghost" size="icon"><Search /></Button>
        </div>
        {tickets.length ? (
          <TicketQueue tickets={tickets} onSelect={setSelectedTicket} />
        ) : (
          <p className="text-gray-400 text-center mt-6">No tickets found</p>
        )}
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="p-4 bg-white border-b shadow flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedTicket || "Select a ticket"}
          </h2>
          <Button variant="ghost" onClick={logout}>Logout</Button>
        </header>

        {selectedTicket ? (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {(conversations[selectedTicket] || []).map((m, i) => (
                <MessageBubble key={i} message={m} isOwn={m.sender === "agent"} />
              ))}
            </div>
            <div className="p-4 bg-white border-t shadow-lg">
              <QuickReplies onSelect={setInput} />
              <div className="flex gap-3 mt-4">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  placeholder="Reply to customer..."
                  className="flex-1"
                />
                <Button onClick={handleSend} className="bg-green-600 hover:bg-green-700">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-2xl text-gray-400">
            Pick a ticket
          </div>
        )}
      </main>

      <aside className="w-80 bg-white border-l shadow-lg p-6">
        {selectedTicket && <CustomerInfoPanel ticketId={selectedTicket} />}
        <div className="mt-8 space-y-3">
          <Button className="w-full bg-emerald-600">Resolve</Button>
          <Button variant="outline" className="w-full">Escalate</Button>
          <Input placeholder="Internal note..." />
        </div>
      </aside>
    </div>
  );
}