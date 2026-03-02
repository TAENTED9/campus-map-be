"use client";

import { useState } from "react";
import LocationCard from "./LocationCard";
import DirectionsPanel from "./DirectionsPanel";
import {
  MapPin,
  Layers,
  Navigation,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function Sidebar({
  locations,
  categories,
  selectedCategory,
  selectedLocation,
  onCategoryFilter,
  onLocationSelect,
  isLoading,
  directionsMode,
  directionFrom,
  directionTo,
  currentDirections,
  directionsError,
  onClearDirections,
  popularRoutes,
  onSelectPopularRoute,
  allLocations,
}) {
  const [activeTab, setActiveTab] = useState("explore"); // explore | directions

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="h-full p-4 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="loading-shimmer h-20 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Tab Switcher */}
      <div className="flex border-b border-gray-100 px-4 pt-3">
        <button
          onClick={() => {
            setActiveTab("explore");
            if (directionsMode) onClearDirections();
          }}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-all ${
            activeTab === "explore" && !directionsMode
              ? "border-unilag-green text-unilag-green"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          <Layers className="w-4 h-4" />
          Explore
        </button>
        <button
          onClick={() => setActiveTab("directions")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-all ${
            activeTab === "directions" || directionsMode
              ? "border-unilag-green text-unilag-green"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          <Navigation className="w-4 h-4" />
          Directions
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {(activeTab === "directions" || directionsMode) ? (
          <DirectionsPanel
            directionFrom={directionFrom}
            directionTo={directionTo}
            currentDirections={currentDirections}
            directionsError={directionsError}
            onClear={onClearDirections}
            popularRoutes={popularRoutes}
            onSelectRoute={onSelectPopularRoute}
            allLocations={allLocations}
            onLocationSelect={onLocationSelect}
          />
        ) : (
          <div className="p-4 space-y-4">
            {/* Category Chips */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => onCategoryFilter(cat.category)}
                    className={`category-chip flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      selectedCategory === cat.category
                        ? "border-unilag-green bg-unilag-green/5 text-unilag-green active"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                    <span
                      className={`ml-0.5 text-[10px] px-1.5 py-0.5 rounded-full ${
                        selectedCategory === cat.category
                          ? "bg-unilag-green/10 text-unilag-green"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Location Count */}
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {selectedCategory
                  ? `${categories.find((c) => c.category === selectedCategory)?.label || "Filtered"} Locations`
                  : "All Locations"}
              </h3>
              <span className="text-xs text-gray-400">
                {locations.length} place{locations.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Location List */}
            {locations.length === 0 ? (
              <div className="text-center py-12">
                <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-400">No locations found</p>
                <p className="text-xs text-gray-300 mt-1">
                  Try a different search or category
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {locations.map((location, index) => (
                  <LocationCard
                    key={location.id}
                    location={location}
                    isSelected={selectedLocation?.id === location.id}
                    onClick={() => onLocationSelect(location)}
                    index={index}
                  />
                ))}
              </div>
            )}

            {/* Popular Routes Teaser */}
            {!selectedCategory && popularRoutes.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-unilag-gold" />
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Popular Routes
                  </h3>
                </div>
                <div className="space-y-2">
                  {popularRoutes.slice(0, 3).map((route, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        onSelectPopularRoute(route);
                        setActiveTab("directions");
                      }}
                      className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-unilag-green/5 to-transparent border border-unilag-green/10 rounded-xl hover:border-unilag-green/30 transition-all text-left group"
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
                          {route.total_time} · {route.total_distance}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-unilag-green transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
