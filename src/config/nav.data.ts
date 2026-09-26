import {
  Home,
  User,
  FolderGit2,
  Cpu,
  Award,
  FileText,
  Mail,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavLink {
  to: string;
  label: string;
  icon: LucideIcon;
  external?: boolean;
}

export const navLinks: NavLink[] = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/about', label: 'About', icon: User },
  { to: '/projects', label: 'Projects', icon: FolderGit2 },
  { to: '/skills', label: 'Skills', icon: Cpu },
  { to: '/certs', label: 'Certs', icon: Award },
  { to: '/blog', label: 'Blog', icon: FileText },
  { to: '/contact', label: 'Contact', icon: Mail },
];

export const isExternal = (to: string) => /^https?:\/\//.test(to);
