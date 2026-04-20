import type { Business, CategoryConfig, City, ListingTier } from "@/lib/types";
import { slugify } from "@/lib/utils";

type CategoryBlueprint = {
  countPerCity: number;
  brandRoots: string[];
  tagline: string;
  services: string[];
  galleries: string[];
  popupFields: Array<"address" | "phone" | "website" | "hours" | "email">;
};

const OFFSET_RING: Array<[number, number]> = [
  [0.014, 0.008],
  [-0.018, 0.014],
  [0.026, -0.013],
  [-0.024, -0.016],
  [0.034, 0.006],
  [-0.031, 0.02],
  [0.018, -0.024],
  [0.042, 0.012],
  [-0.038, -0.008],
];

export const categories: CategoryConfig[] = [
  {
    slug: "elektrikari",
    label: "Electricians",
    shortLabel: "Electricians",
    description:
      "Fast-response local electrical work, repairs, rewiring, and urgent callouts.",
    teaser: "Blue-coded service pins for trusted sparks and switchboard fixes.",
    type: "services",
    icon: "⚡",
    mapCode: "EL",
    pinColor: "#2252c8",
    accentColor: "#dbe8ff",
    glowColor: "rgba(34,82,200,0.24)",
  },
  {
    slug: "stavby-a-remesla",
    label: "Construction & Trades",
    shortLabel: "Builders",
    description:
      "Renovation crews, carpenters, roofers, and practical home-improvement teams.",
    teaser: "Warm terracotta markers for crews who help shape homes around the city.",
    type: "services",
    icon: "🏗",
    mapCode: "BD",
    pinColor: "#b3542f",
    accentColor: "#ffe6d8",
    glowColor: "rgba(179,84,47,0.24)",
  },
  {
    slug: "mechanici",
    label: "Mechanics",
    shortLabel: "Mechanics",
    description:
      "Independent garages, diagnostics, and service shops that keep commuters moving.",
    teaser: "Steel-toned badges for workshops, diagnostics, and same-day fixes.",
    type: "services",
    icon: "🔧",
    mapCode: "ME",
    pinColor: "#39424e",
    accentColor: "#e4ebf3",
    glowColor: "rgba(57,66,78,0.24)",
  },
  {
    slug: "maseri",
    label: "Massage Therapists",
    shortLabel: "Massage",
    description:
      "Recovery, relaxation, and wellness professionals serving neighborhoods nearby.",
    teaser: "Soft rose highlights for calm, restorative services within reach.",
    type: "services",
    icon: "💆",
    mapCode: "MS",
    pinColor: "#a14d79",
    accentColor: "#fde3f0",
    glowColor: "rgba(161,77,121,0.2)",
  },
  {
    slug: "medari",
    label: "Honey Producers",
    shortLabel: "Honey",
    description:
      "Apiaries, bee farms, and local jars you can buy straight from the producer.",
    teaser: "Golden markers for farm-made pantry goods and seasonal harvest sellers.",
    type: "producers",
    icon: "🍯",
    mapCode: "HO",
    pinColor: "#d48c12",
    accentColor: "#fff0c4",
    glowColor: "rgba(212,140,18,0.24)",
  },
  {
    slug: "tekvicove-oleje",
    label: "Pumpkin Seed Oils",
    shortLabel: "Seed Oils",
    description:
      "Direct-from-maker seed oils, farm presses, and small-batch pantry producers.",
    teaser: "Olive-toned accents for makers with regional specialty goods.",
    type: "producers",
    icon: "🌿",
    mapCode: "SO",
    pinColor: "#507a31",
    accentColor: "#ebf4d6",
    glowColor: "rgba(80,122,49,0.24)",
  },
  {
    slug: "darceky-a-rucna-vyroba",
    label: "Gifts & Makers",
    shortLabel: "Gift Makers",
    description:
      "Studios, craft makers, and gift shops with genuinely local character.",
    teaser: "Studio-style burgundy pins for handmade gifts and personal finds.",
    type: "producers",
    icon: "🎁",
    mapCode: "GF",
    pinColor: "#8f3654",
    accentColor: "#ffe0ea",
    glowColor: "rgba(143,54,84,0.22)",
  },
];

export const cities: City[] = [
  {
    name: "Bratislava",
    slug: "bratislava",
    region: "Bratislavsky kraj",
    regionSlug: "bratislavsky-kraj",
    coordinates: [17.1077, 48.1486],
    nearbyVillages: ["Stupava", "Pezinok", "Samorin"],
    spotlight:
      "Big-city demand meets small-market convenience, so the first impression has to feel premium here.",
    districtHints: ["Mileticova", "Ruzinov", "Kramare", "Petrzalka"],
    heroTone:
      "A polished capital-side launchpad where map discovery still feels unmistakably local.",
  },
  {
    name: "Trnava",
    slug: "trnava",
    region: "Trnavsky kraj",
    regionSlug: "trnavsky-kraj",
    coordinates: [17.5873, 48.3774],
    nearbyVillages: ["Biely Kostol", "Bohdanovce", "Zeleneč"],
    spotlight:
      "Compact enough for true local discovery, but dense enough to show category variety quickly.",
    districtHints: ["Spiegelsaal", "Hlboka", "Tulipanova", "Voderady Road"],
    heroTone:
      "A strong example of how the product should make county-level discovery feel effortless.",
  },
  {
    name: "Trencin",
    slug: "trencin",
    region: "Trenciansky kraj",
    regionSlug: "trenciansky-kraj",
    coordinates: [18.0385, 48.8945],
    nearbyVillages: ["Soblahov", "Opatova", "Zlatovce"],
    spotlight:
      "Good territory for showcasing nearby villages, practical services, and regional producers in one view.",
    districtHints: ["Legionarska", "Juh", "Sihoť", "Pred Polom"],
    heroTone:
      "Local utility first, with the castle-city context giving the map a memorable sense of place.",
  },
  {
    name: "Banska Bystrica",
    slug: "banska-bystrica",
    region: "Banskobystricky kraj",
    regionSlug: "banskobystricky-kraj",
    coordinates: [19.1462, 48.7363],
    nearbyVillages: ["Kynceľova", "Salkova", "Badin"],
    spotlight:
      "Perfect for mixing city services with regional makers and countryside sourcing stories.",
    districtHints: ["Trieda SNP", "Foncorda", "Sasova", "Podlavice"],
    heroTone:
      "A central-Slovakia view that balances producers, services, and a healthy radius around town.",
  },
  {
    name: "Kosice",
    slug: "kosice",
    region: "Kosicky kraj",
    regionSlug: "kosicky-kraj",
    coordinates: [21.2581, 48.7164],
    nearbyVillages: ["Krasna", "Valaliky", "Rozhanovce"],
    spotlight:
      "A larger eastern hub where filters and pin styling need to stay clear under heavier density.",
    districtHints: ["Mlynska", "Juh", "Furca", "Terasa"],
    heroTone:
      "Dense enough to prove the map UX, local enough to keep the product story grounded.",
  },
  {
    name: "Trebisov",
    slug: "trebisov",
    region: "Kosicky kraj",
    regionSlug: "kosicky-kraj",
    coordinates: [21.7195, 48.6286],
    nearbyVillages: ["Cierna nad Tisou", "Secovce", "Vojcice"],
    spotlight:
      "This is the strongest example of the brief: finding useful businesses in and around your actual area.",
    districtHints: ["M. R. Stefanika", "Komenskeho", "Cukrovarska", "Zimna"],
    heroTone:
      "An ideal near-me story where nearby villages really matter to the search experience.",
  },
];

const categoryBlueprints: Record<string, CategoryBlueprint> = {
  elektrikari: {
    countPerCity: 2,
    brandRoots: [
      "Volt Harbor",
      "Joseph the King Electric",
      "Blue Arc Studio",
      "Copper Mile",
      "North Fuse",
      "Current Works",
      "Switchyard",
      "Townline Electric",
      "Bright Loop",
      "Fieldwire Local",
      "Signal Home",
      "Quick Phase",
    ],
    tagline:
      "Domestic rewiring, urgent callouts, and clean electrical upgrades for nearby homes and workshops.",
    services: [
      "Emergency callouts",
      "Fuse board upgrades",
      "Lighting installs",
      "Workshop rewiring",
    ],
    galleries: ["Cable routing", "Switchboard finish", "Kitchen lighting"],
    popupFields: ["address", "phone", "hours", "website"],
  },
  "stavby-a-remesla": {
    countPerCity: 2,
    brandRoots: [
      "Stone & Timber",
      "Rafter Local",
      "Bricklane Crew",
      "County Build",
      "Oakline Homes",
      "Summit Trades",
      "Workshop Masonry",
      "Grounded Renovation",
      "Craft House",
      "Neighbor Build",
      "Milepost Carpentry",
      "Roofline Service",
    ],
    tagline:
      "Small-team construction, practical renovations, and reliable trade coordination around the city.",
    services: [
      "Renovation planning",
      "Interior finishes",
      "Carpentry fixes",
      "Roof and facade work",
    ],
    galleries: ["On-site joinery", "Facade refresh", "Courtyard build"],
    popupFields: ["address", "phone", "hours", "email"],
  },
  mechanici: {
    countPerCity: 2,
    brandRoots: [
      "Pitlane Forge",
      "Wrench District",
      "Shift Garage",
      "Roadside Works",
      "Gearline Auto",
      "Sunday Service",
      "Torch Motor",
      "Steel Mile Garage",
      "Ignition House",
      "County Garage",
      "Workshop Clutch",
      "Transit Mechanics",
    ],
    tagline:
      "Independent diagnostics, seasonal checks, and no-nonsense repairs that stay local.",
    services: [
      "Diagnostics",
      "Brake and suspension",
      "Oil and service packs",
      "Fleet maintenance",
    ],
    galleries: ["Service bay", "Diagnostic desk", "Weekend tune-up"],
    popupFields: ["address", "phone", "hours", "website"],
  },
  maseri: {
    countPerCity: 1,
    brandRoots: [
      "Calm Hands",
      "Soft Reset",
      "Quiet Pulse",
      "Village Relief",
      "Stillwater Massage",
      "Grounding Table",
    ],
    tagline:
      "Recovery, sports massage, and wellness sessions close enough to become part of your weekly rhythm.",
    services: [
      "Sports recovery",
      "Deep tissue massage",
      "Relaxation sessions",
      "Short recovery visits",
    ],
    galleries: ["Therapy room", "Recovery corner", "Calm lighting"],
    popupFields: ["address", "phone", "hours", "email"],
  },
  medari: {
    countPerCity: 1,
    brandRoots: [
      "Golden Hive",
      "Forest Apiary",
      "Amber Hill Honey",
      "County Bee Farm",
      "Meadow Jar",
      "Village Nectar",
    ],
    tagline:
      "Raw honey, direct pickup, and friendly producers who sell without the supermarket markup.",
    services: [
      "Seasonal flower honey",
      "Gift jars",
      "Bee farm pickup",
      "Market-day bundles",
    ],
    galleries: ["Honey jars", "Apiary field", "Packed gift set"],
    popupFields: ["address", "phone", "website", "hours"],
  },
  "tekvicove-oleje": {
    countPerCity: 1,
    brandRoots: [
      "Pumpkin Press",
      "Green Mill Oil",
      "Harvest Kernel",
      "Pressed County",
      "Village Seed House",
      "Amber Press",
    ],
    tagline:
      "Small-batch pumpkin seed oils and pantry staples sold straight from regional makers.",
    services: [
      "Cold-pressed oil",
      "Gift bottles",
      "Seasonal tasting packs",
      "Farm pickup",
    ],
    galleries: ["Press room", "Bottle shelf", "Farm tasting"],
    popupFields: ["address", "phone", "website", "hours"],
  },
  "darceky-a-rucna-vyroba": {
    countPerCity: 1,
    brandRoots: [
      "Oak & Thread",
      "Candle Alley",
      "Paper Lantern Studio",
      "County Keepsakes",
      "Small Table Gifts",
      "Handmade Corner",
    ],
    tagline:
      "Personal gifts, local craft, and maker-led studios with stronger character than chain retail.",
    services: [
      "Gift wrapping",
      "Seasonal collections",
      "Made-to-order keepsakes",
      "Studio pickup",
    ],
    galleries: ["Gift shelf", "Workshop display", "Maker detail"],
    popupFields: ["address", "phone", "website", "email"],
  },
};

function lookupCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

function lookupCity(slug: string) {
  return cities.find((city) => city.slug === slug);
}

function getOffset(categoryIndex: number, cityIndex: number, variant: number) {
  const base = OFFSET_RING[(categoryIndex * 2 + cityIndex + variant) % OFFSET_RING.length];
  const scale = variant === 0 ? 1 : 1.55;
  return [base[0] * scale, base[1] * scale] as const;
}

function createBusiness(
  city: City,
  cityIndex: number,
  category: CategoryConfig,
  categoryIndex: number,
  variant: number,
) {
  const blueprint = categoryBlueprints[category.slug];
  const brand = blueprint.brandRoots[
    (cityIndex * blueprint.countPerCity + variant) % blueprint.brandRoots.length
  ];
  const offset = getOffset(categoryIndex, cityIndex, variant);
  const name = `${brand} ${city.name}`;
  const slug = slugify(name);
  const tierPattern: ListingTier[] = ["free", "extended", "featured"];
  const tier = tierPattern[(cityIndex + categoryIndex + variant) % tierPattern.length];
  const hasWebsite = tier !== "free" || (cityIndex + variant) % 3 === 0;
  const phone = `+421 9${cityIndex + 1}${categoryIndex + 2}${variant + 3} ${560 + cityIndex * 18 + categoryIndex * 7 + variant * 4} ${210 + categoryIndex * 11 + cityIndex * 3}`;
  const address = `${18 + cityIndex + variant} ${city.districtHints[(categoryIndex + variant) % city.districtHints.length]}, ${city.name}`;
  const websiteSlug = slugify(`${brand}-${city.slug}`);
  const services = blueprint.services.slice(variant, variant + 3);
  const gallery = blueprint.galleries.map((item) => `${item} • ${city.name}`);
  const hours =
    category.type === "services"
      ? [
          "Mon-Fri 08:00-18:00",
          "Sat 09:00-13:00",
          variant === 0 ? "Emergency slots by phone" : "Appointments for nearby villages",
        ]
      : [
          "Tue-Fri 10:00-17:00",
          "Sat 08:00-12:00",
          "Pickup windows updated weekly",
        ];

  return {
    id: `${city.slug}-${category.slug}-${variant}`,
    name,
    slug,
    type: category.type,
    category: category.slug,
    region: city.region,
    regionSlug: city.regionSlug,
    city: city.name,
    citySlug: city.slug,
    coordinates: [city.coordinates[0] + offset[0], city.coordinates[1] + offset[1]],
    phone,
    address,
    shortDescription:
      `${blueprint.tagline} Built for people in ${city.name} and ${city.nearbyVillages[variant % city.nearbyVillages.length]}.`,
    tier,
    hasWebsite,
    websiteUrl: hasWebsite ? `https://${websiteSlug}.sk` : undefined,
    websitePreviewImage: undefined,
    email: `hello@${websiteSlug}.sk`,
    hours,
    gallery,
    services,
    isClaimed: tier !== "free" || variant === 0,
    displayConfig: {
      pinColor: category.pinColor,
      pinIcon: category.icon,
      mapCode: category.mapCode,
      showLogo: hasWebsite,
      popupFields: blueprint.popupFields,
      badges: [
        tier === "featured" ? "Featured" : tier === "extended" ? "Extended profile" : "Free listing",
        city.nearbyVillages[variant % city.nearbyVillages.length],
      ],
      accentColor: category.accentColor,
      cardSize: tier === "featured" ? "featured" : "standard",
    },
  } satisfies Business;
}

export const businesses: Business[] = categories.flatMap((category, categoryIndex) => {
  const blueprint = categoryBlueprints[category.slug];
  return cities.flatMap((city, cityIndex) =>
    Array.from({ length: blueprint.countPerCity }, (_, variant) =>
      createBusiness(city, cityIndex, category, categoryIndex, variant),
    ),
  );
});

export function getCategoryBySlug(slug: string) {
  return lookupCategory(slug);
}

export function getCityBySlug(slug: string) {
  return lookupCity(slug);
}

export function getCityByRoute(regionSlug: string, citySlug: string) {
  return cities.find(
    (city) => city.regionSlug === regionSlug && city.slug === citySlug,
  );
}

export function getBusinessByRoute(
  categorySlug: string,
  regionSlug: string,
  citySlug: string,
  businessSlug: string,
) {
  return businesses.find(
    (business) =>
      business.category === categorySlug &&
      business.regionSlug === regionSlug &&
      business.citySlug === citySlug &&
      business.slug === businessSlug,
  );
}

export function getBusinessHref(business: Business) {
  return `/${business.category}/${business.regionSlug}/${business.citySlug}/${business.slug}`;
}

export function getDirectoryHref(categorySlug: string, city: City) {
  return `/${categorySlug}/${city.regionSlug}/${city.slug}`;
}

export function getCategoryBusinesses(categorySlug: string) {
  return businesses.filter((business) => business.category === categorySlug);
}

export function getCityBusinesses(citySlug: string) {
  return businesses.filter((business) => business.citySlug === citySlug);
}

export function haversineDistanceKm(
  from: [number, number],
  to: [number, number],
) {
  const [fromLon, fromLat] = from;
  const [toLon, toLat] = to;
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const deltaLat = toRadians(toLat - fromLat);
  const deltaLon = toRadians(toLon - fromLon);
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(toRadians(fromLat)) *
      Math.cos(toRadians(toLat)) *
      Math.sin(deltaLon / 2) ** 2;

  return 2 * earthRadiusKm * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function findNearestCity(coordinates: [number, number]) {
  return cities
    .map((city) => ({
      city,
      distanceKm: haversineDistanceKm(coordinates, city.coordinates),
    }))
    .sort((left, right) => left.distanceKm - right.distanceKm)[0];
}

export function getRelatedBusinesses(business: Business, limit = 6) {
  return businesses
    .filter((candidate) => candidate.id !== business.id)
    .map((candidate) => ({
      business: candidate,
      distanceKm: haversineDistanceKm(business.coordinates, candidate.coordinates),
    }))
    .sort((left, right) => left.distanceKm - right.distanceKm)
    .slice(0, limit);
}

export function parseRadius(value?: string) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return 30;
  }

  return Math.max(10, Math.min(80, parsed));
}

export function parseCategories(value: string | undefined, fallback: string) {
  if (!value) {
    return [fallback];
  }

  const selected = value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => categories.some((category) => category.slug === item));

  return selected.length > 0 ? selected : [fallback];
}
