const BackgroundFx = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-base-900" />

      <div className="absolute inset-0 tech-grid opacity-70 animate-grid-drift" />
      <div className="absolute inset-0 tech-grid-fine opacity-40" />

      <div className="absolute left-1/2 top-[26%] w-[68rem] h-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl glow-a" />
      <div className="absolute right-[-10rem] bottom-[8%] w-[34rem] h-[34rem] rounded-full blur-3xl glow-b" />

      <div className="absolute inset-0 vignette" />
      <div className="absolute inset-0 crt-scanlines opacity-50" />
    </div>
  );
};

export default BackgroundFx;
