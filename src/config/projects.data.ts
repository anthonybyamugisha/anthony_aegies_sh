import { BarChart3, Building2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Project {
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
  github: string;
  demo: string;
}

export const projects: Project[] = [
  {
    title: 'AutoInsight',
    description:
      'Business Intelligence platform for automated analytics, reporting, and data quality insights.',
    icon: BarChart3,
    tags: ['Business Intelligence', 'Data Analysis', 'Automation'],
    github: '',
    demo: '',
  },
  {
    title: 'Banking Power BI Dashboards',
    description:
      'Interactive Power BI dashboards for executive reporting, CIB/RIB analytics, and channel performance.',
    icon: Building2,
    tags: ['Business Intelligence', 'Power BI', 'Data Analysis'],
    github: '',
    demo: '',
  },
];

export const allTags: string[] = Array.from(
  new Set(projects.flatMap((project) => project.tags)),
).sort();
