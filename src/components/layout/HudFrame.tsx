const HudFrame = () => {
  return (
    <div className="fixed inset-3 sm:inset-5 z-40 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 border border-neon/10" />

      <span className="absolute -top-px -left-px w-6 h-6 border-t border-l border-neon/50" />
      <span className="absolute -top-px -right-px w-6 h-6 border-t border-r border-neon/50" />
      <span className="absolute -bottom-px -left-px w-6 h-6 border-b border-l border-neon/50" />
      <span className="absolute -bottom-px -right-px w-6 h-6 border-b border-r border-neon/50" />

      <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.35em] text-neon/25">
        HUD
      </span>
      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.35em] text-neon/25">
        SECURE CONNECTION
      </span>
    </div>
  );
};

export default HudFrame;
