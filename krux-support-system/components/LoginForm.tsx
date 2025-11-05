import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Assume Shadcn form added

const customerSchema = z.object({
  phone: z.string().min(10),
});

const agentSchema = z.object({
  username: z.string().min(1),
});

interface LoginFormProps {
  role: "customer" | "agent";
  onLogin: (data: any) => void;
}

export default function LoginForm({ role, onLogin }: LoginFormProps) {
  const schema = role === "customer" ? customerSchema : agentSchema;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: role === "customer" ? { phone: "" } : { username: "" },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    if (role === "customer") {
      if (data.phone === "+919876543210") {
        onLogin({ phone: data.phone, name: "Rahul Sharma" });
      } else if (data.phone === "+919876543211") {
        onLogin({ phone: data.phone, name: "Priya Patel" });
      } else {
        alert("Invalid phone");
      }
    } else {
      if (data.username === "amit.kumar") {
        onLogin({ username: data.username, name: "Amit Kumar" });
      } else if (data.username === "sneha.singh") {
        onLogin({ username: data.username, name: "Sneha Singh" });
      } else {
        alert("Invalid username");
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-80">
        <FormField
          control={form.control}
          name={role === "customer" ? "phone" : "username"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{role === "customer" ? "Phone" : "Username"}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
}