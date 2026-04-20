"use client";

import Link from "next/link";
import { startTransition, useEffect, useDeferredValue, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { BusinessCard } from "@/components/business-card";
import { DirectoryMap } from "@/components/directory-map";
import { HomeHeroOverlay } from "@/components/home-hero-overlay";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { findNearestCity, getDirectoryHref, haversineDistanceKm } from "@/lib/data";
import type { Business, CategoryConfig, City, SearchSource } from "@/lib/types";
import { sentenceList } from "@/lib/utils";

export function HomeExplorer({
  businesses,
  categories,
  cities,
  initialCategorySlug,
  initialCitySlug,
}: {
  businesses: Business[];
  categories: CategoryConfig[];
  cities: City[];
  initialCategorySlug?: string;
  initialCitySlug?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(
    initialCategorySlug ?? categories[0]?.slug ?? "elektrikari",
  );
  const [selectedCitySlug, setSelectedCitySlug] = useState(initialCitySlug ?? "");
  const [cityQuery, setCityQuery] = useState(
    initialCitySlug
      ? cities.find((city) => city.slug === initialCitySlug)?.name ?? ""
      : "",
  );
  const [searchSource, setSearchSource] = useState<SearchSource>(
    initialCitySlug ? "deep-link" : "homepage",
  );
  const [isLocating, setIsLocating] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    "Start with a city, then jump straight into what is around that area.",
  );

  const deferredQuery = useDeferredValue(cityQuery);
  const selectedCity = selectedCitySlug
    ? cities.find((city) => city.slug === selectedCitySlug)
    : undefined;
  const selectedCategory =
    categories.find((category) => category.slug === selectedCategorySlug) ?? categories[0];

  const matchingCities = deferredQuery.trim()
    ? cities.filter((city) => {
        const haystack = `${city.name} ${city.region} ${city.nearbyVillages.join(" ")}`.toLowerCase();
        return haystack.includes(deferredQuery.toLowerCase());
      })
    : cities;

  const nearbyBusinesses = selectedCity
    ? businesses
        .map((business) => ({
          business,
          distanceKm: haversineDistanceKm(selectedCity.coordinates, business.coordinates),
        }))
        .filter(({ distanceKm }) => distanceKm <= 45)
        .filter(({ business }) =>
          selectedCategory ? business.category === selectedCategory.slug : true,
        )
        .sort((left, right) => {
          const leftScore = left.business.tier === "featured" ? 0 : left.business.tier === "extended" ? 1 : 2;
          const rightScore = right.business.tier === "featured" ? 0 : right.business.tier === "extended" ? 1 : 2;
          return leftScore - rightScore || left.distanceKm - right.distanceKm;
        })
    : [];

  const highlightBusinesses = selectedCity
    ? nearbyBusinesses.slice(0, 6)
    : businesses
        .filter((business) => business.tier === "featured")
        .slice(0, 6)
        .map((business) => ({ business, distanceKm: 0 }));

  const mapBusinesses = selectedCity
    ? businesses.filter(
        (business) =>
          haversineDistanceKm(selectedCity.coordinates, business.coordinates) <= 60,
      )
    : businesses;

  function handleSelectCity(city: City) {
    setSelectedCitySlug(city.slug);
    setCityQuery(city.name);
    setSearchSource("manual");
    setStatusMessage(`Showing businesses in and around ${city.name}.`);
  }

  function handleGeoSuccess(position: GeolocationPosition) {
    const nearest = findNearestCity([
      position.coords.longitude,
      position.coords.latitude,
    ]);

    if (!nearest) {
      setStatusMessage("We could not match your coordinates to a seeded Slovakia city yet.");
      setIsLocating(false);
      return;
    }

    setSelectedCitySlug(nearest.city.slug);
    setCityQuery(nearest.city.name);
    setSearchSource("geolocation");
    setStatusMessage(
      nearest.distanceKm > 500
        ? `For the prototype, we snapped your location to the nearest seeded Slovakia city: ${nearest.city.name}.`
        : `Showing businesses in and around ${nearest.city.name}.`,
    );
    setIsLocating(false);
  }

  function handleGeoError() {
    setIsLocating(false);
    setStatusMessage("Location access was skipped, so manual city search stays available.");
  }

  useEffect(() => {
    if (!selectedCity) {
      return;
    }

    const params = new URLSearchParams();
    params.set("city", selectedCity.slug);
    params.set("category", selectedCategorySlug);
    const nextQuery = params.toString();

    if (searchParams.toString() === nextQuery) {
      return;
    }

    startTransition(() => {
      router.replace(`${pathname}?${nextQuery}`, { scroll: false });
    });
  }, [pathname, router, searchParams, selectedCategorySlug, selectedCity]);

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-[#c9b18a]/40 bg-[linear-gradient(145deg,#101923,#173931)] p-[1px] shadow-[0_34px_90px_rgba(16,25,35,0.2)]">
          <div className="relative overflow-hidden rounded-[35px] bg-[#f5efe3]">
            <DirectoryMap
              activeBusinessSlug={highlightBusinesses[0]?.business.slug}
              businesses={mapBusinesses}
              focusCoordinates={selectedCity?.coordinates}
              heightClassName="h-[440px] sm:h-[480px] xl:h-[520px]"
            />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(16,25,35,0.1)_0%,rgba(16,25,35,0.24)_100%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(182,147,94,0.22),transparent_24%),radial-gradient(circle_at_80%_16%,rgba(255,255,255,0.18),transparent_18%)]"
            />

            <div className="pointer-events-none absolute inset-x-4 top-4 z-[650] flex flex-wrap items-center justify-between gap-3 sm:inset-x-5 sm:top-5">
              <span className="inline-flex items-center rounded-full border border-white/12 bg-[#101923]/72 px-3.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#eadcc2] backdrop-blur">
                Slovakia live map hero
              </span>
              <span className="inline-flex items-center rounded-full border border-white/12 bg-white/72 px-3.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#42535d] backdrop-blur">
                {selectedCity ? `${selectedCity.name} focus` : "Country overview"}
              </span>
            </div>

          </div>

          <div className="border-t border-[#c9b18a]/20 bg-[radial-gradient(circle_at_top_left,rgba(182,147,94,0.12),transparent_24%),linear-gradient(145deg,#12202a,#16342d_60%,#18372f)] px-4 py-4 sm:px-5 sm:py-5">
            <div>
              <HomeHeroOverlay
                categories={categories}
                cities={cities}
                cityQuery={cityQuery}
                explorerHref={
                  selectedCity
                    ? getDirectoryHref(selectedCategorySlug, selectedCity)
                    : undefined
                }
                isLocating={isLocating}
                matchingCities={matchingCities}
                onCityQueryChange={setCityQuery}
                onSelectCategory={setSelectedCategorySlug}
                onSelectCity={handleSelectCity}
                onUseMyLocation={() => {
                  if (!("geolocation" in navigator)) {
                    setStatusMessage("Geolocation is not available here, so use the city search instead.");
                    return;
                  }

                  setIsLocating(true);
                  navigator.geolocation.getCurrentPosition(
                    handleGeoSuccess,
                    handleGeoError,
                    {
                      enableHighAccuracy: true,
                      timeout: 9000,
                    },
                  );
                }}
                selectedCategoryLabel={selectedCategory.label}
                selectedCategorySlug={selectedCategorySlug}
                statusMessage={statusMessage}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 xl:grid-cols-[310px_minmax(0,1fr)]">
          <aside className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(182,147,94,0.18),transparent_24%),linear-gradient(145deg,#101923,#173931_58%,#1d4137)] p-6 text-[#f7efe3] shadow-[0_28px_84px_rgba(16,25,35,0.2)]">
            <Badge className="border-white/10 bg-white/10 text-[#f7efe3]" tone="neutral">
              {selectedCity ? `${selectedCity.name} selected` : "Pick a city first"}
            </Badge>
            <div className="mt-4 space-y-3">
              <h2 className="font-serif text-[2rem] leading-tight text-[#f9f1e4]">
                {selectedCity
                  ? `In and around ${selectedCity.name}`
                  : "What this prototype is proving"}
              </h2>
              <p className="text-sm leading-6 text-[#d6cabc]">
                {selectedCity
                  ? `${selectedCity.heroTone} Nearby villages currently in the story: ${sentenceList(
                      selectedCity.nearbyVillages,
                    )}.`
                  : "The homepage starts with the whole country, then moves users quickly into the area that matters to them."}
              </p>
            </div>
            <div className="mt-5 rounded-[24px] border border-white/12 bg-white/8 p-4 backdrop-blur">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#d7c9b1]">
                Discovery mode
              </p>
              <p className="mt-2 font-medium text-[#f9f1e4]">
                {searchSource === "geolocation"
                  ? "Location-assisted zoom"
                  : searchSource === "manual"
                    ? "Manual city selection"
                    : "Country-wide first impression"}
              </p>
              <p className="mt-2.5 text-sm leading-6 text-[#d1c5b8]">
                {selectedCategory
                  ? `${selectedCategory.label} are the current hero category, but the live dataset already includes services and producers.`
                  : "Use the category chips to shift the mood, pin styling, and local result set."}
              </p>
            </div>
            {selectedCity ? (
              <Link
                className={buttonStyles({ className: "mt-5 w-full", size: "sm", variant: "primary" })}
                href={getDirectoryHref(selectedCategorySlug, selectedCity)}
              >
                Open the full {selectedCategory.label.toLowerCase()} explorer
              </Link>
            ) : (
              <p className="mt-5 rounded-[20px] border border-dashed border-[#cdbfa8]/60 px-4 py-3 text-sm text-[#e1d5c5]">
                Choose a city to reveal the city route, filtered map view, and detailed profile pages.
              </p>
            )}
          </aside>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {highlightBusinesses.map(({ business, distanceKm }) => (
              <BusinessCard
                business={business}
                className="h-full"
                distanceKm={selectedCity ? distanceKm : undefined}
                key={business.id}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
