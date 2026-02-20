"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSouls } from "@/data/souls"; // Note: This might need an API route if used purely client side, but let's mock the search or use a router push.

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
    <form onSubmit={handleSearch} className="flex w-full max-w-xl items-center bg-white dark:bg-gray-800 border border-wiki-border dark:border-wiki-borderDark rounded overflow-hidden">
      <input
        type="search"
        placeholder="Search Soulpedia"
        className="w-full px-3 py-1.5 text-sm bg-transparent outline-none dark:text-white"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 border-l border-wiki-border dark:border-wiki-borderDark hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
        🔍
      </button>
    </form>
  );
}