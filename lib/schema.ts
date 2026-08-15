import { z } from "zod";

export const capacitySchema = z.enum(["low", "medium", "high"]);
export type Capacity = z.infer<typeof capacitySchema>;

export const pathRequestSchema = z.discriminatedUnion("mode", [
  z.object({
    mode: z.literal("pick"),
    capacity: capacitySchema,
    dump: z.string(),
    taskA: z.string().min(1).max(280),
    taskB: z.string().min(1).max(280),
  }),
  z.object({
    mode: z.literal("break"),
    capacity: capacitySchema,
    dump: z.string(),
    goal: z.string().min(1).max(500),
  }),
]);

export type PathRequest = z.infer<typeof pathRequestSchema>;

export const pickOutputSchema = z.object({
  now: z.string().describe("The one thing to do first"),
  later: z.string().describe("The one that waits, guilt-free"),
  why: z
    .string()
    .describe("Warm, permission-giving reason. One or two sentences."),
  startHere: z
    .string()
    .describe("Concrete first action, sized to today's capacity"),
  after: z
    .string()
    .describe("What they get to do after — the fun one, guilt-free"),
  note: z
    .string()
    .describe("Short whimsical encouragement. No grind language."),
});

export const breakOutputSchema = z.object({
  restated: z.string().describe("The goal in one clear line"),
  steps: z
    .array(
      z.object({
        title: z.string(),
        estimate: z.string().describe("Human estimate, e.g. 10 min"),
      }),
    )
    .describe("Three to five subtasks. Never more than five."),
  startHere: z
    .string()
    .describe(
      "The one first action, sized to capacity, ideally 15 minutes or less",
    ),
  note: z.string().describe("Permission-giving encouragement. No shoulds."),
});

export type PickOutput = z.infer<typeof pickOutputSchema>;
export type BreakOutput = z.infer<typeof breakOutputSchema>;

export type PathResult =
  | { mode: "pick"; path: PickOutput }
  | { mode: "break"; path: BreakOutput };
