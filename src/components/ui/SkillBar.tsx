import React from 'react';
import { motion } from 'framer-motion';
import type { Skill } from '../../config/skills.data';

interface SkillBarProps {
  skill: Skill;
  index: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
    >
      <div className="flex items-center justify-between mb-2 text-xs">
        <span className="flex items-center gap-2 text-gray-400">
          <skill.icon className="w-3.5 h-3.5 text-neon/70" strokeWidth={1.5} />
          {skill.name}
        </span>
        <span className="text-neon/80 tabular-nums">{skill.level}%</span>
      </div>

      <div className="h-px bg-base-400 relative overflow-hidden">
        <motion.div
          className="h-full bg-neon shadow-neon"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut', delay: index * 0.07 }}
        />
      </div>
    </motion.div>
  );
};

export default SkillBar;
