import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { getBusinessHref, getCategoryBySlug } from "@/lib/data";
import type { Business } from "@/lib/types";
import { cn, compactUrl, formatDistance, formatTier } from "@/lib/utils";

export function BusinessCard({
  business,
  distanceKm,
  className,
}: {
  business: Business;
  distanceKm?: number;
  className?: string;
}) {
  const category = getCategoryBySlug(business.category);

  if (!category) {
    return null;
  }

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[32px] border border-[rgba(20,26,33,0.08)] bg-[linear-gradient(180deg,rgba(255,252,247,0.98),rgba(248,241,230,0.94))] p-6 shadow-[0_22px_60px_rgba(16,25,35,0.08)] transition hover:-translate-y-1 hover:shadow-[0_34px_100px_rgba(16,25,35,0.14)]",
        className,
      )}
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#d7bc8f] to-transparent" />
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge tone="brand">{category.shortLabel}</Badge>
            <Badge tone={business.tier === "featured" ? "warm" : "neutral"}>
              {formatTier(business.tier)}
            </Badge>
          </div>
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.26em] text-[#8a806f]">
              {business.city} • {business.region}
            </p>
            <h3 className="mt-3 font-serif text-[2rem] leading-none text-[#101923]">
              {business.name}
            </h3>
          </div>
        </div>
        <span
          aria-hidden
          className="flex h-14 w-14 items-center justify-center rounded-[22px] border border-white/70 text-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
          style={{
            background: `linear-gradient(145deg, ${category.accentColor}, rgba(255,255,255,0.96))`,
            color: category.pinColor,
          }}
        >
          {category.icon}
        </span>
      </div>

      <p className="mt-5 text-sm leading-7 text-[#5d6670]">
        {business.shortDescription}
      </p>

      <dl className="mt-6 grid gap-3 rounded-[26px] border border-[#e4d7c2] bg-[#fff8ee] p-4 text-sm text-[#36424d]">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-[#8d8474]">Address</dt>
          <dd className="text-right">{business.address}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-[#8d8474]">Phone</dt>
          <dd>{business.phone}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-[#8d8474]">Website</dt>
          <dd>
            {business.websiteUrl ? compactUrl(business.websiteUrl) : "Upsell spot"}
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap gap-2">
        {business.displayConfig.badges.map((badge) => (
          <span
            className="rounded-full border border-[#e2d4bc] bg-[#f7efe1] px-3 py-1 text-[0.72rem] font-semibold text-[#675f52]"
            key={badge}
          >
            {badge}
          </span>
        ))}
        {distanceKm !== undefined ? (
          <span className="rounded-full border border-[rgba(23,57,49,0.14)] bg-[#e6f0ec] px-3 py-1 text-[0.72rem] font-semibold text-[#173931]">
            {formatDistance(distanceKm)} away
          </span>
        ) : null}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <div className="text-[0.65rem] uppercase tracking-[0.24em] text-[#908575]">
          {business.hasWebsite ? "Website-ready profile" : "Free profile with upgrade hook"}
        </div>
        <Link
          className={buttonStyles({ variant: "secondary", size: "sm" })}
          href={getBusinessHref(business)}
        >
          Open profile
        </Link>
      </div>
    </article>
  );
}
