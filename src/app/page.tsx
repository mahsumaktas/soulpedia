import { souls } from "@/data/souls";
import SoulCard from "@/components/SoulCard";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          soul<span className="text-purple-400">pedia</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Open-source soul and persona library for Claude Code, Gemini CLI, Codex CLI, and other AI tools.
          Inspired by{" "}
          <a href="https://prompts.chat" className="text-purple-400 hover:underline">
            prompts.chat
          </a>
          .
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {souls.map((soul) => (
          <SoulCard key={soul.id} soul={soul} />
        ))}
      </div>
    </main>
  );
}
