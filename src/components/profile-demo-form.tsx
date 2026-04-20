"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildCompletionChecklist, calculateProfileCompletion } from "@/lib/profile";
import type { ProfileDraft } from "@/lib/types";

const INPUT_CLASS_NAME =
  "mt-2 w-full rounded-[20px] border border-[#d8d0bf] bg-[#fffaf0] px-4 py-3 text-sm text-[#17352b] outline-none transition placeholder:text-[#968f82] focus:border-[#0f6c5b] focus:ring-4 focus:ring-[#0f6c5b]/10";

const INITIAL_DRAFT: ProfileDraft = {
  name: "Joseph the King Electric Trebisov",
  phone: "+421 914 560 210",
  address: "18 M. R. Stefanika, Trebisov",
  shortDescription:
    "Domestic rewiring, fast repairs, and weekend callouts for Trebisov and nearby villages.",
  websiteUrl: "",
  email: "hello@joseph-electric.sk",
  servicesText: "Emergency callouts, rewiring, lighting installs",
  galleryCount: 2,
  hoursText: "Mon-Fri 08:00-18:00\nSat 09:00-13:00",
};

export function ProfileDemoForm() {
  const [draft, setDraft] = useState(INITIAL_DRAFT);
  const completion = calculateProfileCompletion(draft);
  const checklist = buildCompletionChecklist(draft);
  const services = draft.servicesText
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_420px]">
      <section className="panel-surface rounded-[36px] p-6 sm:p-8">
        <Badge tone="brand">Mocked owner flow</Badge>
        <h1 className="mt-4 font-serif text-5xl text-[#17352b]">
          Business profile completion
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[#53645b]">
          This screen shows the sales funnel built into the listing product. The
          profile feels useful even for free users, but the final 100% completion
          milestone is reserved for businesses with a website.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <label>
            <span className="text-sm font-medium text-[#42524a]">Business name</span>
            <input
              className={INPUT_CLASS_NAME}
              onChange={(event) =>
                setDraft((current) => ({ ...current, name: event.target.value }))
              }
              value={draft.name}
            />
          </label>

          <label>
            <span className="text-sm font-medium text-[#42524a]">Phone</span>
            <input
              className={INPUT_CLASS_NAME}
              onChange={(event) =>
                setDraft((current) => ({ ...current, phone: event.target.value }))
              }
              value={draft.phone}
            />
          </label>

          <label>
            <span className="text-sm font-medium text-[#42524a]">Address</span>
            <input
              className={INPUT_CLASS_NAME}
              onChange={(event) =>
                setDraft((current) => ({ ...current, address: event.target.value }))
              }
              value={draft.address}
            />
          </label>

          <label>
            <span className="text-sm font-medium text-[#42524a]">Email</span>
            <input
              className={INPUT_CLASS_NAME}
              onChange={(event) =>
                setDraft((current) => ({ ...current, email: event.target.value }))
              }
              value={draft.email}
            />
          </label>
        </div>

        <div className="mt-5">
          <label>
            <span className="text-sm font-medium text-[#42524a]">Short description</span>
            <textarea
              className={`${INPUT_CLASS_NAME} min-h-32 resize-none`}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  shortDescription: event.target.value,
                }))
              }
              value={draft.shortDescription}
            />
          </label>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label>
            <span className="text-sm font-medium text-[#42524a]">Website URL</span>
            <input
              className={INPUT_CLASS_NAME}
              onChange={(event) =>
                setDraft((current) => ({ ...current, websiteUrl: event.target.value }))
              }
              placeholder="https://your-business.sk"
              value={draft.websiteUrl}
            />
          </label>

          <label>
            <span className="text-sm font-medium text-[#42524a]">Gallery slots</span>
            <input
              className={INPUT_CLASS_NAME}
              max={12}
              min={0}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  galleryCount: Number(event.target.value),
                }))
              }
              type="number"
              value={draft.galleryCount}
            />
          </label>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label>
            <span className="text-sm font-medium text-[#42524a]">Services</span>
            <textarea
              className={`${INPUT_CLASS_NAME} min-h-28 resize-none`}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  servicesText: event.target.value,
                }))
              }
              value={draft.servicesText}
            />
          </label>

          <label>
            <span className="text-sm font-medium text-[#42524a]">Opening hours</span>
            <textarea
              className={`${INPUT_CLASS_NAME} min-h-28 resize-none`}
              onChange={(event) =>
                setDraft((current) => ({ ...current, hoursText: event.target.value }))
              }
              value={draft.hoursText}
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            onClick={() =>
              setDraft((current) => ({
                ...current,
                websiteUrl: "https://joseph-electric.sk",
              }))
            }
          >
            Add example website
          </Button>
          <Button
            onClick={() =>
              setDraft((current) => ({
                ...current,
                websiteUrl: "",
              }))
            }
            variant="secondary"
          >
            Remove website
          </Button>
        </div>
      </section>

      <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
        <section className="panel-surface rounded-[32px] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#857e71]">
                Completion
              </p>
              <h2 className="mt-2 font-serif text-4xl text-[#17352b]">
                {completion}%
              </h2>
            </div>
            <Badge tone={completion === 100 ? "brand" : "warm"}>
              {completion === 100 ? "Marketplace ready" : "Website still missing"}
            </Badge>
          </div>

          <div className="mt-5 h-4 overflow-hidden rounded-full bg-[#e7decd]">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#0f6c5b,#4e8a54,#d48c12)] transition-all duration-300"
              style={{ width: `${completion}%` }}
            />
          </div>

          <div className="mt-6 space-y-3">
            {checklist.map((item) => (
              <div
                className="flex items-center justify-between gap-4 rounded-[20px] border border-[#ddd4c4] bg-white/78 px-4 py-3"
                key={item.label}
              >
                <span className="text-sm text-[#33463d]">{item.label}</span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.done
                      ? "bg-[#dff2ea] text-[#0f6c5b]"
                      : "bg-[#f4ead8] text-[#8a6c2f]"
                  }`}
                >
                  {item.done ? "Done" : "Missing"}
                </span>
              </div>
            ))}
          </div>

          {!draft.websiteUrl.trim() ? (
            <p className="mt-5 rounded-[22px] border border-dashed border-[#d2c1a3] px-4 py-4 text-sm leading-7 text-[#6d665a]">
              The last stretch is intentionally locked. This gives sales a clear,
              visual reason to push a website upgrade instead of leaving the free
              listing as the final stop.
            </p>
          ) : null}
        </section>

        <section className="rounded-[32px] border border-[#d8d0bf] bg-white/88 p-6 shadow-[0_24px_70px_rgba(46,57,46,0.08)]">
          <p className="text-xs uppercase tracking-[0.24em] text-[#857e71]">
            Public preview
          </p>
          <div className="mt-4 rounded-[28px] border border-[#e0d8c8] bg-[#fffaf2] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#7f786c]">
                  Electricians • Trebisov
                </p>
                <h3 className="mt-2 font-serif text-3xl text-[#17352b]">
                  {draft.name || "Unnamed listing"}
                </h3>
              </div>
              <Badge tone="warm">{draft.websiteUrl ? "Extended profile" : "Free profile"}</Badge>
            </div>
            <p className="mt-4 text-sm leading-7 text-[#53645b]">
              {draft.shortDescription || "Add a short description to explain the offer."}
            </p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-[18px] bg-white px-4 py-3 text-sm text-[#42524a]">
                {draft.address || "No address yet"}
              </div>
              <div className="rounded-[18px] bg-white px-4 py-3 text-sm text-[#42524a]">
                {draft.phone || "No phone yet"}
              </div>
              <div className="rounded-[18px] bg-white px-4 py-3 text-sm text-[#42524a]">
                {draft.websiteUrl || "Website slot available for upsell"}
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {services.map((service) => (
                <span
                  className="rounded-full bg-[#efe7d6] px-3 py-1 text-xs font-medium text-[#625c50]"
                  key={service}
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </section>
      </aside>
    </div>
  );
}
