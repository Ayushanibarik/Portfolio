import fallbackData from "./data/github-fallback.json";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Authentic GitHub contribution level styling for dark mode
const LEVEL_COLORS = {
  0: "bg-white/[0.04] border border-white/[0.03]",
  1: "bg-[#0e4429] border border-[#005a2b]/60 shadow-[0_0_6px_rgba(16,185,129,0.15)]",
  2: "bg-[#006d32] border border-[#26a641]/50 shadow-[0_0_8px_rgba(16,185,129,0.3)]",
  3: "bg-[#26a641] border border-[#39d353]/60 shadow-[0_0_12px_rgba(52,211,153,0.45)]",
  4: "bg-[#39d353] border border-white/80 shadow-[0_0_16px_rgba(57,211,83,0.7)]"
};

let currentData = fallbackData;
let activeYear = "last";

export function initGithubGraph(containerId = "github-graph-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  renderGraph(container, activeYear);
  fetchLiveGithubData(container);
}

async function fetchLiveGithubData(container) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch("https://github-contributions-api.jogruber.de/v4/Ayushanibarik", {
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error("Network error");
    const json = await res.json();
    if (json && json.contributions && json.contributions.length > 0) {
      currentData = json;
      renderGraph(container, activeYear);
    }
  } catch (e) {
    console.log("Using cached GitHub contribution data.");
  }
}

export function renderGraph(container, year) {
  activeYear = year;
  const all = currentData.contributions || [];
  
  // Filter days based on year
  let daysInView = [];
  if (year === "last") {
    daysInView = all.slice(-371); // Last ~53 weeks
  } else {
    daysInView = all.filter(d => d.date.startsWith(year));
  }

  if (daysInView.length === 0) return;

  // Build weekly columns (Sunday=0 to Saturday=6)
  const firstDate = new Date(daysInView[0].date);
  const startDay = firstDate.getDay();
  const weeks = [];
  let currentWeek = [];

  for (let i = 0; i < startDay; i++) {
    currentWeek.push(null);
  }

  daysInView.forEach(day => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  // Month label positions
  const monthLabels = [];
  let lastMonth = -1;
  weeks.forEach((w, colIdx) => {
    const validDay = w.find(d => d !== null);
    if (validDay) {
      const m = new Date(validDay.date).getMonth();
      if (m !== lastMonth && colIdx < weeks.length - 2) {
        monthLabels.push({ month: MONTH_NAMES[m], col: colIdx });
        lastMonth = m;
      }
    }
  });

  // Calculate metrics
  let totalCommits = 0;
  let activeDays = 0;

  // Total for range
  daysInView.forEach(d => {
    totalCommits += d.count;
    if (d.count > 0) activeDays++;
  });

  // Render HTML
  container.innerHTML = `
    <div class="bg-[#181a1c]/90 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
      <!-- Header with Tabs and Profile link -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div class="flex items-center gap-3">
          <div class="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-white text-lg md:text-xl font-semibold tracking-wide">Ayushanibarik</h3>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wider uppercase bg-white/10 text-zinc-200 border border-white/20">Verified Active</span>
            </div>
            <p class="text-white/60 text-xs md:text-sm mt-0.5">Live GitHub Activity & Open-Source Contributions</p>
          </div>
        </div>

        <div class="flex items-center gap-2 flex-wrap">
          <div class="flex items-center bg-black/40 border border-white/10 rounded-xl p-1 text-xs">
            ${["last", "2026", "2025", "2024"].map(y => `
              <button 
                data-year="${y}" 
                class="year-tab px-3 py-1.5 rounded-lg transition-all font-medium ${activeYear === y ? 'bg-white/20 text-white shadow-sm' : 'text-white/50 hover:text-white'}"
              >
                ${y === "last" ? "Last 12 Mo" : y}
              </button>
            `).join("")}
          </div>
          <a 
            href="https://github.com/Ayushanibarik" 
            target="_blank" 
            rel="noopener noreferrer"
            class="px-3.5 py-1.5 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 text-xs font-medium flex items-center gap-1.5 transition"
          >
            <span>Profile</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </a>
        </div>
      </div>

      <!-- Quick Metrics Ribbon (Only Total Contributions and Active Days) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 my-6 w-full">
        <div class="bg-black/40 border border-white/10 rounded-xl p-4 text-center">
          <p class="text-white/50 text-xs uppercase tracking-wider block font-mono">Total Contributions</p>
          <p class="text-white text-2xl md:text-3xl font-bold mt-1 font-mono">${totalCommits.toLocaleString()}</p>
        </div>
        <div class="bg-black/40 border border-white/10 rounded-xl p-4 text-center">
          <p class="text-white/50 text-xs uppercase tracking-wider block font-mono">Active Contribution Days</p>
          <p class="text-white text-2xl md:text-3xl font-bold mt-1 text-white font-mono">${activeDays}</p>
        </div>
      </div>

      <!-- Heatmap Grid -->
      <div class="relative overflow-x-auto pb-2 scrollbar-none w-full">
        <div class="w-full min-w-[700px]">
          <!-- Month Header Row -->
          <div class="relative ml-7 mb-2 text-[11px] text-white/40 h-4 w-[calc(100%-28px)]">
            ${monthLabels.map(m => `
              <span style="position: absolute; left: ${(m.col / weeks.length) * 100}%;">${m.month}</span>
            `).join("")}
          </div>

          <!-- Heatmap Container with Days on Left -->
          <div class="flex items-stretch gap-2 w-full">
            <!-- Day labels: Mon, Wed, Fri -->
            <div class="flex flex-col justify-between text-[9px] text-white/30 w-5 py-0.5 select-none flex-shrink-0">
              <span></span>
              <span>Mon</span>
              <span></span>
              <span>Wed</span>
              <span></span>
              <span>Fri</span>
              <span></span>
            </div>

            <!-- Grid Columns Stretched Across Full Width of Container -->
            <div class="grid w-full gap-[2px] md:gap-[3px]" style="grid-template-columns: repeat(${weeks.length}, minmax(0, 1fr));">
              ${weeks.map(week => `
                <div class="flex flex-col gap-[2px] md:gap-[3px] w-full">
                  ${week.map(day => {
                    if (!day) {
                      return `<div class="aspect-square w-full rounded-[2px] bg-transparent"></div>`;
                    }
                    const levelClass = LEVEL_COLORS[day.level] || LEVEL_COLORS[0];
                    return `
                      <div 
                        class="aspect-square w-full rounded-[2px] cursor-pointer transition-transform hover:scale-125 hover:z-20 relative github-day ${levelClass}"
                        data-date="${day.date}"
                        data-count="${day.count}"
                      ></div>
                    `;
                  }).join("")}
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Legend Footer -->
          <div class="flex items-center justify-between mt-4 text-[11px] text-white/40 pt-3 border-t border-white/5">
            <span>Learn how we count contributions</span>
            <div class="flex items-center gap-1.5">
              <span>Less</span>
              <div class="w-2.5 h-2.5 rounded-[2px] bg-white/[0.04] border border-white/[0.03]"></div>
              <div class="w-2.5 h-2.5 rounded-[2px] bg-[#0e4429]"></div>
              <div class="w-2.5 h-2.5 rounded-[2px] bg-[#006d32]"></div>
              <div class="w-2.5 h-2.5 rounded-[2px] bg-[#26a641]"></div>
              <div class="w-2.5 h-2.5 rounded-[2px] bg-[#39d353]"></div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach tab events
  container.querySelectorAll(".year-tab").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const y = e.currentTarget.getAttribute("data-year");
      renderGraph(container, y);
    });
  });

  // Attach hover tooltips
  initTooltips(container);
}

function initTooltips(container) {
  let tooltip = document.getElementById("github-tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.id = "github-tooltip";
    tooltip.className = "fixed hidden z-50 pointer-events-none px-2.5 py-1.5 rounded-lg bg-black/95 text-white border border-white/20 text-xs shadow-2xl backdrop-blur-sm -translate-x-1/2 -translate-y-full mb-2";
    document.body.appendChild(tooltip);
  }

  container.querySelectorAll(".github-day").forEach(el => {
    el.addEventListener("mouseenter", (e) => {
      const date = e.target.getAttribute("data-date");
      const count = e.target.getAttribute("data-count");
      const formattedDate = new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
      });
      const label = count === "1" ? "1 contribution" : `${count} contributions`;
      tooltip.innerHTML = `<span class="font-semibold text-white">${label}</span> on ${formattedDate}`;
      tooltip.classList.remove("hidden");
      
      const rect = e.target.getBoundingClientRect();
      tooltip.style.left = `${rect.left + rect.width / 2}px`;
      tooltip.style.top = `${rect.top - 8}px`;
    });

    el.addEventListener("mouseleave", () => {
      tooltip.classList.add("hidden");
    });
  });
}
