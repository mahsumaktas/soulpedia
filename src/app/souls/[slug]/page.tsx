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
    <article className="wiki-article">
      <div className="flex justify-between items-baseline mb-2">
        <h1 className="mb-0 border-none">{soul.name}</h1>
      </div>
      <div className="border-b border-wiki-border dark:border-wiki-borderDark mb-4" />
      
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        From Soulpedia, the free AI persona encyclopedia
      </div>

      {/* INFOBOX (Floated Right) */}
      <table className="wiki-infobox">
        <tbody>
          <tr>
            <th colSpan={2} className="text-center text-lg bg-gray-200 dark:bg-gray-700">
              {soul.name}
            </th>
          </tr>
          <tr>
            <td colSpan={2} className="text-center text-6xl py-4">
              {soul.emoji}
            </td>
          </tr>
          <tr>
            <th>Category</th>
            <td>{soul.category || "General"}</td>
          </tr>
          <tr>
            <th>Tools</th>
            <td>
              {soul.tools?.map(t => (
                <div key={t}><Link href={`/?search=${t}`}>{t}</Link></div>
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
              <td>{soul.tags.join(", ")}</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ARTICLE BODY */}
      <p className="mb-4">
        <b>{soul.name}</b> is an advanced Artificial Intelligence persona (often referred to as a &quot;soul&quot;) designed primarily for use in CLI-based AI assistants. {soul.description}
      </p>

      <p className="mb-4">
        Users typically invoke this soul by injecting its YAML configuration into their local <code>.md</code> system prompt files. Once active, the assistant inherits the soul&apos;s strict behavioral guidelines, communication tone, and fundamental beliefs (memory injections).
      </p>

      {/* Table of Contents */}
      <div className="wiki-toc">
        <div className="font-bold text-base border-b border-wiki-border dark:border-wiki-borderDark pb-1 mb-2 inline-block">Contents</div>
        <ol className="list-decimal pl-5 text-sm space-y-1">
          <li><a href="#prompt">System Prompt</a></li>
          {soul.tone && soul.tone.length > 0 && <li><a href="#tone">Communication Tone</a></li>}
          {soul.bans && soul.bans.length > 0 && <li><a href="#bans">Behavioral Bans</a></li>}
          {soul.memory_injections && soul.memory_injections.length > 0 && <li><a href="#memory">Memory Injections</a></li>}
          <li><a href="#installation">Installation CLI</a></li>
        </ol>
      </div>

      <h2 id="prompt">System Prompt</h2>
      <p className="mb-4">
        The core instruction set that defines the identity of {soul.name}. It establishes the primary goal and overarching behavior.
      </p>
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-4 mb-6 relative group">
        <div className="absolute top-2 right-2">
          <CopyButton text={soul.prompt} />
        </div>
        <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-200">
          {soul.prompt}
        </pre>
      </div>

      {(soul.tone && soul.tone.length > 0) && (
        <>
          <h2 id="tone">Communication Tone</h2>
          <p className="mb-2">When this persona is active, it strictly adheres to the following conversational styles:</p>
          <ul className="list-disc pl-5 mb-6">
            {soul.tone.map((t, idx) => <li key={idx}><i>{t}</i></li>)}
          </ul>
        </>
      )}

      {(soul.bans && soul.bans.length > 0) && (
        <>
          <h2 id="bans">Behavioral Bans</h2>
          <p className="mb-2">To maintain character integrity, {soul.name} is explicitly forbidden from performing certain actions. These negative constraints are known as &quot;bans&quot;.</p>
          <ul className="list-disc pl-5 mb-6">
            {soul.bans.map((b, idx) => (
              <li key={idx}>
                <span className="text-red-600 dark:text-red-400 font-bold">Never: </span>
                {b}
              </li>
            ))}
          </ul>
        </>
      )}

      {(soul.memory_injections && soul.memory_injections.length > 0) && (
        <>
          <h2 id="memory">Memory Injections</h2>
          <p className="mb-2">These are core beliefs and persistent rules injected deeply into the AI&apos;s context window. They cannot be easily overridden by user requests.</p>
          <ul className="list-disc pl-5 mb-6">
            {soul.memory_injections.map((m, idx) => (
              <li key={idx}>
                <span className="font-bold">Core Belief: </span>
                {m}
              </li>
            ))}
          </ul>
        </>
      )}

      <h2 id="installation">Installation CLI</h2>
      <p className="mb-4">
        To inject this soul into your local project&apos;s AI assistant, run the following command using the official Soulpedia CLI tool.
      </p>
      <div className="bg-gray-100 dark:bg-gray-800 p-4 border-l-4 border-wiki-blue dark:border-wiki-blueDark mb-6 font-mono text-sm">
        npx github:mahsumaktas/soulpedia install {soul.id}
      </div>

    </article>
  );
}