import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { card, container, kicker, tag } from "@/components/ui/styles";
import { projects } from "@/content/experience";
import { hasLocale } from "@/i18n/config";
import { pageMetadata } from "@/i18n/seo";
import { getDictionary } from "../dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([lang(), getDictionary()]);
  if (!hasLocale(locale)) notFound();
  return pageMetadata({
    locale,
    path: "/projects",
    title: `${dict.projects.kicker} · Bianca Espindola`,
    description: dict.projects.lead,
  });
}

export default async function ProjectsPage() {
  const [locale, dict] = await Promise.all([lang(), getDictionary()]);
  if (!hasLocale(locale)) notFound();
  const copy = dict.projects;

  return (
    <main id="main" className={container}>
      <header className="grid gap-6 pt-8 pb-12">
        <p className={`${kicker} text-primary`}>{copy.kicker}</p>
        <h1 className="font-display text-[clamp(44px,6vw,72px)] leading-[1.05] tracking-[-1.5px]">
          {copy.title}
        </h1>
        <p className="max-w-[46ch] text-xl text-muted">{copy.lead}</p>
      </header>

      {projects.map((project) => {
        const text = project.text[locale];
        return (
          <section
            key={project.id}
            aria-labelledby={`${project.id}-h`}
            className="grid gap-6 border-line border-t pt-12 pb-8"
          >
            <div className="grid max-w-[68ch] gap-3">
              <h2
                id={`${project.id}-h`}
                className="font-display text-[32px] leading-tight tracking-[-0.5px]"
              >
                {text.title}
              </h2>
              <p className="text-muted">{text.context}</p>
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <li key={t} className={tag}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {text.story.map((part) => (
                <div key={part.heading} className="grid content-start gap-2">
                  <h3 className="text-xl font-bold">{part.heading}</h3>
                  <p className="text-muted">{part.body}</p>
                </div>
              ))}
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((shot) => (
                <li key={shot.src}>
                  <figure className="grid gap-2">
                    <a
                      href={`/images/${shot.src}`}
                      className={`${card} block p-3 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-primary`}
                    >
                      <Image
                        src={`/images/${shot.src}`}
                        alt={shot.caption[locale]}
                        width={shot.width}
                        height={shot.height}
                        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                        className="aspect-square w-full object-contain"
                      />
                    </a>
                    <figcaption className="text-muted text-sm">
                      {shot.caption[locale]}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
            <p className="text-muted text-sm">{copy.placeholderNote}</p>
          </section>
        );
      })}
    </main>
  );
}
