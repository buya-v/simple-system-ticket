import React, { useState } from 'react';
import { Ticket, TicketFormData, Priority, Status } from '../../types';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

interface TicketFormProps {
  initialData?: Ticket;
  onSubmit: (data: TicketFormData) => void;
  isEditMode?: boolean;
}

export const TicketForm: React.FC<TicketFormProps> = ({ initialData, onSubmit, isEditMode = false }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState<Priority>(initialData?.priority || 'Low');
  const [status, setStatus] = useState<Status>(initialData?.status || 'Open');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    onSubmit({
      title,
      description,
      priority,
      status: isEditMode ? status : 'Open'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-6">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded text-sm font-medium">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
        <input
          type="text"
          className="input-field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="E.g., Login button not working"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
        <textarea
          className="input-field min-h-[120px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the issue in detail..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
          <select 
            className="input-field"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {isEditMode && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select 
              className="input-field"
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={() => navigate('/')}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditMode ? 'Update Ticket' : 'Create Ticket'}
        </Button>
      </div>
    </form>
  );
};