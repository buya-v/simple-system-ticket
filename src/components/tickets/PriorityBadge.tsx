import React from 'react';
import { Priority } from '../../types';
import { cn } from '../../lib/utils';

interface PriorityBadgeProps {
  priority: Priority;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const colors = {
    Low: 'bg-slate-100 text-slate-600 border-slate-200',
    Medium: 'bg-amber-50 text-warning border-amber-200',
    High: 'bg-red-50 text-danger border-red-200',
  };

  return (
    <span className={cn(
      'px-2.5 py-0.5 rounded-full text-xs font-semibold border',
      colors[priority]
    )}>
      {priority}
    </span>
  );
};