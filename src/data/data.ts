import {
  AcademicCapIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  FlagIcon,
  MapIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

import { ContactSection, ContactType, PortfolioItem, SkillGroup, Social, TestimonialSection, TimelineItem } from './dataDef';

/**
 * Section definition
 */
export type SectionId = typeof SectionId[keyof typeof SectionId];
export const SectionId = {
  Hero: 'hero',
  About: 'about',
  Contact: 'contact',
  Portfolio: 'portfolio',
  Resume: 'resume',
  Skills: 'skills',
  Testimonials: 'testimonials',
} as const;

export const heroData = {
  imageSrc: '/hero.jpg',
  name: `M&A Marketplace`,
  description: `A state-of-the-art platform for buying and selling businesses with transparency and ease.`,
  actions: [
    {
      href: '/marketplace',
      text: 'Explore Marketplace',
      primary: true,
      Icon: BuildingOfficeIcon,
    },
    {
      href: '/about',
      text: 'Learn More',
      primary: false,
      Icon: AcademicCapIcon,
    },
  ],
};

export const aboutData = {
  profileImageSrc: '/profile.jpg',
  description: `Our platform provides all the tools and features needed to facilitate smooth and successful business transactions.`,
  aboutItems: [
    {label: 'AI Analysis', text: 'Get unbiased AI analysis of your company', Icon: SparklesIcon},
    {label: 'Due Diligence', text: 'Secure Virtual Data Room for due diligence', Icon: FlagIcon},
    {label: 'Integration', text: 'Post-purchase integration support', Icon: CalendarIcon},
    {label: 'Community', text: 'Connect with M&A professionals', Icon: MapIcon},
  ],
};

export const contact: ContactSection = {
  headerText: 'Get in touch',
  description: 'Contact us for any inquiries about our M&A marketplace platform.',
  items: [
    {
      type: ContactType.Email,
      text: 'contact@example.com',
      href: 'mailto:contact@example.com',
    },
    {
      type: ContactType.Phone,
      text: '+1 (555) 123-4567',
      href: 'tel:+1 (555) 123-4567',
    },
    {
      type: ContactType.Location,
      text: 'San Francisco, CA',
      href: 'https://www.google.com/maps/place/San+Francisco',
    },
  ],
};

export const portfolioItems: PortfolioItem[] = [
  {
    title: 'Business Analysis',
    description: 'AI-powered business analysis and valuation',
    image: '/portfolio/analysis.jpg',
    tags: ['AI', 'Analysis', 'Valuation'],
    href: '/services/analysis',
  },
  {
    title: 'Due Diligence',
    description: 'Secure virtual data room for due diligence',
    image: '/portfolio/diligence.jpg',
    tags: ['Security', 'Data Room', 'Due Diligence'],
    href: '/services/due-diligence',
  },
];

export const skills: SkillGroup[] = [
  {
    name: 'M&A Process',
    skills: [
      {
        name: 'Business Valuation',
        level: 9,
        max: 10,
      },
      {
        name: 'Due Diligence',
        level: 8,
        max: 10,
      },
      {
        name: 'Deal Structuring',
        level: 7,
        max: 10,
      },
    ],
  },
];

export const testimonial: TestimonialSection = {
  imageSrc: '/testimonials/background.jpg',
  testimonials: [
    {
      image: '/testimonials/user1.jpg',
      name: 'John Smith',
      text: 'The AI analysis provided valuable insights for my business valuation.',
    },
    {
      image: '/testimonials/user2.jpg',
      name: 'Jane Doe',
      text: 'The virtual data room made due diligence process smooth and secure.',
    },
  ],
};

export const education: TimelineItem[] = [
  {
    date: 'Ongoing',
    location: 'Online Platform',
    title: 'M&A Professional Certification',
    content: 'Comprehensive training in mergers and acquisitions.',
  },
];

export const experience: TimelineItem[] = [
  {
    date: '2023',
    location: 'Global',
    title: 'Successful Transactions',
    content: 'Facilitated over 100 successful business transactions.',
  },
];

export const socialLinks: Social[] = [
  {
    label: 'Github',
    Icon: AcademicCapIcon,
    href: 'https://github.com',
  },
  {
    label: 'LinkedIn',
    Icon: BuildingOfficeIcon,
    href: 'https://linkedin.com',
  },
]; 