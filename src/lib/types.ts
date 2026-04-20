export type BusinessType = "services" | "producers";

export type ListingTier = "free" | "extended" | "featured";

export type SearchSource = "manual" | "geolocation" | "homepage" | "deep-link";

export type PopupField = "address" | "phone" | "website" | "hours" | "email";

export interface CategoryConfig {
  slug: string;
  label: string;
  shortLabel: string;
  description: string;
  teaser: string;
  type: BusinessType;
  icon: string;
  mapCode: string;
  pinColor: string;
  accentColor: string;
  glowColor: string;
}

export interface City {
  name: string;
  slug: string;
  region: string;
  regionSlug: string;
  coordinates: [number, number];
  nearbyVillages: string[];
  spotlight: string;
  districtHints: string[];
  heroTone: string;
}

export interface DisplayConfig {
  pinColor: string;
  pinIcon: string;
  mapCode: string;
  showLogo: boolean;
  popupFields: PopupField[];
  badges: string[];
  accentColor: string;
  cardSize?: "standard" | "featured";
}

export interface Business {
  id: string;
  name: string;
  slug: string;
  type: BusinessType;
  category: string;
  region: string;
  regionSlug: string;
  city: string;
  citySlug: string;
  coordinates: [number, number];
  phone: string;
  address: string;
  shortDescription: string;
  tier: ListingTier;
  hasWebsite: boolean;
  websiteUrl?: string;
  websitePreviewImage?: string;
  email?: string;
  hours?: string[];
  gallery?: string[];
  services?: string[];
  isClaimed: boolean;
  displayConfig: DisplayConfig;
}

export interface SearchState {
  citySlug?: string;
  coordinates?: [number, number];
  radiusKm: number;
  keyword: string;
  selectedCategories: string[];
  businessType: "all" | BusinessType;
  source: SearchSource;
}

export interface ProfileDraft {
  name: string;
  phone: string;
  address: string;
  shortDescription: string;
  websiteUrl: string;
  email: string;
  servicesText: string;
  galleryCount: number;
  hoursText: string;
}
