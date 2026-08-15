import { generateText, Output } from "ai";
import { getPathModel } from "@/lib/model";
import {
  routedOutputSchema,
  type PathRequest,
  type PathResult,
} from "@/lib/schema";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/soul";

export async function generatePath(input: PathRequest): Promise<PathResult> {
  const { output } = await generateText({
    model: getPathModel(),
    system: SYSTEM_PROMPT,
    prompt: buildUserPrompt(input),
    output: Output.object({
      name: "ClearpathPath",
      description:
        "One path. Notice pick vs break from the dump. Never a menu.",
      schema: routedOutputSchema,
    }),
  });

  if (!output) {
    throw new Error("Clearpath went quiet. Try once more.");
  }

  if (output.shape === "pick" && output.pick) {
    return { mode: "pick", path: output.pick };
  }

  if (output.shape === "break" && output.breakdown) {
    return { mode: "break", path: output.breakdown };
  }

  throw new Error("Clearpath went quiet. Try once more.");
}
