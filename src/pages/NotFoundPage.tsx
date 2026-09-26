import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-6"
    >
      <div className="text-center">
        <p className="text-neon text-xs mb-4">&gt;_ cd /{''}
          <span className="animate-blink">_</span>
        </p>
        <p className="text-7xl md:text-9xl font-bold text-neon animate-glow mb-4">404</p>
        <h1 className="text-lg font-semibold text-gray-200 mb-2">Route not found</h1>
        <p className="text-sm text-gray-600 mb-8 font-mono">
          bash: no such file or directory
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wide bg-neon text-black border border-neon font-semibold hover:shadow-neon-lg transition-all duration-300"
        >
          <Home className="w-3.5 h-3.5" strokeWidth={1.75} />
          cd ~
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;
