# Default State management
import time

class AppState:
    def __init__(self):
        self.system = {
            "mode": "READY", # READY, RUNNING, STOP, FAULT, ESTOP
            "op_mode": "AUTO", # AUTO, MANU
            "operation": "WAIT", # NHAP_KHO, XUAT_KHO, WAIT
            "current_command": "WAIT",
            "current_step": 0
        }
        self.devices = {
            "plc": "DISCONNECTED",
            "camera": "DISCONNECTED",
            "esp32": "DISCONNECTED",
            "sql": "DISCONNECTED",
            "vision_service": "STOPPED"
        }
        self.sensors = {
            "home_x": False, "home_y": False, "home_z": False,
            "ss_xla": False, "ss_tc_y": False, "ss_nhap": False, "ss_xuat": False,
            "bt_nhap": False, "bt_xuat": False, "xi_lanh": False,
            "step_x": False, "step_y": False, "step_z": False
        }
        self.axis = {
            "x_cur": 0.0, "x_tgt": 0.0,
            "y_cur": 0.0, "y_tgt": 0.0,
            "z_cur": 0.0, "z_tgt": 0.0
        }
        self.inventory = {
            "kho1": [False]*6,
            "kho2": [False]*6
        }
        self.agv = {
            "state": "IDLE",
            "load": False,
            "dock": "NONE"
        }
        self.vision = {
            "request": False,
            "result_valid": False,
            "result_code": 0,
            "label": "None",
            "confidence": 0.0
        }
        self.alarms = [
            {"id": "ALM-001", "time": time.time(), "code": "ALM-001", "desc": "Mất kết nối ESP32", "level": "WARN", "state": "ACK"},
            {"id": "ALM-003", "time": time.time(), "code": "ALM-003", "desc": "Timeout Vision", "level": "FAULT", "state": "ACT"},
            {"id": "ALM-005", "time": time.time(), "code": "ALM-005", "desc": "Motor overload", "level": "CRITICAL", "state": "ACT"}
        ]
        self.coordinates = {
            "kho1": [
                {"id": "VT01", "x": 1200, "y": 820, "z": 95},
                {"id": "VT02", "x": 1420, "y": 820, "z": 95},
                {"id": "VT03", "x": 1640, "y": 820, "z": 95},
                {"id": "VT04", "x": 1200, "y": 920, "z": 95},
                {"id": "VT05", "x": 1420, "y": 920, "z": 95},
                {"id": "VT06", "x": 1640, "y": 920, "z": 95}
            ],
            "kho2": [
                {"id": "VT01", "x": 2240, "y": 920, "z": 95},
                {"id": "VT02", "x": 2460, "y": 920, "z": 95},
                {"id": "VT03", "x": 2680, "y": 920, "z": 95},
                {"id": "VT04", "x": 2240, "y": 1020, "z": 95},
                {"id": "VT05", "x": 2460, "y": 1020, "z": 95},
                {"id": "VT06", "x": 2680, "y": 1020, "z": 95}
            ]
        }
        self.timeouts = {
            "vision": 3,
            "conveyor": 8,
            "agv": 12
        }

    def get_full_state(self):
        return {
            "system": self.system,
            "devices": self.devices,
            "sensors": self.sensors,
            "axis": self.axis,
            "inventory": self.inventory,
            "agv": self.agv,
            "vision": self.vision,
            "alarms": self.alarms
        }

global_state = AppState()
