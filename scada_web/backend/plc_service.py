import time
from state import global_state

class MockPLCService:
    def __init__(self):
        self.connected = False

    def connect(self):
        self.connected = True
        global_state.devices["plc"] = "CONNECTED"

    def read_data(self):
        # In a real scenario, this reads from SNAP7
        pass

    def write_bit(self, db, byte, bit, value):
        # Mock write
        pass

plc = MockPLCService()
