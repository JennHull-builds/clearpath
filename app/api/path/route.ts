import { NextResponse } from "next/server";
import { generatePath } from "@/lib/path";
import { pathRequestSchema } from "@/lib/schema";

export const maxDuration = 30;

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "That didn't look like a path." }, { status: 400 });
  }

  const parsed = pathRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Need a little more to find a path." }, { status: 400 });
  }

  try {
    const result = await generatePath(parsed.data);
    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "The clearing got foggy. Try again.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
