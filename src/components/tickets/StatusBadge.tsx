import React from 'react';
import { Status } from '../../types';
import { cn } from '../../lib/utils';

interface StatusBadgeProps {
  status: Status;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles = {
    'Open': 'bg-blue-50 text-primary border-blue-200',
    'In Progress': 'bg-amber-50 text-warning border-amber-200',
    'Resolved': 'bg-green-50 text-success border-green-200',
    'Closed': 'bg-slate-100 text-slate-500 border-slate-200',
  };

  return (
    <span className={cn(
      'px-2.5 py-0.5 rounded-full text-xs font-medium border',
      styles[status]
    )}>
      {status}
    </span>
  );
};