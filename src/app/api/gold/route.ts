export async function GET() {
  try {
    const res = await fetch("https://api.gold-api.com/price/XAU", {
      cache: "no-store",
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch gold price" }),
      { status: 500 }
    );
  }
}