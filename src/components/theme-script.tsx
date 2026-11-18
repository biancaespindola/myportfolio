"use client";

import { useServerInsertedHTML } from "next/navigation";
import { useRef } from "react";

// No saved choice: festive in December, otherwise the visitor's system light/dark setting.
// Also keeps <meta name="theme-color"> (the mobile browser bar) on the current page background;
// the colours mirror --bg-default in globals.css.
const code = `(function(){var h=document.documentElement;try{var t=localStorage.getItem("theme");if(!t)t=new Date().getMonth()===11?"festive":matchMedia("(prefers-color-scheme: dark)").matches?"dark":null;if(t)h.setAttribute("data-theme",t)}catch(e){}if(document.querySelector('meta[name="theme-color"]'))return;var c={light:"#fff7f2",dark:"#1a1220",festive:"#fff8f1"},m=document.createElement("meta");m.name="theme-color";document.head.appendChild(m);function u(){m.content=c[h.getAttribute("data-theme")]||c.light}u();new MutationObserver(u).observe(h,{attributes:true,attributeFilter:["data-theme"]})})()`;

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
