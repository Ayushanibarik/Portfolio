"use client";

import { motion } from "framer-motion";
import { Github, Terminal } from "lucide-react";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  SectionReveal,
  StaggerReveal,
  staggerItem,
} from "@/components/ui/section-reveal";
import { SpatialCard } from "@/components/ui/spatial-card";
import { GithubContributions } from "@/components/github-contributions";

export function SkillsCommunity() {
  return (
    <section id="skills" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <SectionHeading
            eyebrow="Capability map"
            title="Tools, languages, and technical surfaces"
          />
        </SectionReveal>

        <StaggerReveal className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {site.skills.map((group) => (
            <motion.div key={group.title} variants={staggerItem}>
              <SpatialCard className="h-full p-5">
                <h3 className="ios-headline text-ink">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-fill-quaternary px-3.5 py-1.5 ios-footnote font-medium text-label-secondary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </SpatialCard>
            </motion.div>
          ))}
        </StaggerReveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionReveal>
            <SectionHeading
              eyebrow="Community & hackathons"
              title="Learning in public, building under pressure"
            />
          </SectionReveal>
          <StaggerReveal className="space-y-0">
            <SpatialCard className="divide-y divide-separator">
              {site.community.map((item) => (
                <motion.div
                  key={item}
                  variants={staggerItem}
                  className="px-5 py-4 ios-body text-label-secondary transition-colors first:rounded-t-ios-lg last:rounded-b-ios-lg hover:bg-fill-quaternary"
                >
                  {item}
                </motion.div>
              ))}
            </SpatialCard>
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}

export function GithubSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <SpatialCard className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 mb-6 border-b border-separator-opaque/50">
              <div className="flex items-start gap-4">
                <div className="mt-1 grid size-12 shrink-0 place-items-center rounded-ios-sm bg-fill-tertiary text-ink">
                  <Github aria-hidden="true" size={24} />
                </div>
                <div>
                  <p className="ios-caption1 font-semibold uppercase tracking-[0.06em] text-emerald-400">
                    {site.githubSection.title}
                  </p>
                  <h2 className="mt-1 ios-title1 text-ink">
                    {site.githubSection.subtitle}
                  </h2>
                  <p className="mt-2 ios-body text-label-secondary max-w-2xl">
                    An authentic, verifiable record of daily commits, experiments, system builds, and open-source contributions.
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <ButtonLink
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  showArrow
                >
                  {site.githubSection.cta}
                </ButtonLink>
              </div>
            </div>

            <GithubContributions />
          </SpatialCard>
        </SectionReveal>
      </div>
    </section>
  );
}

export function CurrentlyBuilding() {
  const WorkflowIcon = site.visualSystem.sectionIcons.workflow;

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <SectionHeading
            eyebrow="Currently building"
            title="The next layer of focus"
            icon={WorkflowIcon}
          />
        </SectionReveal>
        <StaggerReveal className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {site.buildingNow.map((item) => (
            <motion.div key={item} variants={staggerItem}>
              <SpatialCard className="h-full p-5">
                <Terminal
                  aria-hidden="true"
                  className="mb-4 text-accent-orange"
                  size={18}
                />
                <p className="ios-subheadline font-medium text-label-secondary">
                  {item}
                </p>
              </SpatialCard>
            </motion.div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
