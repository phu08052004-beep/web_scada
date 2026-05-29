import React, { useState, useEffect } from 'react';
import { LogOut, User } from 'lucide-react';

const Header = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 bg-slate-800 border-b border-slate-700/50 flex items-center justify-between px-6 shrink-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-white tracking-wide hidden md:block">
          HỆ THỐNG LƯU KHO TỰ ĐỘNG KẾT HỢP XE TỰ HÀNH
        </h1>
        <h1 className="text-xl font-bold text-white tracking-wide md:hidden">
          SCADA WAREHOUSE
        </h1>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="text-slate-400 font-mono text-sm hidden sm:block">
          {time.toLocaleDateString('vi-VN')} {time.toLocaleTimeString('vi-VN')}
        </div>
        
        <div className="flex items-center gap-3 pl-6 border-l border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
              <User size={18} className="text-slate-300" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-medium text-slate-200">engineer</span>
              <span className="text-xs text-green-400">Admin</span>
            </div>
          </div>
          
          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors ml-2">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
