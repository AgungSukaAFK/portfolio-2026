import { Github, Instagram, Linkedin, Mail, Youtube } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import socialsData from "@/data/socials.json";

export interface SocialEntry {
  label: string;
  handle: string;
  url: string;
  enabled: boolean;
}

export type SocialKey = keyof typeof socialsData;

// Lucide doesn't ship a WhatsApp glyph, so that one comes from react-icons —
// both accept the same `size`/`className` props, so they drop in interchangeably.
type SocialIcon = React.ComponentType<{ size?: number; className?: string }>;

const ICONS: Record<SocialKey, SocialIcon> = {
  github: Github,
  email: Mail,
  whatsapp: SiWhatsapp,
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
};

export function getSocials() {
  return (Object.keys(socialsData) as SocialKey[]).map((key) => ({
    key,
    icon: ICONS[key],
    ...(socialsData[key] as SocialEntry),
  }));
}
