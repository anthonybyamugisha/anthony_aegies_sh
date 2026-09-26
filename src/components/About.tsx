import { Target, GraduationCap, Sparkles, User, Award } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { site } from '../config/site.data';
import { education, certifications } from '../config/certifications.data';

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

              <Reveal delay={0.24}>
                <div className="hud-panel p-6">
                  <p className="flex items-center gap-2 text-neon text-xs mb-5">
                    <Target className="w-4 h-4" strokeWidth={1.5} />
                    <span className="text-gray-600">/certification progress</span>
                  </p>
                  <div className="space-y-3">
                    {certifications.map((certification) => (
                      <div
                        key={certification.name}
                        className="flex items-center justify-between gap-3 pb-3 border-b border-neon/10 last:border-0 last:pb-0"
                      >
                        <span className="text-sm text-gray-400">{certification.name}</span>
                        <span className="text-[10px] text-neon/80 shrink-0">
                          {certification.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
