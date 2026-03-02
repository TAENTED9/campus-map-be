"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import DirectionsPanel from "@/components/DirectionsPanel";
import {
  getAllLocations,
  getCategories,
  searchLocations,
  getDirections,
  getPopularRoutes,
} from "@/lib/api";
import { Navigation, Compass, Menu, X } from "lucide-react";

// Dynamically import map (Leaflet needs browser APIs)
const CampusMap = dynamic(() => import("@/components/CampusMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <Compass className="w-10 h-10 text-unilag-green animate-spin mx-auto mb-3" />
        <p className="text-gray-500 font-medium">Loading campus map...</p>
      </div>
    </div>
  ),
});

export default function HomePage() {
  // ── State ────────────────────────────────────────────────
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Directions state
  const [directionsMode, setDirectionsMode] = useState(false);
  const [directionFrom, setDirectionFrom] = useState(null);
  const [directionTo, setDirectionTo] = useState(null);
  const [currentDirections, setCurrentDirections] = useState(null);
  const [directionsError, setDirectionsError] = useState(null);
  const [popularRoutes, setPopularRoutes] = useState([]);

  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // ── Load Initial Data ────────────────────────────────────
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [locs, cats, routes] = await Promise.all([
          getAllLocations(),
          getCategories(),
          getPopularRoutes(),
        ]);
        setLocations(locs);
        setFilteredLocations(locs);
        setCategories(cats);
        setPopularRoutes(routes);
      } catch (err) {
        setError("Failed to load campus data. Make sure the backend is running.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // ── Responsive detection ─────────────────────────────────
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ── Category Filter ──────────────────────────────────────
  const handleCategoryFilter = useCallback(
    (category) => {
      if (selectedCategory === category) {
        setSelectedCategory(null);
        setFilteredLocations(locations);
      } else {
        setSelectedCategory(category);
        setFilteredLocations(
          locations.filter((loc) => loc.category === category)
        );
      }
      setSearchResults(null);
      setSearchQuery("");
    },
    [selectedCategory, locations]
  );

  // ── Search ───────────────────────────────────────────────
  const handleSearch = useCallback(
    async (query) => {
      setSearchQuery(query);

      if (!query.trim()) {
        setSearchResults(null);
        setFilteredLocations(
          selectedCategory
            ? locations.filter((loc) => loc.category === selectedCategory)
            : locations
        );
        return;
      }

      try {
        const results = await searchLocations(query);
        setSearchResults(results);
        setFilteredLocations(results.locations);
      } catch (err) {
        // Fallback: client-side filter
        const q = query.toLowerCase();
        const filtered = locations.filter(
          (loc) =>
            loc.name.toLowerCase().includes(q) ||
            (loc.short_name || "").toLowerCase().includes(q) ||
            (loc.popular_name || "").toLowerCase().includes(q) ||
            loc.description.toLowerCase().includes(q)
        );
        setFilteredLocations(filtered);
      }
    },
    [locations, selectedCategory]
  );

  // ── Location Selection ───────────────────────────────────
  const handleLocationSelect = useCallback(
    (location) => {
      setSelectedLocation(location);

      // In directions mode, set from/to
      if (directionsMode) {
        if (!directionFrom) {
          setDirectionFrom(location);
        } else if (!directionTo) {
          setDirectionTo(location);
        }
      }

      if (isMobile) {
        setSidebarOpen(false);
      }
    },
    [directionsMode, directionFrom, directionTo, isMobile]
  );

  // ── Directions ───────────────────────────────────────────
  const handleGetDirections = useCallback(async () => {
    if (!directionFrom || !directionTo) return;

    setDirectionsError(null);
    try {
      const dirs = await getDirections(directionFrom.id, directionTo.id);
      setCurrentDirections(dirs);
    } catch (err) {
      setDirectionsError(
        `No directions available from "${directionFrom.short_name || directionFrom.name}" to "${directionTo.short_name || directionTo.name}" yet. Try a different route.`
      );
    }
  }, [directionFrom, directionTo]);

  useEffect(() => {
    if (directionFrom && directionTo) {
      handleGetDirections();
    }
  }, [directionFrom, directionTo, handleGetDirections]);

  const handleSelectPopularRoute = useCallback((route) => {
    const from = locations.find((l) => l.id === route.from_location);
    const to = locations.find((l) => l.id === route.to_location);
    if (from && to) {
      setDirectionsMode(true);
      setDirectionFrom(from);
      setDirectionTo(to);
    }
  }, [locations]);

  const clearDirections = useCallback(() => {
    setDirectionsMode(false);
    setDirectionFrom(null);
    setDirectionTo(null);
    setCurrentDirections(null);
    setDirectionsError(null);
  }, []);

  // ── Error State ──────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-campus-bg flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-panel p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Connection Error
          </h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <div className="bg-gray-50 rounded-xl p-4 text-left text-sm text-gray-600 font-mono">
            <p className="mb-1">
              <span className="text-unilag-green">$</span> cd backend
            </p>
            <p className="mb-1">
              <span className="text-unilag-green">$</span> pip install -r
              requirements.txt
            </p>
            <p>
              <span className="text-unilag-green">$</span> uvicorn main:app
              --reload
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Render ───────────────────────────────────────────────
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="bg-white border-b border-campus-border px-4 py-3 flex items-center gap-3 z-50 shadow-sm">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-unilag-green rounded-xl flex items-center justify-center shadow-sm">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-tight">
              UNILAG Map
            </h1>
            <p className="text-[11px] text-gray-400 leading-tight hidden sm:block">
              University of Lagos Campus Navigator
            </p>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-4">
          <SearchBar
            value={searchQuery}
            onChange={handleSearch}
            resultCount={searchResults?.total_results}
          />
        </div>

        <button
          onClick={() => {
            if (directionsMode) {
              clearDirections();
            } else {
              setDirectionsMode(true);
              setSidebarOpen(true);
            }
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            directionsMode
              ? "bg-unilag-green text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Navigation className="w-4 h-4" />
          <span className="hidden sm:inline">
            {directionsMode ? "Exit Directions" : "Directions"}
          </span>
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Sidebar */}
        <div
          className={`sidebar-container bg-white border-r border-campus-border transition-all duration-300 ease-in-out z-40 ${
            sidebarOpen
              ? "w-full md:w-[380px] lg:w-[420px]"
              : "w-0 overflow-hidden"
          } ${isMobile ? "absolute inset-0 md:relative" : ""}`}
        >
          {isMobile && sidebarOpen && (
            <div className="sidebar-handle" />
          )}
          <Sidebar
            locations={filteredLocations}
            categories={categories}
            selectedCategory={selectedCategory}
            selectedLocation={selectedLocation}
            onCategoryFilter={handleCategoryFilter}
            onLocationSelect={handleLocationSelect}
            isLoading={isLoading}
            directionsMode={directionsMode}
            directionFrom={directionFrom}
            directionTo={directionTo}
            currentDirections={currentDirections}
            directionsError={directionsError}
            onClearDirections={clearDirections}
            popularRoutes={popularRoutes}
            onSelectPopularRoute={handleSelectPopularRoute}
            allLocations={locations}
          />
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <CampusMap
            locations={filteredLocations}
            selectedLocation={selectedLocation}
            onLocationSelect={handleLocationSelect}
            directionFrom={directionFrom}
            directionTo={directionTo}
            directionsMode={directionsMode}
          />
        </div>
      </div>
    </div>
  );
}
