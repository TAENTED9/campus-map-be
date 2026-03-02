"use client";

import { MapPin, Clock, Building } from "lucide-react";

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

export default function LocationCard({
  location,
  isSelected,
  onClick,
  index,
}) {
  const color = CATEGORY_COLORS[location.category] || "#6B7280";
  const icon = CATEGORY_ICONS[location.category] || "📌";

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 animate-fade-in group ${
        isSelected
          ? "border-unilag-green bg-unilag-green/5 shadow-md"
          : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-card"
      }`}
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div className="flex gap-3">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
          style={{ background: `${color}12` }}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-unilag-green transition-colors">
            {location.short_name || location.name}
          </h4>

          {location.popular_name &&
            location.popular_name !== location.short_name && (
              <p className="text-[11px] text-gray-400 mt-0.5">
                a.k.a &ldquo;{location.popular_name}&rdquo;
              </p>
            )}

          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
            {location.description.length > 100
              ? location.description.slice(0, 100) + "..."
              : location.description}
          </p>

          {/* Meta info */}
          <div className="flex items-center gap-3 mt-2">
            {location.opening_hours && (
              <span className="flex items-center gap-1 text-[11px] text-green-600">
                <Clock className="w-3 h-3" />
                Open
              </span>
            )}
            {location.floor_count && (
              <span className="flex items-center gap-1 text-[11px] text-gray-400">
                <Building className="w-3 h-3" />
                {location.floor_count} floors
              </span>
            )}
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-medium"
              style={{
                background: `${color}10`,
                color: color,
              }}
            >
              {location.category.replace("_", " ")}
            </span>
          </div>
        </div>

        {/* Selection indicator */}
        {isSelected && (
          <div className="flex-shrink-0 mt-1">
            <div className="w-2.5 h-2.5 bg-unilag-green rounded-full animate-pulse-soft" />
          </div>
        )}
      </div>
    </button>
  );
}
