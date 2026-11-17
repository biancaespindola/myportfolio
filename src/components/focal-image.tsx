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
  frame = 1,
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
  /** Parent height ÷ width (1 = square, 1.25 = 4:5 portrait). */
  frame?: number;
}) {
  const ratio = height / width;
  // In parent-widths the image is `zoom` wide and `zoom·ratio` tall, so the
  // focal point sits at (fx·zoom, fy·zoom·ratio); move it to the parent's
  // centre (0.5, frame/2). `top` is a % of the parent's height, hence ÷ frame.
  // Clamped so the image always covers the parent, even for edge focal points.
  const clamp = (v: number, min: number) => Math.min(0, Math.max(min, v));
  const imageHeight = (zoom * ratio) / frame;
  const left = clamp(0.5 - fx * zoom, 1 - zoom) * 100;
  const top = clamp(0.5 - (fy * zoom * ratio) / frame, 1 - imageHeight) * 100;

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
