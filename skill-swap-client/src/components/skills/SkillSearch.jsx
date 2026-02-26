import { Search } from "lucide-react";

export default function SkillSearch({ search, setSearch }) {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search skills..."
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  );
}
