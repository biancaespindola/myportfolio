"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/i18n/config";
import { SnowToggle } from "./delight/snow-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { container } from "./ui/styles";

const iconButton =
  "grid size-11 place-items-center rounded-full border-[1.5px] border-line bg-surface";

export function MobileMenu({
  locale,
  links,
  dict,
}: {
  locale: Locale;
  links: readonly (readonly [href: string, label: string])[];
  dict: Pick<Dictionary, "a11y" | "theme" | "snow">;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const close = () => dialog.current?.close();

  // biome-ignore lint/correctness/useExhaustiveDependencies: close after any navigation, including the language links
  useEffect(close, [pathname]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={dict.a11y.menu}
        onClick={() => dialog.current?.showModal()}
        className={iconButton}
      >
        <Menu aria-hidden className="size-5" />
      </button>
      <dialog
        ref={dialog}
        aria-label={dict.a11y.menu}
        className="m-0 size-full max-h-none max-w-none bg-bg text-ink open:animate-[menu-in_.2s_ease-out] backdrop:bg-transparent"
      >
        <div className={`${container} flex min-h-full flex-col py-8`}>
          <div className="flex items-center justify-between">
            <Link href={`/${locale}`}>
              <Logo className="h-11 w-auto" />
            </Link>
            <button
              type="button"
              aria-label={dict.a11y.closeMenu}
              onClick={close}
              className={iconButton}
            >
              <X aria-hidden className="size-5" />
            </button>
          </div>
          <nav aria-label={dict.a11y.main} className="mt-10 grid">
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                aria-current={href === pathname ? "page" : undefined}
                className="border-line border-b py-4 font-display text-[32px] leading-tight aria-[current=page]:text-primary"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-10">
            <LanguageSwitcher current={locale} label={dict.a11y.language} />
            <div className="flex items-center gap-2">
              <SnowToggle label={dict.snow.toggle} />
              <ThemeToggle labels={dict.theme} ariaLabel={dict.a11y.theme} />
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
