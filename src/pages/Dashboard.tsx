import React, { useState } from 'react';
import { useTickets } from '../context/TicketContext';
import { PriorityBadge } from '../components/tickets/PriorityBadge';
import { StatusBadge } from '../components/tickets/StatusBadge';
import { Button } from '../components/ui/Button';
import { Plus, Trash2, Edit2, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ConfirmationModal } from '../components/common/ConfirmationModal';

export const Dashboard: React.FC = () => {
  const { tickets, deleteTicket } = useTickets();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredTickets = tickets.filter(ticket => 
    ticket.title.toLowerCase().includes(filter.toLowerCase()) ||
    ticket.status.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = () => {
    if (deleteId) {
      deleteTicket(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tickets Dashboard</h1>
          <p className="text-slate-500">Manage and track your support requests</p>
        </div>
        <Link to="/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Ticket
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              className="pl-9 input-field text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>

        {/* List */}
        {filteredTickets.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <p>No tickets found matching your criteria.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-slate-900">{ticket.title}</h3>
                    <PriorityBadge priority={ticket.priority} />
                    <StatusBadge status={ticket.status} />
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-1">{ticket.description}</p>
                  <p className="text-xs text-slate-400 mt-2">
                    Created: {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => navigate(`/edit/${ticket.id}`)}>
                    <Edit2 className="w-4 h-4 text-slate-500" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setDeleteId(ticket.id)}>
                    <Trash2 className="w-4 h-4 text-danger" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={!!deleteId}
        title="Delete Ticket"
        message="Are you sure you want to delete this ticket? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};