"""
UNILAG Campus Location Data
University of Lagos, Akoka, Lagos, Nigeria

NOTE TO DEVELOPERS:
These coordinates are approximate. For production use, walk the campus
with a GPS app to get precise coordinates for each building.
The UNILAG campus center is approximately at: 6.5158°N, 3.3898°E
"""

from models.schemas import Location, Coordinates, LocationCategory

# ============================================================
# CAMPUS LOCATIONS DATABASE
# ============================================================

LOCATIONS: list[Location] = [
    # ── GATES ──────────────────────────────────────────────
    Location(
        id="main-gate",
        name="Main Gate (University Road Entrance)",
        short_name="Main Gate",
        category=LocationCategory.GATE,
        coordinates=Coordinates(lat=6.5175, lng=3.3965),
        description="The primary entrance to the University of Lagos campus from University Road, Akoka. Most students and visitors enter through here.",
        landmarks_nearby=["Unilag Second Gate", "Commercial Area"],
        popular_name="Front Gate",
    ),
    Location(
        id="second-gate",
        name="Second Gate",
        short_name="Second Gate",
        category=LocationCategory.GATE,
        coordinates=Coordinates(lat=6.5210, lng=3.3920),
        description="Secondary entrance to the campus. Leads towards the Engineering and Science areas.",
        landmarks_nearby=["Main Gate", "Faculty of Engineering"],
        popular_name="Second Gate",
    ),

    # ── FACULTIES ──────────────────────────────────────────
    Location(
        id="fac-arts",
        name="Faculty of Arts",
        short_name="Arts",
        category=LocationCategory.FACULTY,
        coordinates=Coordinates(lat=6.5155, lng=3.3880),
        description="Home to departments including English, History, Philosophy, Creative Arts, Linguistics, and more. One of the oldest faculties on campus.",
        landmarks_nearby=["Senate Building", "Faculty of Social Sciences"],
        opening_hours="8:00 AM - 6:00 PM (Mon-Fri)",
        floor_count=3,
    ),
    Location(
        id="fac-social-sciences",
        name="Faculty of Social Sciences",
        short_name="Social Sciences",
        category=LocationCategory.FACULTY,
        coordinates=Coordinates(lat=6.5148, lng=3.3870),
        description="Houses departments such as Psychology, Sociology, Economics, Geography, Political Science, and Mass Communication.",
        landmarks_nearby=["Faculty of Arts", "Jaja Hall"],
        opening_hours="8:00 AM - 6:00 PM (Mon-Fri)",
        floor_count=3,
        popular_name="Social Sci",
    ),
    Location(
        id="fac-science",
        name="Faculty of Science",
        short_name="Science",
        category=LocationCategory.FACULTY,
        coordinates=Coordinates(lat=6.5180, lng=3.3870),
        description="One of the largest faculties. Departments include Mathematics, Physics, Chemistry, Botany, Zoology, Computer Science, and more.",
        landmarks_nearby=["DLI", "Faculty of Engineering"],
        opening_hours="8:00 AM - 6:00 PM (Mon-Fri)",
        floor_count=4,
    ),
    Location(
        id="fac-engineering",
        name="Faculty of Engineering",
        short_name="Engineering",
        category=LocationCategory.FACULTY,
        coordinates=Coordinates(lat=6.5195, lng=3.3855),
        description="Houses Civil, Mechanical, Electrical, Chemical, Systems, Surveying and other engineering departments. Known for its large complex and workshops.",
        landmarks_nearby=["Faculty of Science", "Engineering Auditorium"],
        opening_hours="8:00 AM - 6:00 PM (Mon-Fri)",
        floor_count=4,
        popular_name="Engine",
    ),
    Location(
        id="fac-law",
        name="Faculty of Law",
        short_name="Law",
        category=LocationCategory.FACULTY,
        coordinates=Coordinates(lat=6.5135, lng=3.3895),
        description="The Faculty of Law with its moot court and law library. Known for producing many of Nigeria's top legal minds.",
        landmarks_nearby=["Senate Building", "Main Auditorium"],
        opening_hours="8:00 AM - 6:00 PM (Mon-Fri)",
        floor_count=3,
    ),
    Location(
        id="fac-education",
        name="Faculty of Education",
        short_name="Education",
        category=LocationCategory.FACULTY,
        coordinates=Coordinates(lat=6.5160, lng=3.3850),
        description="Houses departments of Educational Administration, Educational Foundations, and more. Has teaching practice facilities.",
        landmarks_nearby=["Faculty of Science", "DLI"],
        opening_hours="8:00 AM - 6:00 PM (Mon-Fri)",
        floor_count=3,
    ),
    Location(
        id="fac-business-admin",
        name="Faculty of Business Administration",
        short_name="Business Admin",
        category=LocationCategory.FACULTY,
        coordinates=Coordinates(lat=6.5130, lng=3.3870),
        description="Also known as FBA. Houses Accounting, Finance, Business Admin, and Actuarial Science departments.",
        landmarks_nearby=["Faculty of Law", "Senate Building"],
        opening_hours="8:00 AM - 6:00 PM (Mon-Fri)",
        floor_count=3,
        popular_name="FBA",
    ),
    Location(
        id="fac-pharmacy",
        name="Faculty of Pharmacy",
        short_name="Pharmacy",
        category=LocationCategory.FACULTY,
        coordinates=Coordinates(lat=6.5175, lng=3.3840),
        description="The Faculty of Pharmacy building. Houses pharmaceutical chemistry, pharmacology, and related departments.",
        landmarks_nearby=["Faculty of Science", "College of Medicine"],
        opening_hours="8:00 AM - 5:00 PM (Mon-Fri)",
        floor_count=3,
    ),
    Location(
        id="fac-env-sciences",
        name="Faculty of Environmental Sciences",
        short_name="Env Sciences",
        category=LocationCategory.FACULTY,
        coordinates=Coordinates(lat=6.5190, lng=3.3845),
        description="Houses Architecture, Building, Estate Management, Quantity Surveying, and Urban & Regional Planning.",
        landmarks_nearby=["Faculty of Engineering", "Faculty of Science"],
        opening_hours="8:00 AM - 6:00 PM (Mon-Fri)",
    ),

    # ── HOSTELS ────────────────────────────────────────────
    Location(
        id="jaja-hall",
        name="Jaja Hall (King Jaja Hall)",
        short_name="Jaja Hall",
        category=LocationCategory.HOSTEL,
        coordinates=Coordinates(lat=6.5140, lng=3.3860),
        description="One of the oldest male hostels on campus. Named after King Jaja of Opobo. Located near the Faculty of Social Sciences.",
        landmarks_nearby=["Faculty of Social Sciences", "Amina Hall"],
        popular_name="Jaja",
    ),
    Location(
        id="eni-njoku-hall",
        name="Eni Njoku Hall",
        short_name="Eni Njoku",
        category=LocationCategory.HOSTEL,
        coordinates=Coordinates(lat=6.5125, lng=3.3855),
        description="Male hostel named after Professor Eni Njoku, the first Nigerian Vice-Chancellor of the University of Nigeria.",
        landmarks_nearby=["Jaja Hall", "Biobaku Hall"],
        popular_name="Eni Njoku",
    ),
    Location(
        id="amina-hall",
        name="Amina Hall (Queen Amina Hall)",
        short_name="Amina Hall",
        category=LocationCategory.HOSTEL,
        coordinates=Coordinates(lat=6.5130, lng=3.3845),
        description="Female hostel named after Queen Amina of Zaria. One of the major female halls of residence.",
        landmarks_nearby=["Jaja Hall", "Moremi Hall"],
        popular_name="Amina",
    ),
    Location(
        id="moremi-hall",
        name="Moremi Hall",
        short_name="Moremi Hall",
        category=LocationCategory.HOSTEL,
        coordinates=Coordinates(lat=6.5118, lng=3.3840),
        description="Female hostel named after Moremi Ajasoro. Popular hall located within the residential area of campus.",
        landmarks_nearby=["Amina Hall", "Fagunwa Hall"],
        popular_name="Moremi",
    ),
    Location(
        id="biobaku-hall",
        name="Biobaku Hall",
        short_name="Biobaku Hall",
        category=LocationCategory.HOSTEL,
        coordinates=Coordinates(lat=6.5115, lng=3.3860),
        description="Male hostel named after Professor Saburi Biobaku, a distinguished Nigerian historian.",
        landmarks_nearby=["Eni Njoku Hall", "Mariere Hall"],
        popular_name="Biobaku",
    ),
    Location(
        id="fagunwa-hall",
        name="Fagunwa Hall",
        short_name="Fagunwa Hall",
        category=LocationCategory.HOSTEL,
        coordinates=Coordinates(lat=6.5108, lng=3.3850),
        description="Mixed hostel. Named after Chief D.O. Fagunwa, the pioneer Yoruba novelist.",
        landmarks_nearby=["Moremi Hall", "Sports Center"],
        popular_name="Fagunwa",
    ),
    Location(
        id="mariere-hall",
        name="Mariere Hall",
        short_name="Mariere Hall",
        category=LocationCategory.HOSTEL,
        coordinates=Coordinates(lat=6.5110, lng=3.3870),
        description="Male hall of residence. Named after Chief T.A. Mariere.",
        landmarks_nearby=["Biobaku Hall", "New Hall"],
        popular_name="Mariere",
    ),
    Location(
        id="new-hall",
        name="New Hall (Honours Hall)",
        short_name="New Hall",
        category=LocationCategory.HOSTEL,
        coordinates=Coordinates(lat=6.5105, lng=3.3880),
        description="One of the newer hostels on campus. Offers relatively better facilities. Also called Honours Hall.",
        landmarks_nearby=["Mariere Hall", "Sports Center"],
        popular_name="New Hall",
    ),
    Location(
        id="sodeinde-hall",
        name="Sodeinde Hall",
        short_name="Sodeinde Hall",
        category=LocationCategory.HOSTEL,
        coordinates=Coordinates(lat=6.5120, lng=3.3835),
        description="Female hostel on the UNILAG campus.",
        landmarks_nearby=["Amina Hall", "Kofo Hall"],
        popular_name="Sodeinde",
    ),
    Location(
        id="kofo-hall",
        name="Kofo Ademola Hall",
        short_name="Kofo Hall",
        category=LocationCategory.HOSTEL,
        coordinates=Coordinates(lat=6.5112, lng=3.3830),
        description="Female hostel named after Lady Kofo Ademola, the first Nigerian woman to receive a university degree.",
        landmarks_nearby=["Sodeinde Hall", "Madam Tinubu Hall"],
        popular_name="Kofo",
    ),

    # ── ADMIN & LANDMARKS ─────────────────────────────────
    Location(
        id="senate-building",
        name="Senate Building",
        short_name="Senate",
        category=LocationCategory.ADMIN,
        coordinates=Coordinates(lat=6.5150, lng=3.3890),
        description="The administrative headquarters of the University. Houses the Vice-Chancellor's office and key administrative departments. One of the most iconic buildings on campus.",
        landmarks_nearby=["Faculty of Arts", "Main Auditorium"],
        opening_hours="8:00 AM - 4:00 PM (Mon-Fri)",
        floor_count=5,
        popular_name="Senate",
    ),
    Location(
        id="main-auditorium",
        name="Main Auditorium (J.F. Ade-Ajayi Auditorium)",
        short_name="Main Auditorium",
        category=LocationCategory.LANDMARK,
        coordinates=Coordinates(lat=6.5145, lng=3.3900),
        description="The largest auditorium on campus. Used for convocations, major lectures, and events. Named after Professor J.F. Ade Ajayi.",
        landmarks_nearby=["Senate Building", "Faculty of Law"],
        popular_name="Main Audi",
    ),
    Location(
        id="dli",
        name="Distance Learning Institute (DLI)",
        short_name="DLI",
        category=LocationCategory.ADMIN,
        coordinates=Coordinates(lat=6.5170, lng=3.3860),
        description="Handles distance learning and part-time degree programmes at the University of Lagos.",
        landmarks_nearby=["Faculty of Science", "Faculty of Education"],
        opening_hours="8:00 AM - 5:00 PM (Mon-Fri)",
        popular_name="DLI",
    ),
    Location(
        id="sub",
        name="Student Union Building (SUB)",
        short_name="SUB",
        category=LocationCategory.LANDMARK,
        coordinates=Coordinates(lat=6.5138, lng=3.3885),
        description="The Student Union Building. A hub for student activities, meetings, and social events.",
        landmarks_nearby=["Senate Building", "Jaja Hall"],
        popular_name="SUB",
    ),
    Location(
        id="works-dept",
        name="Works and Physical Planning Department",
        short_name="Works Dept",
        category=LocationCategory.ADMIN,
        coordinates=Coordinates(lat=6.5200, lng=3.3900),
        description="Handles campus infrastructure, maintenance, and physical planning.",
        landmarks_nearby=["Second Gate", "Faculty of Engineering"],
        opening_hours="8:00 AM - 4:00 PM (Mon-Fri)",
    ),

    # ── LIBRARIES ──────────────────────────────────────────
    Location(
        id="main-library",
        name="University Main Library (Hezekiah Oluwasanmi Library)",
        short_name="Main Library",
        category=LocationCategory.LIBRARY,
        coordinates=Coordinates(lat=6.5155, lng=3.3895),
        description="The central library of the university. Named after Professor Hezekiah Oluwasanmi. Contains a vast collection of books, journals, and digital resources.",
        landmarks_nearby=["Senate Building", "Faculty of Arts"],
        opening_hours="8:00 AM - 10:00 PM (Mon-Sat)",
        floor_count=4,
        popular_name="Main Library",
    ),
    Location(
        id="law-library",
        name="Law Library",
        short_name="Law Library",
        category=LocationCategory.LIBRARY,
        coordinates=Coordinates(lat=6.5133, lng=3.3898),
        description="The dedicated library for the Faculty of Law. Contains legal texts, journals, and case reports.",
        landmarks_nearby=["Faculty of Law", "Main Auditorium"],
        opening_hours="8:00 AM - 8:00 PM (Mon-Fri)",
    ),

    # ── SPORTS ─────────────────────────────────────────────
    Location(
        id="sports-center",
        name="UNILAG Sports Center",
        short_name="Sports Center",
        category=LocationCategory.SPORTS,
        coordinates=Coordinates(lat=6.5100, lng=3.3870),
        description="The main sports complex. Includes the football field, running track, basketball courts, and gymnasium.",
        landmarks_nearby=["New Hall", "Fagunwa Hall"],
        popular_name="Sports Center",
    ),
    Location(
        id="swimming-pool",
        name="UNILAG Swimming Pool",
        short_name="Swimming Pool",
        category=LocationCategory.SPORTS,
        coordinates=Coordinates(lat=6.5095, lng=3.3865),
        description="The university swimming pool facility. Open to students and staff.",
        landmarks_nearby=["Sports Center", "New Hall"],
    ),

    # ── RELIGIOUS ──────────────────────────────────────────
    Location(
        id="chapel",
        name="Chapel of Christ",
        short_name="Chapel",
        category=LocationCategory.RELIGIOUS,
        coordinates=Coordinates(lat=6.5142, lng=3.3875),
        description="The main Christian chapel on the UNILAG campus.",
        landmarks_nearby=["Jaja Hall", "SUB"],
    ),
    Location(
        id="central-mosque",
        name="UNILAG Central Mosque",
        short_name="Mosque",
        category=LocationCategory.RELIGIOUS,
        coordinates=Coordinates(lat=6.5148, lng=3.3865),
        description="The central mosque on the UNILAG campus, serving the Muslim community.",
        landmarks_nearby=["Faculty of Social Sciences", "Chapel"],
    ),

    # ── FOOD & CAFETERIA ───────────────────────────────────
    Location(
        id="indomie-base",
        name="Indomie & Noodles Joints Area",
        short_name="Indomie Base",
        category=LocationCategory.CAFETERIA,
        coordinates=Coordinates(lat=6.5140, lng=3.3870),
        description="Popular student food area near the hostels. Known for affordable noodles and quick meals.",
        landmarks_nearby=["Jaja Hall", "Amina Hall"],
        popular_name="Indomie Base",
    ),
    Location(
        id="faculty-cafeteria",
        name="Senate Building Cafeteria",
        short_name="Senate Cafe",
        category=LocationCategory.CAFETERIA,
        coordinates=Coordinates(lat=6.5152, lng=3.3892),
        description="Cafeteria near the Senate Building area. Serves a variety of Nigerian dishes.",
        landmarks_nearby=["Senate Building", "Main Library"],
        opening_hours="7:30 AM - 6:00 PM (Mon-Fri)",
    ),

    # ── HEALTH ─────────────────────────────────────────────
    Location(
        id="health-center",
        name="UNILAG Health Center",
        short_name="Health Center",
        category=LocationCategory.HEALTH,
        coordinates=Coordinates(lat=6.5132, lng=3.3880),
        description="The campus health center providing medical services to students and staff. Handles routine check-ups and emergencies.",
        landmarks_nearby=["Senate Building", "Jaja Hall"],
        opening_hours="8:00 AM - 8:00 PM (Mon-Sun)",
        popular_name="Health Center",
    ),

    # ── BUS STOPS ──────────────────────────────────────────
    Location(
        id="bus-stop-main-gate",
        name="Main Gate Bus Stop",
        short_name="Main Gate Stop",
        category=LocationCategory.BUS_STOP,
        coordinates=Coordinates(lat=6.5173, lng=3.3960),
        description="Bus stop located near the main gate. Major pick-up and drop-off point for campus shuttles and commercial buses.",
        landmarks_nearby=["Main Gate"],
    ),
    Location(
        id="bus-stop-senate",
        name="Senate Building Bus Stop",
        short_name="Senate Stop",
        category=LocationCategory.BUS_STOP,
        coordinates=Coordinates(lat=6.5152, lng=3.3895),
        description="Bus stop near the Senate Building. Central campus location.",
        landmarks_nearby=["Senate Building", "Main Library"],
    ),
    Location(
        id="bus-stop-education",
        name="Education Bus Stop",
        short_name="Education Stop",
        category=LocationCategory.BUS_STOP,
        coordinates=Coordinates(lat=6.5162, lng=3.3855),
        description="Bus stop near the Faculty of Education.",
        landmarks_nearby=["Faculty of Education", "DLI"],
    ),

    # ── LECTURE HALLS ──────────────────────────────────────
    Location(
        id="cits",
        name="Centre for Information Technology & Systems (CITS)",
        short_name="CITS",
        category=LocationCategory.LECTURE_HALL,
        coordinates=Coordinates(lat=6.5165, lng=3.3875),
        description="Computer lab and IT center. Hosts computer-based tests (CBTs) and IT courses.",
        landmarks_nearby=["Faculty of Science", "DLI"],
        opening_hours="8:00 AM - 6:00 PM (Mon-Fri)",
        popular_name="CITS",
    ),
    Location(
        id="multipurpose-hall",
        name="Multipurpose Hall",
        short_name="Multipurpose Hall",
        category=LocationCategory.LECTURE_HALL,
        coordinates=Coordinates(lat=6.5143, lng=3.3905),
        description="Large lecture hall used for exams, orientations, and major academic events.",
        landmarks_nearby=["Main Auditorium", "Senate Building"],
        popular_name="MPH",
    ),
]


def get_all_locations() -> list[Location]:
    """Return all campus locations."""
    return LOCATIONS


def get_location_by_id(location_id: str) -> Location | None:
    """Find a single location by its ID."""
    for loc in LOCATIONS:
        if loc.id == location_id:
            return loc
    return None


def get_locations_by_category(category: LocationCategory) -> list[Location]:
    """Filter locations by category."""
    return [loc for loc in LOCATIONS if loc.category == category]


def search_locations(query: str) -> list[Location]:
    """Search locations by name, description, popular name, or category."""
    query_lower = query.lower().strip()
    results = []

    for loc in LOCATIONS:
        # Check name, short name, popular name, description, and category
        searchable = " ".join(
            filter(
                None,
                [
                    loc.name.lower(),
                    (loc.short_name or "").lower(),
                    (loc.popular_name or "").lower(),
                    loc.description.lower(),
                    loc.category.value.lower(),
                    " ".join(loc.landmarks_nearby).lower(),
                ],
            )
        )
        if query_lower in searchable:
            results.append(loc)

    # Sort by relevance: exact name match first, then short name, then others
    def sort_key(loc: Location):
        name_lower = loc.name.lower()
        short_lower = (loc.short_name or "").lower()
        popular_lower = (loc.popular_name or "").lower()

        if query_lower == name_lower or query_lower == short_lower:
            return 0
        if query_lower == popular_lower:
            return 1
        if query_lower in name_lower or query_lower in short_lower:
            return 2
        if query_lower in popular_lower:
            return 3
        return 4

    results.sort(key=sort_key)
    return results
