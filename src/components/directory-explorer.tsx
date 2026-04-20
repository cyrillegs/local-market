"use client";

import { startTransition, useEffect, useDeferredValue, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { BusinessCard } from "@/components/business-card";
import { DirectoryMap } from "@/components/directory-map";
import { FilterPanel } from "@/components/filter-panel";
import { Button } from "@/components/ui/button";
import { getCategoryBySlug, haversineDistanceKm } from "@/lib/data";
import type { Business, BusinessType, CategoryConfig, City } from "@/lib/types";

export function DirectoryExplorer({
  businesses,
  categories,
  city,
  routeCategory,
  initialQuery,
  initialRadiusKm,
  initialBusinessType,
  initialSelectedCategories,
}: {
  businesses: Business[];
  categories: CategoryConfig[];
  city: City;
  routeCategory: CategoryConfig;
  initialQuery: string;
  initialRadiusKm: number;
  initialBusinessType: "all" | BusinessType;
  initialSelectedCategories: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [radiusKm, setRadiusKm] = useState(initialRadiusKm);
  const [businessType, setBusinessType] = useState(initialBusinessType);
  const [selectedCategories, setSelectedCategories] = useState(initialSelectedCategories);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const deferredQuery = useDeferredValue(query);

  const localBusinesses = businesses
    .map((business) => ({
      business,
      distanceKm: haversineDistanceKm(city.coordinates, business.coordinates),
    }))
    .filter(({ distanceKm }) => distanceKm <= radiusKm);

  const categoryCounts = categories
    .map((category) => ({
      category,
      count: localBusinesses.filter(({ business }) => business.category === category.slug).length,
    }))
    .filter(({ count }) => count > 0);

  const filteredBusinesses = localBusinesses
    .filter(({ business }) => selectedCategories.includes(business.category))
    .filter(({ business }) => businessType === "all" || business.type === businessType)
    .filter(({ business }) => {
      const category = getCategoryBySlug(business.category);
      const haystack = `${business.name} ${business.shortDescription} ${business.address} ${business.services?.join(" ") ?? ""} ${category?.label ?? ""}`.toLowerCase();
      return haystack.includes(deferredQuery.toLowerCase());
    })
    .sort((left, right) => {
      const leftScore = left.business.tier === "featured" ? 0 : left.business.tier === "extended" ? 1 : 2;
      const rightScore = right.business.tier === "featured" ? 0 : right.business.tier === "extended" ? 1 : 2;
      return leftScore - rightScore || left.distanceKm - right.distanceKm;
    });

  const selectedCategoryNames = selectedCategories
    .map((slug) => getCategoryBySlug(slug)?.shortLabel)
    .filter(Boolean)
    .join(", ");

  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) {
      params.set("q", query.trim());
    }
    if (businessType !== "all") {
      params.set("type", businessType);
    }
    if (radiusKm !== 30) {
      params.set("radius", String(radiusKm));
    }
    if (!(selectedCategories.length === 1 && selectedCategories[0] === routeCategory.slug)) {
      params.set("categories", selectedCategories.join(","));
    }

    const nextQuery = params.toString();
    const currentQuery = searchParams.toString();

    if (nextQuery === currentQuery) {
      return;
    }

    const next = nextQuery ? `${pathname}?${nextQuery}` : pathname;
    startTransition(() => {
      router.replace(next, { scroll: false });
    });
  }, [
    businessType,
    pathname,
    query,
    radiusKm,
    routeCategory.slug,
    router,
    searchParams,
    selectedCategories,
  ]);

  function toggleCategory(slug: string) {
    setSelectedCategories((current) => {
      if (current.includes(slug)) {
        const next = current.filter((item) => item !== slug);
        return next.length > 0 ? next : [routeCategory.slug];
      }

      return [...current, slug];
    });
  }

  return (
    <>
      <section className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="hidden self-start lg:sticky lg:top-6 lg:block">
          <FilterPanel
            businessType={businessType}
            categoryCounts={categoryCounts}
            onBusinessTypeChange={setBusinessType}
            onQueryChange={setQuery}
            onRadiusChange={setRadiusKm}
            onToggleCategory={toggleCategory}
            query={query}
            radiusKm={radiusKm}
            selectedCategories={selectedCategories}
          />
        </aside>

        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(182,147,94,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(23,57,49,0.34),transparent_30%),linear-gradient(145deg,#101923,#173931_58%,#21493d)] p-6 text-[#f8f1e5] shadow-[0_34px_100px_rgba(16,25,35,0.22)]">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-4">
                <span className="inline-flex items-center rounded-full border border-[#b6935e]/30 bg-white/8 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#eadcc2]">
                  Map-first city route
                </span>
                <div>
                  <h1 className="font-serif text-5xl leading-[0.96] text-[#f9f1e4]">
                    {routeCategory.label} in and around {city.name}
                  </h1>
                  <p className="mt-4 max-w-3xl text-base leading-8 text-[#d5c9bb]">
                    {city.spotlight} The map and result list stay linked while filters
                    update in-place, so the user can scan the area visually without
                    losing the local story.
                  </p>
                </div>
              </div>

              <Button
                className="lg:hidden"
                onClick={() => setShowMobileFilters(true)}
                variant="secondary"
              >
                Open filters
              </Button>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <div className="rounded-[24px] border border-white/12 bg-white/8 p-4 backdrop-blur">
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#d8c9b0]">
                  Radius
                </p>
                <p className="mt-2 font-semibold text-[#f9f1e4]">{radiusKm} km</p>
              </div>
              <div className="rounded-[24px] border border-white/12 bg-white/8 p-4 backdrop-blur">
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#d8c9b0]">
                  Active categories
                </p>
                <p className="mt-2 font-semibold text-[#f9f1e4]">{selectedCategoryNames}</p>
              </div>
              <div className="rounded-[24px] border border-white/12 bg-white/8 p-4 backdrop-blur">
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#d8c9b0]">
                  Matching listings
                </p>
                <p className="mt-2 font-semibold text-[#f9f1e4]">
                  {filteredBusinesses.length} local results
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[38px] border border-[#c9b18a]/45 bg-[linear-gradient(145deg,#101923,#173931)] p-[1px] shadow-[0_34px_100px_rgba(16,25,35,0.2)]">
            <div className="rounded-[37px] bg-[#f5efe3] p-3">
              <DirectoryMap
                businesses={filteredBusinesses.map(({ business }) => business)}
                focusCoordinates={city.coordinates}
                heightClassName="h-[480px] sm:h-[620px]"
              />
            </div>
          </div>

          {filteredBusinesses.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredBusinesses.map(({ business, distanceKm }) => (
                <BusinessCard
                  business={business}
                  distanceKm={distanceKm}
                  key={business.id}
                />
              ))}
            </div>
          ) : (
            <div className="panel-surface rounded-[32px] p-8">
              <h2 className="font-serif text-3xl text-[#101923]">No exact matches yet.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5a6a61]">
                The local radius or category mix is simply too tight for the seeded
                dataset. Try widening the radius, clearing the keyword, or adding a
                second category to keep the local story alive.
              </p>
            </div>
          )}
        </div>
      </section>

      {showMobileFilters ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close filters"
            className="absolute inset-0 bg-[#14221a]/45"
            onClick={() => setShowMobileFilters(false)}
            type="button"
          />
          <div className="absolute inset-x-3 bottom-3 top-20 overflow-y-auto rounded-[32px] bg-[#f5efe3] p-2 shadow-[0_32px_80px_rgba(12,20,16,0.28)]">
            <FilterPanel
              businessType={businessType}
              categoryCounts={categoryCounts}
              onBusinessTypeChange={setBusinessType}
              onQueryChange={setQuery}
              onRadiusChange={setRadiusKm}
              onToggleCategory={toggleCategory}
              query={query}
              radiusKm={radiusKm}
              selectedCategories={selectedCategories}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
