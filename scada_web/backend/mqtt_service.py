from state import global_state

class MockMQTTService:
    def __init__(self):
        self.connected = False

    def connect(self):
        self.connected = True
        global_state.devices["esp32"] = "CONNECTED"

    def publish(self, topic, message):
        pass

mqtt = MockMQTTService()
