import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function FilterChip({
  active,
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
}) {
  return (
    <button
      className={cn(
        "inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 text-[0.82rem] font-semibold tracking-[0.08em] transition",
        active
          ? "border-[#b6935e] bg-[#101923] text-[#f8f1e6] shadow-[0_12px_30px_rgba(16,25,35,0.18)]"
          : "border-[#d8c6a7] bg-white/76 text-[#24303b] hover:border-[#b6935e] hover:bg-[#fff8ee]",
        className,
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
