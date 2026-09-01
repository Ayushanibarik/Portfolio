import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

export const metadata: Metadata = {
  title: "VayuNetra (वायुNetra) | Military C2 & Counter-UAS Platform",
  description:
    "Military-grade Command & Control (C2) situational awareness and counter-unmanned aerial system (C-UAS) platform providing real-time drone detection, multi-sensor kinematic fusion, 3D trajectory forecasting, and automated threat evaluation.",
};

export default function VayuNetraPage() {
  return (
    <div className="flex h-screen w-full flex-col bg-[#080b11] text-white overflow-hidden">
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
            <span className="text-sm font-bold tracking-tight text-white">VayuNetra C2 Console</span>
            <span className="hidden md:inline-flex items-center gap-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-[11px] font-medium text-cyan-400">
              <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Live Deployment
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/Ayushanibarik/VayuNetra"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white active:scale-95"
          >
            <Github size={13} />
            <span>GitHub</span>
          </a>
          <a
            href="https://vayunetra-eta.vercel.app/?backend=https://aaaaaaayush-vayunetra-backend.hf.space"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-bold text-cyan-400 transition hover:bg-cyan-500/20 active:scale-95"
          >
            <span>Open Standalone</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </header>

      {/* Embedded Live App */}
      <main className="relative flex-1 w-full h-[calc(100vh-52px)] bg-black">
        <iframe
          src="https://vayunetra-eta.vercel.app/?backend=https://aaaaaaayush-vayunetra-backend.hf.space"
          title="VayuNetra C2 Situational Awareness Platform"
          className="size-full border-0"
          allow="geolocation; microphone; camera; clipboard-read; clipboard-write; autoplay; fullscreen;"
          loading="eager"
        />
      </main>
    </div>
  );
}
