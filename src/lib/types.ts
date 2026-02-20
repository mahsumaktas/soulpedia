export interface Soul {
  id: string;
  name: string;
  emoji: string;
  description: string;
  tools: string[];
  category: string;
  tags?: string[];
  prompt: string;
  author?: string;
  version?: string;
  tone?: string[];
  bans?: string[];
  memory_injections?: string[];
  variables?: string[];
}

export type ToolFilter = string;
export type CategoryFilter = string;