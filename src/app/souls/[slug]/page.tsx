import { souls } from "@/data/souls";
import { notFound } from "next/navigation";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const soul = souls.find((s) => s.id === slug);
  if (!soul) return {};
  return {
    title: `${soul.emoji} ${soul.name} — soulpedia`,
    description: soul.description,
  };
}

export async function generateStaticParams() {
  return souls.map((s) => ({ slug: s.id }));
}

const TOOL_COLORS: Record<string, string> = {
  "claude-code": "bg-orange-100 text-orange-700",
  "gemini-cli": "bg-blue-100 text-blue-700",
  "openai": "bg-green-100 text-green-700",
  "cursor": "bg-purple-100 text-purple-700",
};

export default async function SoulDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const soul = souls.find((s) => s.id === slug);
  if (!soul) notFound();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl">🧠</span>
            <span className="font-bold text-xl text-gray-900 dark:text-white">soulpedia</span>
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            ← All souls
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-6">
          <span className="text-6xl">{soul.emoji}</span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{soul.name}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{soul.description}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {soul.tools.map((tool) => (
            <span
              key={tool}
              className={`text-sm px-3 py-1 rounded-full font-medium ${TOOL_COLORS[tool] || "bg-gray-100 text-gray-600"}`}
            >
              {tool}
            </span>
          ))}
          {soul.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">System Prompt</span>
            <CopyButton text={soul.prompt} />
          </div>
          <pre className="p-5 text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed font-mono overflow-x-auto">
            {soul.prompt}
          </pre>
        </div>

        {soul.author && (
          <p className="mt-6 text-sm text-gray-400">by {soul.author}</p>
        )}
      </main>
    </div>
  );
}
