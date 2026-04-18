# 🗺️ UNILAG Digital Campus Map

An interactive digital map for the **University of Lagos (UNILAG)** campus, helping students navigate faculties, hostels, libraries, and more with walking directions.

Built with **FastAPI** (Python backend) and **Next.js** (React frontend).

![Status](https://img.shields.io/badge/status-MVP-brightgreen)
![Backend](https://img.shields.io/badge/backend-FastAPI-009688)
![Frontend](https://img.shields.io/badge/frontend-Next.js-000000)

---

## ✨ Features

- **Interactive Map** — Leaflet-based map with custom markers for every location category
- **Smart Search** — Search by name, popular name, category, or description
- **Category Filtering** — Filter by faculties, hostels, libraries, admin, sports, food, and more
- **Walking Directions** — Step-by-step text-based walking directions between locations
- **Popular Routes** — Pre-built common routes for freshers (Main Gate → Faculty of Social Sciences, etc.)
- **Mobile Responsive** — Works on phones with a collapsible sidebar
- **40+ Locations** — Faculties, hostels, libraries, gates, bus stops, sports facilities, cafeterias, and landmarks

---

## 🏗️ Project Structure

```txt
unilag-map/
├── backend/                   # FastAPI Backend
│   ├── main.py                # App entry point, CORS, router registration
│   ├── models/
│   │   └── schemas.py         # Pydantic models (Location, Direction, etc.)
│   ├── data/
│   │   ├── locations.py       # Campus location database + search logic
│   │   └── directions.py      # Walking directions database
│   ├── routes/
│   │   ├── locations.py       # GET /api/locations, /api/locations/categories
│   │   ├── directions.py      # GET /api/directions, /api/directions/find
│   │   └── search.py          # GET /api/search?q=...
│   └── requirements.txt
│
├── frontend/                  # Next.js Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.js      # Root layout with metadata
│   │   │   ├── page.js        # Main page (orchestrates everything)
│   │   │   └── globals.css    # Global styles + Leaflet overrides
│   │   ├── components/
│   │   │   ├── CampusMap.js   # Leaflet map with custom markers
│   │   │   ├── SearchBar.js   # Debounced search input
│   │   │   ├── Sidebar.js     # Category filters + location list
│   │   │   ├── LocationCard.js # Individual location card
│   │   │   └── DirectionsPanel.js # Walking directions display
│   │   └── lib/
│   │       └── api.js         # API helper functions
│   ├── package.json
│   ├── next.config.js         # API proxy to backend
│   ├── tailwind.config.js     # Custom UNILAG theme colors
│   └── postcss.config.js
│
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- **Python 3.10+** (for the backend)
- **Node.js 18+** and **npm** (for the frontend)

### 1. Clone or Download

```bash
cd campus-map-be
```

### 2. Start the Backend (FastAPI)

```bash
# Open Terminal 1
cd backend

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate        # macOS/Linux
# venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload --port 8000
```

The API will be running at **http://localhost:8000**

Visit **http://localhost:8000/docs** for the interactive Swagger API docs.

### 3. Start the Frontend (Next.js)

```bash
# Open Terminal 2
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be running at **http://localhost:3000**

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/locations/` | List all locations (optional `?category=faculty`) |
| GET | `/api/locations/categories` | List all categories with counts |
| GET | `/api/locations/{id}` | Get single location by ID |
| GET | `/api/search/?q=jaja` | Search locations by name/description |
| GET | `/api/directions/` | List all available directions |
| GET | `/api/directions/popular` | Get popular/common routes |
| GET | `/api/directions/find?from_id=main-gate&to_id=fac-social-sciences` | Get directions between two locations |

---

## 🎨 Customization

### Adding New Locations

Edit `backend/data/locations.py` and add a new `Location` object:

```python
Location(
    id="your-location-id",
    name="Full Location Name",
    short_name="Short Name",
    category=LocationCategory.FACULTY,  # Choose appropriate category
    coordinates=Coordinates(lat=6.XXXX, lng=3.XXXX),  # GPS coordinates
    description="Description of this location.",
    landmarks_nearby=["Nearby Place 1", "Nearby Place 2"],
    opening_hours="8:00 AM - 6:00 PM (Mon-Fri)",  # Optional
    popular_name="What students call it",  # Optional
),
```

**Tip:** Use Google Maps to get precise GPS coordinates. Right-click any spot and copy the coordinates.

### Adding New Directions

Edit `backend/data/directions.py` and add a new `Direction` object:

```python
Direction(
    from_location="starting-location-id",
    to_location="destination-location-id",
    from_name="Starting Point Name",
    to_name="Destination Name",
    steps=[
        DirectionStep(
            instruction="Walk straight from the starting point...",
            distance_estimate="~200m",
            landmark="Nearby Landmark",
        ),
        # Add more steps...
    ],
    total_distance="~500m",
    total_time="6-8 min walk",
    difficulty="easy",  # easy, moderate, far
),
```

### Updating Map Coordinates

The coordinates in this project are **approximate**. For the best experience:

1. Walk around campus with a GPS app (like Google Maps)
2. Drop a pin at each building
3. Copy the latitude/longitude
4. Update the coordinates in `backend/data/locations.py`

---

## 🛣️ Roadmap (Future Improvements)

- [ ] **Database Integration** — Move from in-memory data to PostgreSQL/SQLite
- [ ] **Admin Panel** — Web interface to add/edit locations without code changes
- [ ] **User Contributions** — Let students suggest new locations and directions
- [ ] **GPS Navigation** — Use browser geolocation for "You are here" feature
- [ ] **Photos** — Add images of each building for easier identification
- [ ] **Accessibility Info** — Wheelchair-accessible routes and facilities
- [ ] **Events Layer** — Show where campus events are happening
- [ ] **Bus Tracking** — Real-time campus shuttle tracking (future)
- [ ] **Offline Mode** — Cache map tiles for use without internet

---

## 🧪 For Your Project Report

If this is for an academic project, here's what to highlight:

1. **Problem Statement** — New students struggle to find their way around the large UNILAG campus
2. **Solution** — A web-based interactive map with search and directions
3. **Technology Stack** — FastAPI (modern Python web framework) + Next.js (React framework)
4. **User-Centered Design** — Categories, search, popular routes all designed for student needs
5. **Psychological Angle** — Reduces anxiety and stress for new students through spatial orientation support
6. **Testing** — User testing with freshers to validate the solution
7. **Scalability** — Architecture designed to grow with more features

---

## 📄 License

This is a student project. Feel free to use, modify, and build upon it.

---

**Built with ❤️ for UNILAG students**'
