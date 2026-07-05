"use client";

import { motion } from "framer-motion";
import { Github, Radio, Terminal } from "lucide-react";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  SectionReveal,
  StaggerReveal,
  staggerItem,
} from "@/components/ui/section-reveal";
import { SpatialCard } from "@/components/ui/spatial-card";

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
        <SpatialCard className="p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <div className="mb-5 grid size-12 place-items-center rounded-ios-sm bg-fill-tertiary text-ink">
                <Github aria-hidden="true" size={22} />
              </div>
              <p className="ios-caption1 font-semibold uppercase tracking-[0.06em] text-label-tertiary">
                {site.githubSection.title}
              </p>
              <h2 className="mt-3 ios-title1 text-ink">
                {site.githubSection.subtitle}
              </h2>
              <p className="mt-4 ios-body text-label-secondary">
                A working record of experiments, product builds, AI systems, and
                engineering practice.
              </p>
              <ButtonLink
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="mt-7"
                showArrow
              >
                {site.githubSection.cta}
              </ButtonLink>
            </div>

            <div className="rounded-ios-lg border border-separator-opaque bg-canvas-tertiary p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="ios-subheadline font-semibold text-label-secondary">
                  {site.githubSection.activityLabel}
                </span>
                <Radio
                  aria-hidden="true"
                  size={16}
                  className="text-label-tertiary"
                />
              </div>
              <div className="grid grid-cols-12 gap-1.5">
                {Array.from({ length: 84 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-[4px]"
                    style={{
                      background:
                        index % 11 === 0
                          ? "rgba(48, 209, 88, 0.65)"
                          : index % 7 === 0
                            ? "rgba(48, 209, 88, 0.45)"
                            : index % 5 === 0
                              ? "rgba(48, 209, 88, 0.25)"
                              : "rgba(118, 118, 128, 0.18)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </SpatialCard>
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
