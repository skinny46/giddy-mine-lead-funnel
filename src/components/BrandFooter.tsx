export function BrandFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#0A0A0A]">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-4 py-8 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
        <p className="font-serif text-sm sm:text-base font-semibold tracking-[0.06em] text-[#FAFAFA]">
          GIDDY MINE COLLECTIONS <span className="mx-1.5 text-[#D4AF37]">|</span> Home of Quality Footwear
        </p>
        <p className="text-xs text-[#8C8C8C]">
          © {year} Giddy Mine Collections. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
