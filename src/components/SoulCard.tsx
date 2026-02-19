"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import type { Soul } from "@/data/souls";

export default function SoulCard({ soul }: { soul: Soul }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(soul.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col gap-4 hover:border-purple-800 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-2xl">{soul.emoji}</span>
          <h2 className="text-lg font-semibold mt-1">{soul.name}</h2>
          <p className="text-gray-400 text-sm mt-1">{soul.description}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {soul.tools.map((tool) => (
          <span key={tool} className="text-xs bg-purple-900/40 text-purple-300 px-2 py-1 rounded-full">
            {tool}
          </span>
        ))}
        <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded-full">
          {soul.category}
        </span>
      </div>
      <pre className="bg-gray-950 rounded-lg p-3 text-xs text-gray-300 overflow-hidden max-h-24 relative">
        {soul.prompt.slice(0, 200)}...
      </pre>
      <button
        onClick={handleCopy}
        className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? "Copied!" : "Copy Soul"}
      </button>
    </div>
  );
}
