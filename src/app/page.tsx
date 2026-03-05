"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { PriceCard } from "../components/PriceCard";
import { AlertButton } from "../components/AlertButton";

export default function Home() {
  const [goldPrice, setGoldPrice] = useState<number | null>(null);

  useEffect(() => {
    async function fetchGold() {
      try {
        const res = await fetch("/api/gold");
        const data = await res.json();
        setGoldPrice(data.price);
      } catch (err) {
        console.error("Error fetching gold:", err);
      }
    }

    fetchGold();
  }, []);

  const gold24k = goldPrice;
  const gold22k = goldPrice ? goldPrice * 0.916 : null;
  const gold18k = goldPrice ? goldPrice * 0.75 : null;

  const format = (value: number | null) =>
    value !== null
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