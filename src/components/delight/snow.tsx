"use client";

import { useEffect, useRef, useState } from "react";
import { useBlizzardAt } from "@/stores/achievements";
import { useSnow, useSnowOn } from "@/stores/snow";

const BLIZZARD_MS = 8000;

type Flake = { x: number; y: number; r: number; speed: number; drift: number };

/** Gentle snow in the festive theme unless switched off; a short blizzard after the Konami code. */
export function Snow() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const blizzardAt = useBlizzardAt();
  const snowOn = useSnowOn();
  const [festive, setFestive] = useState(false);
  const [blizzard, setBlizzard] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const check = () =>
      setFestive(html.getAttribute("data-theme") === "festive");
    check();
    const observer = new MutationObserver(check);
    observer.observe(html, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(motion.matches);
    const onMotion = () => setReduced(motion.matches);
    motion.addEventListener("change", onMotion);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  useEffect(() => {
    if (!blizzardAt) return;
    setBlizzard(true);
    const timer = setTimeout(() => setBlizzard(false), BLIZZARD_MS);
    return () => clearTimeout(timer);
  }, [blizzardAt]);

  useEffect(() => {
    useSnow.persist.rehydrate();
  }, []);

  // The Konami blizzard ignores the off switch: it's an explicit request.
  const active = !reduced && ((festive && snowOn) || blizzard);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!active || !el || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    let flakes: Flake[] = [];
    const resize = () => {
      el.width = innerWidth * dpr;
      el.height = innerHeight * dpr;
      flakes = Array.from({ length: blizzard ? 320 : 70 }, () => ({
        x: Math.random() * el.width,
        y: Math.random() * el.height,
        r: (Math.random() * 2.2 + 0.8) * dpr,
        speed: (Math.random() * 0.6 + 0.4) * dpr * (blizzard ? 3 : 1),
        drift: Math.random() * Math.PI * 2,
      }));
    };
    resize();
    let frame = 0;
    const tick = () => {
      ctx.clearRect(0, 0, el.width, el.height);
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.strokeStyle = "rgba(42,27,46,0.12)";
      for (const f of flakes) {
        f.y += f.speed;
        f.drift += 0.01;
        f.x += Math.sin(f.drift) * 0.4 * dpr;
        if (f.y > el.height) {
          f.y = -4;
          f.x = Math.random() * el.width;
        }
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      frame = requestAnimationFrame(tick);
    };
    tick();
    addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("resize", resize);
      ctx.clearRect(0, 0, el.width, el.height);
    };
  }, [active, blizzard]);

  return (
    <div aria-hidden="true" className="print:hidden">
      <canvas
        ref={canvas}
        data-snow={active ? "on" : "off"}
        className="pointer-events-none fixed inset-0 z-40 h-dvh w-screen"
      />
    </div>
  );
}
