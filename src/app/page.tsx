import { souls } from "@/data/souls";
import Link from "next/link";
import WikiIndex from "@/components/WikiIndex";

export default async function Home({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  const resolvedParams = await searchParams;
  const query = resolvedParams?.search || "";
  
  // Get featured soul (e.g., the first one, or specific one)
  const featuredSoul = souls.find(s => s.id === "the-architect") || souls[0];
  const newSouls = souls.slice(0, 3); // Just grabbing first 3 as 'new'

  return (
    <div className="wiki-page">
      {/* Top Main Page Title */}
      <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 p-6 text-center">
        <h1 className="text-3xl font-serif mb-2 border-none">Welcome to Soulpedia,</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          the free <a href="https://github.com/mahsumaktas/soulpedia" target="_blank" className="font-bold">open-source persona encyclopedia</a> that anyone can edit.
        </p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Currently hosting <b>{souls.length}</b> distinct AI souls (personas) for CLI tools.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column (Featured) */}
        <div className="flex-1">
          <div className="border border-green-200 dark:border-green-900/50 bg-green-50/50 dark:bg-green-900/10 mb-6">
            <h2 className="bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-300 font-bold px-3 py-1.5 m-0 border-b border-green-200 dark:border-green-900/50 text-base mt-0">
              From today&apos;s featured article
            </h2>
            <div className="p-4">
              <div className="float-left mr-4 mb-2 text-6xl">{featuredSoul.emoji}</div>
              <p className="mb-3">
                <b>{featuredSoul.name}</b> is an advanced AI persona designed for system architecture. {featuredSoul.description} It strictly prohibits writing boilerplate code, focusing instead on high-level system design, scalability, and maintainability.
              </p>
              <p className="mb-3">
                It operates under the <i>&quot;Zero Trust Architecture&quot;</i> philosophy and communicates in an authoritative, abstract tone. It is primarily used with Claude Code and Gemini CLI.
              </p>
              <p className="text-right text-sm">
                <b><Link href={`/souls/${featuredSoul.id}`}>Full article...</Link></b>
              </p>
            </div>
          </div>

          <div className="border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/10">
            <h2 className="bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300 font-bold px-3 py-1.5 m-0 border-b border-blue-200 dark:border-blue-900/50 text-base mt-0">
              Soulpedia Index (Browse Souls)
            </h2>
            <div className="p-4">
              <WikiIndex souls={souls} initialQuery={query} />
            </div>
          </div>
        </div>

        {/* Right Column (News / Did you know) */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="border border-purple-200 dark:border-purple-900/50 bg-purple-50/50 dark:bg-purple-900/10">
            <h2 className="bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-300 font-bold px-3 py-1.5 m-0 border-b border-purple-200 dark:border-purple-900/50 text-base mt-0">
              Did you know...
            </h2>
            <div className="p-4 text-sm">
              <ul className="list-disc pl-5 space-y-2">
                <li>...that you can inject a soul directly into your terminal by typing <code>npx soulpedia install socrates</code>?</li>
                <li>...that <b>{newSouls[0].name}</b> {newSouls[0].emoji} is one of the most strictly regulated personas, refusing to give direct answers?</li>
                <li>...that a &quot;Soul&quot; in Soulpedia isn&apos;t just a prompt, but a collection of <i>Bans</i>, <i>Tones</i>, and <i>Memory Injections</i>?</li>
              </ul>
              <p className="text-right mt-3">
                <b><a href="https://github.com/mahsumaktas/soulpedia/blob/main/README.md" target="_blank">Read the docs...</a></b>
              </p>
            </div>
          </div>

          <div className="border border-orange-200 dark:border-orange-900/50 bg-orange-50/50 dark:bg-orange-900/10">
            <h2 className="bg-orange-100 dark:bg-orange-900/30 text-orange-900 dark:text-orange-300 font-bold px-3 py-1.5 m-0 border-b border-orange-200 dark:border-orange-900/50 text-base mt-0">
              Recently added
            </h2>
            <div className="p-4 text-sm">
              <ul className="list-disc pl-5 space-y-2">
                {newSouls.map(s => (
                  <li key={s.id}><Link href={`/souls/${s.id}`}>{s.name}</Link></li>
                ))}
              </ul>
              <p className="text-right mt-3">
                <b><a href="https://github.com/mahsumaktas/soulpedia/pulls" target="_blank">View all changes...</a></b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}