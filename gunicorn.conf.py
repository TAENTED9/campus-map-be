import os
import multiprocessing

# Server socket
bind = f"0.0.0.0:{os.getenv('PORT', 8000)}"
backlog = 2048

# Worker processes
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "uvicorn.workers.UvicornWorker"
worker_connections = 1000
timeout = 30
keepalive = 2

# Logging
accesslog = "-"
errorlog = "-"
loglevel = "info"

# Process naming
proc_name = "unilag-campus-map-api"

# Server mechanics
daemon = False
umask = 0
tmp_upload_dir = None

# SSL (optional - set if needed)
# keyfile = "/path/to/keyfile"
# certfile = "/path/to/certfile"

# Application
raw_env = [
    "FRONTEND_URL=",
]
