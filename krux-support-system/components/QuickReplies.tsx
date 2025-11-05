import { Button } from "@/components/ui/button";

const templates = [
  "Thank you for your query.",
  "Your application is under review.",
  "Please provide more details.",
];

interface QuickRepliesProps {
  onSelect: (reply: string) => void;
}

export function QuickReplies({ onSelect }: QuickRepliesProps) {
  return (
    <div className="flex space-x-2 overflow-x-auto">
      {templates.map((tpl, idx) => (
        <Button key={idx} variant="outline" size="sm" onClick={() => onSelect(tpl)}>{tpl}</Button>
      ))}
    </div>
  );
}