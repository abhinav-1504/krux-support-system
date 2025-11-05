// components/ui/sonner.tsx
"use client";

import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";

// Re-export the Toaster component
export const Toaster = SonnerToaster;

// Re-export the toast function (this is the magic line!)
export const toast = sonnerToast;