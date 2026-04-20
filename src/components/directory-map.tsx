"use client";

import { useEffect, useRef, useState } from "react";

import { getBusinessHref, getCategoryBySlug } from "@/lib/data";
import type { Business } from "@/lib/types";

const DEFAULT_CENTER: [number, number] = [48.78, 19.35];
const DEFAULT_ZOOM = 7;

type LeafletModule = typeof import("leaflet");

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildPopupMarkup(business: Business) {
  const category = getCategoryBySlug(business.category);
  if (!category) {
    return "";
  }

  return `
    <div class="lm-popup-card">
      <p class="lm-popup-kicker">${escapeHtml(category.label)} • ${escapeHtml(business.city)}</p>
      <h3>${escapeHtml(business.name)}</h3>
      <p>${escapeHtml(business.shortDescription)}</p>
      <div class="lm-popup-meta">${escapeHtml(business.address)} · ${escapeHtml(business.phone)}</div>
      <a class="lm-popup-link" href="${getBusinessHref(business)}">Open profile</a>
    </div>
  `;
}

function toLatLng([longitude, latitude]: [number, number]): [number, number] {
  return [latitude, longitude];
}

function createMarkerIcon(leaflet: LeafletModule, business: Business) {
  const size = business.displayConfig.cardSize === "featured" ? 52 : 44;

  return leaflet.divIcon({
    className: "lm-marker-wrapper",
    html: `
      <span
        class="lm-marker-bubble"
        style="--marker-color:${business.displayConfig.pinColor};--marker-size:${size}px;"
      >
        <strong>${escapeHtml(business.displayConfig.mapCode)}</strong>
      </span>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2)],
  });
}

function fitLeafletMap(
  leaflet: LeafletModule,
  map: import("leaflet").Map,
  businesses: Business[],
  focusCoordinates?: [number, number],
  activeBusinessSlug?: string,
) {
  const activeBusiness = activeBusinessSlug
    ? businesses.find((business) => business.slug === activeBusinessSlug)
    : undefined;

  if (activeBusiness) {
    map.setView(toLatLng(activeBusiness.coordinates), 12);
    return;
  }

  if (businesses.length === 0) {
    map.setView(
      focusCoordinates ? toLatLng(focusCoordinates) : DEFAULT_CENTER,
      focusCoordinates ? 10 : DEFAULT_ZOOM,
    );
    return;
  }

  if (businesses.length === 1) {
    map.setView(toLatLng(businesses[0].coordinates), 11.5);
    return;
  }

  const bounds = leaflet.latLngBounds(
    businesses.map((business) => toLatLng(business.coordinates)),
  );

  if (focusCoordinates) {
    bounds.extend(toLatLng(focusCoordinates));
  }

  map.fitBounds(bounds, {
    padding: [44, 44],
    maxZoom: 11,
  });
}

export function DirectoryMap({
  businesses,
  heightClassName = "h-[520px]",
  focusCoordinates,
  activeBusinessSlug,
}: {
  businesses: Business[];
  heightClassName?: string;
  focusCoordinates?: [number, number];
  activeBusinessSlug?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const leafletRef = useRef<LeafletModule | null>(null);
  const markerLayerRef = useRef<import("leaflet").LayerGroup | null>(null);
  const activePopupRef = useRef<import("leaflet").Marker | null>(null);
  const [mapWarning, setMapWarning] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const businessesKey = businesses.map((business) => business.id).join("|");
  const focusKey = focusCoordinates ? focusCoordinates.join(",") : "default";

  useEffect(() => {
    let disposed = false;

    async function setupLeaflet() {
      if (!containerRef.current || mapRef.current) {
        return;
      }

      const leaflet = await import("leaflet");
      if (disposed || !containerRef.current) {
        return;
      }

      leafletRef.current = leaflet;

      const map = leaflet.map(containerRef.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        zoomControl: false,
        attributionControl: true,
      });

      mapRef.current = map;
      leaflet.control
        .zoom({
          position: "topright",
        })
        .addTo(map);

      const tileLayer = leaflet.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "&copy; OpenStreetMap contributors",
          maxZoom: 19,
        },
      );

      tileLayer.on("tileerror", () => {
        setMapWarning(
          "Map tiles are being blocked or unavailable. The app is running, but your browser or network is not loading the tile images.",
        );
      });

      tileLayer.on("load", () => {
        setMapWarning(null);
      });

      tileLayer.addTo(map);

      const markerLayer = leaflet.layerGroup().addTo(map);
      markerLayerRef.current = markerLayer;
      setMapReady(true);
      requestAnimationFrame(() => {
        map.invalidateSize();
      });
    }

    void setupLeaflet();

    return () => {
      disposed = true;
      activePopupRef.current = null;
      markerLayerRef.current?.clearLayers();
      markerLayerRef.current = null;
      setMapReady(false);
      mapRef.current?.remove();
      mapRef.current = null;
      leafletRef.current = null;
    };
  }, []);

  useEffect(() => {
    const leaflet = leafletRef.current;
    const map = mapRef.current;
    const markerLayer = markerLayerRef.current;

    if (!leaflet || !map || !markerLayer) {
      return;
    }

    markerLayer.clearLayers();
    activePopupRef.current = null;

    businesses.forEach((business) => {
      const marker = leaflet.marker(toLatLng(business.coordinates), {
        icon: createMarkerIcon(leaflet, business),
        keyboard: false,
        title: business.name,
      });

      marker.bindPopup(buildPopupMarkup(business), {
        closeButton: false,
        className: "lm-popup",
        offset: [0, -12],
      });

      marker.addTo(markerLayer);

      if (activeBusinessSlug && business.slug === activeBusinessSlug) {
        activePopupRef.current = marker;
      }
    });

    fitLeafletMap(leaflet, map, businesses, focusCoordinates, activeBusinessSlug);
    requestAnimationFrame(() => {
      map.invalidateSize();
      activePopupRef.current?.openPopup();
    });
  }, [activeBusinessSlug, businesses, businessesKey, focusCoordinates, focusKey, mapReady]);

  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-[#d8d0bf] bg-[#dfeae6] ${heightClassName}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.7),transparent_35%),linear-gradient(180deg,rgba(15,108,91,0.06),transparent_28%)]"
      />
      <div className="absolute inset-0" ref={containerRef} />

      {mapWarning ? (
        <div className="pointer-events-none absolute left-4 top-4 z-[500] max-w-md rounded-[20px] border border-[#e0cfa8] bg-[#fff7df]/95 px-4 py-3 text-sm leading-6 text-[#6d5d32] shadow-[0_18px_40px_rgba(46,57,46,0.12)] backdrop-blur">
          {mapWarning}
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-x-4 bottom-4 z-[400] flex justify-between gap-4">
        <div className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#4f6259] backdrop-blur">
          Slovakia map view
        </div>
        <div className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#4f6259] backdrop-blur">
          Leaflet + OSM
        </div>
      </div>
    </div>
  );
}
