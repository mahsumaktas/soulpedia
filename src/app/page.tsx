import { souls } from "@/data/souls";
import Link from "next/link";
import WikiIndex from "@/components/WikiIndex";

export default async function Home({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  const resolvedParams = await searchParams;
  const query = resolvedParams?.search || "";
  
  const featuredSoul = souls.find(s => s.id === "the-architect") || souls[0];
  const newSouls = souls.slice(0, 3);

  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500">
      {/* Modern Welcome Hero */}
      <div className="mb-10 text-center md:text-left md:flex items-center justify-between border-b border-wiki-border dark:border-wiki-borderDark pb-10">
        <div>
          <h1 className="border-none mb-2 lg:text-5xl tracking-tight text-gray-900 dark:text-white font-serif">Welcome to Soulpedia</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-light max-w-2xl">
            The modern <a href="https://github.com/mahsumaktas/soulpedia" target="_blank" className="font-medium text-gray-900 dark:text-gray-200 underline decoration-gray-300 dark:decoration-gray-700 underline-offset-4">open-source persona encyclopedia</a> that anyone can edit.
          </p>
        </div>
        <div className="mt-6 md:mt-0 text-right hidden md:block">
          <div className="text-4xl font-serif font-light text-wiki-blue dark:text-wiki-blueDark">{souls.length}</div>
          <div className="text-sm uppercase tracking-widest text-gray-400 font-bold mt-1">Articles</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-8">
          
          <section className="wiki-card">
            <h2 className="wiki-card-header border-none mt-0 mb-0 flex items-center gap-2">
              <span className="text-xl">🌟</span> Featured Article
            </h2>
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-24 h-24 shrink-0 bg-gray-50 dark:bg-gray-800/50 rounded-2xl flex items-center justify-center text-5xl shadow-inner border border-gray-100 dark:border-gray-800">
                  {featuredSoul.emoji}
                </div>
                <div>
                  <h3 className="text-2xl font-serif mt-0 mb-2">{featuredSoul.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    <b>{featuredSoul.name}</b> is an advanced AI persona designed for system architecture. {featuredSoul.description} It strictly prohibits writing boilerplate code, focusing instead on high-level system design, scalability, and maintainability.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    It operates under the <i>&quot;Zero Trust Architecture&quot;</i> philosophy and communicates in an authoritative, abstract tone.
                  </p>
                  <Link href={`/souls/${featuredSoul.id}`} className="inline-flex items-center justify-center px-4 py-2 bg-wiki-blue hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                    Read full article
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="wiki-card">
            <h2 className="wiki-card-header border-none mt-0 mb-0 flex items-center gap-2">
              <span className="text-xl">📚</span> The Soulpedia Index
            </h2>
            <WikiIndex souls={souls} initialQuery={query} />
          </section>

        </div>

        {/* Right Column */}
        <div className="space-y-8">
          
          <section className="wiki-card">
            <h2 className="wiki-card-header border-none mt-0 mb-0 flex items-center gap-2">
              <span className="text-xl">💡</span> Did you know...
            </h2>
            <div className="p-5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-wiki-blue mt-0.5">•</span>
                  <span>...that you can inject a soul directly into your terminal by typing <code>npx soulpedia install socrates</code>?</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-wiki-blue mt-0.5">•</span>
                  <span>...that <b>{newSouls[0].name}</b> {newSouls[0].emoji} is one of the most strictly regulated personas, refusing to give direct answers?</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-wiki-blue mt-0.5">•</span>
                  <span>...that a &quot;Soul&quot; in Soulpedia isn&apos;t just a prompt, but a collection of <i>Bans</i>, <i>Tones</i>, and <i>Memory Injections</i>?</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="wiki-card">
            <h2 className="wiki-card-header border-none mt-0 mb-0 flex items-center gap-2">
              <span className="text-xl">⚡</span> Recently Added
            </h2>
            <div className="p-5 text-sm">
              <ul className="space-y-3">
                {newSouls.map(s => (
                  <li key={s.id} className="flex items-center justify-between group">
                    <Link href={`/souls/${s.id}`} className="font-medium group-hover:text-wiki-blue transition-colors">
                      {s.emoji} {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
                <a href="https://github.com/mahsumaktas/soulpedia/pulls" target="_blank" className="text-wiki-blue hover:underline text-xs uppercase tracking-wider font-bold">View all changes →</a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}