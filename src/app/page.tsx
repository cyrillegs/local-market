import { HomeExplorer } from "@/components/homepage-explorer";
import { SiteHeader } from "@/components/site-header";
import { businesses, categories, cities, getCategoryBySlug, getCityBySlug } from "@/lib/data";

type HomePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const categoryParam =
    typeof resolvedSearchParams.category === "string"
      ? resolvedSearchParams.category
      : undefined;
  const cityParam =
    typeof resolvedSearchParams.city === "string"
      ? resolvedSearchParams.city
      : undefined;
  const initialCategorySlug = getCategoryBySlug(categoryParam ?? "")?.slug;
  const initialCitySlug = getCityBySlug(cityParam ?? "")?.slug;

  return (
    <div className="pb-20">
      <SiteHeader />
      <main className="mt-6 space-y-16">
        <HomeExplorer
          businesses={businesses}
          categories={categories}
          cities={cities}
          initialCategorySlug={initialCategorySlug}
          initialCitySlug={initialCitySlug}
        />
      </main>
    </div>
  );
}
