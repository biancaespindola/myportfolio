"use client";

import { Printer } from "lucide-react";
import { button } from "./ui/styles";

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={button.primary}
    >
      <Printer aria-hidden className="size-5" />
      {label}
    </button>
  );
}
