import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";
import WikiSearch from "@/components/WikiSearch";

export const metadata: Metadata = {
  title: {
    default: "Soulpedia, the modern encyclopedia",
    template: "%s - Soulpedia",
  },
  description: "The modern open-source soul and persona encyclopedia for Claude Code, Gemini CLI, and other AI tools.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col md:flex-row bg-wiki-grayBg dark:bg-wiki-bgDark text-wiki-text dark:text-wiki-textDark transition-colors duration-200 font-sans">
        <ThemeProvider>
          {/* Modern Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0 p-4 md:min-h-screen border-r border-wiki-border dark:border-wiki-borderDark bg-wiki-grayBg dark:bg-[#0f1115] relative z-10 hidden md:flex md:flex-col">
            <div className="mb-6 px-3 pt-2">
              <Link href="/" className="flex items-center gap-3 hover:no-underline group">
                <span className="text-3xl group-hover:scale-110 transition-transform">🧠</span>
                <div>
                  <span className="font-serif text-2xl font-bold tracking-tight text-gray-900 dark:text-white block leading-none">Soulpedia</span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1 block">Encyclopedia</span>
                </div>
              </Link>
            </div>
            
            <nav className="mb-2 space-y-0.5 flex-1">
              <Link href="/" className="wiki-nav-link">🏠 Main page</Link>
              <Link href="/souls/random" className="wiki-nav-link">🎲 Random article</Link>
              <a href="https://github.com/mahsumaktas/soulpedia/issues/new/choose" target="_blank" className="wiki-nav-link">✍️ Suggest a soul</a>
              
              <h3 className="wiki-sidebar-heading">Contribute</h3>
              <a href="https://github.com/mahsumaktas/soulpedia" target="_blank" className="wiki-nav-link">GitHub Repository</a>
              <a href="https://github.com/mahsumaktas/soulpedia/blob/main/CONTRIBUTING.md" target="_blank" className="wiki-nav-link">Community portal</a>
              
              <h3 className="wiki-sidebar-heading">Tools</h3>
              <a href="https://www.npmjs.com/package/soulpedia" target="_blank" className="wiki-nav-link">Soulpedia CLI</a>
            </nav>

            <div className="mt-auto px-3 py-4 border-t border-wiki-border dark:border-wiki-borderDark">
              <ThemeToggle />
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#0a0b0d]">
            {/* Topbar (Mobile Nav + Search) */}
            <header className="flex items-center justify-between p-4 border-b border-wiki-border dark:border-wiki-borderDark md:sticky md:top-0 bg-white/80 dark:bg-[#0a0b0d]/80 backdrop-blur-md z-20">
              <div className="md:hidden flex items-center gap-2">
                <Link href="/" className="text-2xl font-serif font-bold">🧠 Soulpedia</Link>
              </div>
              <div className="flex-1 max-w-2xl md:ml-4">
                <WikiSearch />
              </div>
              <div className="md:hidden ml-4">
                <ThemeToggle />
              </div>
            </header>

            {/* Page Content */}
            <main className="p-6 md:p-12 lg:p-16 max-w-5xl mx-auto w-full">
              {children}
            </main>
            
            <footer className="mt-auto p-8 text-sm text-gray-500 dark:text-gray-400 border-t border-wiki-border dark:border-wiki-borderDark text-center">
              <p>Text is available under the MIT License; additional terms may apply.</p>
              <p className="mt-2">An open-source initiative. Not affiliated with the Wikimedia Foundation.</p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}