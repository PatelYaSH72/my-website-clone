"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowUpRight, SparkStar } from "./Icons";

const COPY = {
  headline: "Bring us the messy version of your numbers.",
  body: "A short, no-obligation call to see where you stand, what is coming up, and whether we are the right fit, before any paperwork.",
  cta: "Book a consultation",
  email: "office@cafenilshah.com",
  offices: "BKC, Mumbai and Mayfair, London",
};

const IMAGE_SRC = "/sites/helena-marsh/images/fenil-speaking.webp";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EDGE = "8vw"; // Consistent slant depth: Left is lower, Right is upper
const CLIP_START = "polygon(0% 16vw, 100% 6vw, 100% 100%, 0% 100%)";
const CLIP_END = `polygon(0% ${EDGE}, 100% 0vw, 100% 100%, 0% 100%)`;
const PHOTO_MASK = "linear-gradient(270deg, #000 30%, transparent 92%)";

const stagger = (gap: number, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

const wordV: Variants = {
  hidden: { y: "115%", rotate: 4 },
  show: { y: "0%", rotate: 0, transition: { duration: 0.95, ease: EASE } },
};

const riseV: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const lineV: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.3, ease: EASE } },
};

function MagneticCta({
  href,
  reduce,
  children,
}: {
  href: string;
  reduce: boolean;
  children: ReactNode;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div onMouseMove={onMove} onMouseLeave={onLeave} className="-m-6 inline-block p-6">
      <motion.div style={{ x: sx, y: sy }} className="relative">
        {!reduce && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full border border-[#E6C654]"
            animate={{ scale: [1, 1.35], opacity: [0.7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <Link
          href={href}
          className="group relative flex items-center gap-4 overflow-hidden rounded-full bg-[#E6C654] py-3 pl-8 pr-3 text-base font-medium text-[#080F1E] outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F3EFE6]"
        >
          <span
            aria-hidden
            className="absolute inset-0 translate-y-full bg-[#F3EFE6] transition-transform duration-500 ease-out group-hover:translate-y-0"
          />
          <span className="relative">{children}</span>
          <span className="relative grid h-11 w-11 place-items-center rounded-full bg-[#080F1E] text-[#E6C654] transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </Link>
      </motion.div>
    </div>
  );
}

export function CtaSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Consistently sloped: Left is always lower, Right is always higher
  const clipPath = useTransform(scrollYProgress, [0, 0.45], [CLIP_START, CLIP_END]);

  // Dynamic parallax motion for the background portrait
  const photoY = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16]);

  const words = COPY.headline.split(" ");

  return (
    <motion.section
      ref={ref}
      id="contact"
      style={{
        clipPath: reduce ? CLIP_END : clipPath,
        marginTop: `-${EDGE}`,
        paddingTop: `calc(${EDGE} + 6rem)`,
      }}
      className="relative z-10 overflow-hidden bg-[#080F1E] px-6 pb-24 text-[#F3EFE6] sm:pb-32"
    >
      {/* Background: moving ambient auroras & dynamic animated photo */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Pulsing Royal Blue Aurora */}
        <motion.div
          className="absolute -right-[10%] top-[5%] h-[75vh] w-[75vh] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(28,70,160,.60) 0%, transparent 65%)",
          }}
          animate={reduce ? undefined : { x: [0, -50, 20, 0], y: [0, 35, -25, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Ambient Champagne Gold Spark Flare */}
        <motion.div
          className="absolute right-[20%] top-[25%] h-[50vh] w-[50vh] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(230,198,84,.14) 0%, transparent 70%)",
          }}
          animate={reduce ? undefined : { scale: [1, 1.25, 1], opacity: [0.6, 0.95, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Dynamic Background Image with Scroll Parallax & Organic Motion */}
        <div
          className="absolute inset-y-0 right-0 w-full opacity-45 lg:w-[68%] lg:opacity-85"
          style={{ maskImage: PHOTO_MASK, WebkitMaskImage: PHOTO_MASK }}
        >
          <motion.div
            style={reduce ? undefined : { y: photoY, scale: photoScale }}
            className="absolute inset-x-0 -bottom-[15%] -top-[15%]"
          >
            <motion.div
              className="absolute inset-0"
              animate={
                reduce
                  ? undefined
                  : {
                      x: [0, -16, 0],
                      y: [0, 10, 0],
                    }
              }
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={IMAGE_SRC}
                alt="CA Fenil Shah — Boardroom Keynote"
                fill
                sizes="(min-width: 1024px) 68vw, 100vw"
                className="object-cover object-[65%_20%] filter contrast-[1.08] brightness-[0.98]"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Gradient Overlay for Text Readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,15,30,.70) 0%, rgba(8,15,30,0) 35%, #080F1E 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1360px]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.12)}
        >
          <motion.div variants={riseV} className="mb-6 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#E6C654]">
            <SparkStar className="h-3 w-3 animate-spin-slow text-[#E6C654]" />
            <span>EXECUTIVE MANDATE INQUIRY</span>
          </motion.div>

          <motion.h2
            variants={stagger(0.07)}
            className="max-w-4xl font-serif text-[clamp(44px,7vw,112px)] font-normal leading-[1.04] tracking-tight"
            aria-label={COPY.headline}
          >
            {words.map((w, i) => (
              <span key={i} aria-hidden className="mr-[0.25em] inline-block last:mr-0">
                <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                  <motion.span variants={wordV} className="inline-block">
                    {w}
                  </motion.span>
                </span>
              </span>
            ))}
          </motion.h2>

          <motion.p
            variants={riseV}
            className="mt-8 max-w-xl text-lg font-light leading-relaxed text-[#F3EFE6]/75 sm:text-xl"
          >
            {COPY.body}
          </motion.p>

          <motion.div variants={riseV} className="mt-10">
            <MagneticCta href="/book" reduce={reduce}>
              {COPY.cta}
            </MagneticCta>
          </motion.div>

          <div className="mt-20 sm:mt-28">
            <motion.div
              variants={lineV}
              className="h-px origin-left bg-[#F3EFE6]/20"
            />
            <div className="grid gap-6 pt-6 text-[15px] sm:grid-cols-2">
              <motion.div variants={riseV}>
                <p className="text-[#F3EFE6]/50">Email</p>
                <a
                  href={`mailto:${COPY.email}`}
                  className="mt-1 inline-block underline underline-offset-4 transition-colors hover:text-[#E6C654]"
                >
                  {COPY.email}
                </a>
              </motion.div>
              <motion.div variants={riseV}>
                <p className="text-[#F3EFE6]/50">Offices</p>
                <p className="mt-1">{COPY.offices}</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
