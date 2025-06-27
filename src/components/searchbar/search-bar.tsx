import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <Input
                type="text"
                placeholder="Search blogs..."
                className="pl-10"
            />
        </div>
    );
}
