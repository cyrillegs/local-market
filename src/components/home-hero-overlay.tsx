"use client";

import Link from "next/link";

import { Button, buttonStyles } from "@/components/ui/button";
import { FilterChip } from "@/components/ui/filter-chip";
import type { CategoryConfig, City } from "@/lib/types";

export function HomeHeroOverlay({
  categories,
  selectedCategorySlug,
  onSelectCategory,
  cityQuery,
  onCityQueryChange,
  onUseMyLocation,
  isLocating,
  matchingCities,
  onSelectCity,
  cities,
  statusMessage,
  explorerHref,
  selectedCategoryLabel,
}: {
  categories: CategoryConfig[];
  selectedCategorySlug: string;
  onSelectCategory: (slug: string) => void;
  cityQuery: string;
  onCityQueryChange: (value: string) => void;
  onUseMyLocation: () => void;
  isLocating: boolean;
  matchingCities: City[];
  onSelectCity: (city: City) => void;
  cities: City[];
  statusMessage: string;
  explorerHref?: string;
  selectedCategoryLabel: string;
}) {
  return (
    <div className="pointer-events-auto w-full rounded-[24px] border border-[#d9c7a8]/40 bg-[linear-gradient(145deg,rgba(255,249,240,0.98),rgba(247,238,223,0.95))] p-4 text-[#101923] shadow-[0_20px_48px_rgba(16,25,35,0.12)] sm:p-5">
      <div className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)] xl:items-start">
        <div>
          <div className="flex flex-wrap gap-1.5">
            <span className="inline-flex items-center rounded-full border border-[#ddc69d] bg-[#fff8ec] px-3 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.24em] text-[#8b6332]">
              Map-first prototype
            </span>
            <span className="inline-flex items-center rounded-full border border-[#c8d6cf] bg-[#edf3f0] px-3 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.22em] text-[#27453b]">
              Local routes
            </span>
          </div>

          <div className="mt-3 space-y-2">
            <h1 className="max-w-sm font-serif text-[1.85rem] leading-[0.96] text-[#13212c] sm:text-[2.2rem]">
              Explore the local market around one city, not the whole country at once.
            </h1>
            <p className="max-w-sm text-sm leading-6 text-[#5a605f]">
              Start from the map, narrow into a city and nearby villages, then move into a
              shareable category page and business profile.
            </p>
          </div>

          <div className="mt-3 rounded-[18px] border border-[#e4d4b8] bg-white/70 px-3.5 py-3">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#8c7a5e]">
              Current status
            </p>
            <p className="mt-1.5 text-sm leading-6 text-[#4f5559]">{statusMessage}</p>
          </div>

          {explorerHref ? (
            <Link
              className={buttonStyles({
                className: "mt-3 w-full sm:w-auto",
                size: "sm",
                variant: "secondary",
              })}
              href={explorerHref}
            >
              Open {selectedCategoryLabel.toLowerCase()} explorer
            </Link>
          ) : null}
        </div>

        <div className="space-y-3">
          <div className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_auto]">
            <input
              className="min-h-10 w-full rounded-[18px] border border-[#dbc7a3] bg-white px-4 text-sm text-[#101923] outline-none transition placeholder:text-[#8f8678] focus:border-[#b6935e] focus:ring-4 focus:ring-[#b6935e]/10"
              onChange={(event) => onCityQueryChange(event.target.value)}
              placeholder="Type a Slovak city or nearby village..."
              value={cityQuery}
            />
            <Button onClick={onUseMyLocation} size="sm" variant="primary">
              {isLocating ? "Locating..." : "Use my location"}
            </Button>
          </div>

          {cityQuery.trim().length > 0 ? (
            <div className="grid gap-2 sm:grid-cols-2">
              {matchingCities.slice(0, 4).map((city) => (
                <button
                  className="rounded-[16px] border border-[#e4d4b8] bg-white px-3.5 py-2 text-left transition hover:border-[#b6935e] hover:bg-[#fbf1df]"
                  key={city.slug}
                  onClick={() => onSelectCity(city)}
                  type="button"
                >
                  <span className="block font-semibold text-[#101923]">{city.name}</span>
                  <span className="block text-xs uppercase tracking-[0.18em] text-[#7f786c]">
                    {city.region}
                  </span>
                </button>
              ))}
            </div>
          ) : null}

          <div className="rounded-[20px] border border-[#e4d4b8] bg-white/72 p-3">
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#8c7a5e]">
                Categories
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <FilterChip
                    active={selectedCategorySlug === category.slug}
                    className="min-h-9 px-3.5 py-1.5 text-[0.76rem]"
                    key={category.slug}
                    onClick={() => onSelectCategory(category.slug)}
                  >
                    <span>{category.icon}</span>
                    {category.shortLabel}
                  </FilterChip>
                ))}
              </div>
            </div>

            <div className="mt-3 border-t border-[#eadcc4] pt-3">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#8c7a5e]">
                Popular cities
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {cities.map((city) => (
                  <button
                    className="rounded-full border border-[#ddc8a2] bg-[#fff7eb] px-3 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-[#394550] transition hover:border-[#b6935e]"
                    key={city.slug}
                    onClick={() => onSelectCity(city)}
                    type="button"
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
