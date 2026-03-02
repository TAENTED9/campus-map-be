"""
UNILAG Campus Directions Data
Human-readable walking directions between popular campus locations.

NOTE TO DEVELOPERS:
These directions are written from a student's perspective.
Update them based on real walking experience on campus.
"""

from models.schemas import Direction, DirectionStep

# ============================================================
# DIRECTIONS DATABASE
# Each direction is a one-way route. For reverse, a separate
# entry should be created (or the frontend can reverse steps).
# ============================================================

DIRECTIONS: list[Direction] = [
    # ── FROM MAIN GATE ─────────────────────────────────────
    Direction(
        from_location="main-gate",
        to_location="fac-social-sciences",
        from_name="Main Gate",
        to_name="Faculty of Social Sciences",
        steps=[
            DirectionStep(
                instruction="Enter through the Main Gate and walk straight along the main road.",
                distance_estimate="~300m",
                landmark="Main Gate",
            ),
            DirectionStep(
                instruction="Continue straight, passing the Senate Building bus stop on your left.",
                distance_estimate="~200m",
                landmark="Senate Building Bus Stop",
            ),
            DirectionStep(
                instruction="You'll see the Senate Building on your left. Keep going straight past it.",
                distance_estimate="~150m",
                landmark="Senate Building",
            ),
            DirectionStep(
                instruction="Pass Jaja Hall on your right side.",
                distance_estimate="~100m",
                landmark="Jaja Hall",
            ),
            DirectionStep(
                instruction="Turn right at the junction. The Faculty of Social Sciences building is ahead on your left.",
                distance_estimate="~50m",
                landmark="Faculty of Social Sciences",
            ),
        ],
        total_distance="~800m",
        total_time="10–12 min walk",
        difficulty="easy",
    ),
    Direction(
        from_location="main-gate",
        to_location="senate-building",
        from_name="Main Gate",
        to_name="Senate Building",
        steps=[
            DirectionStep(
                instruction="Enter through the Main Gate and walk straight along the main road.",
                distance_estimate="~300m",
                landmark="Main Gate",
            ),
            DirectionStep(
                instruction="Continue walking straight. You'll see the Senate Building ahead on your left — it's one of the tallest and most prominent buildings.",
                distance_estimate="~200m",
                landmark="Senate Building Bus Stop",
            ),
            DirectionStep(
                instruction="The Senate Building is on your left. Enter through the main entrance.",
                distance_estimate="~50m",
                landmark="Senate Building",
            ),
        ],
        total_distance="~550m",
        total_time="7–8 min walk",
        difficulty="easy",
    ),
    Direction(
        from_location="main-gate",
        to_location="main-library",
        from_name="Main Gate",
        to_name="Main Library",
        steps=[
            DirectionStep(
                instruction="Enter through the Main Gate and walk straight along the main road.",
                distance_estimate="~300m",
            ),
            DirectionStep(
                instruction="Keep going straight past the bus stop area towards the Senate Building.",
                distance_estimate="~200m",
                landmark="Senate Building Bus Stop",
            ),
            DirectionStep(
                instruction="The Main Library (Hezekiah Oluwasanmi Library) is located near the Senate Building, slightly to the right.",
                distance_estimate="~100m",
                landmark="Senate Building",
            ),
        ],
        total_distance="~600m",
        total_time="8–10 min walk",
        difficulty="easy",
    ),
    Direction(
        from_location="main-gate",
        to_location="fac-engineering",
        from_name="Main Gate",
        to_name="Faculty of Engineering",
        steps=[
            DirectionStep(
                instruction="Enter through the Main Gate and walk straight along the main road.",
                distance_estimate="~300m",
            ),
            DirectionStep(
                instruction="At the major junction near the Senate area, take the road branching to the right towards the Science area.",
                distance_estimate="~200m",
                landmark="Senate Area Junction",
            ),
            DirectionStep(
                instruction="Continue along this road past the Faculty of Science complex.",
                distance_estimate="~300m",
                landmark="Faculty of Science",
            ),
            DirectionStep(
                instruction="The Faculty of Engineering complex is ahead. You'll see the large buildings and workshops.",
                distance_estimate="~200m",
                landmark="Faculty of Engineering",
            ),
        ],
        total_distance="~1km",
        total_time="12–15 min walk",
        difficulty="moderate",
    ),
    Direction(
        from_location="main-gate",
        to_location="jaja-hall",
        from_name="Main Gate",
        to_name="Jaja Hall",
        steps=[
            DirectionStep(
                instruction="Enter through the Main Gate and walk straight along the main road.",
                distance_estimate="~300m",
            ),
            DirectionStep(
                instruction="Continue walking straight past the bus stop and Senate Building.",
                distance_estimate="~250m",
                landmark="Senate Building",
            ),
            DirectionStep(
                instruction="Jaja Hall is on your right side, just past the Senate Building area. You'll see the hostel block.",
                distance_estimate="~100m",
                landmark="Jaja Hall",
            ),
        ],
        total_distance="~650m",
        total_time="8–10 min walk",
        difficulty="easy",
    ),
    Direction(
        from_location="main-gate",
        to_location="fac-law",
        from_name="Main Gate",
        to_name="Faculty of Law",
        steps=[
            DirectionStep(
                instruction="Enter through the Main Gate and walk straight along the main road.",
                distance_estimate="~300m",
            ),
            DirectionStep(
                instruction="Continue past the Senate Building on your left.",
                distance_estimate="~200m",
                landmark="Senate Building",
            ),
            DirectionStep(
                instruction="The Faculty of Law is located past the Main Auditorium area on your left.",
                distance_estimate="~200m",
                landmark="Main Auditorium",
            ),
        ],
        total_distance="~700m",
        total_time="9–11 min walk",
        difficulty="easy",
    ),

    # ── FROM JAJA HALL ─────────────────────────────────────
    Direction(
        from_location="jaja-hall",
        to_location="fac-social-sciences",
        from_name="Jaja Hall",
        to_name="Faculty of Social Sciences",
        steps=[
            DirectionStep(
                instruction="Exit Jaja Hall and walk towards the road in front.",
                distance_estimate="~50m",
            ),
            DirectionStep(
                instruction="Turn left and walk along the road. The Faculty of Social Sciences is a short walk ahead on your left.",
                distance_estimate="~150m",
                landmark="Faculty of Social Sciences",
            ),
        ],
        total_distance="~200m",
        total_time="3–4 min walk",
        difficulty="easy",
    ),
    Direction(
        from_location="jaja-hall",
        to_location="main-library",
        from_name="Jaja Hall",
        to_name="Main Library",
        steps=[
            DirectionStep(
                instruction="Exit Jaja Hall and head towards the Senate Building area.",
                distance_estimate="~100m",
            ),
            DirectionStep(
                instruction="Walk past the Senate Building. The Main Library is just nearby.",
                distance_estimate="~150m",
                landmark="Senate Building",
            ),
        ],
        total_distance="~250m",
        total_time="3–5 min walk",
        difficulty="easy",
    ),
    Direction(
        from_location="jaja-hall",
        to_location="sports-center",
        from_name="Jaja Hall",
        to_name="Sports Center",
        steps=[
            DirectionStep(
                instruction="Exit Jaja Hall and walk towards the hostels area (away from Senate Building).",
                distance_estimate="~100m",
            ),
            DirectionStep(
                instruction="Pass by Amina Hall and continue walking through the residential area.",
                distance_estimate="~200m",
                landmark="Amina Hall",
            ),
            DirectionStep(
                instruction="Keep walking until you see the Sports Center complex with the football field and track.",
                distance_estimate="~200m",
                landmark="Sports Center",
            ),
        ],
        total_distance="~500m",
        total_time="6–8 min walk",
        difficulty="easy",
    ),

    # ── FROM NEW HALL ──────────────────────────────────────
    Direction(
        from_location="new-hall",
        to_location="main-library",
        from_name="New Hall",
        to_name="Main Library",
        steps=[
            DirectionStep(
                instruction="Exit New Hall and walk towards the main campus road.",
                distance_estimate="~100m",
            ),
            DirectionStep(
                instruction="Head towards the Senate Building area following the main road.",
                distance_estimate="~300m",
                landmark="Hostel Area Road",
            ),
            DirectionStep(
                instruction="Continue past the hostels until you reach the Senate Building. The library is right nearby.",
                distance_estimate="~200m",
                landmark="Senate Building",
            ),
        ],
        total_distance="~600m",
        total_time="8–10 min walk",
        difficulty="easy",
    ),
    Direction(
        from_location="new-hall",
        to_location="fac-science",
        from_name="New Hall",
        to_name="Faculty of Science",
        steps=[
            DirectionStep(
                instruction="Exit New Hall and walk towards the main campus.",
                distance_estimate="~100m",
            ),
            DirectionStep(
                instruction="Take the road heading towards the academic area. Pass through the hostel zone.",
                distance_estimate="~300m",
            ),
            DirectionStep(
                instruction="Continue towards the Science area. The Faculty of Science complex is one of the larger building clusters.",
                distance_estimate="~400m",
                landmark="Faculty of Science",
            ),
        ],
        total_distance="~800m",
        total_time="10–12 min walk",
        difficulty="moderate",
    ),

    # ── BETWEEN FACULTIES ──────────────────────────────────
    Direction(
        from_location="fac-science",
        to_location="fac-engineering",
        from_name="Faculty of Science",
        to_name="Faculty of Engineering",
        steps=[
            DirectionStep(
                instruction="From the Faculty of Science, head towards the Engineering area. They are relatively close to each other.",
                distance_estimate="~200m",
            ),
            DirectionStep(
                instruction="The Faculty of Engineering complex with its workshops and large buildings is just ahead.",
                distance_estimate="~100m",
                landmark="Faculty of Engineering",
            ),
        ],
        total_distance="~300m",
        total_time="4–5 min walk",
        difficulty="easy",
    ),
    Direction(
        from_location="fac-arts",
        to_location="fac-social-sciences",
        from_name="Faculty of Arts",
        to_name="Faculty of Social Sciences",
        steps=[
            DirectionStep(
                instruction="From the Faculty of Arts, walk towards the Social Sciences area. They are neighboring faculties.",
                distance_estimate="~100m",
            ),
            DirectionStep(
                instruction="The Faculty of Social Sciences building is right ahead.",
                distance_estimate="~50m",
                landmark="Faculty of Social Sciences",
            ),
        ],
        total_distance="~150m",
        total_time="2–3 min walk",
        difficulty="easy",
    ),

    # ── SENATE BUILDING ROUTES ─────────────────────────────
    Direction(
        from_location="senate-building",
        to_location="main-auditorium",
        from_name="Senate Building",
        to_name="Main Auditorium",
        steps=[
            DirectionStep(
                instruction="Exit the Senate Building and walk towards the main road.",
                distance_estimate="~50m",
            ),
            DirectionStep(
                instruction="The Main Auditorium (J.F. Ade-Ajayi Auditorium) is very close, just a short walk from the Senate Building.",
                distance_estimate="~100m",
                landmark="Main Auditorium",
            ),
        ],
        total_distance="~150m",
        total_time="2–3 min walk",
        difficulty="easy",
    ),
    Direction(
        from_location="senate-building",
        to_location="health-center",
        from_name="Senate Building",
        to_name="Health Center",
        steps=[
            DirectionStep(
                instruction="Exit the Senate Building and head towards the hostel area.",
                distance_estimate="~100m",
            ),
            DirectionStep(
                instruction="Walk past the Student Union Building area.",
                distance_estimate="~100m",
                landmark="SUB",
            ),
            DirectionStep(
                instruction="The Health Center is located in the residential area, a short walk from the main academic zone.",
                distance_estimate="~100m",
                landmark="Health Center",
            ),
        ],
        total_distance="~300m",
        total_time="4–5 min walk",
        difficulty="easy",
    ),
]


def get_all_directions() -> list[Direction]:
    """Return all available directions."""
    return DIRECTIONS


def get_direction(from_id: str, to_id: str) -> Direction | None:
    """Find directions between two specific locations."""
    for direction in DIRECTIONS:
        if direction.from_location == from_id and direction.to_location == to_id:
            return direction
    return None


def get_directions_from(from_id: str) -> list[Direction]:
    """Get all directions starting from a specific location."""
    return [d for d in DIRECTIONS if d.from_location == from_id]


def get_popular_routes() -> list[Direction]:
    """Return the most popular/useful routes for freshers."""
    popular_from = ["main-gate", "jaja-hall", "new-hall"]
    return [d for d in DIRECTIONS if d.from_location in popular_from]
