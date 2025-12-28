import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Ticket, TicketFormData } from '../types';
import { useAuth } from './AuthContext';

interface TicketContextType {
  tickets: Ticket[];
  addTicket: (data: TicketFormData) => void;
  updateTicket: (id: string, data: TicketFormData) => void;
  deleteTicket: (id: string) => void;
  getTicket: (id: string) => Ticket | undefined;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

const STORAGE_KEY = 'sst_tickets';

export const TicketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { user } = useAuth();

  // Load tickets on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTickets(JSON.parse(stored));
    } else {
      // Seed initial data if empty
      const initialData: Ticket[] = [
        {
          id: '1',
          title: 'Login page unresponsive',
          description: 'The submit button does not react on mobile devices.',
          priority: 'High',
          status: 'Open',
          createdBy: 'u-1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Update color scheme',
          description: 'Align with new branding guidelines.',
          priority: 'Low',
          status: 'In Progress',
          createdBy: 'u-1',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ];
      setTickets(initialData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    }
  }, []);

  // Sync to local storage whenever tickets change
  useEffect(() => {
    if (tickets.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    }
  }, [tickets]);

  const addTicket = (data: TicketFormData) => {
    if (!user) return;
    const newTicket: Ticket = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: 'Open',
      createdBy: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTickets((prev) => [newTicket, ...prev]);
  };

  const updateTicket = (id: string, data: TicketFormData) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, ...data, updatedAt: new Date().toISOString() }
          : t
      )
    );
  };

  const deleteTicket = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  const getTicket = (id: string) => {
    return tickets.find((t) => t.id === id);
  };

  return (
    <TicketContext.Provider value={{ tickets, addTicket, updateTicket, deleteTicket, getTicket }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};