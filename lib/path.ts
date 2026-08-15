import { generateText, Output } from "ai";
import {
  breakOutputSchema,
  pickOutputSchema,
  type PathRequest,
  type PathResult,
} from "@/lib/schema";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/soul";

const MODEL = "openai/gpt-5.4";

export async function generatePath(input: PathRequest): Promise<PathResult> {
  const prompt = buildUserPrompt(input);

  if (input.mode === "pick") {
    const { output } = await generateText({
      model: MODEL,
      system: SYSTEM_PROMPT,
      prompt,
      output: Output.object({
        name: "ClearpathPick",
        description: "One path: which task now, which waits, and how to start.",
        schema: pickOutputSchema,
      }),
    });

    if (!output) {
      throw new Error("Clearpath went quiet. Try once more.");
    }

    return { mode: "pick", path: output };
  }

  const { output } = await generateText({
    model: MODEL,
    system: SYSTEM_PROMPT,
    prompt,
    output: Output.object({
      name: "ClearpathBreak",
      description: "A small breakdown with one start-here.",
      schema: breakOutputSchema,
    }),
  });

  if (!output) {
    throw new Error("Clearpath went quiet. Try once more.");
  }

  return { mode: "break", path: output };
}
