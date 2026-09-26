import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface SectionNavLink {
  label: string;
  to: string;
}

interface SectionNavProps {
  prev?: SectionNavLink;
  next?: SectionNavLink;
}

const SectionNav = ({ prev, next }: SectionNavProps) => {
  const render = (link: SectionNavLink | undefined, dir: 'prev' | 'next') => {
    if (!link) return <span />;

    const Arrow = dir === 'prev' ? ArrowLeft : ArrowRight;
    const shift = dir === 'prev' ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5';

    const inner = (
      <>
        {dir === 'prev' && (
          <Arrow
            className={`w-3.5 h-3.5 transition-transform ${shift}`}
            strokeWidth={1.5}
          />
        )}
        <span>{link.label}</span>
        {dir === 'next' && (
          <Arrow
            className={`w-3.5 h-3.5 transition-transform ${shift}`}
            strokeWidth={1.5}
          />
        )}
      </>
    );

    const className =
      'group flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-gray-600 transition-colors duration-200 hover:text-neon';

    // hash links use a plain anchor so the browser handles native smooth scrolling
    return link.to.startsWith('#') ? (
      <a href={link.to} className={className}>
        {inner}
      </a>
    ) : (
      <Link to={link.to} className={className}>
        {inner}
      </Link>
    );
  };

  return (
    <nav
      aria-label="Section navigation"
      className="flex items-center justify-between gap-4 border-y border-neon/10 py-3"
    >
      {render(prev, 'prev')}
      {render(next, 'next')}
    </nav>
  );
};

export default SectionNav;
