import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soulpedia — AI Persona Marketplace",
  description: "Open-source soul and persona marketplace for Claude Code, Gemini CLI, Codex CLI, and other AI tools.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 min-h-screen">{children}</body>
    </html>
  );
}
