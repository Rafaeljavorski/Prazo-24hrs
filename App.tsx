
import React, { useState, useEffect } from 'react';
import type { Ticket } from './types';
import { getRepairTickets } from './services/dataService';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const repairTickets = await getRepairTickets();
        setTickets(repairTickets);
      } catch (err) {
        setError('Failed to load ticket data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-4 text-lg">Loading Tickets...</p>
          </div>
        )}
        {error && (
          <div className="text-center p-8 bg-red-900/50 rounded-lg">
            <p className="text-red-400 text-xl">{error}</p>
          </div>
        )}
        {!loading && !error && <Dashboard tickets={tickets} />}
      </main>
    </div>
  );
};

export default App;
