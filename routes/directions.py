"""
Directions API Routes
"""

from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from models.schemas import Direction
from data.directions import (
    get_all_directions,
    get_direction,
    get_directions_from,
    get_popular_routes,
)

router = APIRouter()


@router.get("/", response_model=list[Direction])
async def list_directions(
    from_location: Optional[str] = Query(None, description="Filter by starting location ID"),
):
    """Get all directions, optionally filtered by starting point."""
    if from_location:
        directions = get_directions_from(from_location)
    else:
        directions = get_all_directions()

    return directions


@router.get("/popular", response_model=list[Direction])
async def popular_routes():
    """Get popular routes that freshers commonly need."""
    return get_popular_routes()


@router.get("/find", response_model=Direction)
async def find_direction(
    from_id: str = Query(..., description="Starting location ID"),
    to_id: str = Query(..., description="Destination location ID"),
):
    """Get directions between two specific locations."""
    direction = get_direction(from_id, to_id)
    if not direction:
        raise HTTPException(
            status_code=404,
            detail=f"No directions found from '{from_id}' to '{to_id}'. Try searching for nearby routes.",
        )
    return direction
