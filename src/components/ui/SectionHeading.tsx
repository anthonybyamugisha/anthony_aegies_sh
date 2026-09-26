import type { LucideIcon } from 'lucide-react';
import Reveal from './Reveal';

interface SectionHeadingProps {
  index: string;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
}

const SectionHeading = ({ index, title, subtitle, icon: Icon, action }: SectionHeadingProps) => {
  return (
    <Reveal className="mb-12">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-neon/15 pb-4">
        <div>
          <p className="flex items-center gap-2 text-neon text-xs mb-2">
            {Icon && <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />}
            <span className="text-gray-600">{index}</span>
            <span className="w-6 h-px bg-neon/40" />
            <span className="animate-blink">_</span>
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-100 tracking-tight">
            {title}
          </h2>
          {subtitle && <p className="text-sm text-gray-500 mt-2 max-w-2xl">{subtitle}</p>}
        </div>
        {action}
      </div>
    </Reveal>
  );
};

export default SectionHeading;
