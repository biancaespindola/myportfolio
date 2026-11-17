"use client";

import { useServerInsertedHTML } from "next/navigation";
import { useRef } from "react";

// December switches to the festive theme unless the visitor picked one.
const code = `(function(){try{var t=localStorage.getItem("theme");if(!t&&new Date().getMonth()===11)t="festive";if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

// Emitted into the server HTML only, so it runs before first paint without React rendering a <script>.
export function ThemeScript() {
  const inserted = useRef(false);
  useServerInsertedHTML(() => {
    if (inserted.current) return null;
    inserted.current = true;
    // biome-ignore lint/security/noDangerouslySetInnerHtml: static string, no user input
    return <script dangerouslySetInnerHTML={{ __html: code }} />;
  });
  return null;
}
