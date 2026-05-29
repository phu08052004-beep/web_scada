import os
from dotenv import load_dotenv

load_dotenv()

# Env Vars
APP_ENV = os.getenv("APP_ENV", "development")
DEMO_MODE = os.getenv("DEMO_MODE", "true").lower() == "true"
SECRET_KEY = os.getenv("SECRET_KEY", "change-me")

# PLC
PLC_IP = os.getenv("PLC_IP", "192.168.0.1")
PLC_RACK = int(os.getenv("PLC_RACK", "0"))
PLC_SLOT = int(os.getenv("PLC_SLOT", "1"))

# MQTT
MQTT_BROKER_IP = os.getenv("MQTT_BROKER_IP", "192.168.1.5")
MQTT_PORT = int(os.getenv("MQTT_PORT", "1883"))

# DB
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./scada_data.db")
SQL_SERVER = os.getenv("SQL_SERVER", "localhost\\SQLEXPRESS")
SQL_DATABASE = os.getenv("SQL_DATABASE", "SCADA_Warehouse")
SQL_AUTH = os.getenv("SQL_AUTH", "Windows")
SQL_DRIVER = os.getenv("SQL_DRIVER", "ODBC Driver 17 for SQL Server")

CAMERA_INDEX = int(os.getenv("CAMERA_INDEX", "0"))

# Mapped Config equivalent to old config.py
DB2_BOOL_MAP = {}
DB2_REAL_MAP = {}
DB1_BIT_MAP = {}
