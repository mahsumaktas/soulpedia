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
    <div>
      <input 
        type="text" 
        placeholder="Filter within index (e.g. 'coding', 'strict')" 
        className="w-full px-2 py-1 text-sm border border-wiki-border dark:border-wiki-borderDark bg-white dark:bg-gray-800 mb-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {filtered.length === 0 ? (
        <p className="text-gray-500 italic text-sm">No articles match your search.</p>
      ) : (
        <ul className="list-disc pl-5 space-y-1 text-sm columns-1 sm:columns-2">
          {filtered.map(s => (
            <li key={s.id} className="break-inside-avoid">
              <Link href={`/souls/${s.id}`}>{s.name}</Link>
              <span className="text-gray-500 text-xs ml-1">({s.category || 'Other'})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}