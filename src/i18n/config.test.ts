import { describe, expect, it } from "vitest";
import { negotiateLocale } from "./config";

describe("negotiateLocale", () => {
  it.each([
    [null, "en"],
    ["", "en"],
    ["pt-BR,pt;q=0.9,en;q=0.8", "pt"],
    ["de-AT", "de"],
    ["fr-FR,fr;q=0.9,it;q=0.7,en;q=0.5", "it"],
    ["en;q=0.2,de;q=0.9", "de"],
    ["ja,zh", "en"],
  ])("%s → %s", (header, expected) => {
    expect(negotiateLocale(header)).toBe(expected);
  });
});
