import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export default function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
  onSearch,
}: SearchBarProps) {
  return (
    <div className="flex items-center space-x-2 w-full">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-grow"
      />
      <Button type="button" onClick={onSearch} variant="outline">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
}
