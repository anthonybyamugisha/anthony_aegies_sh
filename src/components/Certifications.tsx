import { useMemo, useState } from 'react';
import { Award, FileCheck2, Clock3, CalendarDays, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { certifications, timelineStats } from '../config/certifications.data';

const statusClass: Record<string, string> = {
  CERTIFIED: 'text-neon border-neon/50',
  'IN PROGRESS': 'text-amber-400/80 border-amber-400/40',
  PLANNED: 'text-gray-600 border-base-400',
};

interface CertificationsProps {
  limit?: number;
  showFilters?: boolean;
  index?: string;
}

type StatusFilter = 'ALL' | 'CERTIFIED' | 'IN PROGRESS' | 'PLANNED';

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: 'ALL', label: 'all' },
  { value: 'CERTIFIED', label: 'completed' },
  { value: 'IN PROGRESS', label: 'in progress' },
  { value: 'PLANNED', label: 'planned' },
];

const Certifications = ({ limit, showFilters = false, index = '04' }: CertificationsProps) => {
  const [active, setActive] = useState<StatusFilter>('ALL');

  const matched = useMemo(
    () =>
      active === 'ALL' ? certifications : certifications.filter((c) => c.status === active),
    [active]
  );

  const shown = limit ? matched.slice(0, limit) : matched;
  const hiddenCount = matched.length - shown.length;

  return (
    <section id="certs" className="py-24">
      <div className="px-6 sm:px-9">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            index={index}
            title="Certifications"
            icon={Award}
            subtitle="Formal training and exam progress."
            action={
              <div className="flex gap-6 text-xs text-gray-600 tabular-nums">
                <span>
                  <span className="text-neon">{timelineStats.certified}</span> certified
                </span>
                <span>
                  <span className="text-neon">{timelineStats.certifications}</span> tracked
                </span>
              </div>
            }
          />

          {showFilters && (
            <div className="mb-10 flex flex-wrap gap-2">
              {FILTERS.map((filter) => {
                const isActive = active === filter.value;
                const count =
                  filter.value === 'ALL'
                    ? certifications.length
                    : certifications.filter((c) => c.status === filter.value).length;

                return (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => setActive(filter.value)}
                    aria-pressed={isActive}
                    className={`px-3 py-1.5 text-[11px] tracking-wide border transition-all duration-300 ${
                      isActive
                        ? 'bg-neon text-black border-neon font-semibold shadow-neon'
                        : 'bg-base-800 text-gray-500 border-neon/15 hover:text-neon hover:border-neon/50'
                    }`}
                  >
                    {filter.label}
                    <span className="ml-1.5 tabular-nums opacity-60">{count}</span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {shown.map((certification, i) => (
              <Reveal key={certification.name} delay={i * 0.08}>
                <div className="hud-panel hud-panel-hover p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-gray-100 font-semibold leading-snug">
                        {certification.name}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">
                        {certification.issuer}
                        {certification.code && ` / ${certification.code}`}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 text-[9px] tracking-[0.15em] px-2 py-1 border ${
                        statusClass[certification.status] ?? statusClass.PLANNED
                      }`}
                    >
                      {certification.status}
                    </span>
                  </div>

                  <ul className="space-y-1.5 mb-5 flex-1">
                    {certification.focus.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-gray-500">
                        <span className="text-neon/60">&gt;</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 border-t border-neon/10 text-[11px] text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5" strokeWidth={1.5} />
                      {certification.year}
                    </span>
                    {certification.status === 'CERTIFIED' ? (
                      <span className="flex items-center gap-1.5 text-neon/80">
                        <FileCheck2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                        verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <Clock3 className="w-3.5 h-3.5" strokeWidth={1.5} />
                        in progress
                      </span>
                    )}
                    {certification.credentialUrl && (
                      <a
                        href={certification.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group ml-auto flex items-center gap-1.5 text-neon/80 transition-colors hover:text-neon"
                      >
                        show credential
                        <ArrowUpRight
                          className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          strokeWidth={1.5}
                        />
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {shown.length === 0 && (
            <div className="hud-panel p-12 text-center">
              <p className="text-neon text-xs mb-2">&gt;_ no records</p>
              <p className="text-sm text-gray-600">Nothing filed under this status yet.</p>
            </div>
          )}

          {hiddenCount > 0 && (
            <Reveal delay={0.16}>
              <div className="mt-10 flex flex-col items-center gap-3">
                <Link
                  to="/certs"
                  className="group inline-flex items-center gap-2 border border-neon/40 px-5 py-2.5 text-xs uppercase tracking-wide text-neon transition-all duration-300 hover:border-neon hover:bg-neon/10 hover:shadow-neon"
                >
                  view all {certifications.length} certifications
                  <ArrowUpRight
                    className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.75}
                  />
                </Link>
                <p className="text-[11px] text-gray-700 tabular-nums">
                  +{hiddenCount} more on the certs page
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
