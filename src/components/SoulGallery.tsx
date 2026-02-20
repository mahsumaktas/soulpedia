"use client";
import { useState } from "react";
import { Soul, ToolFilter, CategoryFilter } from "@/lib/types";
import SoulCard from "./SoulCard";

const TOOLS: { value: ToolFilter; label: string }[] = [
  { value: "all", label: "All Tools" },
  { value: "Claude Code", label: "Claude Code" },
  { value: "Gemini CLI", label: "Gemini CLI" },
  { value: "OpenAI", label: "OpenAI" },
  { value: "Cursor", label: "Cursor" },
];

const CATEGORIES: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "Mentor", label: "Mentor" },
  { value: "Coach", label: "Coach" },
  { value: "Technical", label: "Technical" },
  { value: "Creative", label: "Creative" },
  { value: "Cultural", label: "Cultural" },
  { value: "Architecture", label: "Architecture" },
  { value: "Security", label: "Security" },
  { value: "Coding", label: "Coding" },
];

export default function SoulGallery({ souls }: { souls: Soul[] }) {
  const [activeTool, setActiveTool] = useState<ToolFilter>("all");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = souls.filter((soul) => {
    // Tool Match
    const toolMatch = activeTool === "all" || soul.tools?.includes(activeTool);
    
    // Category Match
    const catMatch = activeCategory === "all" || soul.category === activeCategory;
    
    // Search Query Match (search in name, description, tags, id)
    const lowerQuery = searchQuery.toLowerCase();
    const searchMatch = !searchQuery || (
      soul.name.toLowerCase().includes(lowerQuery) ||
      soul.description.toLowerCase().includes(lowerQuery) ||
      soul.id.toLowerCase().includes(lowerQuery) ||
      (soul.tags && soul.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
    );

    return toolMatch && catMatch && searchMatch;
  });

  return (
    <>
      <div className="mb-8">
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-2xl leading-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow sm:text-lg"
            placeholder="Search by name, behavior, or tag (e.g. 'mentor', 'security')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        {TOOLS.map(({ value, label }) => (
          <button key={value} onClick={() => setActiveTool(value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTool === value ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-gray-400"}`}>
            {label}
          </button>
        ))}
      </div>
      
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {CATEGORIES.map(({ value, label }) => (
          <button key={value} onClick={() => setActiveCategory(value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === value ? "bg-indigo-600 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-gray-400"}`}>
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-300 dark:border-gray-800">
          <span className="text-4xl mb-4 block">👻</span>
          <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">No souls found</h3>
          <p>We couldn't find any persona matching "{searchQuery}". Try a different term or filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((soul) => <SoulCard key={soul.id} soul={soul} />)}
        </div>
      )}
    </>
  );
}