import type { ProfileDraft } from "@/lib/types";

const CHECKPOINTS = [
  { key: "name", label: "Business name and positioning", weight: 10 },
  { key: "phone", label: "Phone number", weight: 10 },
  { key: "address", label: "Street address", weight: 10 },
  { key: "shortDescription", label: "Short description", weight: 15 },
  { key: "websiteUrl", label: "Website link", weight: 20 },
  { key: "email", label: "Email inbox", weight: 10 },
  { key: "servicesText", label: "Services list", weight: 10 },
  { key: "galleryCount", label: "Gallery", weight: 10 },
  { key: "hoursText", label: "Opening hours", weight: 5 },
] as const;

export function calculateProfileCompletion(draft: ProfileDraft) {
  const total = CHECKPOINTS.reduce((sum, checkpoint) => {
    if (checkpoint.key === "galleryCount") {
      return draft.galleryCount > 0 ? sum + checkpoint.weight : sum;
    }

    const value = draft[checkpoint.key];
    return String(value).trim() ? sum + checkpoint.weight : sum;
  }, 0);

  if (!draft.websiteUrl.trim()) {
    return Math.min(total, 92);
  }

  return total;
}

export function buildCompletionChecklist(draft: ProfileDraft) {
  return CHECKPOINTS.map((checkpoint) => {
    const done =
      checkpoint.key === "galleryCount"
        ? draft.galleryCount > 0
        : Boolean(String(draft[checkpoint.key]).trim());

    return {
      label: checkpoint.label,
      done,
      locked:
        checkpoint.key === "websiteUrl"
          ? false
          : !draft.websiteUrl.trim(),
    };
  });
}
