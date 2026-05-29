# SCADA Warehouse Web Server

This project is a modern web-based migration of the `DO_AN_SCADA_stage31_Settings_SQL_UI_Redesign` Tkinter application.

## Technologies Used
- **Backend**: FastAPI, WebSockets, SQLite, SQLAlchemy.
- **Frontend**: React, Vite, TailwindCSS.

## Features
- **Real-time Dashboard**: Live system status updates and command controls.
- **Warehouse Mimic**: Visual mapping of Warehouse 1 & 2 inventories.
- **Device Connectivity**: (Mocked) status of PLC, MQTT ESP32, Camera, and Database.

## Running Locally

### 1. Backend
Open a terminal and navigate to the backend directory:
```bash
cd scada_web/backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Frontend
Open another terminal and navigate to the frontend directory:
```bash
cd scada_web/frontend
npm install
npm run dev
```

## Demo/Offline Mode
By default, the backend runs in a mock mode meaning it will simulate X/Y/Z axis movements and ignore the lack of real hardware (Siemens PLC, MQTT Broker, Camera). Ensure `DEMO_MODE=true` in `scada_web/.env.example` if migrating to `.env`.

## Deployment
For production deployment, use the standard `docker-compose.yml` (to be added) or deploy the frontend as a static site (Vercel/Render) and backend via Docker on VPS or Render.
