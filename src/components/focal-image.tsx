import Image from "next/image";

/**
 * Fills its (positioned, overflow-hidden) parent with `src`, zoomed in and
 * shifted so the focal point lands in the centre at every size.
 * `focus` is the point to keep centred, as fractions of the image (0–1).
 */
export function FocalImage({
  src,
  alt,
  width,
  height,
  focus: [fx, fy],
  zoom,
  sizes,
  priority,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  focus: [number, number];
  zoom: number;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const ratio = height / width;
  // Square parent: the image is `zoom` parent-widths wide, so the focal point
  // sits at (fx·zoom, fy·zoom·ratio) parent-widths; offset it to (0.5, 0.5).
  // Clamped so the image always covers the parent, even for edge focal points.
  const clamp = (v: number, min: number) => Math.min(0, Math.max(min, v));
  const left = clamp(0.5 - fx * zoom, 1 - zoom) * 100;
  const top = clamp(0.5 - fy * zoom * ratio, 1 - zoom * ratio) * 100;

  return (
    <span
      className={`absolute ${className ?? ""}`}
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: `${zoom * 100}%`,
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        fetchPriority={priority ? "high" : undefined}
        className="object-cover"
      />
    </span>
  );
}
