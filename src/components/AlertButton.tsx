"use client";

import React from "react";
import { cn } from "../lib/cn";

type AlertButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export const AlertButton = React.forwardRef<HTMLButtonElement, AlertButtonProps>(
  ({ variant = "primary", className, children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60";

    const styles =
      variant === "primary"
        ? "bg-gradient-to-r from-[#5b8dff] via-[#8b5bff] to-[#ff4fd8] text-white shadow-[0_14px_40px_rgba(122,84,255,0.7)] hover:brightness-110 active:scale-[0.98]"
        : "border border-slate-700 bg-slate-900/60 text-slate-100 hover:bg-slate-800";

    return (
      <button
        ref={ref}
        className={cn(base, styles, "px-4 py-2", className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

AlertButton.displayName = "AlertButton";

