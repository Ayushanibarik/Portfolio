import { NextResponse } from "next/server";
import { fallbackContributionsData } from "@/data/github-fallback";

export const revalidate = 3600; // Cache for 1 hour

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get("year");

  try {
    const url = year
      ? `https://github-contributions-api.jogruber.de/v4/Ayushanibarik?y=${encodeURIComponent(year)}`
      : "https://github-contributions-api.jogruber.de/v4/Ayushanibarik";

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`GitHub Contributions API returned status ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.warn("Using fallback GitHub contributions data:", error);

    // If a specific year was requested, filter fallback data
    if (year && year !== "last") {
      const filtered = fallbackContributionsData.contributions.filter((d) =>
        d.date.startsWith(year)
      );
      return NextResponse.json(
        {
          total: { [year]: fallbackContributionsData.total[year] || 0 },
          contributions: filtered,
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        }
      );
    }

    return NextResponse.json(fallbackContributionsData, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  }
}
