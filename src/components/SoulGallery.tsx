"use client";
import { useState } from "react";
import { Soul, ToolFilter, CategoryFilter } from "@/lib/types";
import SoulCard from "./SoulCard";

const TOOLS: { value: ToolFilter; label: string }[] = [
  { value: "all", label: "All Tools" },
  { value: "claude-code", label: "Claude Code" },
  { value: "gemini-cli", label: "Gemini CLI" },
  { value: "openai", label: "OpenAI" },
  { value: "cursor", label: "Cursor" },
];

const CATEGORIES: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "mentor", label: "Mentor" },
  { value: "coach", label: "Coach" },
  { value: "technical", label: "Technical" },
  { value: "creative", label: "Creative" },
  { value: "cultural", label: "Cultural" },
];

export default function SoulGallery({ souls }: { souls: Soul[] }) {
  const [activeTool, setActiveTool] = useState<ToolFilter>("all");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const filtered = souls.filter((soul) => {
    const toolMatch = activeTool === "all" || soul.tools.includes(activeTool);
    const catMatch = activeCategory === "all" || soul.category === activeCategory;
    return toolMatch && catMatch;
  });

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4">
        {TOOLS.map(({ value, label }) => (
          <button key={value} onClick={() => setActiveTool(value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTool === value ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-gray-400"}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(({ value, label }) => (
          <button key={value} onClick={() => setActiveCategory(value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === value ? "bg-indigo-600 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-gray-400"}`}>
            {label}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">No souls found for this filter.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((soul) => <SoulCard key={soul.id} soul={soul} />)}
        </div>
      )}
    </>
  );
}
