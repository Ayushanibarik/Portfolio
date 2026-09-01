import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ShieldCheck, Cpu, Radio, Target, Activity, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "VayuNetra (वायुNetra) | Military C2 & Counter-UAS Platform",
  description:
    "Military-grade Command & Control (C2) situational awareness and counter-unmanned aerial system (C-UAS) platform providing real-time drone detection, multi-sensor kinematic fusion, 3D trajectory forecasting, and automated threat evaluation.",
};

export default function VayuNetraPage() {
  return (
    <div className="min-h-screen w-full bg-[#0a0d14] text-white selection:bg-cyan-500 selection:text-black">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-white/10 bg-[#0d111a]/95 px-4 backdrop-blur-md sm:px-8">
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
            <span className="text-sm font-bold tracking-tight text-white">VayuNetra (वायुNetra)</span>
            <span className="hidden md:inline-flex items-center gap-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-[11px] font-medium text-cyan-400">
              <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Defense C2 Platform
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/Ayushanibarik/VayuNetra"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-bold text-cyan-400 transition hover:bg-cyan-500/20 active:scale-95"
          >
            <span>GitHub Repository</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </header>

      {/* Main Content Showcase */}
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Badge & Title */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <Radio size={14} />
            Counter-UAS & Situational Awareness
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl text-white">
            VayuNetra <span className="text-cyan-400">(वायुNetra)</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/70 leading-relaxed font-medium">
            Military-grade Command & Control (C2) situational awareness and counter-unmanned aerial system (C-UAS) platform providing automated real-time drone detection, multi-sensor kinematic fusion, 3D trajectory forecasting, and pan-tilt tracking gimbal control.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/Ayushanibarik/VayuNetra"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-bold text-black shadow-lg shadow-cyan-500/25 transition hover:bg-cyan-400 active:scale-95"
            >
              <span>Explore Source Code</span>
              <ExternalLink size={15} />
            </a>
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white/80 transition hover:bg-white/10 hover:text-white active:scale-95"
            >
              <span>Back to Featured Work</span>
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <div className="grid size-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-400 mb-4">
              <Target size={20} />
            </div>
            <h3 className="text-lg font-bold text-white">YOLOv8 + ByteTrack Vision</h3>
            <p className="mt-2 text-sm text-white/60 leading-relaxed">
              Real-time micro and fixed-wing UAS classification with persistent multi-object tracking IDs across occlusions.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <div className="grid size-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-400 mb-4">
              <Radio size={20} />
            </div>
            <h3 className="text-lg font-bold text-white">360° PPI Tactical Radar Scope</h3>
            <p className="mt-2 text-sm text-white/60 leading-relaxed">
              200m defensive airspace perimeter with kinematic Extended Kalman Filter (EKF) sensor fusion combining Doppler radar & optics.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <div className="grid size-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-400 mb-4">
              <Activity size={20} />
            </div>
            <h3 className="text-lg font-bold text-white">3D Trajectory Forecasting</h3>
            <p className="mt-2 text-sm text-white/60 leading-relaxed">
              Constant-velocity EKF predicting +3.0s future spatial waypoint coordinates with 3D isometric & orthogonal multi-view projections.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <div className="grid size-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-400 mb-4">
              <Zap size={20} />
            </div>
            <h3 className="text-lg font-bold text-white">TEWA Threat Scoring Matrix</h3>
            <p className="mt-2 text-sm text-white/60 leading-relaxed">
              Automated danger scoring weighing proximity, velocity vectors, and AI classification with real-time Time-to-Impact (TTI) metrics.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <div className="grid size-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-400 mb-4">
              <Cpu size={20} />
            </div>
            <h3 className="text-lg font-bold text-white">ESP32 PID Pan-Tilt Gimbal</h3>
            <p className="mt-2 text-sm text-white/60 leading-relaxed">
              Microsecond-precision dual-axis closed-loop servo tracking over UART/USB serial bridge centering camera optics on airborne targets.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <div className="grid size-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-400 mb-4">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-lg font-bold text-white">Multi-Modal Vision Modes</h3>
            <p className="mt-2 text-sm text-white/60 leading-relaxed">
              Live AI video stream with simulated thermal FLIR (White-Hot), Night Vision (NVG Green), and optical feeds with low-latency WebSockets.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
