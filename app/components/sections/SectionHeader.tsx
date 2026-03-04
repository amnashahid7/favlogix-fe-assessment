import { ChevronDown } from "lucide-react";

export function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between text-sm font-medium">
      <span>{title}</span>
      <ChevronDown size={16} className="text-gray-500" />
    </div>
  );
}