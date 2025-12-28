import React from 'react';
import { useTickets } from '../context/TicketContext';
import { TicketForm } from '../components/tickets/TicketForm';
import { TicketFormData } from '../types';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const EditTicket: React.FC = () => {
  const { getTicket, updateTicket } = useTickets();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const ticket = id ? getTicket(id) : undefined;

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <p>Ticket not found</p>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    );
  }

  const handleSubmit = (data: TicketFormData) => {
    if (id) {
      updateTicket(id, data);
      navigate('/');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4 pl-0 hover:bg-transparent">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold text-slate-900">Edit Ticket</h1>
        <p className="text-slate-500">Update the ticket status or details.</p>
      </div>
      <TicketForm initialData={ticket} onSubmit={handleSubmit} isEditMode />
    </div>
  );
};