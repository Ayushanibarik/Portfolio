import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "JanSevak | AI Citizen Feedback & Prioritization System",
  description:
    "Unified coordination dashboard for citizen demand telemetry, spatial resource planning, and objective public project prioritization.",
};

export default function JanSevakPage() {
  return (
    <div className="flex h-screen w-full flex-col bg-[#0b0f17] text-white overflow-hidden">
      {/* Top Header Bar */}
      <header className="flex h-13 w-full shrink-0 items-center justify-between border-b border-white/10 bg-[#0d111a]/95 px-4 backdrop-blur-md z-20 sm:px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/#work"
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white active:scale-95"
          >
            <ArrowLeft size={14} />
            <span>Portfolio</span>
          </Link>
          <div className="hidden sm:block h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold tracking-tight text-white">JanSevak Console</span>
            <span className="hidden md:inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Deployment
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://jan-sevak-xi.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-bold text-accent transition hover:bg-accent/20 active:scale-95"
          >
            <span>Open Standalone</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </header>

      {/* Embedded Live App */}
      <main className="relative flex-1 w-full h-[calc(100vh-52px)] bg-black">
        <iframe
          src="https://jan-sevak-xi.vercel.app/"
          title="JanSevak Console Live Production App"
          className="size-full border-0"
          allow="geolocation; microphone; camera; clipboard-read; clipboard-write;"
          loading="eager"
        />
      </main>
    </div>
  );
}
