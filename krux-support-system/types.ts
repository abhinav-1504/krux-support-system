// types.ts
export type Message = {
  text: string;
  sender: "customer" | "bot" | "agent";
  timestamp: string;
};

export type Conversation = {
  [key: string]: Message[];
};

export type User = {
  role: "customer" | "agent";
  name: string;
  phone?: string;
  username?: string;
};