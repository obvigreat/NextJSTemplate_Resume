import {StaticImageData} from 'next/image';
import {FC, SVGProps} from 'react';

export interface HomepageMeta {
  title: string;
  description: string;
}

export interface TimelineItem {
  date: string;
  location: string;
  title: string;
  content: string;
}

export interface ISourceProfile {
  image: string | StaticImageData;
  name: string;
  role: string;
}

export interface Testimonial {
  image: string | StaticImageData;
  name: string;
  text: string;
}

export interface PortfolioItem {
  title: string;
  description: string;
  image: string | StaticImageData;
  tags: string[];
  linkText?: string;
  href?: string;
}

export const ContactType = {
  Email: 'email',
  Phone: 'phone',
  Location: 'location',
  Github: 'github',
  LinkedIn: 'linkedin',
  Facebook: 'facebook',
  Twitter: 'twitter',
  Instagram: 'instagram',
} as const;

export type ContactType = typeof ContactType[keyof typeof ContactType];

export interface ContactValue {
  type: ContactType;
  text: string;
  href?: string;
}

export interface ContactValueMap {
  Icon: FC<SVGProps<SVGSVGElement>>;
  srLabel: string;
}

export interface ContactSection {
  headerText: string;
  description: string;
  items: ContactValue[];
}

export interface Skill {
  name: string;
  level: number;
  max?: number;
}

export interface SkillGroup {
  name: string;
  skills: Skill[];
}

export interface Social {
  label: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  href: string;
}

export interface TestimonialSection {
  imageSrc: string | StaticImageData;
  testimonials: Testimonial[];
} 