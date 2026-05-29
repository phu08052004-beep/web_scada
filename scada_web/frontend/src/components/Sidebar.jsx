import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Camera, Settings, FileText, AlertTriangle } from 'lucide-react';

import { useScada } from '../context/ScadaContext';

const Sidebar = () => {
  const { connected } = useScada();
  const navItems = [
    { path: '/', label: 'Tổng quan', icon: LayoutDashboard },
    { path: '/vision', label: 'Vision', icon: Camera },
    { path: '/report', label: 'Report', icon: FileText },
    { path: '/alarm', label: 'Alarm', icon: AlertTriangle },
    { path: '/settings', label: 'Cài đặt', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700/50 flex flex-col hidden md:flex shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-700/50 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/50 flex items-center justify-center">
            <span className="font-bold text-green-400">S</span>
          </div>
          <span className="font-bold text-lg text-white tracking-widest">SCADA</span>
        </div>
      </div>
      
      <nav className="flex-1 py-6 px-3 flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30 border border-transparent'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-slate-700/50">
        <div className="glass-panel p-4 flex flex-col items-center justify-center text-center">
          <div className={`w-2 h-2 rounded-full mb-2 ${connected ? 'bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'}`}></div>
          <span className="text-xs text-slate-400 font-medium">SYSTEM {connected ? 'ONLINE' : 'OFFLINE'}</span>
          <span className="text-[10px] text-slate-500 mt-1">WebSocket {connected ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
