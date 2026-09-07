import { Hero } from "@/components/home/hero";
import { TerminalAbout } from "@/components/home/terminal-about";
import { TechStackMarquee } from "@/components/home/tech-stack-marquee";
import { Stats } from "@/components/home/stats";
import { SectionsPreview } from "@/components/home/sections-preview";
import { ContactCta } from "@/components/home/contact-cta";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-background">
      <Hero />
      <TerminalAbout />
      <Stats />
      <TechStackMarquee />
      <SectionsPreview />
      <ContactCta />
    </main>
  );
}
