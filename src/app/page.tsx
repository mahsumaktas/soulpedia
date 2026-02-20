import { souls } from "@/data/souls";
import SoulGallery from "@/components/SoulGallery";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            <span className="font-bold text-xl text-gray-900 dark:text-white">soulpedia</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="https://github.com/mahsumaktas/soulpedia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              ⭐ GitHub
            </a>
          </div>
        </div>
      </header>
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">AI Souls & Personas</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Open-source persona library for Claude Code, Gemini CLI, and other AI tools.
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
          <span>
            <strong className="text-gray-900 dark:text-white">{souls.length}</strong> souls
          </span>
          <span>·</span>
          <span>
            <strong className="text-gray-900 dark:text-white">4</strong> tools
          </span>
          <span>·</span>
          <span>
            <strong className="text-gray-900 dark:text-white">MIT</strong>
          </span>
        </div>
      </section>
      <main className="max-w-6xl mx-auto px-4 pb-16">
        <SoulGallery souls={souls} />
      </main>
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 text-center text-sm text-gray-500">
        <a href="https://github.com/mahsumaktas/soulpedia" className="hover:text-gray-900 transition-colors">
          Contribute a soul on GitHub
        </a>
      </footer>
    </div>
  );
}
