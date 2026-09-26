import { motion } from 'framer-motion';
import Certifications from '../components/Certifications';

const CertsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-16"
    >
      <Certifications showFilters />
    </motion.div>
  );
};

export default CertsPage;
