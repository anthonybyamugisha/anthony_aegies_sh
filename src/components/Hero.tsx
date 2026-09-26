import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ActionButton from './ui/ActionButton';
import { site, heroCtas, hasAvatar } from '../config/site.data';

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-3.5rem)] flex items-center py-20">
      <div className="px-6 sm:px-9 w-full">
        <div className="mx-auto grid md:grid-cols-2 gap-14 items-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 md:order-none mx-auto w-[16rem] sm:w-[19rem] shrink-0"
          >
            {hasAvatar && (
              <>
                <div className="absolute -inset-8 rounded-full blur-3xl glow-portrait" />

                <div className="relative">
                  <div className="absolute -inset-px rounded-full border border-neon/40 neon-glow" />
                  <div className="absolute inset-0 rounded-full border border-neon/20" />
                  <div className="relative rounded-full overflow-hidden aspect-square bg-base-800">
                      <img
                        src={site.avatarUrl}
                        srcSet="/portifolio_image-224.jpg 224w, /portifolio_image.jpg 448w"
                        sizes="(max-width: 768px) 240px, 448px"
                        alt={`${site.name}, ${site.role}`}
                        width={448}
                        height={416}
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        className="w-full h-full object-cover object-top"
                      />
                    <div className="absolute inset-0 crt-scanlines opacity-40" />
                    <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-neon/10" />
                  </div>

                  <div className="absolute bottom-3 -right-2 sm:right-4 flex items-center gap-2 px-3 py-1.5 bg-base-900 border border-neon/40 text-neon text-[10px] tracking-[0.2em] shadow-neon">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse-dot" />
                    {site.status}
                  </div>
                </div>
              </>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="order-none text-center md:text-left"
          >
            <p className="text-gray-300 text-lg md:text-xl mb-1">
              {site.greeting}
              <span className="w-2 h-5 ml-0.5 inline-block bg-neon align-middle animate-blink" />
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-neon animate-glow tracking-tight leading-[1.05] mb-5 break-words">
              {site.name}
            </h1>

            <p className="mb-6">
              <span className="text-gray-500">I'm a </span>
              <span className="text-neon font-medium">{site.role}</span>
            </p>

            <div className="space-y-1 mb-9">
              {site.description.map((line) => (
                <p key={line} className="text-sm text-gray-500 leading-relaxed max-w-xl mx-auto md:mx-0">
                  {line}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {heroCtas.map((cta) => (
                <ActionButton
                  key={cta.label}
                  label={cta.label}
                  to={cta.to || undefined}
                  href={cta.href}
                  icon={cta.icon}
                  variant={cta.variant}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-neon/60 hover:text-neon transition-colors animate-chevron-bounce"
      >
        <ChevronDown className="w-6 h-6" strokeWidth={1.5} />
      </a>
    </section>
  );
};

export default Hero;
