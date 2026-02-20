import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";
import WikiSearch from "@/components/WikiSearch";

export const metadata: Metadata = {
  title: {
    default: "Soulpedia, the free encyclopedia",
    template: "%s - Soulpedia",
  },
  description: "The open-source soul and persona encyclopedia for Claude Code, Gemini CLI, and other AI tools.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col md:flex-row bg-wiki-grayBg dark:bg-wiki-bgDark text-wiki-text dark:text-wiki-textDark transition-colors duration-200 font-sans">
        <ThemeProvider>
          {/* Sidebar */}
          <aside className="w-full md:w-48 lg:w-56 flex-shrink-0 p-6 md:min-h-screen border-r border-wiki-border dark:border-wiki-borderDark bg-wiki-grayBg dark:bg-wiki-bgDark relative z-10 hidden md:block">
            <div className="mb-8 text-center md:text-left">
              <Link href="/" className="inline-block hover:no-underline">
                <span className="text-4xl block mb-2">🧠</span>
                <span className="font-serif text-2xl tracking-tight text-gray-900 dark:text-white">Soulpedia</span>
                <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">The free AI encyclopedia</span>
              </Link>
            </div>
            
            <nav className="mb-8">
              <Link href="/" className="wiki-nav-link">Main page</Link>
              <Link href="/souls/random" className="wiki-nav-link">Random article</Link>
              <a href="https://github.com/mahsumaktas/soulpedia/issues/new/choose" target="_blank" className="wiki-nav-link">Suggest a soul</a>
              <Link href="/about" className="wiki-nav-link">About Soulpedia</Link>
            </nav>

            <h3 className="wiki-sidebar-heading">Contribute</h3>
            <nav className="mb-8">
              <a href="https://github.com/mahsumaktas/soulpedia" target="_blank" className="wiki-nav-link">GitHub Repository</a>
              <a href="https://github.com/mahsumaktas/soulpedia/blob/main/CONTRIBUTING.md" target="_blank" className="wiki-nav-link">Community portal</a>
              <a href="https://github.com/mahsumaktas/soulpedia/pulls" target="_blank" className="wiki-nav-link">Recent changes</a>
            </nav>

            <h3 className="wiki-sidebar-heading">Tools</h3>
            <nav className="mb-8">
              <a href="https://www.npmjs.com/package/soulpedia" target="_blank" className="wiki-nav-link">Soulpedia CLI</a>
            </nav>
            
            <div className="mt-8 pt-4 border-t border-wiki-border dark:border-wiki-borderDark">
              <ThemeToggle />
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-gray-900">
            {/* Topbar (Mobile Nav + Search) */}
            <header className="flex items-center justify-between p-4 border-b border-wiki-border dark:border-wiki-borderDark md:sticky md:top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur z-20">
              <div className="md:hidden flex items-center gap-3">
                <Link href="/" className="text-xl">🧠 Soulpedia</Link>
              </div>
              <div className="flex-1 max-w-2xl md:ml-4">
                <WikiSearch />
              </div>
              <div className="md:hidden ml-4">
                <ThemeToggle />
              </div>
            </header>

            {/* Page Content */}
            <main className="p-6 md:p-10 max-w-5xl">
              {children}
            </main>
            
            <footer className="mt-auto p-6 text-xs text-gray-500 dark:text-gray-400 border-t border-wiki-border dark:border-wiki-borderDark text-center md:text-left">
              <p>Text is available under the MIT License; additional terms may apply.</p>
              <p className="mt-1">By using this site, you agree to the Terms of Use and Privacy Policy. Wikipedia® is a registered trademark of the Wikimedia Foundation, Inc., a non-profit organization.</p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}