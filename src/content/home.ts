import {
  BookOpen,
  Code,
  Gamepad2,
  Globe,
  Heart,
  type LucideIcon,
  Shield,
  Star,
  TreePine,
  Trophy,
} from "lucide-react";

export const contact = {
  email: "biancadeespindola95@gmail.com",
  linkedin: "https://www.linkedin.com/in/biancadeespindola/",
  github: "https://github.com/biancaespindola",
};

export const highlightIcons: LucideIcon[] = [Trophy, Code, Globe, Heart];

export type CaseStudySlug = "this-site" | "sportsbook" | "iomt-security";

export const caseStudies: {
  slug: CaseStudySlug;
  icon: LucideIcon;
  cover: string;
  tags: string[];
}[] = [
  {
    slug: "this-site",
    icon: TreePine,
    cover: "bg-primary-soft",
    tags: ["Next.js 16", "i18n", "a11y"],
  },
  {
    slug: "sportsbook",
    icon: Star,
    cover: "bg-accent-soft",
    tags: ["React", "Next.js", "Figma"],
  },
  {
    slug: "iomt-security",
    icon: Shield,
    cover: "bg-surface-alt",
    tags: ["C++", "Security", "Research"],
  },
];

export const shelf: {
  title: string;
  by: string;
  icon: LucideIcon;
  cover: string;
}[] = [
  {
    title: "The Lord of the Rings",
    by: "J.R.R. Tolkien",
    icon: BookOpen,
    cover: "bg-accent text-on-primary",
  },
  {
    title: "Anne of Green Gables",
    by: "L. M. Montgomery",
    icon: BookOpen,
    cover: "bg-primary text-on-primary",
  },
  {
    title: "Pale Blue Dot",
    by: "Carl Sagan",
    icon: Star,
    cover: "bg-ink text-bg",
  },
  {
    title: "The Demon-Haunted World",
    by: "Carl Sagan",
    icon: BookOpen,
    cover: "bg-highlight text-[#2a1b2e]",
  },
  {
    title: "The Legend of Zelda",
    by: "Ocarina of Time & the series",
    icon: Gamepad2,
    cover: "bg-accent text-on-primary",
  },
  {
    title: "Stardew Valley",
    by: "ConcernedApe",
    icon: Gamepad2,
    cover: "bg-primary text-on-primary",
  },
];
