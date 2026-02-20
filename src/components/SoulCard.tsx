"use client";
import { Soul } from "@/lib/types";
import { useState } from "react";
import Link from "next/link";

const TOOL_COLORS: Record<string, string> = {
  "claude-code": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  "gemini-cli": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "openai": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "cursor": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

export default function SoulCard({ soul }: { soul: Soul }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(soul.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Link href={`/souls/${soul.id}`} className="block group">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 hover:-translate-y-0.5 flex flex-col gap-4 h-full">
        <div className="flex items-start gap-3">
          <span className="text-4xl">{soul.emoji}</span>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{soul.name}</h3>
            <span className="text-xs text-gray-500 capitalize">{soul.category}</span>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-1">{soul.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {soul.tools.map((tool) => (
            <span key={tool} className={`text-xs px-2 py-0.5 rounded-full font-medium ${TOOL_COLORS[tool] || "bg-gray-100 text-gray-600"}`}>
              {tool}
            </span>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="w-full py-2.5 px-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          {copied ? <><span>✓</span> Copied!</> : <><span>📋</span> Copy Prompt</>}
        </button>
      </div>
    </Link>
  );
}
