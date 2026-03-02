"""
UNILAG Digital Campus Map - Backend API
Built with FastAPI
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.locations import router as locations_router
from routes.directions import router as directions_router
from routes.search import router as search_router

app = FastAPI(
    title="UNILAG Digital Campus Map API",
    description="API for the University of Lagos digital campus navigation system",
    version="1.0.0",
)

# CORS - Allow frontend to communicate with backend
# In production, add your frontend URL to the allow_origins list
allowed_origins = [
    "http://localhost:3000",  # Next.js dev server
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "https://campus-map-fe.vercel.app",  # Production frontend
]

# Add production frontend URL if set
frontend_url = os.getenv("FRONTEND_URL")
if frontend_url:
    allowed_origins.extend([url.strip().rstrip("/") for url in frontend_url.split(",")])

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(locations_router, prefix="/api/locations", tags=["Locations"])
app.include_router(directions_router, prefix="/api/directions", tags=["Directions"])
app.include_router(search_router, prefix="/api/search", tags=["Search"])


@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "Welcome to the UNILAG Digital Campus Map API",
        "version": "1.0.0",
        "docs": "/docs",
    }


@app.get("/api/health", tags=["Health"])
async def health_check():
    return {"status": "healthy"}
