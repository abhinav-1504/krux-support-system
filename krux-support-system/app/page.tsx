"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">KRUX Finance Support System</h1>
      <div className="space-y-4">
        <Link href="/customer-chat">
          <Button variant="default">Customer Chat</Button>
        </Link>
        <Link href="/support-dashboard">
          <Button variant="outline">Support Dashboard</Button>
        </Link>
      </div>
      {user && <p className="mt-4">Logged in as {user.role}: {user.name}</p>}
    </div>
  );
}