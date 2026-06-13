const DevelopmentBanner = () => {
  return (
    <div className="development-banner fixed top-0 left-0 right-0 z-[60] border-b border-[#B6FF2E1F] bg-[#0b0c10]/92 backdrop-blur-xl">
      <div className="flex h-9 items-center justify-center gap-2 px-3 text-center">
        <span className="h-2 w-2 rounded-full bg-neon animate-pulse" />
        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-neon min-[400px]:text-[10px] min-[400px]:tracking-[0.2em] sm:text-xs">
          <span className="sm:hidden">Website in development</span>
          <span className="hidden sm:inline">Satoshi Sword website is still in development</span>
        </p>
      </div>
    </div>
  );
};

export default DevelopmentBanner;
