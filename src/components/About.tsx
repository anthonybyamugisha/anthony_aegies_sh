import {
  GraduationCap,
  Sparkles,
  User,
  Award,
  Briefcase,
  CalendarDays,
  MapPin,
} from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import SectionNav from './ui/SectionNav';
import Reveal from './ui/Reveal';
import { site } from '../config/site.data';
import { education, experience } from '../config/certifications.data';

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="px-6 sm:px-9">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            index="01"
            title="About"
            icon={User}
            subtitle="Who is typing behind this terminal."
          />

          <div className="grid md:grid-cols-2 gap-8">
            <Reveal>
              <div className="hud-panel p-6 h-full">
                <p className="text-sm text-gray-400 leading-relaxed mb-6">{site.bio}</p>

                <p className="hud-label mb-3">// focus areas</p>
                <ul className="space-y-2">
                  {site.focus.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-400">
                      <span className="text-neon">&gt;</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="hud-label mt-6 mb-3">// currently learning</p>
                <div className="flex flex-wrap gap-2">
                  {site.currentlyLearning.map((item) => (
                    <span key={item} className="tag border-neon/30 text-neon/90">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="space-y-8">
              <Reveal delay={0.08}>
                <div className="hud-panel p-6">
                  <p className="flex items-center gap-2 text-neon text-xs mb-5">
                    <GraduationCap className="w-4 h-4" strokeWidth={1.5} />
                    <span className="text-gray-600">/education</span>
                  </p>

                  {education.map((entry) => {
                    const Icon = entry.icon;
                    return (
                      <div
                        key={entry.title}
                        className="mb-6 border-b border-neon/10 pb-6 last:mb-0 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start gap-3">
                          <Icon
                            className="mt-1 w-4 h-4 shrink-0 text-neon/70"
                            strokeWidth={1.5}
                          />
                          <div className="min-w-0">
                            <p className="text-neon/80 text-xs">{entry.period}</p>
                            <h3 className="text-gray-100 font-semibold">{entry.title}</h3>
                            <p className="text-sm text-gray-500">{entry.organization}</p>
                          </div>
                        </div>

                        {entry.description && (
                          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                            {entry.description}
                          </p>
                        )}

                        {entry.grade && (
                          <p className="mt-3 flex items-center gap-1.5 text-xs text-neon/80">
                            <Award className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                            {entry.grade}
                          </p>
                        )}

                        {entry.skills && entry.skills.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {entry.skills.map((skill) => (
                              <span key={skill} className="tag">
                                {skill}
                              </span>
                            ))}
                            {entry.skillsNote && (
                              <span className="tag text-gray-600">{entry.skillsNote}</span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="hud-panel p-6">
                  <p className="flex items-center gap-2 text-neon text-xs mb-5">
                    <Sparkles className="w-4 h-4" strokeWidth={1.5} />
                    <span className="text-gray-600">/strengths</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {site.strengths.map((strength) => (
                      <span key={strength} className="tag">
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="mt-16">
            <SectionNav prev={{ label: 'About', to: '#about' }} />

            <SectionHeading
              index="01.1"
              title="Experience"
              icon={Briefcase}
              subtitle="Roles I have worked in, and what I was responsible for."
            />

            <div className="grid gap-6 md:grid-cols-2">
              {experience.map((entry, index) => {
                const Icon = entry.icon;
                return (
                  <Reveal key={entry.title} delay={index * 0.08}>
                    <div className="hud-panel hud-panel-hover flex h-full flex-col p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <Icon
                            className="mt-1 w-4 h-4 shrink-0 text-neon/70"
                            strokeWidth={1.5}
                          />
                          <div className="min-w-0">
                            <h3 className="text-gray-100 font-semibold leading-snug">
                              {entry.title}
                            </h3>
                            <p className="mt-0.5 text-sm text-gray-500">
                              {entry.organization}
                            </p>
                          </div>
                        </div>

                        <span className="shrink-0 border border-neon/20 px-1.5 py-0.5 text-[9px] tracking-[0.15em] text-neon/70">
                          {entry.type}
                        </span>
                      </div>

                      <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-600">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays
                            className="w-3.5 h-3.5 shrink-0"
                            strokeWidth={1.5}
                          />
                          {entry.period} &middot; {entry.duration}
                        </span>
                        <span className="text-gray-700">|</span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                          {entry.location} &middot; {entry.mode}
                        </span>
                      </p>

                      <p className="mt-4 flex-1 text-sm text-gray-600 leading-relaxed">
                        {entry.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-1.5 border-t border-neon/10 pt-4">
                        {entry.skills.map((skill) => (
                          <span key={skill} className="tag">
                            {skill}
                          </span>
                        ))}
                        {entry.skillsNote && (
                          <span className="tag text-gray-600">{entry.skillsNote}</span>
                        )}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <div className="mt-12">
              <SectionNav next={{ label: 'Contact', to: '/contact' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
