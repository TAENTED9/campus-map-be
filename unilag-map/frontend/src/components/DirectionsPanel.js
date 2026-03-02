"use client";

import { useState } from "react";
import {
  Navigation,
  MapPin,
  ArrowRight,
  RotateCcw,
  Clock,
  Footprints,
  AlertCircle,
  ChevronDown,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export default function DirectionsPanel({
  directionFrom,
  directionTo,
  currentDirections,
  directionsError,
  onClear,
  popularRoutes,
  onSelectRoute,
  allLocations,
  onLocationSelect,
}) {
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");

  const filterLocations = (query) => {
    if (!query.trim()) return allLocations?.slice(0, 8) || [];
    const q = query.toLowerCase();
    return (allLocations || []).filter(
      (loc) =>
        loc.name.toLowerCase().includes(q) ||
        (loc.short_name || "").toLowerCase().includes(q) ||
        (loc.popular_name || "").toLowerCase().includes(q)
    );
  };

  return (
    <div className="p-4 space-y-4">
      {/* From / To Selector */}
      <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
        {/* FROM */}
        <div className="relative">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              setShowFromDropdown(!showFromDropdown);
              setShowToDropdown(false);
            }}
          >
            <div className="w-8 h-8 rounded-full bg-unilag-green flex items-center justify-center flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                From
              </p>
              <p className="text-sm font-medium text-gray-800 truncate">
                {directionFrom
                  ? directionFrom.short_name || directionFrom.name
                  : "Select starting point..."}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>

          {/* From Dropdown */}
          {showFromDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-panel border z-50 max-h-48 overflow-y-auto">
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Search location..."
                  value={fromSearch}
                  onChange={(e) => setFromSearch(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-unilag-green/20"
                  autoFocus
                />
              </div>
              {filterLocations(fromSearch).map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => {
                    onLocationSelect(loc);
                    setShowFromDropdown(false);
                    setFromSearch("");
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="truncate">
                    {loc.short_name || loc.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider with dots */}
        <div className="flex items-center pl-4 gap-0">
          <div className="flex flex-col gap-1 ml-[3px]">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          </div>
        </div>

        {/* TO */}
        <div className="relative">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              setShowToDropdown(!showToDropdown);
              setShowFromDropdown(false);
            }}
          >
            <div className="w-8 h-8 rounded-full bg-unilag-gold flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                To
              </p>
              <p className="text-sm font-medium text-gray-800 truncate">
                {directionTo
                  ? directionTo.short_name || directionTo.name
                  : "Select destination..."}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>

          {/* To Dropdown */}
          {showToDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-panel border z-50 max-h-48 overflow-y-auto">
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Search location..."
                  value={toSearch}
                  onChange={(e) => setToSearch(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-unilag-green/20"
                  autoFocus
                />
              </div>
              {filterLocations(toSearch).map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => {
                    onLocationSelect(loc);
                    setShowToDropdown(false);
                    setToSearch("");
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="truncate">
                    {loc.short_name || loc.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Reset button */}
        {(directionFrom || directionTo) && (
          <button
            onClick={onClear}
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-red-500 transition-colors mt-1"
          >
            <RotateCcw className="w-3 h-3" />
            Clear route
          </button>
        )}
      </div>

      {/* Directions Result */}
      {currentDirections && (
        <div className="animate-slide-up">
          {/* Summary */}
          <div className="flex items-center gap-4 mb-4 p-3 bg-unilag-green/5 border border-unilag-green/10 rounded-xl">
            <div className="flex items-center gap-1.5 text-sm">
              <Footprints className="w-4 h-4 text-unilag-green" />
              <span className="font-semibold text-gray-800">
                {currentDirections.total_distance}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Clock className="w-4 h-4 text-unilag-green" />
              <span className="font-semibold text-gray-800">
                {currentDirections.total_time}
              </span>
            </div>
            {currentDirections.difficulty && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  currentDirections.difficulty === "easy"
                    ? "bg-green-50 text-green-700"
                    : currentDirections.difficulty === "moderate"
                    ? "bg-yellow-50 text-yellow-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {currentDirections.difficulty}
              </span>
            )}
          </div>

          {/* Steps */}
          <div className="space-y-0">
            {currentDirections.steps.map((step, index) => (
              <div key={index} className="direction-line pb-4 relative">
                <div className="step-dot" />
                <div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {step.instruction}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    {step.distance_estimate && (
                      <span className="text-xs text-gray-400">
                        {step.distance_estimate}
                      </span>
                    )}
                    {step.landmark && (
                      <span className="text-xs text-unilag-green/70 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {step.landmark}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Destination reached */}
            <div className="flex items-center gap-3 pl-[32px] relative">
              <div
                className="w-10 h-10 rounded-full bg-unilag-gold flex items-center justify-center absolute"
                style={{ left: "3px" }}
              >
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="ml-12">
                <p className="text-sm font-semibold text-gray-800">
                  You&apos;ve arrived! 🎉
                </p>
                <p className="text-xs text-gray-400">
                  {currentDirections.to_name}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {directionsError && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl animate-fade-in">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-red-700">{directionsError}</p>
            <p className="text-xs text-red-400 mt-1">
              Try one of the popular routes below, or pick different locations.
            </p>
          </div>
        </div>
      )}

      {/* Popular Routes */}
      {!currentDirections && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-unilag-gold" />
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Popular Routes
            </h3>
          </div>
          <div className="space-y-2">
            {popularRoutes.map((route, i) => (
              <button
                key={i}
                onClick={() => onSelectRoute(route)}
                className="w-full flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl hover:border-unilag-green/30 hover:shadow-card transition-all text-left group"
              >
                <div className="w-8 h-8 bg-unilag-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Navigation className="w-4 h-4 text-unilag-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <span className="truncate">{route.from_name}</span>
                    <ArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{route.to_name}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {route.total_time} · {route.total_distance} ·{" "}
                    {route.difficulty}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-unilag-green transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
