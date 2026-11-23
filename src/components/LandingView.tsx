import { FormEvent, RefObject, useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Lock,
  PackageCheck,
  Ruler,
  ShieldCheck,
} from 'lucide-react';
import { ResilientImage } from './ResilientImage';
import shoeAirF from '../assets/images/shoe_air_f.jpg';
import shoeMart from '../assets/images/shoe_mart.jpg';
import shoeNb from '../assets/images/shoe_nb.jpg';
import shoeTib from '../assets/images/shoe_tib.jpg';
import shoeHll from '../assets/images/shoe_hll.jpg';
import shoeHi from '../assets/images/shoe_hi.jpg';
import shoeAd from '../assets/images/shoe_ad.jpg';
import shoeCrocs from '../assets/images/shoe_crocs.jpg';
import shoePpink from '../assets/images/shoe_ppink.jpg';
import guideMockup from '../assets/images/buyers_guide_mockup_1795378314582.jpg';

interface LandingViewProps {
  onSuccess: (firstName: string) => void;
  nameInputRef: RefObject<HTMLInputElement | null>;
}

const GOOGLE_FORM_ACTION_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfOoc5eckdCZRegf-IMnC4WznmwniZUBwInv1f_ebnfKzHskQ/formResponse';

const BENEFITS = [
  {
    number: '01',
    icon: Ruler,
    title: 'Nail Your Exact Fit',
    description: 'Learn how to verify sizing across brands and styles before paying.',
  },
  {
    number: '02',
    icon: ShieldCheck,
    title: 'Spot True Craftsmanship',
    description:
      'Know what to check in materials, stitching, soles, and multi-angle photos.',
  },
  {
    number: '03',
    icon: PackageCheck,
    title: 'Order Without Surprises',
    description: 'Verify delivery terms, timelines, and seller support upfront.',
  },
];

const CHECKLIST_PREVIEW = [
  {
    num: '01',
    title: 'Centimeter Foot-Length Verification',
    detail: 'Match heel-to-toe CM length instead of relying on inconsistent EU/UK/US labels.',
  },
  {
    num: '02',
    title: 'Leather Grain & Upper Material Audit',
    detail: 'Distinguish genuine full-grain hides and dense suede from synthetic coatings.',
  },
  {
    num: '03',
    title: 'Welt & Seam Stitch Density',
    detail: 'Inspect thread tension and sole joins to avoid premature separation.',
  },
  {
    num: '04',
    title: 'Outsole Flexibility & Heel Balance',
    detail: 'Confirm grip tread, stacked heel alignment, and daily comfort structure.',
  },
  {
    num: '05',
    title: 'Multi-Angle Studio Photo Verification',
    detail: 'Request real natural-light angles before paying for any pair online.',
  },
  {
    num: '06',
    title: 'Toe-Box Last & Width Calibration',
    detail: 'Adjust sizing accurately between pointed dress lasts and round-toe sneakers.',
  },
  {
    num: '07',
    title: 'Dispatch Timelines & Exchange Support',
    detail: 'Lock down protective packaging, shipping windows, and direct seller support.',
  },
];

export function LandingView({ onSuccess, nameInputRef }: LandingViewProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSubmittingRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmittingRef.current) {
      return;
    }

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (trimmedName.length < 2) {
      setErrorMessage('Please enter your full name so we can personalize your guide.');
      nameInputRef.current?.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const phoneDigits = trimmedPhone.replace(/\D/g, '');
    if (phoneDigits.length < 7) {
      setErrorMessage('Please enter a valid WhatsApp or phone number.');
      return;
    }

    setErrorMessage(null);
    isSubmittingRef.current = true;
    setIsSubmitting(true);

    const extractedFirstName = trimmedName.split(/\s+/)[0] || 'Friend';

    const payload = new URLSearchParams({
      'entry.1247310815': trimmedName,
      'entry.395392008': trimmedEmail,
      'entry.1087792134': trimmedPhone,
    });

    try {
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: payload.toString(),
      });
    } catch {
      // Ignore opaque/network errors in no-cors mode so user still gets the guide
    }

    timerRef.current = window.setTimeout(() => {
      onSuccess(extractedFirstName);
    }, 500);
  };

  return (
    <main id="top" className="pb-20">
      {/* Hero + Lead Capture Split */}
      <section className="mx-auto max-w-[1200px] px-4 pt-8 pb-16 sm:px-6 sm:pt-12 lg:px-8 lg:pt-14 lg:pb-20">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Editorial Value Proposition & Hero Visual */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <div className="inline-flex items-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/12 px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-[#D4AF37]">
                FREE BUYER&apos;S CHECKLIST
              </div>

              <h1 className="mt-5 font-serif text-[clamp(2.25rem,4vw,3.65rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-[#FAFAFA]">
                Stop Guessing Your Size &amp; Quality When Ordering Shoes Online.
              </h1>

              <p className="mt-5 max-w-[60ch] text-base leading-[1.65] text-[#B8B8B8] sm:text-lg">
                Download <span className="font-medium text-[#FAFAFA]">The Smart Footwear Buyer&apos;s Guide</span>: 7 Things to Check Before Buying Footwear Online — and shop every pair with confidence.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-[#A3A3A3] sm:text-sm">
                <span className="text-[#D4AF37]">7-Point Inspection Checklist</span>
                <span aria-hidden="true">·</span>
                <span>Cross-Brand Sizing Guide</span>
                <span aria-hidden="true">·</span>
                <span>Instant PDF Download</span>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-white/10 bg-[#141414] p-3 sm:p-4">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden rounded-lg border border-white/10 bg-[#0A0A0A]">
                  <ResilientImage
                    src={shoeMart}
                    alt="Black leather platform lace-up derby shoes with signature welt stitching"
                    width={640}
                    height={567}
                    fetchPriority="high"
                    className="h-full w-full object-cover object-center"
                    aspectClassName="aspect-[4/3] sm:aspect-square"
                    fallbackLabel="GIDDY MINE COLLECTIONS"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />
                  <p className="absolute right-3 bottom-2.5 left-3 text-[11px] font-medium text-[#FAFAFA] sm:text-xs">
                    Leather &amp; Welt Stitching
                  </p>
                </div>

                <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden rounded-lg border border-white/10 bg-[#0A0A0A]">
                  <ResilientImage
                    src={shoeTib}
                    alt="Black nubuck ankle boots with white padded collar and gum lug sole"
                    width={505}
                    height={640}
                    fetchPriority="high"
                    className="h-full w-full object-cover object-center"
                    aspectClassName="aspect-[4/3] sm:aspect-square"
                    fallbackLabel="GIDDY MINE COLLECTIONS"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />
                  <p className="absolute right-3 bottom-2.5 left-3 text-[11px] font-medium text-[#FAFAFA] sm:text-xs">
                    Lug Sole &amp; Collar Finish
                  </p>
                </div>
              </div>
              <p className="mt-3 px-1 text-xs font-medium text-[#B8B8B8] sm:text-sm">
                Curated for discerning buyers of boots, derby shoes, and everyday sneakers.
              </p>
            </div>
          </div>

          {/* Right Column: Lead Capture Registration Card */}
          <div id="register-card" className="flex flex-col lg:col-span-5">
            <div className="flex h-full flex-col justify-between rounded-xl border border-[#D4AF37]/30 bg-[#141414] p-6 sm:p-8">
              <div>
                <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                  <div className="w-16 shrink-0 overflow-hidden rounded-md border border-[#D4AF37]/30 bg-[#0A0A0A]">
                    <ResilientImage
                      src={guideMockup}
                      alt="The Smart Footwear Buyer's Guide hardcover preview"
                      width={720}
                      height={960}
                      className="aspect-[3/4] w-full object-cover"
                      aspectClassName="aspect-[3/4]"
                      fallbackLabel="Buyer's Guide"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.12em] text-[#D4AF37]">
                      INSTANT PDF ACCESS
                    </p>
                    <h2 className="mt-1 font-serif text-2xl font-semibold leading-tight text-[#FAFAFA]">
                      Get Your Free Copy Now
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-[#A3A3A3]">
                      Complete the short form below to unlock your immediate download.
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-5"
                  noValidate
                >
                  <div>
                    <label
                      htmlFor="full-name"
                      className="block text-sm font-medium text-[#E5E5E5]"
                    >
                      Full Name <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      id="full-name"
                      name="entry.1247310815"
                      type="text"
                      required
                      minLength={2}
                      autoComplete="name"
                      readOnly={isSubmitting}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Chinedu Okafor"
                      className="mt-2 block min-h-[48px] w-full rounded-lg border border-white/15 bg-[#0A0A0A] px-4 py-3 text-sm text-[#FAFAFA] placeholder:text-[#6B6B6B] transition-colors duration-150 focus:border-[#D4AF37] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-[#E5E5E5]"
                    >
                      Email Address <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      id="email-address"
                      name="entry.395392008"
                      type="email"
                      required
                      autoComplete="email"
                      readOnly={isSubmitting}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="mt-2 block min-h-[48px] w-full rounded-lg border border-white/15 bg-[#0A0A0A] px-4 py-3 text-sm text-[#FAFAFA] placeholder:text-[#6B6B6B] transition-colors duration-150 focus:border-[#D4AF37] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="whatsapp-phone"
                      className="block text-sm font-medium text-[#E5E5E5]"
                    >
                      WhatsApp / Phone Number <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      id="whatsapp-phone"
                      name="entry.1087792134"
                      type="tel"
                      required
                      autoComplete="tel"
                      readOnly={isSubmitting}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +234 703 225 4117"
                      className="mt-2 block min-h-[48px] w-full rounded-lg border border-white/15 bg-[#0A0A0A] px-4 py-3 text-sm text-[#FAFAFA] placeholder:text-[#6B6B6B] transition-colors duration-150 focus:border-[#D4AF37] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
                    />
                  </div>

                  {errorMessage && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-lg border border-red-500/40 bg-red-950/40 px-3.5 py-2.5 text-xs text-red-200"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    aria-disabled={isSubmitting}
                    className={`mt-2 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-6 py-3.5 text-sm font-bold tracking-wide text-[#0A0A0A] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#D4AF37] focus-visible:outline-offset-2 ${
                      isSubmitting
                        ? 'cursor-wait opacity-80'
                        : 'cursor-pointer hover:bg-[#E5C453] active:scale-[0.99]'
                    }`}
                  >
                    <span>{isSubmitting ? 'Submitting...' : 'Send Me The Free Guide'}</span>
                    {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                  </button>
                </form>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 border-t border-white/10 pt-5 text-xs text-[#9E9E9E]">
                <Lock className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Your guide opens immediately on the next step. Zero spam.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Three Key Benefits Cards */}
      <section
        id="benefits"
        className="border-t border-white/10 bg-[#0A0A0A] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.14em] text-[#D4AF37]">
              WHY THIS CHECKLIST MATTERS
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#FAFAFA] sm:text-4xl">
              Three Essentials Every Smart Buyer Verifies First
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article
                  key={benefit.title}
                  className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#141414] p-7 transition-colors duration-150 hover:border-[#D4AF37]/40"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-xs font-medium tabular-nums text-[#8C8C8C]">
                        {benefit.number}
                      </span>
                    </div>

                    <h3 className="mt-6 font-serif text-2xl font-semibold text-[#FAFAFA]">
                      {benefit.title}
                    </h3>

                    <p className="mt-3 text-sm leading-[1.65] text-[#B3B3B3] sm:text-[15px]">
                      {benefit.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Craftsmanship & 7-Point Checklist Preview */}
      <section
        id="inside-guide"
        className="border-t border-white/10 bg-[#0A0A0A] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Craftsmanship & Sneaker Inspection Visuals */}
            <div className="flex flex-col lg:col-span-6">
              <div className="flex h-full flex-col justify-between rounded-xl border border-white/10 bg-[#141414] p-3 sm:p-5">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-[#0A0A0A]">
                    <ResilientImage
                      src={shoeAirF}
                      alt="White mid-top leather sneakers showing clean toe perforations, strap, and midsole stitching"
                      width={591}
                      height={574}
                      className="h-full w-full object-cover object-center"
                      aspectClassName="aspect-square"
                      fallbackLabel="Clean Upper Finish"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />
                    <p className="absolute right-3 bottom-2.5 left-3 text-xs font-medium text-[#FAFAFA]">
                      Toe Box &amp; Strap Alignment
                    </p>
                  </div>

                  <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-[#0A0A0A]">
                    <ResilientImage
                      src={shoeNb}
                      alt="Red and grey suede and mesh sneakers showing multi-panel layering and sculpted sole"
                      width={640}
                      height={571}
                      className="h-full w-full object-cover object-center"
                      aspectClassName="aspect-square"
                      fallbackLabel="Panel & Sole Detail"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />
                    <p className="absolute right-3 bottom-2.5 left-3 text-xs font-medium text-[#FAFAFA]">
                      Mesh, Suede &amp; Sole Grip
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-white/10 pt-5">
                  <p className="text-xs font-semibold tracking-[0.12em] text-[#D4AF37]">
                    CRAFT &amp; INSPECTION STANDARD
                  </p>
                  <p className="mt-1.5 font-serif text-xl font-medium text-[#FAFAFA] sm:text-2xl">
                    Verify leather grain, panel stitching, and real multi-angle photos before paying.
                  </p>
                </div>
              </div>
            </div>

            {/* 7 Things Inside the Guide */}
            <div className="flex flex-col justify-between lg:col-span-6">
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] text-[#D4AF37]">
                  INSIDE THE PDF GUIDE
                </p>
                <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#FAFAFA] sm:text-4xl">
                  7 Things to Check Before Buying Footwear Online
                </h2>

                <ol className="mt-6 divide-y divide-white/10 border-y border-white/10">
                  {CHECKLIST_PREVIEW.map((item) => (
                    <li key={item.num} className="flex items-start gap-4 py-3.5">
                      <span className="mt-0.5 font-mono text-xs font-semibold tabular-nums text-[#D4AF37]">
                        {item.num}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#FAFAFA]">{item.title}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-[#A3A3A3]">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-8">
                <a
                  href="#register-card"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById('register-card')
                      ?.scrollIntoView({ behavior: 'smooth' });
                    window.setTimeout(() => nameInputRef.current?.focus(), 350);
                  }}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-6 py-3 text-sm font-bold text-[#0A0A0A] transition-colors duration-150 hover:bg-[#E5C453] focus-visible:outline-2 focus-visible:outline-[#D4AF37] focus-visible:outline-offset-2"
                >
                  <span>Send Me The Free Guide</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Footwear Styles Covered in This Guide */}
      <section
        id="styles-covered"
        className="border-t border-white/10 bg-[#0A0A0A] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#D4AF37]">
                EVERY SILHOUETTE COVERED
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#FAFAFA] sm:text-4xl">
                Heels, Slip-On Mules &amp; Everyday Sneakers
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#A3A3A3]">
              Apply the exact same sizing, material, and stitching checks across every category before placing your order.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6">
            <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-[#141414] lg:col-span-3 lg:aspect-[5/4]">
              <ResilientImage
                src={shoeHll}
                alt="Glossy black patent pointed-toe kitten heels"
                width={640}
                height={640}
                loading="lazy"
                className="h-full w-full object-cover object-center"
                aspectClassName="aspect-square lg:aspect-[5/4]"
                fallbackLabel="Black Patent Heels"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/85 via-transparent to-transparent" />
              <div className="absolute right-3 bottom-3 left-3 sm:right-4 sm:bottom-4 sm:left-4">
                <p className="text-xs font-semibold text-[#FAFAFA] sm:text-sm">
                  Pointed-Toe Heels
                </p>
                <p className="mt-0.5 text-[11px] text-[#D4AF37] sm:text-xs">
                  Check toe-box taper &amp; heel pitch
                </p>
              </div>
            </div>

            <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-[#141414] lg:col-span-3 lg:aspect-[5/4]">
              <ResilientImage
                src={shoeHi}
                alt="Black sculptural block-heel mules with silver metallic ring accent"
                width={640}
                height={640}
                loading="lazy"
                className="h-full w-full object-cover object-center"
                aspectClassName="aspect-square lg:aspect-[5/4]"
                fallbackLabel="Sculptural Block Mules"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/85 via-transparent to-transparent" />
              <div className="absolute right-3 bottom-3 left-3 sm:right-4 sm:bottom-4 sm:left-4">
                <p className="text-xs font-semibold text-[#FAFAFA] sm:text-sm">
                  Sculptural Block Mules
                </p>
                <p className="mt-0.5 text-[11px] text-[#D4AF37] sm:text-xs">
                  Verify heel stability &amp; hardware finish
                </p>
              </div>
            </div>

            <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-[#141414] lg:col-span-2">
              <ResilientImage
                src={shoeAd}
                alt="Cream and black retro three-stripe leather sneakers"
                width={640}
                height={574}
                loading="lazy"
                className="h-full w-full object-cover object-center"
                aspectClassName="aspect-square"
                fallbackLabel="Classic Court Sneakers"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/85 via-transparent to-transparent" />
              <div className="absolute right-3 bottom-3 left-3">
                <p className="text-xs font-semibold text-[#FAFAFA]">
                  Classic Court Sneakers
                </p>
              </div>
            </div>

            <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-[#141414] lg:col-span-2">
              <ResilientImage
                src={shoeCrocs}
                alt="Matte black sculpted foam clogs with ventilated upper and heel strap"
                width={640}
                height={640}
                loading="lazy"
                className="h-full w-full object-cover object-center"
                aspectClassName="aspect-square"
                fallbackLabel="Everyday Comfort Clogs"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/85 via-transparent to-transparent" />
              <div className="absolute right-3 bottom-3 left-3">
                <p className="text-xs font-semibold text-[#FAFAFA]">
                  Everyday Comfort Clogs
                </p>
              </div>
            </div>

            <div className="col-span-2 relative aspect-[2/1] overflow-hidden rounded-xl border border-white/10 bg-[#141414] lg:col-span-2 lg:aspect-square">
              <ResilientImage
                src={shoePpink}
                alt="Blush pink platform sneakers with gum sole and gold heel detail"
                width={640}
                height={640}
                loading="lazy"
                className="h-full w-full object-cover object-center"
                aspectClassName="aspect-[2/1] lg:aspect-square"
                fallbackLabel="Platform Lifestyle Sneakers"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/85 via-transparent to-transparent" />
              <div className="absolute right-3 bottom-3 left-3">
                <p className="text-xs font-semibold text-[#FAFAFA]">
                  Platform Lifestyle Sneakers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Final Conversion CTA Banner */}
      <section className="border-t border-white/10 bg-[#111111] py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.14em] text-[#D4AF37]">
            GIDDY MINE COLLECTIONS
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#FAFAFA] sm:text-4xl">
            Ready to Order Your Next Pair With Complete Confidence?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#B8B8B8]">
            Claim your free copy of <span className="font-medium text-[#FAFAFA]">The Smart Footwear Buyer&apos;s Guide</span> now and keep the 7-point checklist handy before every purchase.
          </p>
          <div className="mt-8">
            <a
              href="#register-card"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById('register-card')
                  ?.scrollIntoView({ behavior: 'smooth' });
                window.setTimeout(() => nameInputRef.current?.focus(), 350);
              }}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-8 py-3.5 text-sm font-bold tracking-wide text-[#0A0A0A] transition-colors duration-150 hover:bg-[#E5C453] focus-visible:outline-2 focus-visible:outline-[#D4AF37] focus-visible:outline-offset-2"
            >
              <span>Get My Free Buyer&apos;s Guide</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
