import { getDictionary } from "./dictionaries";

export default async function Home() {
  const { hero } = await getDictionary();

  return (
    <main id="main" className="mx-auto max-w-[1200px] px-6 pt-12 pb-24">
      <p className="mb-6 inline-block rounded-full bg-accent-soft px-3 py-2 font-pixel text-sm uppercase text-accent">
        {hero.greeting}
      </p>
      <h1 className="max-w-[16ch] font-display text-[clamp(44px,6vw,72px)] leading-[1.05] tracking-[-1.5px]">
        {hero.title}
      </h1>
      <p className="mt-6 max-w-[46ch] text-xl text-muted">{hero.lead}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="#work"
          className="rounded-full bg-primary px-6 py-3 font-bold text-on-primary shadow-[0_5px_0_var(--color-primary-shade)]"
        >
          {hero.ctaWork}
        </a>
        <a
          href="#cv"
          className="rounded-full border-2 border-ink px-6 py-3 font-bold"
        >
          {hero.ctaCv}
        </a>
      </div>
      <p className="mt-7 font-bold text-muted">{hero.location}</p>
    </main>
  );
}
