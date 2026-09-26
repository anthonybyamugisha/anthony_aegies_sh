import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MessageCircle,
  FolderGit2,
  FileText,
  Download,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import avatarImage from '../assets/images/portifolio_image.jpg';

export interface SocialLink {
  label: string;
  handle: string;
  href: string;
  icon: LucideIcon;
}

export interface HeroCta {
  label: string;
  to: string;
  href?: string;
  icon: LucideIcon;
  variant: 'primary' | 'outline' | 'muted';
}

export interface ContactChannel {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
}

const WHATSAPP_NUMBER = '+256 748161708';

export const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`;

export const site = {
  name: 'Anthony Byamugisha',
  firstName: 'Anthony',
  username: 'anthony',
  brand: 'Anthony Aegies',
  role: 'Cyber Security Student',
  greeting: "Hello, I'm",
  tagline: 'Detecting threats, hunting through logs, and turning raw data into decisions.',
  description: [
    'Final-year Computer Science student at Makerere University, focused on cybersecurity, security operations and threat detection.',
    'I work through SIEM log analysis and incident response exercises, documenting findings the way a SOC analyst would.',
  ],
  status: 'ONLINE',
  systemStatus: 'SECURE',
  availability: 'Available for opportunities',
  siteUrl: '',
  location: 'Kampala, Uganda',
  email: 'byamugishanthony@gmail.com',
  phone: '',
  whatsapp: WHATSAPP_NUMBER,
  resumeUrl: '',
  avatarUrl: avatarImage,
  bio: "I'm a final-year Computer Science student at Makerere University with a focus on cybersecurity. Most of my time goes into security operations, threat detection and SIEM log analysis — breaking noisy data down until the real signal shows up, then documenting what I found so someone else can act on it.",
  focus: [
    'Cybersecurity',
    'Security Operations (SOC)',
    'Threat Detection & Incident Response',
    'SIEM & Log Analysis',
    'Network Security',
  ],
  strengths: [
    'Security Analysis',
    'Threat Investigation',
    'Analytical Problem Solving',
    'Data Analysis',
    'Data-driven Decision Making',
    'Quick Learner',
    'Cross-functional Collaboration',
  ],
  currentlyLearning: [
    'SIEM',
    'Threat Hunting',
    'Digital Forensics',
    'Applied AI for Cybersecurity',
  ],
  socials: [
    {
      label: 'GitHub',
      handle: '@anthonybyamugisha',
      href: 'https://github.com/anthonybyamugisha',
      icon: Github,
    },
    {
      label: 'LinkedIn',
      handle: '/in/anthonybyamugisha',
      href: 'https://www.linkedin.com/in/anthonybyamugisha/',
      icon: Linkedin,
    },
    {
      label: 'Email',
      handle: 'byamugishanthony@gmail.com',
      href: 'mailto:byamugishanthony@gmail.com',
      icon: Mail,
    },
    {
      label: 'WhatsApp',
      handle: WHATSAPP_NUMBER,
      href: whatsappHref,
      icon: MessageCircle,
    },
  ] satisfies SocialLink[],
};

export const activeSocials = site.socials.filter((social) => social.href !== '');

const findSocial = (label: string) => site.socials.find((social) => social.label === label);

const stripProtocol = (href: string) => href.replace(/^https?:\/\//, '').replace(/\/+$/, '');

const github = findSocial('GitHub');
const linkedin = findSocial('LinkedIn');
const whatsapp = findSocial('WhatsApp');

export const contactChannels: ContactChannel[] = [
  ...(site.email
    ? [
        {
          id: 'email',
          label: 'Email',
          value: site.email,
          href: `mailto:${site.email}`,
          icon: Mail,
        },
      ]
    : []),
  ...(github
    ? [
        {
          id: 'github',
          label: 'GitHub',
          value: stripProtocol(github.href),
          href: github.href,
          icon: github.icon,
        },
      ]
    : []),
  ...(linkedin
    ? [
        {
          id: 'linkedin',
          label: 'LinkedIn',
          value: stripProtocol(linkedin.href),
          href: linkedin.href,
          icon: linkedin.icon,
        },
      ]
    : []),
  ...(whatsapp
    ? [
        {
          id: 'whatsapp',
          label: 'WhatsApp',
          value: site.whatsapp,
          href: whatsapp.href,
          icon: whatsapp.icon,
        },
      ]
    : []),
  ...(site.phone
    ? [
        {
          id: 'phone',
          label: 'Phone',
          value: site.phone,
          href: `tel:${site.phone.replace(/\s+/g, '')}`,
          icon: Phone,
        },
      ]
    : []),
];

export const hasResume = site.resumeUrl !== '';

export const hasAvatar = site.avatarUrl !== '';

export const heroCtas: HeroCta[] = [
  { label: 'View Projects', to: '/projects', icon: FolderGit2, variant: 'primary' },
  hasResume
    ? { label: 'Download Resume', to: '', href: site.resumeUrl, icon: Download, variant: 'outline' }
    : { label: 'Read the Blog', to: '/blog', icon: FileText, variant: 'outline' },
  { label: 'Get in Touch', to: '/contact', icon: Mail, variant: 'muted' },
];
