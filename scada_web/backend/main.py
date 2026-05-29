import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from state import global_state
from database import init_db
import json

app = FastAPI(title="SCADA Warehouse Web Server")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    init_db()
    # In a real scenario, start background tasks for PLC/MQTT here

@app.get("/api/dashboard/state")
def get_state():
    return global_state.get_full_state()

# MOCK COMMAND ROUTES
@app.post("/api/control/{action}")
def control_action(action: str):
    if action == "start":
        global_state.system["mode"] = "RUNNING"
    elif action == "stop":
        global_state.system["mode"] = "STOP"
    elif action == "reset":
        global_state.system["mode"] = "READY"
    elif action == "auto":
        global_state.system["op_mode"] = "AUTO"
    elif action == "manual":
        global_state.system["op_mode"] = "MANU"
    return {"status": "ok", "action": action}

# WEBSOCKET REALTIME
class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except:
                pass

manager = ConnectionManager()

@app.websocket("/ws/realtime")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Broadcast state every 500ms
            await asyncio.sleep(0.5)
            # In demo mode, let's mock some data changes
            if global_state.system["mode"] == "RUNNING":
                global_state.axis["x_cur"] += 1.5
                if global_state.axis["x_cur"] > 3000:
                    global_state.axis["x_cur"] = 0.0
            
            await manager.broadcast(json.dumps(global_state.get_full_state()))
    except WebSocketDisconnect:
        manager.disconnect(websocket)
