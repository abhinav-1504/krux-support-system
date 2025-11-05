import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TicketQueueProps {
  tickets: string[];
  onSelect: (ticketId: string) => void;
}

export function TicketQueue({ tickets, onSelect }: TicketQueueProps) {
  return (
    <div className="space-y-2">
      {tickets.map((ticket) => (
        <Card key={ticket} onClick={() => onSelect(ticket)} className="cursor-pointer">
          <CardContent className="p-4">
            <div className="flex justify-between">
              <span>{ticket}</span>
              <Badge variant="secondary">Open</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}