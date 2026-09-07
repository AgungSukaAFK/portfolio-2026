import { Github, Instagram, Linkedin, Mail, Youtube, type LucideIcon } from "lucide-react";
import socialsData from "@/data/socials.json";

export interface SocialEntry {
  label: string;
  handle: string;
  url: string;
  enabled: boolean;
}

export type SocialKey = keyof typeof socialsData;

const ICONS: Record<SocialKey, LucideIcon> = {
  github: Github,
  email: Mail,
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
