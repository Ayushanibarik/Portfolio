"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitCommit, Flame, Trophy, Calendar, ExternalLink, Activity, Loader2 } from "lucide-react";
import { site } from "@/data/site";
import {
  fallbackContributionsData,
  ContributionDay,
  GitHubContributionsData,
} from "@/data/github-fallback";

type YearOption = "last" | "2026" | "2025" | "2024";

interface WeekColumn {
  weekIndex: number;
  days: (ContributionDay | null)[];
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

// Contribution level color palette for dark/spatial theme
const LEVEL_STYLES = {
  0: "bg-fill-tertiary/40 border border-separator-opaque/30 hover:border-separator-opaque",
  1: "bg-emerald-950/80 border border-emerald-800/40 text-emerald-300 hover:border-emerald-600/60 shadow-[0_0_8px_rgba(16,185,129,0.15)]",
  2: "bg-emerald-700/80 border border-emerald-600/50 text-emerald-200 hover:border-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.3)]",
  3: "bg-emerald-500 border border-emerald-400/60 text-white hover:border-emerald-300 shadow-[0_0_14px_rgba(52,211,153,0.45)]",
  4: "bg-emerald-400 border border-emerald-300 text-black hover:border-white shadow-[0_0_18px_rgba(52,211,153,0.7)]",
};

export function GithubContributions() {
  const [data, setData] = useState<GitHubContributionsData>(fallbackContributionsData);
  const [selectedYear, setSelectedYear] = useState<YearOption>("last");
  const [hoveredDay, setHoveredDay] = useState<{
    day: ContributionDay;
    x: number;
    y: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch live fresh data on mount and when year changes
  useEffect(() => {
    let isMounted = true;
    async function fetchContributions() {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/github-contributions?year=${selectedYear}`);
        if (!res.ok) throw new Error("Fetch failed");
        const json = await res.json();
        if (isMounted && json?.contributions) {
          setData(json);
        }
      } catch (err) {
        console.warn("Using cached/fallback contribution data:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchContributions();
    return () => {
      isMounted = false;
    };
  }, [selectedYear]);

  // Compute filtered days for current view
  const daysInView = useMemo(() => {
    const all = data.contributions;
    if (!all || all.length === 0) return [];

    if (selectedYear === "last") {
      // Last 365 days of contributions
      return all.slice(-371);
    }
    return all.filter((d) => d.date.startsWith(selectedYear));
  }, [data, selectedYear]);

  // Build weekly columns (Sunday - Saturday)
  const { weeks, monthPositions } = useMemo(() => {
    if (!daysInView || daysInView.length === 0) {
      return { weeks: [], monthPositions: [] };
    }

    const weeksList: WeekColumn[] = [];
    const firstDayDate = new Date(daysInView[0].date);
    const startDayOfWeek = firstDayDate.getDay(); // 0 = Sunday

    let currentWeekDays: (ContributionDay | null)[] = [];

    // Pad beginning of first week
    for (let i = 0; i < startDayOfWeek; i++) {
      currentWeekDays.push(null);
    }

    // Populate actual days
    daysInView.forEach((day) => {
      currentWeekDays.push(day);
      if (currentWeekDays.length === 7) {
        weeksList.push({
          weekIndex: weeksList.length,
          days: currentWeekDays,
        });
        currentWeekDays = [];
      }
    });

    // Pad end of last week if incomplete
    if (currentWeekDays.length > 0) {
      while (currentWeekDays.length < 7) {
        currentWeekDays.push(null);
      }
      weeksList.push({
        weekIndex: weeksList.length,
        days: currentWeekDays,
      });
    }

    // Determine month label positions
    const mPositions: { month: string; column: number }[] = [];
    let lastMonth = -1;

    weeksList.forEach((w, colIdx) => {
      const firstValidDay = w.days.find((d) => d !== null);
      if (firstValidDay) {
        const dObj = new Date(firstValidDay.date);
        const m = dObj.getMonth();
        if (m !== lastMonth) {
          mPositions.push({
            month: MONTH_NAMES[m],
            column: colIdx,
          });
          lastMonth = m;
        }
      }
    });

    return { weeks: weeksList, monthPositions: mPositions };
  }, [daysInView]);

  // Calculate statistics: Total, Streaks, Active Days
  const stats = useMemo(() => {
    const all = data.contributions || [];
    let totalInRange = 0;
    let activeDaysInRange = 0;

    daysInView.forEach((d) => {
      totalInRange += d.count;
      if (d.count > 0) activeDaysInRange += 1;
    });

    // Calculate Current Streak & Longest Streak across all available lifetime history
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    // Sort by date ascending
    const sorted = [...all].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i].count > 0) {
        tempStreak++;
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
      } else {
        tempStreak = 0;
      }
    }

    // Current streak ending at the latest available date
    for (let i = sorted.length - 1; i >= 0; i--) {
      if (sorted[i].count > 0) {
        currentStreak++;
      } else if (i === sorted.length - 1) {
        // If today has 0 commits yet, check if yesterday had commits
        continue;
      } else {
        break;
      }
    }

    const totalLifetime = Object.values(data.total || {}).reduce(
      (acc, curr) => acc + curr,
      0
    );

    return {
      totalInRange,
      activeDaysInRange,
      currentStreak,
      longestStreak,
      totalLifetime: totalLifetime || totalInRange,
    };
  }, [data, daysInView]);

  // Formatter for hover date
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="w-full">
      {/* Top Header Controls: Title, Live Status & Year Tabs */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex size-3 items-center justify-center">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
          </div>
          <div>
            <h3 className="ios-subheadline font-semibold text-ink flex items-center gap-2">
              <span>Verified GitHub Activity</span>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-xs font-normal text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                @Ayushanibarik
                <ExternalLink size={12} className="ml-1" />
              </a>
            </h3>
            <p className="ios-caption2 text-label-tertiary">
              {stats.totalLifetime.toLocaleString()} total lifetime contributions
            </p>
          </div>
        </div>

        {/* Year Selector Tabs */}
        <div className="flex items-center gap-1.5 rounded-ios-sm border border-separator-opaque bg-canvas-quaternary p-1 text-xs">
          {isLoading && (
            <Loader2 size={12} className="ml-1 mr-0.5 animate-spin text-emerald-400" />
          )}
          {(
            [
              { key: "last", label: "Last 12 Months" },
              { key: "2026", label: "2026" },
              { key: "2025", label: "2025" },
              { key: "2024", label: "2024" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedYear(tab.key)}
              className={`rounded-[6px] px-2.5 py-1 font-medium transition-all ${
                selectedYear === tab.key
                  ? "bg-fill-secondary text-ink shadow-sm font-semibold"
                  : "text-label-tertiary hover:text-label-primary hover:bg-fill-quaternary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-ios-md border border-separator-opaque bg-canvas-secondary/60 p-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-label-tertiary">
            <GitCommit size={15} className="text-emerald-400" />
            <span className="ios-caption2 uppercase tracking-wider font-medium">Contributions</span>
          </div>
          <p className="mt-1.5 text-xl font-bold tracking-tight text-ink">
            {stats.totalInRange.toLocaleString()}
          </p>
          <p className="text-[11px] text-label-tertiary">
            {selectedYear === "last" ? "in past year" : `in ${selectedYear}`}
          </p>
        </div>

        <div className="rounded-ios-md border border-separator-opaque bg-canvas-secondary/60 p-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-label-tertiary">
            <Flame size={15} className="text-orange-400" />
            <span className="ios-caption2 uppercase tracking-wider font-medium">Current Streak</span>
          </div>
          <p className="mt-1.5 text-xl font-bold tracking-tight text-ink">
            {stats.currentStreak} <span className="text-sm font-normal text-label-secondary">days</span>
          </p>
          <p className="text-[11px] text-label-tertiary">Active momentum</p>
        </div>

        <div className="rounded-ios-md border border-separator-opaque bg-canvas-secondary/60 p-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-label-tertiary">
            <Trophy size={15} className="text-amber-400" />
            <span className="ios-caption2 uppercase tracking-wider font-medium">Longest Streak</span>
          </div>
          <p className="mt-1.5 text-xl font-bold tracking-tight text-ink">
            {stats.longestStreak} <span className="text-sm font-normal text-label-secondary">days</span>
          </p>
          <p className="text-[11px] text-label-tertiary">Personal record</p>
        </div>

        <div className="rounded-ios-md border border-separator-opaque bg-canvas-secondary/60 p-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-label-tertiary">
            <Activity size={15} className="text-cyan-400" />
            <span className="ios-caption2 uppercase tracking-wider font-medium">Active Days</span>
          </div>
          <p className="mt-1.5 text-xl font-bold tracking-tight text-ink">
            {stats.activeDaysInRange} <span className="text-sm font-normal text-label-secondary">days</span>
          </p>
          <p className="text-[11px] text-label-tertiary">
            {daysInView.length > 0
              ? `${Math.round((stats.activeDaysInRange / daysInView.length) * 100)}% consistency`
              : "Active"}
          </p>
        </div>
      </div>

      {/* Heatmap Matrix Container */}
      <div className="relative rounded-ios-lg border border-separator-opaque bg-canvas-tertiary/70 p-4 sm:p-5 backdrop-blur-lg">
        {/* Horizontal scrollable wrapper */}
        <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-fill-tertiary">
          <div className="min-w-[720px] select-none">
            {/* Month Labels Header */}
            <div className="mb-2 flex h-5 text-[11px] font-medium text-label-tertiary">
              <div className="w-8 shrink-0" /> {/* Spacer for day labels */}
              <div className="relative flex-1">
                {monthPositions.map((pos, idx) => (
                  <span
                    key={idx}
                    className="absolute"
                    style={{
                      left: `${(pos.column / Math.max(weeks.length, 1)) * 100}%`,
                    }}
                  >
                    {pos.month}
                  </span>
                ))}
              </div>
            </div>

            {/* Matrix Grid with Day Labels */}
            <div className="flex gap-2">
              {/* Day of Week Labels (Mon, Wed, Fri) */}
              <div className="flex w-8 shrink-0 flex-col justify-between py-0.5 text-[10px] font-medium text-label-tertiary">
                {DAY_LABELS.map((label, idx) => (
                  <div key={idx} className="h-3 flex items-center">
                    {label}
                  </div>
                ))}
              </div>

              {/* 52/53 Week Columns */}
              <div className="flex flex-1 gap-[3.5px]">
                {weeks.map((week) => (
                  <div
                    key={week.weekIndex}
                    className="flex flex-1 flex-col gap-[3.5px]"
                  >
                    {week.days.map((day, dIdx) => {
                      if (!day) {
                        return (
                          <div
                            key={`empty-${dIdx}`}
                            className="aspect-square w-full rounded-[3px] bg-transparent"
                          />
                        );
                      }

                      return (
                        <div
                          key={day.date}
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setHoveredDay({
                              day,
                              x: rect.left + rect.width / 2,
                              y: rect.top - 10,
                            });
                          }}
                          onMouseLeave={() => setHoveredDay(null)}
                          className={`aspect-square w-full cursor-pointer rounded-[3px] transition-all duration-150 hover:scale-125 hover:z-20 ${
                            LEVEL_STYLES[day.level]
                          }`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Tooltip */}
        <AnimatePresence>
          {hoveredDay && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 2, scale: 0.96 }}
              transition={{ duration: 0.12 }}
              style={{
                position: "fixed",
                left: hoveredDay.x,
                top: hoveredDay.y,
                transform: "translate(-50%, -100%)",
                pointerEvents: "none",
                zIndex: 9999,
              }}
              className="rounded-ios-sm border border-separator-opaque bg-canvas-elevated/95 px-3 py-1.5 shadow-2xl backdrop-blur-xl"
            >
              <p className="text-xs font-semibold text-ink">
                {hoveredDay.day.count === 0
                  ? "No contributions"
                  : `${hoveredDay.day.count} ${
                      hoveredDay.day.count === 1 ? "contribution" : "contributions"
                    }`}
              </p>
              <p className="text-[10px] text-label-secondary">
                {formatDate(hoveredDay.day.date)}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Heatmap Legend & Summary Footer */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-separator-opaque/40 text-xs text-label-tertiary">
          <div className="flex items-center gap-1.5 text-[11px]">
            <Calendar size={13} className="text-label-tertiary" />
            <span>
              Real commit timeline synced from GitHub public repositories
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span>Less</span>
            <div className="flex gap-1 items-center">
              <span className="size-2.5 rounded-[2px] bg-fill-tertiary/40 border border-separator-opaque/30" />
              <span className="size-2.5 rounded-[2px] bg-emerald-950 border border-emerald-800/40" />
              <span className="size-2.5 rounded-[2px] bg-emerald-700 border border-emerald-600/50" />
              <span className="size-2.5 rounded-[2px] bg-emerald-500 border border-emerald-400/60" />
              <span className="size-2.5 rounded-[2px] bg-emerald-400 border border-emerald-300" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
