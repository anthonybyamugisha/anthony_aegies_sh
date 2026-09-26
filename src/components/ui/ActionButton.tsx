import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

export type ButtonVariant = 'primary' | 'outline' | 'muted';

interface ActionButtonProps {
  label: string;
  to?: string;
  href?: string;
  icon?: LucideIcon;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'bg-neon text-black border border-neon hover:shadow-neon-lg hover:bg-neon-bright font-semibold',
  outline:
    'bg-transparent text-neon border border-neon/60 hover:bg-neon/10 hover:shadow-neon',
  muted:
    'bg-base-700 text-gray-500 border border-base-400 hover:text-gray-300 hover:border-gray-600',
};

const ActionButton = ({
  label,
  to,
  href,
  icon: Icon,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: ActionButtonProps) => {
  const classes = `inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs tracking-wide
    uppercase transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none
    ${variantClass[variant]} ${className}`;

  const content = (
    <>
      {Icon && <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />}
      {label}
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
};

export default ActionButton;
export type { ActionButtonProps };
