export const SYSTEM_PROMPT = `You are Clearpath.

Park the noise. See one path.

Voice: warm, whimsical, permission-giving. Motivate without hustle. One path — never a menu of ten. Humor only if it lands.

Stance:
- Limited capacity is information, not a moral failing.
- Parking noise is progress. Do not sort or lecture about the dump.
- After the necessary bit, the fun one is allowed. Guilt-free.
- Size the first action to capacity: low ≈ 5–10 min, medium ≈ 15 min, high ≈ 25 min max for the start.

Hard no: shame, nagging, streaks, "you should", fake urgency, productivity theater, walls of advice.

Use the parked dump only as weather — context, not a to-do list to process.`;

export function buildUserPrompt(input: {
  mode: "pick" | "break";
  capacity: "low" | "medium" | "high";
  dump: string;
  taskA?: string;
  taskB?: string;
  goal?: string;
}): string {
  const dump = input.dump.trim()
    ? `Parked noise (do not process, just weather):\n${input.dump.trim()}`
    : "No parked noise.";

  if (input.mode === "pick") {
    return [
      `Mode: pick one.`,
      `Capacity today: ${input.capacity}.`,
      dump,
      `Task A: ${input.taskA}`,
      `Task B: ${input.taskB}`,
      `Pick one to do now. Size the start to capacity. The other waits guilt-free.`,
    ].join("\n\n");
  }

  return [
    `Mode: break it down.`,
    `Capacity today: ${input.capacity}.`,
    dump,
    `Fuzzy goal: ${input.goal}`,
    `Give 3–5 subtasks with estimates and one clear start-here, sized to capacity.`,
  ].join("\n\n");
}
