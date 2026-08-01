export const clients = [
  {
    name: "Elephant & Co",
    logo: "/EC.png",
  },
  {
    name: "Lash & Co",
    logo: "/LC.png",
  },
  {
    name: "Sunday Racquet Club",
    logo: "/SC.png",
  },
  {
    name: "Prana Palate",
    logo: "/PP.png",
  },
] as const;

export const services = [
  {
    slug: "social-media-management",
    title: "Social Media Management",
    description:
      "End-to-end social stewardship — from strategy and calendars to community, analytics, and quiet, consistent growth.",
  },
  {
    slug: "content-creation",
    title: "Content Creation",
    description:
      "High-fidelity photo, film, and written assets crafted for platform-specific storytelling.",
  },
  {
    slug: "brand-strategy",
    title: "Brand Strategy",
    description:
      "Defining core purpose, positioning, and voice for brands that value substance over noise.",
  },
  {
    slug: "event-marketing",
    title: "Event Marketing",
    description:
      "Immersive launches and gatherings — designed as brand experiences, documented as stories.",
  },
  {
    slug: "influencer-marketing",
    title: "Influencer Marketing",
    description: "Considered partnerships with creators who share your aesthetic and audience.",
  },
  {
    slug: "photography-videography",
    title: "Photography & Videography",
    description:
      "Editorial-grade image and film production — from campaign shoots to always-on content.",
  },
  {
    slug: "creative-direction",
    title: "Creative Direction",
    description: "Visual stewardship across every touchpoint, digital and physical.",
  },
  {
    slug: "community-building",
    title: "Community Building",
    description:
      "Turning audiences into communities through rituals, formats, and human-first moderation.",
  },
  {
    slug: "pr-collaborations",
    title: "PR & Brand Collaborations",
    description:
      "Connecting brands with meaningful cultural partners, publications, and platforms.",
  },
  {
    slug: "paid-social-strategy",
    title: "Paid Social Strategy",
    description: "Efficient, on-brand paid campaigns — with creative that respects the feed.",
  },
] as const;

export type StaticProject = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  cover: string;
  description: string;
};

import work1 from "@/assets/LC.jpeg";
import work2 from "@/assets/EC.jpeg";
import work3 from "@/assets/SC.jpeg";
import { supabase } from "@/integrations/supabase/client";

export const projects: StaticProject[] = [
  {
    slug: "lash-and-co",
    title: "Beauty, Refined",
    client: "Lash & Co.",
    category: "Brand Strategy, Content Creation",
    year: "2024",
    cover: work1,
    description:
      "Developed a premium visual identity and content strategy for Lash & Co., capturing the salon's elegance through editorial photography, social-first content, and a cohesive brand aesthetic that elevated its digital presence and strengthened client engagement.",
  },
  {
    slug: "elephant-and-co",
    title: "Community & Culture",
    client: "Elephant & Co",
    category: "Campaign Creative Direction",
    year: "2024",
    cover: work2,
    description:
      "Warm, evocative campaign photography and a rhythm of content that turned a neighbourhood bar into a destination.",
  },
  {
    slug: "sunday-racquet-club",
    title: "Sunday Ritual",
    client: "Sunday Racquet Club",
    category: "Social Content, Community",
    year: "2023",
    cover: work3,
    description:
      "Building a club, not a brand. Editorial content, member rituals, and a tone of voice that puts the sport second and the people first.",
  },
];

export async function getPublishedPortfolioProjects(): Promise<StaticProject[]> {
  try {
    const { data, error } = await supabase
      .from("portfolio")
      .select("slug, title, client, category, description, cover_image, year")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data) {
      return projects;
    }

    const dbProjects: StaticProject[] = data
      .filter((item) => item.slug && item.title)
      .map((item) => ({
        slug: item.slug,
        title: item.title,
        client: item.client ?? "Concepts in Motion",
        category: item.category ?? "Creative Direction",
        year: item.year ?? "",
        cover: item.cover_image || projects[0]?.cover || "",
        description: item.description ?? "",
      }));

    const merged = [...projects, ...dbProjects];

    const uniqueProjects = Array.from(
      new Map(merged.map((project) => [project.slug, project])).values()
    );

    return uniqueProjects;
  } catch {
    return projects;
  }
}

export const testimonialsFallback = [
  {
    quote:
      "They completely nailed the look and feel we wanted for our brand. It’s exactly what we had in mind, just executed way better than we expected.",
    client: "Maiora Realty Group",
    role: "Founders",
  },
  {
    quote:
      "They genuinely understand our community. The content they create isn't just generic filler; it captures the exact energy of our club.",
    client: "Sunday Racquet Club",
    role: "Founder",
  },
];