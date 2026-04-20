import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { BusinessCard } from "@/components/business-card";
import { DirectoryMap } from "@/components/directory-map";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { WebsitePreview } from "@/components/website-preview";
import {
  getBusinessByRoute,
  getCategoryBySlug,
  getCityByRoute,
  getDirectoryHref,
  getRelatedBusinesses,
} from "@/lib/data";
import { compactUrl, formatDistance, formatTier, sentenceList } from "@/lib/utils";

type BusinessDetailPageProps = {
  params: Promise<{
    category: string;
    region: string;
    city: string;
    businessSlug: string;
  }>;
};

export default async function BusinessDetailPage({
  params,
}: BusinessDetailPageProps) {
  const resolvedParams = await params;
  const business = getBusinessByRoute(
    resolvedParams.category,
    resolvedParams.region,
    resolvedParams.city,
    resolvedParams.businessSlug,
  );

  if (!business) {
    notFound();
  }

  const category = getCategoryBySlug(business.category);
  const city = getCityByRoute(business.regionSlug, business.citySlug);

  if (!category || !city) {
    notFound();
  }

  const nearbyBusinesses = getRelatedBusinesses(business, 4);

  return (
    <div className="pb-20">
      <SiteHeader />
      <main className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: category.label, href: getDirectoryHref(category.slug, city) },
              { label: city.region },
              { label: city.name, href: getDirectoryHref(category.slug, city) },
              { label: business.name },
            ]}
          />

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
            <div className="panel-surface rounded-[36px] p-6 sm:p-8">
              <div className="flex flex-wrap gap-2">
                <Badge tone="brand">{category.label}</Badge>
                <Badge tone="warm">{formatTier(business.tier)}</Badge>
                {business.displayConfig.badges.map((badge) => (
                  <Badge key={badge}>{badge}</Badge>
                ))}
              </div>
              <h1 className="mt-5 font-serif text-5xl text-[#17352b]">
                {business.name}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[#53645b]">
                {business.shortDescription}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  className={buttonStyles({ variant: "primary" })}
                  href={`tel:${business.phone}`}
                >
                  Call now
                </a>
                {business.websiteUrl ? (
                  <a
                    className={buttonStyles({ variant: "secondary" })}
                    href={business.websiteUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Visit website
                  </a>
                ) : (
                  <Link
                    className={buttonStyles({ variant: "secondary" })}
                    href="/profile-demo"
                  >
                    Show upsell demo
                  </Link>
                )}
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-[24px] border border-[#ddd4c4] bg-white/78 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-[#847d71]">
                    Area served
                  </p>
                  <p className="mt-2 font-semibold text-[#17352b]">
                    {city.name}, {sentenceList(city.nearbyVillages)}
                  </p>
                </div>
                <div className="rounded-[24px] border border-[#ddd4c4] bg-white/78 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-[#847d71]">
                    Contact
                  </p>
                  <p className="mt-2 font-semibold text-[#17352b]">{business.phone}</p>
                </div>
                <div className="rounded-[24px] border border-[#ddd4c4] bg-white/78 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-[#847d71]">
                    Website slot
                  </p>
                  <p className="mt-2 font-semibold text-[#17352b]">
                    {business.websiteUrl ? compactUrl(business.websiteUrl) : "Available for upsell"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[36px] border border-[#ddd4c4] bg-white/88 p-3 shadow-[0_28px_80px_rgba(46,57,46,0.08)]">
              <DirectoryMap
                activeBusinessSlug={business.slug}
                businesses={[business, ...nearbyBusinesses.map((item) => item.business)]}
                focusCoordinates={business.coordinates}
                heightClassName="h-[420px] sm:h-[480px]"
              />
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <article className="panel-surface rounded-[34px] p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-[#857e71]">
                General info
              </p>
              <h2 className="mt-3 font-serif text-4xl text-[#17352b]">Quadrant one</h2>
              <dl className="mt-6 grid gap-4 text-sm text-[#3e4f47]">
                <div className="rounded-[22px] border border-[#ddd4c4] bg-white/80 p-4">
                  <dt className="text-xs uppercase tracking-[0.22em] text-[#857e71]">
                    Address
                  </dt>
                  <dd className="mt-2 text-base font-medium text-[#17352b]">{business.address}</dd>
                </div>
                <div className="rounded-[22px] border border-[#ddd4c4] bg-white/80 p-4">
                  <dt className="text-xs uppercase tracking-[0.22em] text-[#857e71]">
                    Email
                  </dt>
                  <dd className="mt-2 text-base font-medium text-[#17352b]">
                    {business.email ?? "Email pending"}
                  </dd>
                </div>
                <div className="rounded-[22px] border border-[#ddd4c4] bg-white/80 p-4">
                  <dt className="text-xs uppercase tracking-[0.22em] text-[#857e71]">
                    Public promise
                  </dt>
                  <dd className="mt-2 text-base font-medium text-[#17352b]">
                    Fast local response for {city.name} and its nearby villages.
                  </dd>
                </div>
              </dl>
            </article>

            <article className="rounded-[34px] border border-[#ddd4c4] bg-white/88 p-4 shadow-[0_28px_80px_rgba(46,57,46,0.08)]">
              <p className="px-2 text-xs uppercase tracking-[0.24em] text-[#857e71]">
                Website preview or upsell
              </p>
              <div className="mt-3">
                <WebsitePreview business={business} />
              </div>
            </article>

            <article className="panel-surface rounded-[34px] p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-[#857e71]">
                Services and gallery
              </p>
              <h2 className="mt-3 font-serif text-4xl text-[#17352b]">Quadrant three</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {business.services?.map((service) => (
                  <span
                    className="rounded-full bg-[#efe7d6] px-4 py-2 text-sm font-medium text-[#5e584c]"
                    key={service}
                  >
                    {service}
                  </span>
                ))}
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {business.gallery?.map((galleryItem) => (
                  <div
                    className="rounded-[24px] border border-[#ddd4c4] bg-white/80 p-4"
                    key={galleryItem}
                  >
                    <div
                      className="h-28 rounded-[18px]"
                      style={{
                        background: `linear-gradient(145deg, ${category.accentColor}, #ffffff)`,
                      }}
                    />
                    <p className="mt-3 text-sm font-medium text-[#17352b]">{galleryItem}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel-surface rounded-[34px] p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-[#857e71]">
                Hours and local footprint
              </p>
              <h2 className="mt-3 font-serif text-4xl text-[#17352b]">Quadrant four</h2>
              <div className="mt-6 grid gap-4">
                {business.hours?.map((item) => (
                  <div
                    className="rounded-[22px] border border-[#ddd4c4] bg-white/80 px-4 py-3 text-sm text-[#3f5148]"
                    key={item}
                  >
                    {item}
                  </div>
                ))}
                <div className="rounded-[22px] border border-[#ddd4c4] bg-white/80 p-4 text-sm leading-7 text-[#53645b]">
                  Nearby businesses in this prototype sit as close as{" "}
                  {formatDistance(nearbyBusinesses[0]?.distanceKm ?? 0)} from this listing,
                  reinforcing the “around me” browsing story from the brief.
                </div>
              </div>
            </article>
          </section>

          <section className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#857e71]">
                  Nearby profiles
                </p>
                <h2 className="mt-2 font-serif text-4xl text-[#17352b]">
                  More around {city.name}
                </h2>
              </div>
              <Link className={buttonStyles({ variant: "secondary" })} href={getDirectoryHref(category.slug, city)}>
                Back to the city explorer
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {nearbyBusinesses.map(({ business: relatedBusiness, distanceKm }) => (
                <BusinessCard
                  business={relatedBusiness}
                  distanceKm={distanceKm}
                  key={relatedBusiness.id}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
