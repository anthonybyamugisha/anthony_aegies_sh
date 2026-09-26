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
    name: 'Cyber Security Awareness',
    code: '',
    issuer: 'HP LIFE',
    status: 'CERTIFIED',
    year: 'Jul 2026',
    focus: [
      'Common cyber threats and phishing',
      'Password hygiene and account safety',
      'Safe browsing and device security',
      'Reporting and responding to incidents',
    ],
    credentialUrl: 'https://www.life-global.org/certificate/77e706b5-db7c-4e99-a88f-bd06da957af3',
  },
  {
    name: 'Online Security and Privacy',
    code: '',
    issuer: 'DisasterReady',
    status: 'CERTIFIED',
    year: 'Jul 2026',
    focus: ['Data privacy', 'Risk management', 'Online safety and threat awareness'],
  },
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
    name: 'CompTIA Security+ Cert Prep',
    code: 'SY0-708',
    issuer: 'LinkedIn Learning',
    status: 'CERTIFIED',
    year: 'Jul 2026',
    focus: [
      'Security fundamentals and threats',
      'Risk management and governance',
      'Technologies and operations',
    ],
    credentialUrl:
      'https://www.linkedin.com/learning/certificates/e810450c8b822e6a2ddae11d1197589c95252e28417db90e4b4a735156715e21?trk=share_certificate&contentTrackingId=J0r8DU0FTB61z%2BtyIV96MQ%3D%3D&viewName=premium-nav-upsell-text&upsellOrderOrigin=Tracking%3Av1%3Apremium_nav_upsell_text%3ANav%3AIn-Product',
  },
  {
    name: 'Introduction to ITIL® V4',
    code: '',
    issuer: 'SimpliLearn',
    status: 'CERTIFIED',
    year: 'Jul 2026',
    focus: [
      'Guiding principles and the service value system',
      'Service management system and four dimensions',
      'Incident, problem and change practices',
      'Service level and value management',
    ],
    credentialUrl:
      'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0MTg0IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvMTA0OTY4NDNfOTE4MzE1OV8xNzg0NjY1MDI5NzUyLnBuZyIsInVzZXJuYW1lIjpudWxsfQ%3D%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F7118%2FIntroduction-to-ITIL%25C2%25AE-V4%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1609108511893625612&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVN7AI9swocAoxNEmyrytKTUstKsrMS49PKsovL04tsvXJzMtOTfHMAwAXZ0s2QQAAAA%3D%3D',
  },
  {
    name: 'Python Programming',
    code: 'CERT-B864FED4',
    issuer: 'OneRoadmap',
    status: 'CERTIFIED',
    year: 'Jul 2026',
    focus: [
      'Syntax, data types and control flow',
      'Functions, modules and packages',
      'File handling and error handling',
      'Core data structures and standard library',
    ],
    credentialUrl: 'https://www.oneroadmap.io/skills/python/certificate/CERT-B864FED4',
  },
  {
    name: 'SQL',
    code: 'CERT-C4BDD367',
    issuer: 'OneRoadmap',
    status: 'CERTIFIED',
    year: 'Jul 2026',
    focus: [
      'SELECT, filtering and sorting',
      'Joins across multiple tables',
      'Aggregation and grouping',
      'Subqueries and basic data modelling',
    ],
    credentialUrl: 'https://www.oneroadmap.io/skills/sql/certificate/CERT-C4BDD367',
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
    name: 'Data Science and Analytics',
    code: '',
    issuer: 'HP',
    status: 'CERTIFIED',
    year: 'Dec 2025',
    focus: [
      'Data analysis and interpretation',
      'Statistics and data literacy',
      'Spreadsheets and reporting',
      'Privacy and responsible data handling',
    ],
    credentialUrl: 'https://www.life-global.org/certificate/39092993-e762-457a-97e6-39193cfc8163',
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
