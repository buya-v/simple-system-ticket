import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Ticket as TicketIcon } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 h-16 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2 text-primary">
        <TicketIcon className="w-6 h-6" />
        <span className="font-bold text-xl tracking-tight">SimpleTicket</span>
      </div>
      
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm text-slate-600 hidden sm:block">
            Welcome, <strong>{user.name}</strong>
          </span>
        )}
        <Button variant="ghost" size="sm" onClick={logout} className="text-slate-500">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
};