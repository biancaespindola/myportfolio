import { Coffee } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { contact } from "@/content/home";
import { button, container } from "../ui/styles";

export function Contact({ copy }: { copy: Dictionary["contact"] }) {
  return (
    <section aria-labelledby="contact-h" className={`${container} py-16`}>
      <div className="flex flex-col items-center gap-6 rounded-[32px] bg-primary-soft px-6 py-16 text-center">
        <Coffee aria-hidden className="size-12 text-primary" />
        <h2
          id="contact-h"
          className="font-display text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-[-1px]"
        >
          {copy.title}
        </h2>
        <p className="max-w-[52ch] text-xl text-muted">{copy.body}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={`mailto:${contact.email}`} className={button.primary}>
            {copy.sayHi}
          </a>
          <a href={contact.linkedin} className={button.secondary}>
            {copy.linkedin}
          </a>
        </div>
      </div>
    </section>
  );
}
