import { Tag } from "lucide-react";

export function TagBadge({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-1 px-3 py-1 border rounded-full text-sm bg-blue-50 text-blue-600 border-blue-200">
      <Tag size={14} />
      {text}
    </div>
  );
}