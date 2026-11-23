interface BrandHeaderProps {
  view: 'landing' | 'thankyou';
  onReturnHome?: () => void;
  onFocusForm?: () => void;
}

export function BrandHeader({ view, onReturnHome, onFocusForm }: BrandHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-3.5 sm:gap-6 sm:px-6 md:gap-8 lg:px-8">
        {/* Zone 1: Brand Wordmark & Tagline */}
        <a
          href="#top"
          onClick={(e) => {
            if (view === 'thankyou' && onReturnHome) {
              e.preventDefault();
              onReturnHome();
            }
          }}
          className="group flex flex-col shrink-0 focus-visible:outline-2 focus-visible:outline-[#D4AF37] focus-visible:outline-offset-4 rounded-sm"
        >
          <span className="font-serif text-base sm:text-xl font-bold tracking-[0.05em] sm:tracking-[0.06em] text-[#FAFAFA] whitespace-nowrap">
            GIDDY MINE COLLECTIONS
          </span>
          <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.12em] sm:tracking-[0.14em] text-[#D4AF37] whitespace-nowrap">
            Home of Quality Footwear
          </span>
        </a>

        {/* Zone 2: Clean Single-Line Navigation Links */}
        {view === 'landing' ? (
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#B3B3B3]"
          >
            <a
              href="#benefits"
              className="hover:text-[#FAFAFA] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#D4AF37] focus-visible:outline-offset-4 rounded-sm"
            >
              Benefits
            </a>
            <a
              href="#inside-guide"
              className="hover:text-[#FAFAFA] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#D4AF37] focus-visible:outline-offset-4 rounded-sm"
            >
              7-Point Checklist
            </a>
            <a
              href="#register-card"
              className="hover:text-[#FAFAFA] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#D4AF37] focus-visible:outline-offset-4 rounded-sm"
            >
              Get the Guide
            </a>
          </nav>
        ) : (
          <div className="hidden md:flex items-center text-sm text-[#B3B3B3] whitespace-nowrap">
            Your Free Guide Is Ready
          </div>
        )}

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center shrink-0">
          {view === 'landing' ? (
            <button
              type="button"
              onClick={onFocusForm}
              className="inline-flex min-h-[40px] items-center justify-center rounded-md border border-[#D4AF37]/50 bg-[#D4AF37]/10 px-4 py-2 text-xs sm:text-sm font-semibold text-[#D4AF37] transition-colors duration-150 hover:bg-[#D4AF37] hover:text-[#0A0A0A] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4AF37] focus-visible:outline-offset-2"
            >
              Free Guide
            </button>
          ) : (
            <button
              type="button"
              onClick={onReturnHome}
              className="inline-flex min-h-[40px] items-center justify-center rounded-md border border-white/15 bg-[#141414] px-4 py-2 text-xs sm:text-sm font-medium text-[#FAFAFA] transition-colors duration-150 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4AF37] focus-visible:outline-offset-2"
            >
              Back to Overview
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
