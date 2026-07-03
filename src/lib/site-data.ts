export const clients = [
  { name: "Maiora Realty", display: "MAIORA", style: "font-semibold tracking-tighter" },
  { name: "Elephant & Co", display: "Elephant & Co", style: "font-serif italic" },
  { name: "Lash & Co", display: "LASH & CO", style: "uppercase tracking-widest" },
  { name: "Sunday Racquet Club", display: "SUNDAY RC", style: "font-medium" },
  { name: "Prana Palate", display: "Prana Palate", style: "italic font-serif" },
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
    description:
      "Considered partnerships with creators who share your aesthetic and audience.",
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
    description:
      "Visual stewardship across every touchpoint, digital and physical.",
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
    description:
      "Efficient, on-brand paid campaigns — with creative that respects the feed.",
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

import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";

export const projects: StaticProject[] = [
  {
    slug: "maiora-realty",
    title: "Elevated Living",
    client: "Maiora Realty",
    category: "Visual Identity, Strategy",
    year: "2024",
    cover: work1,
    description:
      "A visual system for a boutique real-estate label — from typography and photography to sales collateral and social. Restrained, architectural, unmistakably premium.",
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

export const testimonialsFallback = [
  {
    quote:
      "Their ability to translate our intangible values into a visual language surpassed every expectation we had for the brand.",
    client: "Maiora Realty Group",
    role: "Founders",
  },
  {
    quote:
      "They don't just produce content; they curate an atmosphere that resonates with our audience on a visceral level.",
    client: "Sunday Racquet Club",
    role: "Founder",
  },
];
