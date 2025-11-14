import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
type SerpApiResult = {
  title?: string;
  address?: string;
  rating?: string | number;
  reviews?: string | number;
  phone?: string;
  phone_number?: string;
  formatted_phone_number?: string;
  website?: string;
  latitude?: string | number;
  longitude?: string | number;
};

export const runtime = "nodejs";

function loadJSON(filename: string) {
  const filePath = path.join(process.cwd(), "public", "cached", filename);
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function loadRandomCached() {
  const index = loadJSON("index.json");
  const randomKey = index[Math.floor(Math.random() * index.length)];
  const cachedFile = loadJSON(`${randomKey}.json`);
  return cachedFile.leads;
}

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    const API_KEY = process.env.SERPAPI_KEY;
    if (!API_KEY) {
      return NextResponse.json({
        leads: loadRandomCached(),
        fromCache: true,
        reason: "Missing SERPAPI_KEY",
      });
    }

    const url = `https://serpapi.com/search.json?engine=google_maps&q=${encodeURIComponent(
      query
    )}&type=search&api_key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json({
        leads: loadRandomCached(),
        fromCache: true,
        reason: "SerpAPI request failed",
      });
    }

    const data = await response.json();

    if (!data.local_results || data.local_results.length === 0) {
      return NextResponse.json({
        leads: loadRandomCached(),
        fromCache: true,
        reason: "SerpAPI returned zero results",
      });
    }

    const leads = data.local_results.map((item: SerpApiResult, i: number) => ({
      id: `${item.title}-${i}`,
      name: item.title || "",
      address: item.address || "",
      rating: item.rating || "",
      reviews: item.reviews || "",
      phone:
        item.phone || item.phone_number || item.formatted_phone_number || "",
      website: item.website || "",
      lat: item.latitude || "",
      lon: item.longitude || "",
    }));

    return NextResponse.json({ leads, fromCache: false });
  } catch (err) {
    console.error("API Error:", err);

    return NextResponse.json({
      leads: loadRandomCached(),
      fromCache: true,
      reason: "Unhandled server error",
    });
  }
}
