// components/LoginForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const customerSchema = z.object({
  phone: z.string().min(10, "Enter valid phone"),
});

const agentSchema = z.object({
  username: z.string().min(1, "Username required"),
});

type CustomerFormData = z.infer<typeof customerSchema>;
type AgentFormData = z.infer<typeof agentSchema>;

interface LoginFormProps {
  role: "customer" | "agent";
  onLogin: (data: { phone?: string; username?: string; name: string }) => void;
}

export default function LoginForm({ role, onLogin }: LoginFormProps) {
  const schema = role === "customer" ? customerSchema : agentSchema;

  const form = useForm<CustomerFormData | AgentFormData>({
    resolver: zodResolver(schema),
    defaultValues: role === "customer" ? { phone: "" } : { username: "" },
  });

  const onSubmit = (data: CustomerFormData | AgentFormData) => {
    if (role === "customer") {
      const { phone } = data as CustomerFormData;
      if (phone === "+919876543210") {
        onLogin({ phone, name: "Rahul Sharma" });
      } else if (phone === "+919876543211") {
        onLogin({ phone, name: "Priya Patel" });
      } else {
        alert("Invalid phone number");
      }
    } else {
      const { username } = data as AgentFormData;
      if (username === "amit.kumar") {
        onLogin({ username, name: "Amit Kumar" });
      } else if (username === "sneha.singh") {
        onLogin({ username, name: "Sneha Singh" });
      } else {
        alert("Invalid username");
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-80 space-y-6 rounded-lg bg-white p-8 shadow-xl"
      >
        <h3 className="text-center text-2xl font-bold text-blue-700">
          {role === "customer" ? "Customer Login" : "Agent Login"}
        </h3>

        <FormField
          control={form.control}
          name={role === "customer" ? "phone" : "username"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">
                {role === "customer" ? "Phone Number" : "Username"}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={
                    role === "customer" ? "+919876543210" : "amit.kumar"
                  }
                  type={role === "customer" ? "tel" : "text"}
                  className="border-gray-300 focus:border-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
        >
          Login
        </Button>
      </form>
    </Form>
  );
}