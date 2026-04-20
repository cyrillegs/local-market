import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { buttonStyles } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="pb-20">
      <SiteHeader />
      <main className="mx-auto mt-10 w-full max-w-3xl px-4 text-center sm:px-6">
        <div className="panel-surface rounded-[36px] p-10">
          <p className="text-xs uppercase tracking-[0.24em] text-[#857e71]">404</p>
          <h1 className="mt-4 font-serif text-5xl text-[#17352b]">
            This route is outside the seeded market map.
          </h1>
          <p className="mt-4 text-base leading-8 text-[#53645b]">
            The prototype only includes a curated Slovakia dataset, so this path did
            not resolve to one of the demo categories, cities, or business profiles.
          </p>
          <Link className={buttonStyles({ className: "mt-8", variant: "primary" })} href="/">
            Return to the homepage
          </Link>
        </div>
      </main>
    </div>
  );
}
