import {
  BookOpen,
  Coffee,
  Crown,
  Gamepad2,
  Landmark,
  MapPin,
  TreePine,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { FocalImage } from "@/components/focal-image";
import {
  button,
  card,
  container,
  kicker,
  sectionTitle,
} from "@/components/ui/styles";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "../dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const { about } = await getDictionary();
  return { title: `${about.kicker} · Bianca Espindola`, description: about.p1 };
}

const loveIcons = [BookOpen, Gamepad2, Landmark, Crown, TreePine, Coffee];
// Photos for some fun-fact cards, keyed by card index; framed with FocalImage.
// Crops deliberately keep other people (ski-school kids, market visitors,
// an ad poster) out of frame.
const lovePhotos: Record<
  number,
  {
    src: string;
    alt: "skiAlt" | "christmasAlt" | "mugAlt";
    size: [number, number];
    focus: [number, number];
    zoom: number;
  }
> = {
  1: {
    src: "/images/ski.jpg",
    alt: "skiAlt",
    size: [1500, 2000],
    focus: [0.757, 0.48],
    zoom: 2.05,
  },
  4: {
    src: "/images/christmas-market.jpg",
    alt: "christmasAlt",
    size: [1500, 2000],
    focus: [0.627, 0.3675],
    zoom: 2,
  },
  5: {
    src: "/images/christmas-mug.jpg",
    alt: "mugAlt",
    size: [1126, 2000],
    focus: [0.54, 0.42],
    zoom: 1.15,
  },
};
const languages = [
  { name: "Português", lang: "pt", level: 5 },
  { name: "English", lang: "en", level: 4 },
  { name: "Italiano", lang: "it", level: 1 },
  { name: "Deutsch", lang: "de", level: 1 },
];

export default async function AboutPage() {
  const [locale, dict] = await Promise.all([lang(), getDictionary()]);
  if (!hasLocale(locale)) notFound();
  const { about } = dict;
  const stops = about.map.stops;

  return (
    <main id="main" className={container}>
      <section className="grid items-center gap-16 pt-8 pb-12 lg:grid-cols-[440px_minmax(0,1fr)]">
        <div className="relative mx-auto w-full max-w-[440px]">
          <div className="relative aspect-[4/5] w-full -rotate-2 overflow-hidden rounded-[32px] border-[6px] border-surface bg-surface-alt shadow-[0_16px_40px_rgb(42_27_46/0.15)]">
            <FocalImage
              src="/images/library.jpg"
              alt={about.photoAlt}
              width={1500}
              height={2000}
              focus={[0.46, 0.66]}
              zoom={1.5}
              frame={1.25}
              sizes="(min-width: 1024px) 660px, 135vw"
              priority
            />
          </div>
          <p
            aria-hidden
            className="absolute -top-3 -right-3 rotate-6 rounded-full bg-highlight px-3 py-2 font-pixel text-sm uppercase text-[#2a1b2e] shadow-md"
          >
            {about.stickers[0]}
          </p>
          <p
            aria-hidden
            className="absolute bottom-5 -left-4 flex -rotate-[5deg] items-center gap-1.5 rounded-full bg-accent px-3 py-2 font-pixel text-sm uppercase text-on-primary shadow-md"
          >
            <Coffee className="size-4" />
            {about.stickers[1]}
          </p>
        </div>
        <div className="grid gap-6">
          <p className={`${kicker} text-primary`}>{about.kicker}</p>
          <h1 className="font-display text-[clamp(44px,6vw,72px)] leading-[1.05] tracking-[-1.5px]">
            {about.title}
          </h1>
          <p className="text-xl">{about.p1}</p>
          <p className="text-xl text-muted">{about.p2}</p>
          <div>
            <Link href={`/${locale}/cv`} className={button.secondary}>
              {dict.hero.ctaCv}
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="map-h" className="py-16">
        <p className={`${kicker} text-accent`}>{about.map.kicker}</p>
        <h2 id="map-h" className={`${sectionTitle} mt-2 mb-8`}>
          {about.map.title}
        </h2>
        <ol className="grid items-stretch gap-6 md:grid-cols-3">
          {stops.map((stop, i) => {
            const now = i === stops.length - 1;
            return (
              <li
                key={stop.place}
                className={`${card} flex flex-col gap-2 overflow-hidden ${now ? "border-2 border-primary bg-primary-soft" : ""}`}
              >
                <div className="flex flex-col gap-2 p-6">
                  <p
                    className={`${kicker} flex items-center gap-2 ${now ? "text-primary" : "text-accent"}`}
                  >
                    <MapPin aria-hidden className="size-5" />
                    {stop.years}
                  </p>
                  <h3 className="text-[22px] font-bold">{stop.place}</h3>
                  <p className="text-muted">{stop.what}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section aria-labelledby="loves-h" className="py-16">
        <p className={`${kicker} text-primary`}>{about.loves.kicker}</p>
        <h2 id="loves-h" className={`${sectionTitle} mt-2 mb-8`}>
          {about.loves.title}
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {about.loves.items.map((item, i) => {
            const Icon = loveIcons[i];
            return (
              <li
                key={item.title}
                className={`${card} grid content-start gap-2 overflow-hidden p-6`}
              >
                {lovePhotos[i] && (
                  <div className="relative -mx-6 -mt-6 mb-2 aspect-square overflow-hidden bg-surface-alt">
                    <FocalImage
                      src={lovePhotos[i].src}
                      alt={about[lovePhotos[i].alt]}
                      width={lovePhotos[i].size[0]}
                      height={lovePhotos[i].size[1]}
                      focus={lovePhotos[i].focus}
                      zoom={lovePhotos[i].zoom}
                      sizes="(min-width: 1024px) 520px, 200vw"
                    />
                  </div>
                )}
                <Icon aria-hidden className="size-8 text-primary" />
                <h3 className="text-[22px] font-bold leading-tight">
                  {item.title}
                </h3>
                <p className="text-muted">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="lang-h" className="py-16">
        <p className={`${kicker} text-accent`}>{about.languages.kicker}</p>
        <h2 id="lang-h" className={`${sectionTitle} mt-2 mb-8`}>
          {about.languages.title}
        </h2>
        <ul className={`${card} grid gap-5 p-6 sm:p-8`}>
          {languages.map((l, i) => (
            <li
              key={l.lang}
              className="grid items-center gap-2 sm:grid-cols-[220px_auto_minmax(0,1fr)] sm:gap-6"
            >
              <span lang={l.lang} className="text-[22px] font-bold">
                {l.name}
              </span>
              <span
                role="img"
                aria-label={`${l.level}/5`}
                className="flex gap-1.5"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    className={`h-3 w-12 rounded-full ${n <= l.level ? "bg-primary" : "bg-primary-soft"}`}
                  />
                ))}
              </span>
              <span className="font-pixel text-sm uppercase text-muted">
                {about.languages.levels[i]}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
