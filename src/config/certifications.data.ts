import { GraduationCap, School, BookOpen } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Certification {
  name: string;
  code: string;
  issuer: string;
  status: 'IN PROGRESS' | 'CERTIFIED' | 'PLANNED';
  year: string;
  focus: string[];
}

export interface TimelineEntry {
  title: string;
  organization: string;
  period: string;
  description?: string;
  icon: LucideIcon;
  grade?: string;
  skills?: string[];
  skillsNote?: string;
}

export const certifications: Certification[] = [
  {
    name: 'CompTIA Security+',
    code: 'SY0-701',
    issuer: 'CompTIA',
    status: 'IN PROGRESS',
    year: '2026',
    focus: ['Security fundamentals', 'Threat management', 'Security operations'],
  },
  {
    name: 'Google Cybersecurity Professional',
    code: '',
    issuer: 'Google',
    status: 'PLANNED',
    year: '2026',
    focus: ['SOC fundamentals', 'Incident response', 'Risk management'],
  },
];

export const education: TimelineEntry[] = [
  {
    title: "Bachelor's degree, Computer Science",
    organization: 'Makerere University',
    period: 'Aug 2024 - May 2027',
    description:
      'Final-year undergraduate specialising in cybersecurity, with hands-on work in security operations, threat detection and SIEM log analysis.',
    icon: GraduationCap,
    skills: ['Cryptology', 'Coding Theory', 'Data Structures', 'Git and Github'],
    skillsNote: '+21 skills',
  },
  {
    title: 'Uganda Advanced Certificate of Education',
    organization: 'Buddo Secondary School',
    period: 'Feb 2021 - Nov 2023',
    description: 'Physics, Economics and Mathematics.',
    icon: School,
    grade: '20 points out of 20',
    skills: ['Communication', 'Time Management'],
    skillsNote: '+4 skills',
  },
  {
    title: "Uganda Certificate of Education, O'Level",
    organization: 'Mwizi Secondary School',
    period: 'Feb 2017 - Nov 2020',
    icon: BookOpen,
    grade: '14 aggregate (First Grade)',
  },
];

export const experience: TimelineEntry[] = [];

export const timelineStats = {
  certifications: certifications.length,
  certified: certifications.filter((cert) => cert.status === 'CERTIFIED').length,
  education: education.length,
  experience: experience.length,
};
