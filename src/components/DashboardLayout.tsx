"use client";

import React from "react";

type DashboardLayoutProps = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export function DashboardLayout({
  title,
  subtitle,
  actions,
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c1432] via-[#050920] to-[#030310] text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-5 py-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#5b8dff] via-[#8b5bff] to-[#ff4fd8] shadow-lg shadow-fuchsia-500/40">
              <span className="inline-block h-4 w-4 rotate-45 rounded-full border-2 border-white/80 border-t-transparent" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold tracking-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs text-slate-300">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </header>

        <main className="mt-8 flex flex-1 flex-col gap-6 pb-4">
          {children}
        </main>
      </div>
    </div>
  );
}

