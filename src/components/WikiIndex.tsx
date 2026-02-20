"use client";
import { useState } from "react";
import { Soul } from "@/lib/types";
import Link from "next/link";

export default function WikiIndex({ souls, initialQuery = "" }: { souls: Soul[], initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);

  const filtered = souls.filter((s) => {
    const lq = query.toLowerCase();
    return s.name.toLowerCase().includes(lq) || s.description.toLowerCase().includes(lq) || (s.tags && s.tags.some(t => t.toLowerCase().includes(lq)));
  });

  return (
    <div className="p-5">
      <input 
        type="text" 
        placeholder="Filter within index (e.g. 'coding', 'strict')" 
        className="w-full px-4 py-2 text-sm border border-wiki-border dark:border-wiki-borderDark bg-gray-50 dark:bg-gray-800/50 rounded-lg mb-6 outline-none focus:ring-2 focus:ring-wiki-blue/50"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {filtered.length === 0 ? (
        <div className="text-center py-8 text-gray-500 italic text-sm border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
          No articles match your search.
        </div>
      ) : (
        <ul className="space-y-3 text-sm columns-1 sm:columns-2 gap-8">
          {filtered.map(s => (
            <li key={s.id} className="break-inside-avoid flex items-center gap-2 group">
              <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">{s.emoji}</span>
              <div className="flex-1 min-w-0">
                <Link href={`/souls/${s.id}`} className="font-medium truncate block">{s.name}</Link>
                <span className="text-gray-400 text-xs block uppercase tracking-wider mt-0.5">{s.category || 'General'}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}