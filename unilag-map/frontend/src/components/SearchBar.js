"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, resultCount }) {
  const [localValue, setLocalValue] = useState(value);
  const debounceRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    setLocalValue(val);

    // Debounce the search
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange(val);
    }, 250);
  };

  const handleClear = () => {
    setLocalValue("");
    onChange("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleClear();
    }
  };

  return (
    <div className="relative">
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={localValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search faculties, hostels, landmarks..."
          className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-unilag-green/20 focus:border-unilag-green transition-all"
        />
        {localValue && (
          <button
            onClick={handleClear}
            className="absolute right-3 p-0.5 hover:bg-gray-200 rounded-md transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
      {resultCount !== undefined && resultCount !== null && localValue && (
        <div className="absolute top-full left-0 mt-1 px-3 py-1 bg-white rounded-lg shadow-sm border text-xs text-gray-500">
          {resultCount} location{resultCount !== 1 ? "s" : ""} found
        </div>
      )}
    </div>
  );
}
