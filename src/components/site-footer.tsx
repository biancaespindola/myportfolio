import type { Dictionary } from "@/app/[lang]/dictionaries";
import { container } from "./ui/styles";

export function SiteFooter({ dict }: { dict: Dictionary }) {
  return (
    <footer className={`${container} mt-24 print:hidden`}>
      <div className="flex flex-wrap justify-between gap-4 border-t border-line py-8 pb-12 text-muted">
        <p>
          <span className="festive:hidden">{dict.footer.built}</span>
          <span className="hidden festive:inline">
            {dict.footer.festiveBuilt}
          </span>{" "}
          · © 2026 Bianca Espindola
        </p>
        <p aria-hidden className="font-pixel text-sm">
          ↑ ↑ ↓ ↓ ← → ← → B A
        </p>
      </div>
    </footer>
  );
}
