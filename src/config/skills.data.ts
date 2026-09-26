import { Shield, Code, Terminal, Database, BarChart3, Wrench, Globe, Radar } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Skill {
  name: string;
  icon: LucideIcon;
  level: number;
}

export interface SkillGroup {
  title: string;
  icon: LucideIcon;
  items: string[];
}

export const proficiency: Skill[] = [
  { name: 'Power BI', icon: BarChart3, level: 75 },
  { name: 'SIEM & Log Analysis', icon: Shield, level: 70 },
  { name: 'Linux', icon: Terminal, level: 70 },
  { name: 'SQL', icon: Database, level: 65 },
  { name: 'Threat Detection', icon: Radar, level: 65 },
  { name: 'Python', icon: Code, level: 60 },
];

export const skillGroups: SkillGroup[] = [
  { title: 'Languages', icon: Code, items: ['Python', 'SQL'] },
  { title: 'Operating Systems', icon: Terminal, items: ['Linux [Parrot OS]', 'Windows'] },
  {
    title: 'Cybersecurity',
    icon: Shield,
    items: ['SIEM', 'Network Security', 'Threat Detection', 'Incident Response'],
  },
  { title: 'Databases', icon: Database, items: ['MySQL'] },
  { title: 'Data & BI', icon: BarChart3, items: ['Power BI', 'Excel', 'Pandas', 'NumPy'] },
  { title: 'Frameworks', icon: Globe, items: ['Django'] },
  { title: 'Tools', icon: Wrench, items: ['Power Automate', 'Git', 'GitHub', 'VS Code'] },
];

export const skillStats = {
  groups: skillGroups.length,
  tools: skillGroups.reduce((total, group) => total + group.items.length, 0),
  tracked: proficiency.length,
};
