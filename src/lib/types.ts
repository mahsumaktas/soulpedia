export interface Soul {
  id: string;
  name: string;
  emoji: string;
  description: string;
  tools: string[];
  category: "mentor" | "coach" | "technical" | "creative" | "cultural";
  tags: string[];
  prompt: string;
  author?: string;
}

export type ToolFilter = "all" | "claude-code" | "gemini-cli" | "openai" | "cursor";
export type CategoryFilter = "all" | "mentor" | "coach" | "technical" | "creative" | "cultural";
