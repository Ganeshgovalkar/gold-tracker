export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch("https://api.gold-api.com/price/XAU", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("API request failed");
    }

    const data = await res.json();

    return Response.json(data);

  } catch (error) {
    return Response.json(
      { error: "Failed to fetch gold price" },
      { status: 500 }
    );
  }
}