"""
Search API Routes
"""

from fastapi import APIRouter, Query
from models.schemas import SearchResult
from data.locations import search_locations

router = APIRouter()


@router.get("/", response_model=SearchResult)
async def search(
    q: str = Query(..., min_length=1, max_length=100, description="Search query"),
    limit: int = Query(10, ge=1, le=50, description="Max results to return"),
):
    """
    Search for campus locations.
    Searches across names, descriptions, popular names, and categories.
    """
    results = search_locations(q)

    if limit:
        results = results[:limit]

    return SearchResult(
        locations=results,
        query=q,
        total_results=len(results),
    )
