
import React, { useMemo } from 'react';
import type { Ticket } from '../types';
import TicketCard from './TicketCard';
import { calculateTimeLeft } from '../utils/dateUtils';

interface DashboardProps {
  tickets: Ticket[];
}

const StatCard: React.FC<{ title: string; value: number; color: string }> = ({ title, value, color }) => (
    <div className="bg-brand-card p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <span className={`text-4xl font-bold ${color}`}>{value}</span>
        <span className="text-sm text-brand-text-secondary mt-1">{title}</span>
    </div>
);


const Dashboard: React.FC<DashboardProps> = ({ tickets }) => {
  const sortedTickets = useMemo(() => {
    return [...tickets].sort((a, b) => a.slaExpiration.getTime() - b.slaExpiration.getTime());
  }, [tickets]);

  const stats = useMemo(() => {
    const now = new Date();
    const expired = sortedTickets.filter(t => t.slaExpiration < now).length;
    const withinSla = sortedTickets.length - expired;
    return {
      total: sortedTickets.length,
      withinSla,
      expired,
    }
  }, [sortedTickets]);


  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard title="Total de Reparos" value={stats.total} color="text-blue-400" />
        <StatCard title="Dentro do SLA" value={stats.withinSla} color="text-green-400" />
        <StatCard title="SLA Expirado" value={stats.expired} color="text-red-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedTickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
