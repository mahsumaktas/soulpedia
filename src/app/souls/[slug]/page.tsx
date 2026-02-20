import { souls, getSouls } from "@/data/souls";
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
  const currentSouls = getSouls();
  return currentSouls.map((s) => ({ slug: s.id }));
}

const TOOL_COLORS: Record<string, string> = {
  "Claude Code": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  "Gemini CLI": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "OpenAI": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "Cursor": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
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
            ← Tüm Soullara Dön
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
          {soul.tools?.map((tool) => (
            <span
              key={tool}
              className={`text-sm px-3 py-1 rounded-full font-medium ${TOOL_COLORS[tool] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}
            >
              {tool}
            </span>
          ))}
          {soul.tags?.map((tag) => (
            <span
              key={tag}
              className="text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            >
              #{tag}
            </span>
          ))}
          {soul.category && (
            <span className="text-sm px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
              {soul.category}
            </span>
          )}
        </div>

        {/* Kurulum Talimatı */}
        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">💻 CLI ile Hızlı Kurulum</h3>
          <code className="text-sm text-blue-800 dark:text-blue-400 font-mono">npx soulpedia install {soul.id}</code>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Kimlik ve Sistem Promptu (System Prompt)</span>
              <CopyButton text={soul.prompt} />
            </div>
            <pre className="p-5 text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed font-mono overflow-x-auto">
              {soul.prompt}
            </pre>
          </div>

          {(soul.tone && soul.tone.length > 0) && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden p-5">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 border-b border-gray-100 dark:border-gray-800 pb-2">🗣️ İletişim Tonu (Tone)</h3>
              <ul className="list-disc pl-5 text-sm text-gray-800 dark:text-gray-200 space-y-1">
                {soul.tone.map((t, idx) => <li key={idx}>{t}</li>)}
              </ul>
            </div>
          )}

          {(soul.bans && soul.bans.length > 0) && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-red-200 dark:border-red-900/30 overflow-hidden p-5">
              <h3 className="text-sm font-medium text-red-500 dark:text-red-400 mb-3 border-b border-red-100 dark:border-red-900/30 pb-2">🚫 Kesin Yasaklar (Bans)</h3>
              <ul className="list-disc pl-5 text-sm text-gray-800 dark:text-gray-200 space-y-1">
                {soul.bans.map((b, idx) => <li key={idx}>{b}</li>)}
              </ul>
            </div>
          )}

          {(soul.memory_injections && soul.memory_injections.length > 0) && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-purple-200 dark:border-purple-900/30 overflow-hidden p-5">
              <h3 className="text-sm font-medium text-purple-500 dark:text-purple-400 mb-3 border-b border-purple-100 dark:border-purple-900/30 pb-2">🧠 Hafıza ve İnançlar (Memory Injections)</h3>
              <ul className="list-disc pl-5 text-sm text-gray-800 dark:text-gray-200 space-y-1">
                {soul.memory_injections.map((m, idx) => <li key={idx}>{m}</li>)}
              </ul>
            </div>
          )}
        </div>

        {soul.author && (
          <p className="mt-8 text-sm text-gray-400 dark:text-gray-500 text-center">
            Created by {soul.author} • Version {soul.version || '1.0'}
          </p>
        )}
      </main>
    </div>
  );
}