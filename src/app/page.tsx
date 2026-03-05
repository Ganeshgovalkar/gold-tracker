import { DashboardLayout } from "../components/DashboardLayout";
import { PriceCard } from "../components/PriceCard";
import { AlertButton } from "../components/AlertButton";

type GoldResponse = {
  price: number;
};

async function getGoldPrice(): Promise<number | null> {
  try {
    const res = await fetch("/api/gold", {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data: GoldResponse = await res.json();

    return data.price;
  } catch (error) {
    console.error("Error fetching gold price:", error);
    return null;
  }
}

export default async function Home() {
  const gold24k = await getGoldPrice();

  const gold22k = gold24k ? gold24k * 0.916 : null;
  const gold18k = gold24k ? gold24k * 0.75 : null;

  const format = (value: number | null) =>
    value
      ? value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "Loading...";

  return (
    <DashboardLayout title="Gold Tracker" subtitle="Live Prices">
      <section className="space-y-4">

        <PriceCard label="24K Gold" value={`₹${format(gold24k)}`} />

        <PriceCard label="22K Gold" value={`₹${format(gold22k)}`} />

        <PriceCard label="18K Gold" value={`₹${format(gold18k)}`} />

        <AlertButton className="h-12 w-full justify-center text-sm font-semibold">
          Set Alert
        </AlertButton>

      </section>
    </DashboardLayout>
  );
}