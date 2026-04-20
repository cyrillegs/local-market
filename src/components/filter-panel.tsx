"use client";

import { FilterChip } from "@/components/ui/filter-chip";
import type { BusinessType, CategoryConfig } from "@/lib/types";
import { cn } from "@/lib/utils";

type CategoryCount = {
  category: CategoryConfig;
  count: number;
};

export function FilterPanel({
  query,
  onQueryChange,
  businessType,
  onBusinessTypeChange,
  radiusKm,
  onRadiusChange,
  selectedCategories,
  onToggleCategory,
  categoryCounts,
  className,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  businessType: "all" | BusinessType;
  onBusinessTypeChange: (value: "all" | BusinessType) => void;
  radiusKm: number;
  onRadiusChange: (value: number) => void;
  selectedCategories: string[];
  onToggleCategory: (value: string) => void;
  categoryCounts: CategoryCount[];
  className?: string;
}) {
  return (
    <section
      className={cn(
        "panel-surface rounded-[34px] p-6 shadow-[0_26px_80px_rgba(16,25,35,0.1)]",
        className,
      )}
    >
      <div>
        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#857b6c]">
          Curate the local view
        </p>
        <h2 className="mt-2 font-serif text-4xl text-[#101923]">Filters</h2>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <label className="text-sm font-medium text-[#3d4852]" htmlFor="directory-query">
            Search by keyword
          </label>
          <input
            className="mt-2 w-full rounded-[24px] border border-[#dbc7a3] bg-[#fffaf1] px-4 py-3 text-sm text-[#101923] outline-none transition placeholder:text-[#8c8476] focus:border-[#b6935e] focus:ring-4 focus:ring-[#b6935e]/10"
            id="directory-query"
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Electric repair, honey, handmade gifts..."
            value={query}
          />
        </div>

        <div>
          <p className="text-sm font-medium text-[#3d4852]">Business type</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { value: "all", label: "All" },
              { value: "services", label: "Services" },
              { value: "producers", label: "Producers" },
            ].map((option) => (
              <FilterChip
                active={businessType === option.value}
                key={option.value}
                onClick={() => onBusinessTypeChange(option.value as "all" | BusinessType)}
              >
                {option.label}
              </FilterChip>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-[#3d4852]">Radius</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[15, 30, 45, 70].map((option) => (
              <FilterChip
                active={radiusKm === option}
                key={option}
                onClick={() => onRadiusChange(option)}
              >
                {option} km
              </FilterChip>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-[#3d4852]">Categories</p>
          <div className="mt-3 space-y-2">
            {categoryCounts.map(({ category, count }) => {
              const active = selectedCategories.includes(category.slug);
              return (
                <button
                  className={cn(
                    "flex w-full items-center justify-between rounded-[24px] border px-4 py-4 text-left transition",
                    active
                      ? "border-[#b6935e] bg-[linear-gradient(145deg,#101923,#173931)] text-[#f7efe3] shadow-[0_16px_38px_rgba(16,25,35,0.18)]"
                      : "border-[#dac8a8] bg-[#fff9ef] hover:border-[#b6935e]",
                  )}
                  key={category.slug}
                  onClick={() => onToggleCategory(category.slug)}
                  type="button"
                >
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-white/60 text-lg"
                      style={{
                        background: `linear-gradient(145deg, ${category.accentColor}, rgba(255,255,255,0.96))`,
                        color: category.pinColor,
                      }}
                    >
                      {category.icon}
                    </span>
                    <span>
                      <span className={cn("block text-sm font-semibold", active ? "text-[#fff8ee]" : "text-[#101923]")}>
                        {category.label}
                      </span>
                      <span className={cn("block text-xs", active ? "text-[#d9cbb3]" : "text-[#72685b]")}>
                        {category.teaser}
                      </span>
                    </span>
                  </span>
                  <span className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    active
                      ? "bg-white/12 text-[#fff8ee]"
                      : "bg-white/90 text-[#3d4852]",
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
