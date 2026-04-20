import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { getCategoryBySlug } from "@/lib/data";
import type { Business } from "@/lib/types";
import { compactUrl } from "@/lib/utils";

export function WebsitePreview({ business }: { business: Business }) {
  const category = getCategoryBySlug(business.category);

  if (!category) {
    return null;
  }

  if (!business.hasWebsite) {
    return (
      <div className="flex h-full flex-col justify-between rounded-[28px] bg-[linear-gradient(145deg,#17352b_0%,#0f6c5b_50%,#305d48_100%)] p-6 text-[#f8f4ea]">
        <div className="space-y-4">
          <Badge className="bg-white/12 text-[#f8f4ea]" tone="neutral">
            Upsell zone
          </Badge>
          <div>
            <h3 className="font-serif text-3xl">No website yet.</h3>
            <p className="mt-3 max-w-md text-sm leading-7 text-[#dbe8e0]">
              This profile deliberately sells the next step: a stronger website,
              a better first impression, and a more complete local presence.
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/8 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[#bfd7cd]">
              Suggested pitch
            </p>
            <p className="mt-2 text-lg">
              Your competitors show a real website preview here. Stand out with a
              custom page from 149 EUR.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className={buttonStyles({ variant: "secondary" })} href="/profile-demo">
            Open the owner demo
          </Link>
          <a className={buttonStyles({ variant: "ghost" })} href={`tel:${business.phone}`}>
            Call sales
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-[#d4dced] bg-[#18202d] p-4 text-white shadow-[0_28px_70px_rgba(15,19,34,0.24)]">
      <div className="flex items-center gap-2 px-2 pb-3">
        <span className="h-3 w-3 rounded-full bg-[#ff7a6c]" />
        <span className="h-3 w-3 rounded-full bg-[#ffcf54]" />
        <span className="h-3 w-3 rounded-full bg-[#55d68b]" />
        <div className="ml-3 rounded-full bg-white/8 px-3 py-1 text-xs text-white/70">
          {business.websiteUrl ? compactUrl(business.websiteUrl) : "preview"}
        </div>
      </div>
      <div
        className="rounded-[24px] p-5"
        style={{
          background: `linear-gradient(145deg, ${category.pinColor} 0%, #17212d 90%)`,
        }}
      >
        <p className="text-xs uppercase tracking-[0.24em] text-white/70">
          Website preview
        </p>
        <div className="mt-4 rounded-[22px] bg-white/92 p-5 text-[#15221b]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#6e7268]">
                {category.shortLabel}
              </p>
              <h3 className="mt-2 font-serif text-2xl">{business.name}</h3>
            </div>
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
              style={{ backgroundColor: category.accentColor, color: category.pinColor }}
            >
              {category.icon}
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-[#f7f3e9] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#847d70]">
                Call to action
              </p>
              <p className="mt-2 font-medium">Book or call nearby today</p>
            </div>
            <div className="rounded-2xl bg-[#f7f3e9] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#847d70]">
                Social proof
              </p>
              <p className="mt-2 font-medium">Local trust, fast response, clear offer</p>
            </div>
            <div className="rounded-2xl bg-[#f7f3e9] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#847d70]">
                Conversion block
              </p>
              <p className="mt-2 font-medium">Contact, hours, and direct next step</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
