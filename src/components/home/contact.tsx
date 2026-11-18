import { Coffee } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { contact } from "@/content/home";
import { button, container } from "../ui/styles";

export function Contact({ copy }: { copy: Dictionary["contact"] }) {
  return (
    <section aria-labelledby="contact-h" className={`${container} py-16`}>
      <div className="flex flex-col items-center gap-6 rounded-[32px] bg-primary-soft px-6 py-16 text-center">
        <Coffee aria-hidden className="size-12 text-primary festive:hidden" />
        <CocoaMug />
        <h2
          id="contact-h"
          className="font-display text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-[-1px]"
        >
          <span className="festive:hidden">{copy.title}</span>
          <span className="hidden festive:inline">{copy.festiveTitle}</span>
        </h2>
        <p className="max-w-[52ch] text-xl text-muted">
          <span className="festive:hidden">{copy.body}</span>
          <span className="hidden festive:inline">{copy.festiveBody}</span>
        </p>
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

function CocoaMug() {
  return (
    <svg
      viewBox="0 0 72 72"
      aria-hidden="true"
      className="hidden size-[72px] text-primary festive:block"
    >
      <path
        d="M26 8c-3 4 3 6 0 10M36 6c-3 4 3 6 0 10M46 8c-3 4 3 6 0 10"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="14" y="24" width="38" height="36" rx="10" fill="currentColor" />
      <path
        d="M52 32h4a8 8 0 0 1 0 16h-4"
        stroke="currentColor"
        strokeWidth="5"
        fill="none"
      />
      <rect x="18" y="20" width="9" height="9" rx="3" fill="#fff" />
      <rect x="29" y="18" width="9" height="9" rx="3" fill="#fff" />
      <rect x="40" y="21" width="9" height="9" rx="3" fill="#fff" />
      <path d="M14 40h38" stroke="#fff" strokeWidth="3" strokeDasharray="4 4" />
    </svg>
  );
}
