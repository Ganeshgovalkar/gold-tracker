import { DashboardLayout } from "../components/DashboardLayout";
import { PriceCard } from "../components/PriceCard";
import { AlertButton } from "../components/AlertButton";

type GoldApiResponse = {
  price: number;
};

async function getGoldPrice(): Promise<number | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/gold`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error("Failed to fetch gold price:", res.status);
      return null;
    }

    const data: GoldApiResponse = await res.json();

    return data.price ?? null;
  } catch (error) {
    console.error("Error fetching gold price:", error);
    return null;
  }
}

function BellButton() {
  return (
    <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-100">
      <span className="relative block h-4 w-4 rounded-full border-[1.5px] border-slate-100 border-t-transparent" />
    </button>
  );
}

export default async function Home() {
  const gold24k = await getGoldPrice();

  const gold22k = gold24k ? gold24k * 0.916 : null;
  const gold18k = gold24k ? gold24k * 0.75 : null;

  const now = new Date();

  const dateLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(now);

  const formatPrice = (price: number | null) =>
    price
      ? price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : null;

  return (
    <DashboardLayout
      title="Gold Tracker"
      subtitle={dateLabel}
      actions={<BellButton />}
    >
      <section>
        <div className="rounded-[32px] bg-gradient-to-br from-[#273cfa] via-[#7a3cff] to-[#f44cb7] p-[1px] shadow-[0_26px_80px_rgba(6,15,64,0.9)]">
          <div className="rounded-[30px] bg-gradient-to-b from-[#182454] via-[#101735] to-[#070b21] p-5 space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-slate-100">
                Live Gold Prices
              </div>

              <button className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-100">
                <span>10 gram</span>
                <span className="text-[10px]">▾</span>
              </button>
            </div>

            <div className="space-y-5">

              {/* 18K */}

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>18K Gold</span>
                </div>

                <div className="text-3xl font-semibold tracking-tight">
                  {gold18k
                    ? `₹${formatPrice(gold18k)}`
                    : "Loading..."}
                </div>
              </div>

              {/* 22K */}

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>22K Gold</span>
                </div>

                <div className="text-3xl font-semibold tracking-tight">
                  {gold22k
                    ? `₹${formatPrice(gold22k)}`
                    : "Loading..."}
                </div>
              </div>

              {/* 24K */}

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>24K Gold</span>
                </div>

                <div className="text-3xl font-semibold tracking-tight">
                  {gold24k
                    ? `₹${formatPrice(gold24k)}`
                    : "Loading..."}
                </div>
              </div>

            </div>

            <div className="pt-2">
              <AlertButton className="h-12 w-full justify-center text-sm font-semibold">
                Set Alert
              </AlertButton>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 grid grid-cols-2 gap-3">
        <PriceCard label="24H High" value="₹59,704.37" />
        <PriceCard label="24H Low" value="₹58,704.37" />
      </section>
    </DashboardLayout>
  );
}
