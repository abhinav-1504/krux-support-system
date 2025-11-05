// app/layout.tsx
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/contexts/AuthContext";
import { ChatProvider } from "@/contexts/ChatContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KRUX Finance Support System",
  description: "Customer support chatbot and dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ChatProvider>
            {children}
            <Toaster richColors position="top-right" /> {/* ← ADD THIS */}
          </ChatProvider>
        </AuthProvider>
      </body>
    </html>
  );
}