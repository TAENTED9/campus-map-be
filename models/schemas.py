"""
Data models for the UNILAG Campus Map API
"""

from pydantic import BaseModel
from typing import Optional
from enum import Enum


class LocationCategory(str, Enum):
    FACULTY = "faculty"
    HOSTEL = "hostel"
    LIBRARY = "library"
    ADMIN = "admin"
    SPORTS = "sports"
    RELIGIOUS = "religious"
    CAFETERIA = "cafeteria"
    GATE = "gate"
    BUS_STOP = "bus_stop"
    LANDMARK = "landmark"
    HEALTH = "health"
    LECTURE_HALL = "lecture_hall"
    LAB = "lab"
    OTHER = "other"


class Coordinates(BaseModel):
    lat: float
    lng: float


class Location(BaseModel):
    id: str
    name: str
    short_name: Optional[str] = None
    category: LocationCategory
    coordinates: Coordinates
    description: str
    landmarks_nearby: list[str] = []
    image_url: Optional[str] = None
    opening_hours: Optional[str] = None
    floor_count: Optional[int] = None
    popular_name: Optional[str] = None  # What students actually call it


class DirectionStep(BaseModel):
    instruction: str
    distance_estimate: Optional[str] = None  # e.g., "~200m" or "2 min walk"
    landmark: Optional[str] = None


class Direction(BaseModel):
    from_location: str
    to_location: str
    from_name: str
    to_name: str
    steps: list[DirectionStep]
    total_distance: Optional[str] = None
    total_time: Optional[str] = None
    difficulty: Optional[str] = "easy"  # easy, moderate, far


class SearchResult(BaseModel):
    locations: list[Location]
    query: str
    total_results: int


class CategoryInfo(BaseModel):
    category: LocationCategory
    label: str
    icon: str
    count: int
    color: str
