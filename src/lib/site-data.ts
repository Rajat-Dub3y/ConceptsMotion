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
  images: string[]; // NEW — up to 4, cover is always images[0]
  description: string;
};

import LC1 from "@/assets/LC1.jpeg";
import LC2 from "@/assets/LC2.jpeg";
import LC3 from "@/assets/LC3.jpeg";
import LC4 from "@/assets/LC4.jpeg";
import LC5 from "@/assets/LC5.jpeg";

import EC from "@/assets/EC.jpeg";
import EC1 from "@/assets/EC1.jpeg";
import EC2 from "@/assets/EC2.jpeg";
import EC3 from "@/assets/EC3.jpeg";

import SC from "@/assets/SC.jpeg";
import SC1 from "@/assets/SC1.jpeg";
import SC2 from "@/assets/SC2.jpeg";
import SC3 from "@/assets/SC3.jpeg";
import SC4 from "@/assets/SC4.jpeg";
import SC5 from "@/assets/SC5.jpeg";

import M1 from "@/assets/M1.jpeg";
import M2 from "@/assets/M2.jpeg";
import M3 from "@/assets/m3.jpeg";

import { supabase } from "@/integrations/supabase/client";

export const projects: StaticProject[] = [
  {
    slug: "lash-and-co",
    title: "Beauty, Refined",
    client: "Lash & Co.",
    category: "Brand Strategy, Content Creation",
    year: " ",
    cover: LC1,
    images: [LC1, LC2, LC3, LC4, LC5],
    description:
      "Developed a premium visual identity and content strategy for Lash & Co., capturing the salon's elegance through editorial photography, social-first content, and a cohesive brand aesthetic that elevated its digital presence and strengthened client engagement.",
  },

  {
    slug: "elephant-and-co",
    title: "Community & Culture",
    client: "Elephant & Co",
    category: "Campaign Creative Direction",
    year: " ",
    cover: EC1,
    images: [EC1, EC2, EC3],
    description:
      "Warm, evocative campaign photography and a rhythm of content that turned a neighbourhood bar into a destination.",
  },

  {
    slug: "sunday-racquet-club",
    title: "Sunday Ritual",
    client: "Sunday Racquet Club",
    category: "Social Content, Community",
    year: "",
    cover: SC5,
    images: [SC1, SC2, SC3, SC4, SC5],
    description:
      "Building a club, not a brand. Editorial content, member rituals, and a tone of voice that puts the sport second and the people first.",
  },

  {
    slug: "maiora-realty",
    title: "Elevated Living",
    client: "Maiora Realty Group",
    category: "Visual Identity, Strategy",
    year: " ",
    cover: M1,
    images: [M1, M2, M3],
    description:
      "A considered visual identity and strategic creative direction designed to communicate a refined approach to modern real estate.",
  },
];

export async function getPublishedPortfolioProjects(): Promise<StaticProject[]> {
  return projects;
  try {
    const { data, error } = await supabase
      .from("portfolio")
      .select("slug, title, client, category, description, cover_image, gallery_images, year")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data) {
      return projects;
    }

    const dbProjects: StaticProject[] = data
      .filter((item) => item.slug && item.title)
      .map((item) => {
        const cover = item.cover_image || projects[0]?.cover || "";
        // gallery_images expected as a text[] column in Supabase; fall back to just the cover
        const gallery = Array.isArray(item.gallery_images) && item.gallery_images.length
          ? item.gallery_images
          : [cover];

        return {
          slug: item.slug,
          title: item.title,
          client: item.client ?? "Concepts in Motion",
          category: item.category ?? "Creative Direction",
          year: item.year ?? "",
          cover,
          images: gallery.slice(0, 4),
          description: item.description ?? "",
        };
      });

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