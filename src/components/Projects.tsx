import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FolderGit2 } from 'lucide-react';
import ProjectCard from './ui/ProjectCard';
import { projects, allTags } from '../config/projects.data';

interface ProjectsProps {
  limit?: number;
  showFilters?: boolean;
  showHeading?: boolean;
  index?: string;
}

const ALL = 'all';

const Projects = ({
  limit,
  showFilters = false,
  showHeading = true,
  index = '02',
}: ProjectsProps) => {
  const [activeTag, setActiveTag] = useState(ALL);

  const tags = useMemo(() => [ALL, ...allTags], []);

  const filtered = useMemo(() => {
    const matched =
      activeTag === ALL
        ? projects
        : projects.filter((project) => project.tags.includes(activeTag));

    return limit ? matched.slice(0, limit) : matched;
  }, [activeTag, limit]);

  return (
    <section id="projects" className="py-24">
      <div className="px-6 sm:px-9">
        <div className="mx-auto max-w-5xl">
          {showHeading && (
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-neon/15 pb-4 mb-10">
              <div>
                <p className="flex items-center gap-2 text-neon text-xs mb-2">
                  <FolderGit2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span className="text-gray-600">{index}</span>
                  <span className="w-6 h-px bg-neon/40" />
                  <span className="animate-blink">_</span>
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-100 tracking-tight">
                  Projects
                </h2>
              </div>
              <p className="text-xs text-gray-600 tabular-nums">{projects.length} indexed</p>
            </div>
          )}

          {showFilters && (
            <div className="flex flex-wrap gap-2 mb-10">
              {tags.map((tag) => {
                const active = activeTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveTag(tag)}
                    aria-pressed={active}
                    className={`px-3 py-1.5 text-[11px] tracking-wide border transition-all duration-300 ${
                      active
                        ? 'bg-neon text-black border-neon font-semibold shadow-neon'
                        : 'bg-base-800 text-gray-500 border-neon/15 hover:text-neon hover:border-neon/50'
                    }`}
                  >
                    {tag === ALL ? 'all' : tag.toLowerCase()}
                  </button>
                );
              })}
            </div>
          )}

          <motion.div layout className="grid md:grid-cols-2 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="hud-panel p-12 text-center">
              <p className="text-neon text-xs mb-2">&gt;_ no records</p>
              <p className="text-sm text-gray-600">Nothing filed under this tag yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
