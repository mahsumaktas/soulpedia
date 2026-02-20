"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WikiSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-xl items-center bg-gray-100/50 dark:bg-[#1c1f26] border border-gray-200/50 dark:border-[#272a30] rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-wiki-blue/50 focus-within:border-wiki-blue transition-all shadow-sm">
      <div className="pl-4 text-gray-400">🔍</div>
      <input
        type="search"
        placeholder="Search Soulpedia"
        className="w-full px-3 py-2 text-sm bg-transparent outline-none dark:text-white placeholder-gray-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}