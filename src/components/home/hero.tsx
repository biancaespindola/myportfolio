import { Coffee, Gamepad2, Globe, MapPin, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/i18n/config";
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
          {hero.greeting}
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
          <Image
            src="/images/perfil.jpg"
            alt={hero.photoAlt}
            fill
            sizes="(min-width: 1024px) 400px, 80vw"
            fetchPriority="high"
            className="object-cover"
          />
        </div>
        <p
          aria-hidden
          className="absolute top-6 right-0 flex rotate-[8deg] items-center gap-1.5 rounded-full bg-highlight px-3 py-2 font-pixel text-sm uppercase text-[#2a1b2e]"
        >
          <Gamepad2 className="size-[18px]" />
          {hero.sticker}
        </p>
        <div
          aria-hidden
          className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-2xl bg-[#2a1b2e] px-4 py-3 text-[#fff7f2] shadow-[0_12px_32px_rgb(42_27_46/0.3)]"
        >
          <span className="grid size-10 place-items-center rounded-lg bg-highlight text-[#2a1b2e]">
            <Trophy className="size-[22px]" />
          </span>
          <span>
            <span className="block font-pixel text-xs uppercase text-[#ffd166]">
              {hero.toastKicker}
            </span>
            <span className="font-bold">{hero.toast}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
