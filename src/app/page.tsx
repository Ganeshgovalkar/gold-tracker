"use client";
import { DashboardLayout } from "../components/DashboardLayout";
import { PriceCard } from "../components/PriceCard";
import { AlertButton } from "../components/AlertButton";

type MetalsLiveGoldPoint = {
  gold: number;
  [key: string]: unknown;
};

async function getGoldPrice() {
  try {
    const res = await fetch("/api/gold", {
      // Disable caching so we always try fresh; adjust if needed.
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch gold price:", res.status, res.statusText);
      return null;
    }

    const data = (await res.json()) as MetalsLiveGoldPoint[];
    const latest = data[data.length - 1];
    const price = typeof latest?.gold === "number" ? latest.gold : null;

    return price;
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
  const goldPrice = await getGoldPrice();
  const now = new Date();
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(now);

  const formattedSpot =
    goldPrice !== null
      ? goldPrice.toLocaleString(undefined, {
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
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>18K Gold</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="text-[10px]">↗</span>
                    <span>+2.34%</span>
                  </span>
                </div>
                <div className="text-3xl font-semibold tracking-tight">
                  ₹48,540.81
                </div>
                <div className="text-xs text-emerald-400">
                  +₹1,135.85 today
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>22K Gold</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="text-[10px]">↗</span>
                    <span>+1.89%</span>
                  </span>
                </div>
                <div className="text-3xl font-semibold tracking-tight">
                  {formattedSpot !== null ? `₹${formattedSpot}` : "₹59,204.37"}
                </div>
                <div className="text-xs text-emerald-400">
                  {formattedSpot !== null
                    ? "+₹1,118.96 today"
                    : "+₹1,118.96 today"}
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

