import { Cpu } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import SkillBar from './ui/SkillBar';
import { proficiency, skillGroups, skillStats } from '../config/skills.data';

const Skills = () => {
  return (
    <section id="skills" className="py-24">
      <div className="px-6 sm:px-9">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            index="03"
            title="Skills"
            icon={Cpu}
            subtitle="Proficiency levels and the tooling I reach for."
            action={
              <p className="text-xs text-gray-600 tabular-nums">
                {skillStats.tools} tools / {skillStats.groups} groups
              </p>
            }
          />

          <div className="grid md:grid-cols-2 gap-8">
            <Reveal>
              <div className="hud-panel p-6 h-full">
                <p className="hud-label mb-6">// proficiency</p>
                <div className="space-y-5">
                  {proficiency.map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="hud-panel p-6 h-full">
                <p className="hud-label mb-6">// stack</p>
                <div className="space-y-5">
                  {skillGroups.map((group) => (
                    <div key={group.title}>
                      <p className="flex items-center gap-2 text-xs text-gray-400 mb-2.5">
                        <group.icon className="w-3.5 h-3.5 text-neon" strokeWidth={1.5} />
                        {group.title}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pl-6">
                        {group.items.map((item) => (
                          <span key={item} className="tag">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
