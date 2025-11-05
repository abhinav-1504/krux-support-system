// components/LoginForm.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const customerSchema = z.object({
  phone: z.string().min(10),
});

const agentSchema = z.object({
  username: z.string().min(1),
});

type CustomerData = z.infer<typeof customerSchema>;
type AgentData = z.infer<typeof agentSchema>;

interface LoginFormProps {
  role: "customer" | "agent";
  onLogin: (data: { phone?: string; username?: string; name: string }) => void;
}

export default function LoginForm({ role, onLogin }: LoginFormProps) {
  const schema = role === "customer" ? customerSchema : agentSchema;

  const form = useForm<CustomerData | AgentData>({
    resolver: zodResolver(schema),
    defaultValues: role === "customer" ? { phone: "" } : { username: "" },
  });

  const onSubmit = (data: CustomerData | AgentData) => {
    if (role === "customer") {
      const customerData = data as CustomerData;
      if (customerData.phone === "+919876543210") {
        onLogin({ phone: customerData.phone, name: "Rahul Sharma" });
      } else if (customerData.phone === "+919876543211") {
        onLogin({ phone: customerData.phone, name: "Priya Patel" });
      } else {
        alert("Invalid phone number");
      }
    } else {
      const agentData = data as AgentData;
      if (agentData.username === "amit.kumar") {
        onLogin({ username: agentData.username, name: "Amit Kumar" });
      } else if (agentData.username === "sneha.singh") {
        onLogin({ username: agentData.username, name: "Sneha Singh" });
      } else {
        alert("Invalid username");
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-80 p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-center">
          {role === "customer" ? "Customer Login" : "Agent Login"}
        </h3>

        <FormField
          control={form.control}
          name={role === "customer" ? "phone" : "username"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{role === "customer" ? "Phone Number" : "Username"}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={role === "customer" ? "+919876543210" : "amit.kumar"}
                  type={role === "customer" ? "tel" : "text"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Form>
  );
}