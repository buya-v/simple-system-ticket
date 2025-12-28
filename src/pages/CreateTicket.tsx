import React from 'react';
import { useTickets } from '../context/TicketContext';
import { TicketForm } from '../components/tickets/TicketForm';
import { TicketFormData } from '../types';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const CreateTicket: React.FC = () => {
  const { addTicket } = useTickets();
  const navigate = useNavigate();

  const handleSubmit = (data: TicketFormData) => {
    addTicket(data);
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4 pl-0 hover:bg-transparent">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold text-slate-900">Create New Ticket</h1>
        <p className="text-slate-500">Fill in the details below to open a request.</p>
      </div>
      <TicketForm onSubmit={handleSubmit} />
    </div>
  );
};