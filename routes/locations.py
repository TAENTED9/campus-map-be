"""
Location API Routes
"""

from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from models.schemas import Location, LocationCategory, CategoryInfo
from data.locations import (
    get_all_locations,
    get_location_by_id,
    get_locations_by_category,
)

router = APIRouter()


# Category metadata for the frontend
CATEGORY_META = {
    LocationCategory.FACULTY: {"label": "Faculties", "icon": "🎓", "color": "#4F46E5"},
    LocationCategory.HOSTEL: {"label": "Hostels", "icon": "🏠", "color": "#059669"},
    LocationCategory.LIBRARY: {"label": "Libraries", "icon": "📚", "color": "#D97706"},
    LocationCategory.ADMIN: {"label": "Admin", "icon": "🏛️", "color": "#7C3AED"},
    LocationCategory.SPORTS: {"label": "Sports", "icon": "⚽", "color": "#DC2626"},
    LocationCategory.RELIGIOUS: {"label": "Religious", "icon": "🕌", "color": "#0891B2"},
    LocationCategory.CAFETERIA: {"label": "Food & Cafeteria", "icon": "🍛", "color": "#EA580C"},
    LocationCategory.GATE: {"label": "Gates", "icon": "🚪", "color": "#4B5563"},
    LocationCategory.BUS_STOP: {"label": "Bus Stops", "icon": "🚌", "color": "#2563EB"},
    LocationCategory.LANDMARK: {"label": "Landmarks", "icon": "📍", "color": "#BE185D"},
    LocationCategory.HEALTH: {"label": "Health", "icon": "🏥", "color": "#16A34A"},
    LocationCategory.LECTURE_HALL: {"label": "Lecture Halls", "icon": "📖", "color": "#9333EA"},
    LocationCategory.LAB: {"label": "Labs", "icon": "🔬", "color": "#0D9488"},
    LocationCategory.OTHER: {"label": "Other", "icon": "📌", "color": "#6B7280"},
}


@router.get("/", response_model=list[Location])
async def list_locations(
    category: Optional[LocationCategory] = Query(None, description="Filter by category"),
    limit: Optional[int] = Query(None, ge=1, le=100, description="Limit results"),
):
    """Get all locations, optionally filtered by category."""
    if category:
        locations = get_locations_by_category(category)
    else:
        locations = get_all_locations()

    if limit:
        locations = locations[:limit]

    return locations


@router.get("/categories", response_model=list[CategoryInfo])
async def list_categories():
    """Get all location categories with counts."""
    all_locations = get_all_locations()
    categories = []

    for cat in LocationCategory:
        count = len([loc for loc in all_locations if loc.category == cat])
        if count > 0:
            meta = CATEGORY_META.get(cat, {"label": cat.value, "icon": "📌", "color": "#6B7280"})
            categories.append(
                CategoryInfo(
                    category=cat,
                    label=meta["label"],
                    icon=meta["icon"],
                    count=count,
                    color=meta["color"],
                )
            )

    return categories


@router.get("/{location_id}", response_model=Location)
async def get_location(location_id: str):
    """Get a specific location by ID."""
    location = get_location_by_id(location_id)
    if not location:
        raise HTTPException(status_code=404, detail=f"Location '{location_id}' not found")
    return location
