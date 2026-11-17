import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const DIR = join(process.cwd(), "public/images");
const GPS = 0x8825;
const MAKE = 0x010f;
const MODEL = 0x0110;

/** Tags in a JPEG's first EXIF IFD (where GPS, Make and Model live). */
function jpegExifTags(buf: Buffer): number[] {
  let i = 2;
  while (i + 4 < buf.length && buf[i] === 0xff) {
    const marker = buf[i + 1];
    const len = buf.readUInt16BE(i + 2);
    if (
      marker === 0xe1 &&
      buf.toString("latin1", i + 4, i + 10) === "Exif\0\0"
    ) {
      const tiff = i + 10;
      const le = buf.toString("latin1", tiff, tiff + 2) === "II";
      const u16 = (o: number) =>
        le ? buf.readUInt16LE(o) : buf.readUInt16BE(o);
      const u32 = (o: number) =>
        le ? buf.readUInt32LE(o) : buf.readUInt32BE(o);
      const ifd = tiff + u32(tiff + 4);
      return Array.from({ length: u16(ifd) }, (_, n) => u16(ifd + 2 + n * 12));
    }
    if (marker === 0xda) break;
    i += 2 + len;
  }
  return [];
}

describe("published images carry no personal metadata", () => {
  for (const file of readdirSync(DIR)) {
    it(file, () => {
      const buf = readFileSync(join(DIR, file));
      expect(buf.toString("latin1")).not.toMatch(/GPSLatitude|GPSLongitude/);
      if (/\.jpe?g$/i.test(file)) {
        const tags = jpegExifTags(buf);
        expect(tags.filter((t) => [GPS, MAKE, MODEL].includes(t))).toEqual([]);
      }
      if (/\.webp$/i.test(file)) {
        expect(buf.includes(Buffer.from("EXIF"))).toBe(false);
      }
    });
  }
});
