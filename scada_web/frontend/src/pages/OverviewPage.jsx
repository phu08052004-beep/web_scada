import React from 'react';
import { useScada } from '../context/ScadaContext';

const WarehouseMap = ({ inventory, label }) => {
  return (
    <div className="w-64 border-2 border-dashed border-slate-600 rounded-lg p-4 relative mb-6">
      <div className="absolute -top-3 left-4 bg-slate-900 px-2 text-xs font-bold text-slate-400">
        {label}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {inventory && inventory.map((occupied, idx) => (
          <div 
            key={idx} 
            className={`w-12 h-12 rounded border flex items-center justify-center transition-all ${
              occupied 
                ? 'bg-green-500/20 border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]' 
                : 'bg-slate-800 border-slate-700'
            }`}
          >
            <span className="text-xs text-slate-500">VT0{idx + 1}</span>
            {occupied && <div className="absolute w-6 h-6 bg-green-500 rounded-sm shadow-md"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

const OverviewPage = () => {
  const { state, sendCommand, connected } = useScada();

  const handleCommand = (cmd) => {
    sendCommand(cmd);
  };

  const sys = state?.system || {};
  const dev = state?.devices || {};
  const inv = state?.inventory || { kho1: [false,false,false,false,false,false], kho2: [false,false,false,false,false,false] };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Main Dashboard Area */}
        <div className="xl:col-span-3 space-y-6">
          <div className="glass-panel p-6">
            <h3 className="text-lg font-bold text-white mb-4">Trạng thái hệ thống</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                <div className="text-sm text-slate-400 mb-1">System Mode</div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${sys.mode === 'RUNNING' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]' : (sys.mode === 'READY' ? 'bg-blue-500' : 'bg-slate-500')}`}></div>
                  <span className={`font-bold ${sys.mode === 'RUNNING' ? 'text-green-400' : 'text-slate-300'}`}>{sys.mode || 'N/A'}</span>
                </div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                <div className="text-sm text-slate-400 mb-1">Operation Mode</div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded text-xs font-bold">{sys.op_mode || 'N/A'}</span>
                </div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                <div className="text-sm text-slate-400 mb-1">Current Command</div>
                <div className="font-bold text-slate-200">{sys.current_command || 'WAIT'}</div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                <div className="text-sm text-slate-400 mb-1">X-Axis Current</div>
                <div className="font-bold text-slate-200">{state?.axis?.x_cur.toFixed(2) || 0} mm</div>
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-6 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
             {/* Mimic Diagram */}
             <div className="flex gap-12 mt-6">
                <WarehouseMap inventory={inv.kho1} label="KHO 1" />
                <WarehouseMap inventory={inv.kho2} label="KHO 2" />
             </div>
             
             {/* Simple AGV simulation representation */}
             {sys.mode === 'RUNNING' && (
               <div className="absolute bottom-10 flex gap-4 items-center">
                 <div className="w-16 h-8 bg-yellow-500 rounded shadow-[0_0_15px_rgba(234,179,8,0.5)] flex items-center justify-center font-bold text-[10px] animate-pulse">AGV</div>
                 <div className="w-10 h-2 bg-blue-500 rounded"></div>
               </div>
             )}
          </div>
        </div>
        
        {/* Sidebar Controls */}
        <div className="space-y-6">
          <div className="glass-panel p-6">
            <h3 className="text-lg font-bold text-white mb-4">Điều khiển</h3>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handleCommand('start')} className="bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-bold shadow-lg shadow-green-600/20 transition-colors">
                START
              </button>
              <button onClick={() => handleCommand('stop')} className="bg-red-600 hover:bg-red-500 text-white py-3 rounded-lg font-bold shadow-lg shadow-red-600/20 transition-colors">
                STOP
              </button>
              <button onClick={() => handleCommand('reset')} className="bg-yellow-600 hover:bg-yellow-500 text-white py-3 rounded-lg font-bold shadow-lg shadow-yellow-600/20 transition-colors col-span-2">
                RESET
              </button>
              <button onClick={() => handleCommand('auto')} className={`py-3 rounded-lg font-bold transition-colors ${sys.op_mode === 'AUTO' ? 'bg-blue-600 shadow-lg shadow-blue-600/20' : 'bg-slate-700'}`}>
                AUTO
              </button>
              <button onClick={() => handleCommand('manual')} className={`py-3 rounded-lg font-bold transition-colors ${sys.op_mode === 'MANU' ? 'bg-blue-600 shadow-lg shadow-blue-600/20' : 'bg-slate-700'}`}>
                MANU
              </button>
              <button onClick={() => handleCommand('nhap')} className="bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-bold transition-colors col-span-2">
                NHẬP KHO
              </button>
              <button onClick={() => handleCommand('xuat')} className="bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg font-bold transition-colors col-span-2">
                XUẤT KHO
              </button>
            </div>
          </div>
          
          <div className="glass-panel p-6">
             <h3 className="text-lg font-bold text-white mb-4">Kết nối thiết bị</h3>
             <div className="space-y-3">
               <div className="flex justify-between items-center">
                 <span className="text-slate-400 text-sm">PLC S7-1200</span>
                 <span className={`status-badge ${dev.plc === 'CONNECTED' ? 'ok' : 'inactive'}`}>{dev.plc || 'DISCONNECTED'}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-slate-400 text-sm">Camera Vision</span>
                 <span className={`status-badge ${dev.camera === 'CONNECTED' ? 'ok' : 'inactive'}`}>{dev.camera || 'DISCONNECTED'}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-slate-400 text-sm">ESP32 (MQTT)</span>
                 <span className={`status-badge ${dev.esp32 === 'CONNECTED' ? 'ok' : 'inactive'}`}>{dev.esp32 || 'DISCONNECTED'}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-slate-400 text-sm">Database</span>
                 <span className={`status-badge ${dev.sql === 'CONNECTED' ? 'ok' : 'inactive'}`}>{dev.sql || 'DISCONNECTED'}</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
