"use client";

import { useState, useEffect, useRef } from "react";
import { site } from "@/data/site";

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 170 170" className={className} fill="currentColor">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.92-14.37-6.17-2.92-2.39-6.69-6.86-11.33-13.43-5.28-7.55-9.49-15.93-12.63-25.13-3.14-9.2-4.71-18.12-4.71-26.77 0-12.02 3.19-21.84 9.56-29.47 6.37-7.62 14.38-11.45 24.03-11.45 4.54 0 9.77 1.3 15.69 3.91 5.92 2.61 9.87 3.92 11.87 3.92 1.63 0 5.48-1.29 11.55-3.87 6.07-2.58 11.04-3.81 14.92-3.69 11.52.45 20.31 4.7 26.38 12.74-9.19 5.58-13.71 13.11-13.56 22.58.15 7.64 2.87 13.91 8.16 18.8 5.28 4.88 11.66 7.42 19.12 7.61 2.33 5.92 4.67 11.83 7.03 17.76zm-17.76-80.4c-.06-8.73 3.1-16.27 9.48-22.61 6.37-6.34 13.93-9.56 22.69-9.67.12 9.04-3.03 16.63-9.45 22.77-6.42 6.14-14.17 9.51-22.72 9.51z" />
    </svg>
  );
}

const appleMenu = [
  { label: "About This Developer", action: "aboutThisDev" },
  { label: "System Preferences...", action: "sysPreferences" },
  { label: "Verify GitHub Streak", href: site.github },
  { divider: true },
  { label: "Sleep", action: "sleepMode" },
  { label: "Restart...", action: "restartMode" },
  { label: "Force Quit...", action: "forceQuit" },
] as const;

const menus = {
  File: [
    { label: "New Opportunity", shortcut: "⌘N", href: `mailto:${site.email}?subject=Opportunity` },
    { label: "Open Resume", shortcut: "⌘O", href: site.resumePath },
    { label: "Download Resume", shortcut: "⌘D", href: site.resumePath, download: true },
    { divider: true },
    { label: "Save My Contact", shortcut: "⌘S" },
    { label: "Share via Email", href: `mailto:?subject=Check out ${site.name}&body=${site.baseUrl}` },
    { divider: true },
    { label: "Close Portfolio", shortcut: "⌘W" },
  ],
  Edit: [
    { label: "Copy My Email", shortcut: "⌘C", action: "copyEmail" },
    { label: "Paste Me in Your Team", shortcut: "⌘V", href: `mailto:${site.email}?subject=Join Our Team` },
    { divider: true },
    { label: "Scroll to Top", shortcut: "⌘↑", href: "#top" },
  ],
  View: [
    { label: "Find My Skills", shortcut: "⌘F", href: "#skills" },
    { label: "Explore Projects", shortcut: "⌘P", href: "#work" },
    { label: "Know My Journey", shortcut: "⌘J", href: "#journey" },
    { label: "Testimonials", shortcut: "⌘T", href: "#contact" },
    { divider: true },
    { label: "My Social Profiles", submenu: [
      { label: "GitHub", href: site.github },
      { label: "LinkedIn", href: site.linkedin },
    ]},
  ],
} as const;

type MenuItem = {
  label?: string;
  shortcut?: string;
  href?: string;
  download?: boolean;
  action?: string;
  divider?: boolean;
  submenu?: Array<{ label: string; href: string }>;
};

function ClockDisplay() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="text-[13px] font-medium text-white/80">{time}</span>;
}

function MenuDropdown({
  items,
  onClose,
}: {
  items: readonly MenuItem[];
  onClose: () => void;
}) {
  async function handleClick(item: MenuItem) {
    if (item.action === "copyEmail") {
      await navigator.clipboard.writeText(site.email);
    } else if (item.action === "aboutThisDev") {
      alert(`Ayush Animesh Barik\n-----------------------------------\nRole: AI Enthusiast & Developer\nUniversity: ITER, SOA University\nCGPA: 8.0\nGraduation: 2028\nStatus: Building the Future.`);
    } else if (item.action === "sysPreferences") {
      document.querySelector("#skills")?.scrollIntoView({ behavior: "smooth" });
    } else if (item.action === "restartMode") {
      window.location.reload();
    } else if (item.action === "sleepMode") {
      const overlay = document.createElement("div");
      overlay.className = "fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center cursor-pointer";
      overlay.innerHTML = "<p class='text-white/40 text-[17px] font-medium animate-pulse'>Click to wake up...</p>";
      overlay.onclick = () => overlay.remove();
      document.body.appendChild(overlay);
    } else if (item.action === "forceQuit") {
      alert("Force Quit: Next.js dev server is running smoothly. Nothing to quit!");
    }
    if (item.href) {
      if (item.href.startsWith("#")) {
        document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
      } else if (item.href.startsWith("http")) {
        window.open(item.href, "_blank", "noreferrer");
      } else {
        const a = document.createElement("a");
        a.href = item.href;
        if (item.download) a.download = "";
        a.click();
      }
    }
    onClose();
  }

  return (
    <div className="macos-menubar-dropdown">
      {items.map((item, i) => {
        if (item.divider) return <div key={`d-${i}`} className="macos-menubar-divider" />;
        if (item.submenu) {
          return (
            <div key={item.label} className="relative group">
              <div className="macos-menubar-dropdown-item">
                {item.label}
                <span className="shortcut">▸</span>
              </div>
              <div className="hidden group-hover:block absolute left-full top-0 ml-1">
                <div className="macos-menubar-dropdown">
                  {item.submenu.map((sub) => (
                    <a
                      key={sub.label}
                      href={sub.href}
                      target="_blank"
                      rel="noreferrer"
                      className="macos-menubar-dropdown-item"
                      onClick={onClose}
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          );
        }
        return (
          <button
            key={item.label}
            type="button"
            className="macos-menubar-dropdown-item w-full text-left"
            onClick={() => handleClick(item)}
          >
            {item.label}
            {item.shortcut && <span className="shortcut">{item.shortcut}</span>}
          </button>
        );
      })}
    </div>
  );
}

export function MacOSMenuBar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={barRef} className="macos-menubar fixed inset-x-0 top-0 z-[60] flex items-center justify-between px-4">
      <div className="flex items-center gap-0">
        {/* Apple logo with dropdown */}
        <div className="macos-menubar-item">
          <button
            type="button"
            className={`px-3 py-1 rounded transition-colors flex items-center justify-center h-6 w-9 ${
              openMenu === "Apple" ? "bg-white/15" : "hover:bg-white/10"
            }`}
            onClick={() => setOpenMenu(openMenu === "Apple" ? null : "Apple")}
            onMouseEnter={() => openMenu && setOpenMenu("Apple")}
            aria-label="Apple Menu"
          >
            <AppleIcon className="size-3.5 text-white/90" />
          </button>
          {openMenu === "Apple" && (
            <MenuDropdown items={appleMenu} onClose={() => setOpenMenu(null)} />
          )}
        </div>

        {/* "Portfolio" bold label */}
        <span className="px-2.5 py-0.5 text-[13px] font-bold text-white/90">
          Portfolio
        </span>

        {/* Menu items */}
        {Object.entries(menus).map(([label, items]) => (
          <div key={label} className="macos-menubar-item hidden sm:block">
            <button
              type="button"
              className={`px-2.5 py-0.5 text-[13px] font-medium rounded transition-colors ${
                openMenu === label
                  ? "bg-white/15 text-white"
                  : "text-white/80 hover:bg-white/10"
              }`}
              onClick={() => setOpenMenu(openMenu === label ? null : label)}
              onMouseEnter={() => openMenu && setOpenMenu(label)}
            >
              {label}
            </button>
            {openMenu === label && (
              <MenuDropdown items={items as unknown as readonly MenuItem[]} onClose={() => setOpenMenu(null)} />
            )}
          </div>
        ))}
      </div>

      <ClockDisplay />
    </div>
  );
}
