// components/MessageBubble.tsx
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock } from "lucide-react";
import { Message } from "@/types";

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      {!isOwn && (
        <Avatar className="mr-2">
          <AvatarFallback>{message.sender[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`max-w-xs p-3 rounded-lg ${
          isOwn ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        <p>{message.text}</p>
        <div className="flex items-center text-xs mt-1 opacity-75">
          <Clock size={12} className="mr-1" />
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
      {isOwn && (
        <Avatar className="ml-2">
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}