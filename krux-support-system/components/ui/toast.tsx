// components/ui/toast.tsx
"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export const Toast = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { toast } = useToast();

  return null; // This is just a placeholder — real toast is rendered by ToastProvider
});

Toast.displayName = "Toast";