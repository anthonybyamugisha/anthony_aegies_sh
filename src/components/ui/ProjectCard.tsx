import { motion } from 'framer-motion';
import { Github, ExternalLink, FolderOpen } from 'lucide-react';
import type { Project } from '../../config/projects.data';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const links = [
    { href: project.github, label: `${project.title} source code`, Icon: Github },
    { href: project.demo, label: `${project.title} live demo`, Icon: ExternalLink },
  ].filter((link) => link.href !== '');

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="hud-panel hud-panel-hover p-6 flex flex-col"
    >
      <div className="flex items-start justify-between mb-5">
        <project.icon className="w-8 h-8 text-neon" strokeWidth={1.25} />
        <span className="text-[10px] text-gray-700 tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3 className="text-base font-semibold text-gray-100 mb-2">{project.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1">{project.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="pt-4 border-t border-neon/10 flex items-center gap-3">
        {links.length > 0 ? (
          links.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] text-gray-600 hover:text-neon transition-colors"
            >
              <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
              {href === project.github ? 'source' : 'live'}
            </a>
          ))
        ) : (
          <span className="flex items-center gap-1.5 text-[11px] text-gray-700">
            <FolderOpen className="w-3.5 h-3.5" strokeWidth={1.5} />
            private / not published
          </span>
        )}
      </div>
    </motion.article>
  );
};

export default ProjectCard;
