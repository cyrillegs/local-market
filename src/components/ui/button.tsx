import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center rounded-full border text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6935e]",
    size === "md" ? "min-h-12 px-6 py-3" : "min-h-10 px-4 py-2.5",
    variant === "primary" &&
      "border-[#b6935e] bg-[#101923] text-[#f8f1e6] shadow-[0_18px_46px_rgba(16,25,35,0.22)] hover:border-[#cfb587] hover:bg-[#173931]",
    variant === "secondary" &&
      "border-[#d6bf97] bg-[#fff7ea] text-[#101923] shadow-[0_10px_26px_rgba(16,25,35,0.08)] hover:border-[#b6935e] hover:bg-[#f7ebd7]",
    variant === "ghost" &&
      "border-white/15 bg-white/8 text-[#101923] hover:bg-white/72",
    className,
  );
}

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonStyles({ variant, size, className })}
      type="button"
      {...props}
    />
  );
}
