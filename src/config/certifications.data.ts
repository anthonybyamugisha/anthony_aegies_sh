import { GraduationCap, School, BookOpen, Building2 } from 'lucide-react';
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

export interface ExperienceEntry {
  title: string;
  organization: string;
  type: 'Internship' | 'Contract' | 'Full-time' | 'Part-time' | 'Volunteer';
  period: string;
  duration: string;
  location: string;
  mode: string;
  description: string;
  skills: string[];
  skillsNote?: string;
  icon: LucideIcon;
}

export const experience: ExperienceEntry[] = [
  {
    title: 'Information Security Assurance Intern',
    organization: 'Centenary Bank',
    type: 'Internship',
    period: 'Jun 2026 - Aug 2026',
    duration: '3 mos',
    location: 'Kampala, Central Region, Uganda',
    mode: 'On-site',
    description:
      'Information security assurance internship working on cybersecurity monitoring, analysis and reporting.',
    skills: ['Cybersecurity', 'Microsoft Power BI'],
    skillsNote: '+10 skills',
    icon: Building2,
  },
  {
    title: 'Student Teacher',
    organization: 'Buddo Secondary School',
    type: 'Contract',
    period: 'Mar 2024 - Aug 2024',
    duration: '6 mos',
    location: 'Buddo, Wakiso, Uganda',
    mode: 'On-site',
    description:
      'Taught A-level Physics and Mathematics, simplifying complex concepts to build student understanding. Assessed and graded student exams under teacher guidance, which sharpened my assessment and feedback capability.',
    skills: ['Communication', 'Time Management'],
    icon: School,
  },
];

export const timelineStats = {
  certifications: certifications.length,
  certified: certifications.filter((cert) => cert.status === 'CERTIFIED').length,
  education: education.length,
  experience: experience.length,
};
