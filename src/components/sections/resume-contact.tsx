"use client";

import { useState } from "react";
import { Check, Copy, Download, Mail } from "lucide-react";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  SectionReveal,
  StaggerReveal,
  staggerItem,
} from "@/components/ui/section-reveal";
import { SpatialCard } from "@/components/ui/spatial-card";
import { motion } from "framer-motion";

export function ResumeSection() {
  const ResumeIcon = site.visualSystem.sectionIcons.resume;

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SpatialCard className="p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <SectionHeading
              eyebrow="Resume download"
              title={site.resume.title}
              icon={ResumeIcon}
              centered={false}
            >
              <p>{site.resume.body}</p>
            </SectionHeading>
            <ButtonLink
              href={site.resumePath}
              download
              variant="primary"
              className="w-full sm:w-auto"
            >
              <Download aria-hidden="true" size={17} />
              {site.resume.cta}
            </ButtonLink>
          </div>
        </SpatialCard>
      </div>
    </section>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(site.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionReveal>
            <SectionHeading eyebrow="Contact" title={site.contact.title} centered={false}>
              <p>{site.contact.body}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="focus-ring inline-flex min-h-[50px] items-center justify-center gap-2 rounded-ios-md bg-fill-tertiary px-6 py-3 ios-body font-semibold text-accent transition active:scale-[0.97]"
                >
                  {copied ? (
                    <Check aria-hidden="true" size={17} />
                  ) : (
                    <Copy aria-hidden="true" size={17} />
                  )}
                  {copied ? "Copied" : site.contact.copyEmail}
                </button>
                <ButtonLink href={`mailto:${site.email}`} variant="primary">
                  <Mail aria-hidden="true" size={17} />
                  {site.contact.openEmail}
                </ButtonLink>
              </div>
            </SectionHeading>
          </SectionReveal>

          {/* iOS inset-grouped list style for contact channels */}
          <StaggerReveal>
            <SpatialCard className="divide-y divide-separator">
              {site.contact.channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <motion.a
                    key={channel.label}
                    variants={staggerItem}
                    href={channel.href}
                    target={
                      channel.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      channel.href.startsWith("http")
                        ? "noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-5 px-5 py-4 transition-colors first:rounded-t-ios-lg last:rounded-b-ios-lg hover:bg-fill-quaternary"
                  >
                    <div className="grid size-10 shrink-0 place-items-center rounded-ios-xs bg-fill-tertiary text-accent">
                      <Icon aria-hidden="true" size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="ios-caption1 font-semibold uppercase tracking-[0.06em] text-label-tertiary">
                        {channel.label}
                      </p>
                      <p className="mt-0.5 truncate ios-body font-medium text-ink">
                        {channel.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </SpatialCard>
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
