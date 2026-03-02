"use client";

import { useEffect, useRef, useMemo } from "react";
import L from "leaflet";

// Category colors for markers
const CATEGORY_COLORS = {
  faculty: "#4F46E5",
  hostel: "#059669",
  library: "#D97706",
  admin: "#7C3AED",
  sports: "#DC2626",
  religious: "#0891B2",
  cafeteria: "#EA580C",
  gate: "#4B5563",
  bus_stop: "#2563EB",
  landmark: "#BE185D",
  health: "#16A34A",
  lecture_hall: "#9333EA",
  lab: "#0D9488",
  other: "#6B7280",
};

const CATEGORY_ICONS = {
  faculty: "🎓",
  hostel: "🏠",
  library: "📚",
  admin: "🏛️",
  sports: "⚽",
  religious: "🕌",
  cafeteria: "🍛",
  gate: "🚪",
  bus_stop: "🚌",
  landmark: "📍",
  health: "🏥",
  lecture_hall: "📖",
  lab: "🔬",
  other: "📌",
};

// UNILAG campus center
const CAMPUS_CENTER = [6.5150, 3.3880];
const DEFAULT_ZOOM = 16;

function createCustomIcon(category, isSelected = false) {
  const color = CATEGORY_COLORS[category] || "#6B7280";
  const icon = CATEGORY_ICONS[category] || "📌";
  const size = isSelected ? 44 : 36;
  const fontSize = isSelected ? 20 : 16;

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div class="marker-pin ${isSelected ? "active" : ""}" style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        border: 2px solid white;
        ${isSelected ? "z-index: 1000 !important;" : ""}
      ">
        <span class="marker-icon" style="
          transform: rotate(45deg);
          font-size: ${fontSize}px;
          line-height: 1;
        ">${icon}</span>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
}

function createPopupContent(location) {
  const icon = CATEGORY_ICONS[location.category] || "📌";
  const color = CATEGORY_COLORS[location.category] || "#6B7280";

  return `
    <div style="padding: 16px; min-width: 240px; font-family: 'DM Sans', sans-serif;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
        <span style="
          background: ${color}15;
          padding: 6px;
          border-radius: 8px;
          font-size: 18px;
          line-height: 1;
        ">${icon}</span>
        <div>
          <h3 style="font-size: 15px; font-weight: 700; color: #1F2937; margin: 0; line-height: 1.3;">
            ${location.short_name || location.name}
          </h3>
          ${
            location.popular_name && location.popular_name !== location.short_name
              ? `<p style="font-size: 11px; color: #9CA3AF; margin: 2px 0 0 0;">
                  aka "${location.popular_name}"
                </p>`
              : ""
          }
        </div>
      </div>
      <p style="font-size: 13px; color: #6B7280; line-height: 1.5; margin: 0 0 10px 0;">
        ${location.description.length > 150 ? location.description.slice(0, 150) + "..." : location.description}
      </p>
      ${
        location.opening_hours
          ? `<div style="
              font-size: 12px;
              color: #059669;
              background: #F0FDF4;
              padding: 6px 10px;
              border-radius: 6px;
              display: inline-block;
            ">
              🕐 ${location.opening_hours}
            </div>`
          : ""
      }
    </div>
  `;
}

export default function CampusMap({
  locations,
  selectedLocation,
  onLocationSelect,
  directionFrom,
  directionTo,
  directionsMode,
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const lineRef = useRef(null);

  // Initialize map
  useEffect(() => {
    if (mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: CAMPUS_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: false,
      attributionControl: true,
    });

    // Use a clean, modern tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    // Add zoom control to bottom-right
    L.control.zoom({ position: "bottomright" }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update markers when locations change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => {
      map.removeLayer(marker);
    });
    markersRef.current = {};

    // Add new markers
    locations.forEach((loc) => {
      const isSelected = selectedLocation?.id === loc.id;
      const isDirectionPoint =
        directionFrom?.id === loc.id || directionTo?.id === loc.id;

      const marker = L.marker([loc.coordinates.lat, loc.coordinates.lng], {
        icon: createCustomIcon(
          loc.category,
          isSelected || isDirectionPoint
        ),
        zIndexOffset: isSelected || isDirectionPoint ? 1000 : 0,
      });

      marker.bindPopup(createPopupContent(loc), {
        className: "custom-popup",
        maxWidth: 300,
        closeButton: true,
      });

      marker.on("click", () => {
        onLocationSelect(loc);
      });

      marker.addTo(map);
      markersRef.current[loc.id] = marker;
    });
  }, [locations, selectedLocation, directionFrom, directionTo, onLocationSelect]);

  // Fly to selected location
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedLocation) return;

    map.flyTo(
      [selectedLocation.coordinates.lat, selectedLocation.coordinates.lng],
      17,
      { duration: 0.8 }
    );

    // Open popup
    const marker = markersRef.current[selectedLocation.id];
    if (marker) {
      marker.openPopup();
    }
  }, [selectedLocation]);

  // Draw line between direction points
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove existing line
    if (lineRef.current) {
      map.removeLayer(lineRef.current);
      lineRef.current = null;
    }

    if (directionFrom && directionTo) {
      const line = L.polyline(
        [
          [directionFrom.coordinates.lat, directionFrom.coordinates.lng],
          [directionTo.coordinates.lat, directionTo.coordinates.lng],
        ],
        {
          color: "#006838",
          weight: 4,
          opacity: 0.7,
          dashArray: "10, 8",
          lineCap: "round",
        }
      );
      line.addTo(map);
      lineRef.current = line;

      // Fit bounds to show both points
      const bounds = L.latLngBounds([
        [directionFrom.coordinates.lat, directionFrom.coordinates.lng],
        [directionTo.coordinates.lat, directionTo.coordinates.lng],
      ]);
      map.fitBounds(bounds, { padding: [60, 60] });
    }
  }, [directionFrom, directionTo]);

  return (
    <div ref={mapRef} className="w-full h-full" style={{ background: "#f0f0f0" }}>
      {/* Directions mode indicator overlay */}
      {directionsMode && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-unilag-green/20">
          <p className="text-sm font-medium text-unilag-green">
            {!directionFrom
              ? "📍 Select starting point on the map"
              : !directionTo
              ? "📍 Now select your destination"
              : "✅ Route selected"}
          </p>
        </div>
      )}
    </div>
  );
}
