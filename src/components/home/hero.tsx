import { Coffee, Gamepad2, Globe, MapPin, Trophy } from "lucide-react";
import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/i18n/config";
import { FocalImage } from "../focal-image";
import { button, container } from "../ui/styles";

export function Hero({
  locale,
  hero,
}: {
  locale: Locale;
  hero: Dictionary["hero"];
}) {
  const meta = [
    [MapPin, hero.location],
    [Globe, hero.languages],
    [Coffee, hero.open],
  ] as const;

  return (
    <section
      className={`${container} grid items-center gap-16 pt-8 pb-16 lg:grid-cols-[1.2fr_1fr]`}
    >
      <div>
        <p className="mb-6 inline-block rounded-full bg-accent-soft px-3 py-2 font-pixel text-sm uppercase text-accent">
          <span className="festive:hidden">{hero.greeting}</span>
          <span className="hidden festive:inline">{hero.festiveGreeting}</span>
        </p>
        <h1 className="max-w-[16ch] font-display text-[clamp(44px,6vw,72px)] leading-[1.05] tracking-[-1.5px]">
          {hero.title}
        </h1>
        <p className="mt-6 max-w-[46ch] text-xl text-muted">{hero.lead}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#case-studies" className={button.primary}>
            {hero.ctaWork}
          </a>
          <Link href={`/${locale}/cv`} className={button.secondary}>
            {hero.ctaCv}
          </Link>
        </div>
        <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-bold text-muted">
          {meta.map(([Icon, label]) => (
            <li key={label} className="flex items-center gap-1.5">
              <Icon aria-hidden className="size-[18px]" />
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto aspect-square w-full max-w-[440px]">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary" />
        <div className="absolute inset-[22px] overflow-hidden rounded-full bg-primary-soft">
          <FocalImage
            src="/images/hero-photo.jpg"
            alt={hero.photoAlt}
            width={1500}
            height={2000}
            focus={[0.67, 0.41]}
            zoom={2.2}
            sizes="(min-width: 1024px) 900px, 200vw"
            priority
            className="festive:hidden"
          />
          <FocalImage
            src="/images/avatar-christmas.webp"
            alt={hero.festiveAlt}
            width={866}
            height={864}
            focus={[0.53, 0.46]}
            zoom={1.15}
            sizes="(min-width: 1024px) 460px, 100vw"
            className="hidden festive:block"
          />
        </div>
        <p
          aria-hidden
          className="absolute top-6 right-0 flex rotate-[8deg] items-center gap-1.5 rounded-full bg-highlight px-3 py-2 font-pixel text-sm uppercase text-on-highlight"
        >
          <Gamepad2 className="size-[18px]" />
          {hero.sticker}
        </p>
        <div
          aria-hidden
          className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-2xl bg-toast px-4 py-3 text-toast-text shadow-[0_12px_32px_rgb(42_27_46/0.3)]"
        >
          <span className="grid size-10 place-items-center rounded-lg bg-highlight text-on-highlight">
            <Trophy className="size-[22px]" />
          </span>
          <span>
            <span className="block font-pixel text-xs uppercase text-toast-accent">
              {hero.toastKicker}
            </span>
            <span className="font-bold">{hero.toast}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
