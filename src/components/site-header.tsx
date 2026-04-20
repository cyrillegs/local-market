import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header className={cn("mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8", className)}>
      <div className="flex items-center justify-between rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(16,25,35,0.98),rgba(23,57,49,0.94))] px-4 py-3 shadow-[0_22px_64px_rgba(16,25,35,0.24)] backdrop-blur">
        <Link className="flex items-center gap-2.5" href="/">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dbc7a3] bg-[#fff6e7] text-base font-bold text-[#101923] shadow-[0_10px_22px_rgba(0,0,0,0.16)]">
            LM
          </span>
          <div>
            <p className="font-serif text-[1.25rem] font-semibold text-[#f7efe3]">
              Local Market
            </p>
            <p className="text-[0.62rem] uppercase tracking-[0.26em] text-[#d7c5a4]">
              Slovakia prototype
            </p>
          </div>
        </Link>
        <nav className="hidden items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#e6d8bf] md:flex">
          <Link className="transition hover:text-white" href="/">
            Explore
          </Link>
          <Link className="transition hover:text-white" href="/profile-demo">
            Profile demo
          </Link>
        </nav>
        <Link
          className={buttonStyles({ variant: "secondary", size: "sm" })}
          href="/profile-demo"
        >
          Claim a profile
        </Link>
      </div>
    </header>
  );
}
