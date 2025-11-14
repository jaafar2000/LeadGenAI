import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    const { lead } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      console.error("❌ Missing GROQ_API_KEY");
      return NextResponse.json(
        { error: "Server missing API key" },
        { status: 500 }
      );
    }

    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const prompt = `
Write a short outreach message for a freelancer offering web development or social media services.
Personalize it using this business info:

Name: ${lead.name}
Address: ${lead.address}
Phone: ${lead.phone}
Website: ${lead.website}
Rating: ${lead.rating}
Reviews: ${lead.reviews}

Make it friendly and not too long (2–3 sentences).
`;

    const completion = await client.chat.completions.create({
      model: "allam-2-7b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
    });

    const pitch = completion.choices?.[0]?.message?.content || "No response";

    return NextResponse.json({ pitch });
  } catch (err: any) {
    console.error("🔥 API ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
