import { Footer } from "@/components/footer";
import { MacOSMenuBar } from "@/components/macos-menubar";
import { MacOSDock } from "@/components/macos-dock";
import { CurrentlyBuilding, GithubSection, SkillsCommunity } from "@/components/sections/capabilities";
import { Hero } from "@/components/sections/hero";
import { Journey } from "@/components/sections/journey";
import { Drives, MissionAbout } from "@/components/sections/mission-about";
import { Projects } from "@/components/sections/projects";
import { Milestones } from "@/components/sections/milestones";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact, ResumeSection } from "@/components/sections/resume-contact";
import { AyushAIChat } from "@/components/ayush-ai-chat";

export default function Home() {
  return (
    <>
      <MacOSMenuBar />
      <main>
        <Hero />
        <SkillsCommunity />
        <Projects />
        <MissionAbout />
        <Drives />
        <Milestones />
        <Testimonials />
        <Journey />
        <CurrentlyBuilding />
        <GithubSection />
        <ResumeSection />
        <Contact />
      </main>
      <AyushAIChat />
      <MacOSDock />
      <Footer />
    </>
  );
}
