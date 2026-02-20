import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { Soul } from "@/lib/types";

export function getSouls(): Soul[] {
  const soulsDir = path.join(process.cwd(), "souls");
  
  // If the directory doesn't exist during some build steps, return empty
  if (!fs.existsSync(soulsDir)) return [];

  const files = fs.readdirSync(soulsDir).filter(file => file.endsWith(".yml"));

  const parsedSouls = files.map((file) => {
    const filePath = path.join(soulsDir, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const parsed = yaml.load(fileContent) as Partial<Soul>;
    
    // Default values if some fields are missing
    return {
      id: parsed.id || file.replace(".yml", ""),
      name: parsed.name || "Unknown Soul",
      emoji: parsed.emoji || "🤖",
      description: parsed.description || "No description provided.",
      tools: parsed.tools || ["Claude Code"],
      category: parsed.category || "Other",
      tags: parsed.tags || [],
      prompt: parsed.prompt || "You are a helpful assistant.",
      author: parsed.author,
      version: parsed.version,
      tone: parsed.tone || [],
      bans: parsed.bans || [],
      memory_injections: parsed.memory_injections || [],
      variables: parsed.variables || []
    } as Soul;
  });

  return parsedSouls;
}

export const souls = getSouls();