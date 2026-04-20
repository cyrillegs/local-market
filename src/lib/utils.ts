import type { ListingTier } from "@/lib/types";

export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDistance(kilometers: number) {
  if (kilometers < 1) {
    return `${Math.max(250, Math.round(kilometers * 1000 / 50) * 50)} m`;
  }

  if (kilometers >= 10) {
    return `${Math.round(kilometers)} km`;
  }

  return `${kilometers.toFixed(1)} km`;
}

export function formatTier(tier: ListingTier) {
  if (tier === "featured") {
    return "Featured";
  }

  if (tier === "extended") {
    return "Extended";
  }

  return "Free";
}

export function sentenceList(values: string[]) {
  if (values.length <= 1) {
    return values[0] ?? "";
  }

  if (values.length === 2) {
    return `${values[0]} and ${values[1]}`;
  }

  return `${values.slice(0, -1).join(", ")}, and ${values.at(-1)}`;
}

export function compactUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
