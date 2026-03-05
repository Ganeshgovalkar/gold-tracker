"use client";

import React from "react";
import { cn } from "../lib/cn";

type PriceCardProps = {
  label: string;
  value: string;
  unit?: string;
  changeLabel?: string;
  changeValue?: string;
  positiveChange?: boolean;
  icon?: React.ReactNode;
  highlight?: boolean;
};

export function PriceCard({
  label,
  value,
  unit,
  changeLabel,
  changeValue,
  positiveChange,
  icon,
  highlight,
}: PriceCardProps) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-50 backdrop-blur-md",
        highlight && "border-violet-300/80 bg-white/10 shadow-[0_12px_30px_rgba(88,80,236,0.55)]",
      )}
    >
      <div className="relative flex items-start justify-between gap-2">
        <div className="space-y-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-300">
            {label}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-semibold tracking-tight">
              {value}
            </span>
            {unit && (
              <span className="text-xs text-slate-300">{unit}</span>
            )}
          </div>
        </div>
        {icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/80 text-amber-300">
            {icon}
          </div>
        )}
      </div>

      {(changeLabel || changeValue) && (
        <div className="mt-3 flex items-center gap-2">
          {changeValue && (
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                positiveChange
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-rose-500/10 text-rose-400",
              )}
            >
              {positiveChange ? "▲" : "▼"} {changeValue}
            </span>
          )}
          {changeLabel && (
            <span className="text-xs text-slate-400">
              {changeLabel}
            </span>
          )}
        </div>
      )}
    </article>
  );
}

