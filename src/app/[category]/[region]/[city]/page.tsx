import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { DirectoryExplorer } from "@/components/directory-explorer";
import { SiteHeader } from "@/components/site-header";
import {
  businesses,
  categories,
  getCategoryBySlug,
  getCityByRoute,
  parseCategories,
  parseRadius,
} from "@/lib/data";
import type { BusinessType } from "@/lib/types";

type CategoryCityPageProps = {
  params: Promise<{
    category: string;
    region: string;
    city: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CategoryCityPage({
  params,
  searchParams,
}: CategoryCityPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const category = getCategoryBySlug(resolvedParams.category);
  const city = getCityByRoute(resolvedParams.region, resolvedParams.city);

  if (!category || !city) {
    notFound();
  }

  const query =
    typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q : "";
  const radius =
    typeof resolvedSearchParams.radius === "string"
      ? parseRadius(resolvedSearchParams.radius)
      : 30;
  const businessType =
    resolvedSearchParams.type === "services" ||
    resolvedSearchParams.type === "producers"
      ? (resolvedSearchParams.type as BusinessType)
      : "all";
  const selectedCategories = parseCategories(
    typeof resolvedSearchParams.categories === "string"
      ? resolvedSearchParams.categories
      : undefined,
    category.slug,
  );

  return (
    <div className="pb-20">
      <SiteHeader />
      <main className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: category.label },
              { label: city.region },
              { label: city.name },
            ]}
          />
          <DirectoryExplorer
            businesses={businesses}
            categories={categories}
            city={city}
            initialBusinessType={businessType}
            initialQuery={query}
            initialRadiusKm={radius}
            initialSelectedCategories={selectedCategories}
            routeCategory={category}
          />
        </div>
      </main>
    </div>
  );
}
