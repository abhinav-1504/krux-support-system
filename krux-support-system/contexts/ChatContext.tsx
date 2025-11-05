"use client";

import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";

interface Message {
  text: string;
  sender: string;
  timestamp: string;
}

interface Conversations {
  [key: string]: Message[];
}

interface ChatState {
  conversations: Conversations;
}

type Action =
  | { type: "ADD_MESSAGE"; conversationId: string; message: Message }
  | { type: "UPDATE_CONVERSATION"; conversationId: string; messages: Message[] }
  | { type: "UPDATE_TICKET_STATUS"; ticketId: string; status: string };

const initialState: ChatState = {
  conversations: {},
};

function chatReducer(state: ChatState, action: Action): ChatState {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.conversationId]: [...(state.conversations[action.conversationId] || []), action.message],
        },
      };
    case "UPDATE_CONVERSATION":
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.conversationId]: action.messages,
        },
      };
    case "UPDATE_TICKET_STATUS":
      return state;
    default:
      return state;
  }
}

interface ChatContextType {
  conversations: Conversations;
  addMessage: (conversationId: string, message: Message) => void;
  updateConversation: (conversationId: string, messages: Message[]) => void;
  updateTicketStatus: (ticketId: string, status: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  useEffect(() => {
    const stored = localStorage.getItem("conversations");
    if (stored) {
      dispatch({ type: "UPDATE_CONVERSATION", conversationId: "", messages: [] }); // Dummy to load
      const parsed = JSON.parse(stored);
      Object.keys(parsed).forEach(key => {
        dispatch({ type: "UPDATE_CONVERSATION", conversationId: key, messages: parsed[key] });
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("conversations", JSON.stringify(state.conversations));
  }, [state.conversations]);

  const addMessage = (conversationId: string, message: Message) => {
    dispatch({ type: "ADD_MESSAGE", conversationId, message });
  };

  const updateConversation = (conversationId: string, messages: Message[]) => {
    dispatch({ type: "UPDATE_CONVERSATION", conversationId, messages });
  };

  const updateTicketStatus = (ticketId: string, status: string) => {
    dispatch({ type: "UPDATE_TICKET_STATUS", ticketId, status });
  };

  return (
    <ChatContext.Provider value={{ conversations: state.conversations, addMessage, updateConversation, updateTicketStatus }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (undefined === context) throw new Error("useChat must be used within ChatProvider");
  return context;
}
