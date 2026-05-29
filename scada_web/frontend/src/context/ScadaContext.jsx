import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const ScadaContext = createContext();

export const useScada = () => useContext(ScadaContext);

export const ScadaProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Configuration for Backend URL
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
    const wsUrl = backendUrl.replace(/^http/, 'ws') + '/ws/realtime';

    // Initial fetch
    axios.get(`${backendUrl}/api/dashboard/state`)
      .then(res => {
        setState(res.data);
      })
      .catch(err => console.error("Initial fetch failed", err));

    // WebSocket connection
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setConnected(true);
      console.log('WebSocket Connected');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setState(data);
      } catch (err) {
        console.error("Failed to parse ws message", err);
      }
    };

    ws.onclose = () => {
      setConnected(false);
      console.log('WebSocket Disconnected');
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendCommand = async (action) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
    try {
      await axios.post(`${backendUrl}/api/control/${action}`);
    } catch (err) {
      console.error(`Command ${action} failed`, err);
    }
  };

  return (
    <ScadaContext.Provider value={{ state, connected, sendCommand }}>
      {children}
    </ScadaContext.Provider>
  );
};
