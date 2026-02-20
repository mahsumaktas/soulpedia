import { souls, getSouls } from "@/data/souls";
import { notFound } from "next/navigation";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const soul = souls.find((s) => s.id === slug);
  if (!soul) return {};
  return {
    title: `${soul.name} - Soulpedia`,
    description: soul.description,
  };
}

export async function generateStaticParams() {
  const currentSouls = getSouls();
  return currentSouls.map((s) => ({ slug: s.id }));
}

export default async function SoulArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const soul = souls.find((s) => s.id === slug);
  if (!soul) notFound();

  return (
    <article className="animate-in fade-in duration-500 max-w-[1000px] mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <h1 className="mb-0 border-none pb-0 text-4xl lg:text-5xl tracking-tight">{soul.name}</h1>
      </div>
      
      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-4 border-b border-wiki-border dark:border-wiki-borderDark">
        <span>From Soulpedia, the free AI persona encyclopedia</span>
        <span>•</span>
        <span className="uppercase tracking-wider font-semibold text-gray-400">{soul.category || "General"}</span>
      </div>

      {/* MODERN INFOBOX (Floated Right) */}
      <table className="wiki-infobox">
        <tbody>
          <tr>
            <th colSpan={2} className="text-center bg-gray-50 dark:bg-[#15171c] py-4 border-b border-wiki-border dark:border-wiki-borderDark">
              <span className="font-serif text-2xl font-medium text-gray-900 dark:text-white">{soul.name}</span>
            </th>
          </tr>
          <tr>
            <td colSpan={2} className="text-center py-10 bg-white dark:bg-[#1c1f26]">
              <div className="text-8xl filter drop-shadow-sm transform hover:scale-110 transition-transform duration-300">
                {soul.emoji}
              </div>
            </td>
          </tr>
          <tr>
            <th>Category</th>
            <td className="font-medium text-gray-900 dark:text-gray-100">{soul.category || "General"}</td>
          </tr>
          <tr>
            <th>Tools</th>
            <td className="flex flex-wrap gap-2">
              {soul.tools?.map(t => (
                <Link key={t} href={`/?search=${t}`} className="inline-flex items-center px-2 py-0.5 rounded-md bg-wiki-blue/10 text-wiki-blue dark:bg-wiki-blueDark/20 dark:text-wiki-blueDark text-xs font-medium hover:bg-wiki-blue/20 transition-colors">
                  {t}
                </Link>
              )) || "CLI / Any"}
            </td>
          </tr>
          <tr>
            <th>Author</th>
            <td>{soul.author || "Soulpedia Community"}</td>
          </tr>
          <tr>
            <th>Version</th>
            <td>{soul.version || "1.0"}</td>
          </tr>
          {soul.tags && soul.tags.length > 0 && (
            <tr>
              <th>Tags</th>
              <td className="text-xs text-gray-500 leading-relaxed">{soul.tags.join(", ")}</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ARTICLE BODY */}
      <div className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        <p className="mb-6">
          <strong className="text-gray-900 dark:text-white font-semibold">{soul.name}</strong> is an advanced Artificial Intelligence persona (often referred to as a &quot;soul&quot;) designed primarily for use in CLI-based AI assistants. {soul.description}
        </p>

        <p className="mb-8">
          Users typically invoke this soul by injecting its YAML configuration into their local <code className="text-base">.md</code> system prompt files. Once active, the assistant inherits the soul&apos;s strict behavioral guidelines, communication tone, and fundamental beliefs (memory injections).
        </p>
      </div>

      {/* Modern Table of Contents */}
      <div className="wiki-toc">
        <div className="font-semibold text-gray-900 dark:text-white border-b border-wiki-border dark:border-wiki-borderDark pb-3 mb-4 flex items-center gap-2">
          <span>📑</span> Contents
        </div>
        <ol className="list-decimal pl-5 text-sm space-y-2.5 text-gray-600 dark:text-gray-400 marker:text-gray-400 dark:marker:text-gray-500">
          <li><a href="#prompt" className="hover:text-wiki-blue transition-colors">System Prompt</a></li>
          {soul.tone && soul.tone.length > 0 && <li><a href="#tone" className="hover:text-wiki-blue transition-colors">Communication Tone</a></li>}
          {soul.bans && soul.bans.length > 0 && <li><a href="#bans" className="hover:text-wiki-blue transition-colors">Behavioral Bans</a></li>}
          {soul.memory_injections && soul.memory_injections.length > 0 && <li><a href="#memory" className="hover:text-wiki-blue transition-colors">Memory Injections</a></li>}
          <li><a href="#installation" className="hover:text-wiki-blue transition-colors">Installation via CLI</a></li>
        </ol>
      </div>

      <h2 id="prompt" className="scroll-mt-24">1. System Prompt</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        The core instruction set that defines the identity of {soul.name}. It establishes the primary goal and overarching behavior.
      </p>
      <div className="wiki-card mb-10 group relative border-gray-200 dark:border-gray-800">
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <CopyButton text={soul.prompt} />
        </div>
        <pre className="p-6 whitespace-pre-wrap font-mono text-sm leading-loose text-gray-800 dark:text-gray-200 bg-gray-50/50 dark:bg-transparent overflow-x-auto">
          {soul.prompt}
        </pre>
      </div>

      {(soul.tone && soul.tone.length > 0) && (
        <div className="mb-10">
          <h2 id="tone" className="scroll-mt-24">2. Communication Tone</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">When this persona is active, it strictly adheres to the following conversational styles:</p>
          <ul className="space-y-3 pl-2">
            {soul.tone.map((t, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-wiki-blue mt-1">🎙️</span>
                <i className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">{t}</i>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(soul.bans && soul.bans.length > 0) && (
        <div className="mb-10">
          <h2 id="bans" className="scroll-mt-24">3. Behavioral Bans</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">To maintain character integrity, {soul.name} is explicitly forbidden from performing certain actions. These negative constraints are known as &quot;bans&quot;.</p>
          <div className="wiki-card border-red-100 dark:border-red-900/30 bg-red-50/30 dark:bg-red-900/10">
            <ul className="divide-y divide-red-100 dark:divide-red-900/20">
              {soul.bans.map((b, idx) => (
                <li key={idx} className="p-4 flex items-start gap-3">
                  <span className="text-red-500 font-bold uppercase text-xs tracking-wider mt-1 shrink-0">Never</span>
                  <span className="text-gray-800 dark:text-gray-200 leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {(soul.memory_injections && soul.memory_injections.length > 0) && (
        <div className="mb-10">
          <h2 id="memory" className="scroll-mt-24">4. Memory Injections</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">These are core beliefs and persistent rules injected deeply into the AI&apos;s context window. They cannot be easily overridden by user requests.</p>
          <div className="wiki-card border-purple-100 dark:border-purple-900/30 bg-purple-50/30 dark:bg-purple-900/10">
            <ul className="divide-y divide-purple-100 dark:divide-purple-900/20">
              {soul.memory_injections.map((m, idx) => (
                <li key={idx} className="p-4 flex items-start gap-3">
                  <span className="text-purple-500 font-bold uppercase text-xs tracking-wider mt-1 shrink-0">Core Belief</span>
                  <span className="text-gray-800 dark:text-gray-200 leading-relaxed">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <h2 id="installation" className="scroll-mt-24">5. Installation via CLI</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        To inject this soul into your local project&apos;s AI assistant, run the following command using the official Soulpedia CLI tool.
      </p>
      <div className="wiki-card bg-gray-900 dark:bg-[#0f1115] border-gray-800 p-5 flex items-center gap-4 group">
        <span className="text-gray-500 font-mono text-sm select-none">$</span>
        <code className="text-gray-300 dark:text-gray-300 font-mono text-sm bg-transparent border-none p-0 flex-1">
          npx github:mahsumaktas/soulpedia install {soul.id}
        </code>
      </div>

    </article>
  );
}