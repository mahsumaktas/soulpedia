import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: {
    default: "Soulpedia — AI Persona & Soul Marketplace",
    template: "%s | Soulpedia",
  },
  description:
    "Open-source soul and persona marketplace for Claude Code, Gemini CLI, Codex CLI, and other AI tools. Browse, copy, and contribute AI personas.",
  keywords: ["AI persona", "Claude Code", "Gemini CLI", "system prompt", "AI souls", "prompt library"],
  authors: [{ name: "Mahsum Aktas", url: "https://github.com/mahsumaktas" }],
  openGraph: {
    title: "Soulpedia — AI Persona & Soul Marketplace",
    description: "Open-source soul and persona library for Claude Code, Gemini CLI, and other AI CLI tools.",
    url: "https://soulpedia.vercel.app",
    siteName: "Soulpedia",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Soulpedia — AI Persona & Soul Marketplace",
    description: "Open-source soul and persona library for Claude Code, Gemini CLI, and other AI CLI tools.",
    creator: "@mahsumaktas",
  },
  metadataBase: new URL("https://soulpedia.vercel.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-200">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
