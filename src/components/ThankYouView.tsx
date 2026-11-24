import { Check, Download, MessageCircle } from 'lucide-react';
import { ResilientImage } from './ResilientImage';
import guideMockup from '../assets/images/buyers_guide_mockup_1795378314582.jpg';

interface ThankYouViewProps {
  firstName: string;
}

const WHATSAPP_URL =
  'https://wa.me/2347032254117?text=Hello%20Giddy%20Mine%20Collections%2C%20I%20just%20downloaded%20The%20Smart%20Footwear%20Buyer%27s%20Guide!';

const PDF_URL = '/smart-footwear-buyers-guide.pdf';
const PDF_FILENAME = 'Smart-Footwear-Buyers-Guide-Giddy-Mine-Collections.pdf';

export function ThankYouView({ firstName }: ThankYouViewProps) {
  const displayName = firstName.trim() || 'Friend';

  return (
    <main className="mx-auto flex min-h-[calc(100vh-145px)] max-w-[1200px] items-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-3xl rounded-xl border border-[#D4AF37]/35 bg-[#141414] p-7 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/15 text-[#D4AF37]">
              <Check className="h-7 w-7 stroke-[2.5]" />
            </div>

            <p className="mt-5 text-xs font-semibold tracking-[0.14em] text-[#D4AF37]">
              SUBMISSION CONFIRMED
            </p>

            <h1 className="mt-2 font-serif text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.1] text-[#FAFAFA]">
              You&apos;re In, {displayName}! Your Guide Is Ready.
            </h1>

            <p className="mt-4 text-base leading-[1.65] text-[#B8B8B8]">
              Thank you—your details have been received. Your copy of{' '}
              <span className="font-medium text-[#FAFAFA]">
                The Smart Footwear Buyer&apos;s Guide: 7 Things to Check Before Buying Footwear Online
              </span>{' '}
              is ready to download below.
            </p>

            <div className="mt-8 flex flex-col gap-3.5">
              <a
                href={PDF_URL}
                download={PDF_FILENAME}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-lg bg-[#D4AF37] px-6 py-3.5 text-center text-sm font-bold tracking-wide text-[#0A0A0A] transition-colors duration-150 hover:bg-[#E5C453] focus-visible:outline-2 focus-visible:outline-[#D4AF37] focus-visible:outline-offset-2"
              >
                <Download className="h-4 w-4 shrink-0" />
                <span>Download The Smart Footwear Buyer&apos;s Guide (PDF)</span>
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-lg border border-[#D4AF37]/45 bg-[#0A0A0A] px-6 py-3 text-center text-sm font-semibold text-[#FAFAFA] transition-colors duration-150 hover:border-[#D4AF37] hover:text-[#D4AF37] focus-visible:outline-2 focus-visible:outline-[#D4AF37] focus-visible:outline-offset-2"
              >
                <MessageCircle className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                <span>Chat With Us on WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="hidden md:col-span-4 md:block">
            <div className="overflow-hidden rounded-lg border border-[#D4AF37]/30 bg-[#0A0A0A]">
              <ResilientImage
                src={guideMockup}
                alt="The Smart Footwear Buyer's Guide PDF edition cover"
                width={720}
                height={960}
                className="aspect-[3/4] w-full object-cover"
                aspectClassName="aspect-[3/4]"
                fallbackLabel="Smart Footwear Buyer's Guide"
              />
            </div>
            <p className="mt-3 text-center text-xs text-[#A3A3A3]">
              2-Page Printable PDF · Instant Access
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
