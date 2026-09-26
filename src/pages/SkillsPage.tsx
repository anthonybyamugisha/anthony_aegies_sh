import { motion } from 'framer-motion';
import Skills from '../components/Skills';

const SkillsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-16"
    >
      <Skills />
    </motion.div>
  );
};

export default SkillsPage;
