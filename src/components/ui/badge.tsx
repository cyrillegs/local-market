import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "warm" | "brand";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.24em]",
        tone === "neutral" &&
          "border-[rgba(20,26,33,0.08)] bg-[#f4ecdf] text-[#6e675b]",
        tone === "warm" &&
          "border-[rgba(182,147,94,0.25)] bg-[#f8ecd8] text-[#8c6130]",
        tone === "brand" &&
          "border-[rgba(23,57,49,0.18)] bg-[#e1ede9] text-[#173931]",
        className,
      )}
    >
      {children}
    </span>
  );
}
