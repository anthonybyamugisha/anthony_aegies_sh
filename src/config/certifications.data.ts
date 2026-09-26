import { GraduationCap, School, BookOpen, Building2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Certification {
  name: string;
  code: string;
  issuer: string;
  status: 'IN PROGRESS' | 'CERTIFIED' | 'PLANNED';
  year: string;
  focus: string[];
  credentialUrl?: string;
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
    name: 'Cyber Security in Finance',
    code: '',
    issuer: 'SimpliLearn',
    status: 'CERTIFIED',
    year: 'Jul 2026',
    focus: [
      'Threat landscape in financial services',
      'Encryption and secure transactions',
      'Risk management and governance',
      'Regulatory and compliance frameworks',
    ],
    credentialUrl:
      'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI1NjQ0IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvMTA0Njk2OTVfOTE4MzE1OV8xNzg0MDQ5MzQ1MTQxLnBuZyIsInVzZXJuYW1lIjoiQllBTVVHSVNIQSBBTlRIT05ZIn0&utm_source=shared-certificate&utm_medium=app_lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Fcertificates.simplicdn.net%2Fshare%2F10469695_9183159_1784049345141.png&_branch_match_id=1609108511893625612&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1g%2BMzE81tfRw9jNJsq8rSk1LLSrKzEuPTyrKLy9OLbL1yczLTk3xzAMAdwyMMj8AAAA%3D',
  },
  {
    name: 'Introduction to Networks',
    code: '',
    issuer: 'Cisco Networking Academy',
    status: 'CERTIFIED',
    year: 'Sep 2025',
    focus: [
      'Network fundamentals and topologies',
      'OSI and TCP/IP models',
      'IP addressing and subnetting',
      'Basic configuration and troubleshooting',
    ],
    credentialUrl:
      'https://www.netacad.com/certificates?issuanceId=64f07ace-4814-4b0a-8b7f-13235bd9664b',
  },
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
