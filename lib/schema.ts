import { z } from "zod";

export const capacitySchema = z.enum(["low", "medium", "high"]);
export type Capacity = z.infer<typeof capacitySchema>;

export const pathRequestSchema = z.object({
  dump: z.string().min(1).max(4000),
  capacity: capacitySchema,
});

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

export const routedOutputSchema = z.object({
  shape: z
    .enum(["pick", "break"])
    .describe(
      "pick: two competing things. break: one fuzzy goal. Messy pile: choose one shape, never a menu.",
    ),
  pick: pickOutputSchema
    .optional()
    .describe("Required when shape is pick. Omit when break."),
  breakdown: breakOutputSchema
    .optional()
    .describe("Required when shape is break. Omit when pick."),
});

export type PickOutput = z.infer<typeof pickOutputSchema>;
export type BreakOutput = z.infer<typeof breakOutputSchema>;
export type RoutedOutput = z.infer<typeof routedOutputSchema>;

export type PathResult =
  | { mode: "pick"; path: PickOutput }
  | { mode: "break"; path: BreakOutput };
