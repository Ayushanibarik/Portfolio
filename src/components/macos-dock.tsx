"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Home, Code2, FolderOpen, Mail, Github, Linkedin, Map } from "lucide-react";
import { site } from "@/data/site";

const dockItems = [
  { icon: Home, label: "Home", href: "#top" },
  { icon: Code2, label: "Skills", href: "#skills" },
  { icon: FolderOpen, label: "Projects", href: "#work" },
  { icon: Map, label: "Journey", href: "#journey" },
  { icon: Mail, label: "Contact", href: "#contact" },
  { icon: Github, label: "GitHub", href: site.github, external: true },
  { icon: Linkedin, label: "LinkedIn", href: site.linkedin, external: true },
];

function DockIcon({
  icon: Icon,
  label,
  href,
  external,
  mouseX,
}: {
  icon: typeof Home;
  label: string;
  href: string;
  external?: boolean;
  mouseX: ReturnType<typeof useMotionValue<number>>;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [44, 64, 44]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 14 });

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      style={{ width, height: width }}
      className="dock-item group"
      onClick={(e) => {
        if (!external && href.startsWith("#")) {
          e.preventDefault();
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      <Icon size={22} />
      <div className="dock-tooltip opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        {label}
      </div>
    </motion.a>
  );
}

export function MacOSDock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-4 left-1/2 z-[60] -translate-x-1/2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 200, delay: 0.5 }}
      >
        <div
          className="macos-dock flex items-end gap-1"
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
        >
          {dockItems.map((item, i) => (
            <div key={item.label} className="flex items-end gap-1">
              {i === 5 && (
                <div className="mx-1 h-8 w-px bg-white/10 self-center" />
              )}
              <DockIcon {...item} mouseX={mouseX} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
