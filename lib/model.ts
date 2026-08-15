import { createGoogleGenerativeAI } from "@ai-sdk/google";

const MODEL_ID = "gemini-3.5-flash";

/**
 * Google AI Studio (Gemini Developer API).
 * Gemini app / Google AI Pro does not include this — you need a Studio key.
 * https://aistudio.google.com/apikey
 */
export function getPathModel() {
  const apiKey = process.env["GOOGLE_GENERATIVE_AI_API_KEY"];
  const modelId = process.env["GEMINI_MODEL"] ?? MODEL_ID;

  if (!apiKey) {
    throw new Error(
      "Need a Google AI Studio key. Get one at https://aistudio.google.com/apikey and add GOOGLE_GENERATIVE_AI_API_KEY to .env.local",
    );
  }

  return createGoogleGenerativeAI({ apiKey })(modelId);
}
