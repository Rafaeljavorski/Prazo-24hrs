
import React, { useState, useEffect } from 'react';
import type { Ticket, TimeLeft } from '../types';
import { calculateTimeLeft, formatTime } from '../utils/dateUtils';

interface TicketCardProps {
  ticket: Ticket;
}

const ProgressBar: React.FC<{ percentage: number; color: string }> = ({ percentage, color }) => {
    return (
        <div className="w-full bg-brand-accent rounded-full h-2.5">
            <div className={`${color} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
        </div>
    );
};

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft(ticket.slaExpiration));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(ticket.slaExpiration));
    }, 1000);

    return () => clearInterval(timer);
  }, [ticket.slaExpiration]);
  
  const totalSlaSeconds = 24 * 60 * 60;
  const remainingSeconds = timeLeft ? timeLeft.totalSeconds : 0;
  const percentage = Math.max(0, (remainingSeconds / totalSlaSeconds) * 100);

  const getStatusStyles = () => {
    if (!timeLeft) {
      return {
        borderColor: 'border-red-500',
        textColor: 'text-red-400',
        bgColor: 'bg-red-500',
        progressColor: 'bg-red-500',
        message: 'SLA Expirado'
      };
    }
    if (percentage < 25) { // Less than 6 hours left
      return {
        borderColor: 'border-yellow-500',
        textColor: 'text-yellow-400',
        bgColor: 'bg-yellow-500',
        progressColor: 'bg-yellow-500',
        message: 'Atenção'
      };
    }
    return {
      borderColor: 'border-green-500',
      textColor: 'text-green-400',
      bgColor: 'bg-green-500',
      progressColor: 'bg-green-500',
      message: 'No Prazo'
    };
  };

  const styles = getStatusStyles();

  return (
    <div className={`bg-brand-card rounded-lg shadow-xl border-l-4 ${styles.borderColor} p-4 flex flex-col h-full transition-shadow duration-300 hover:shadow-2xl`}>
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-white text-lg">{ticket.recurso || 'Não Atribuído'}</h3>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${styles.bgColor}`}>
                {styles.message}
            </span>
        </div>
        <p className="text-sm text-brand-text-secondary mb-1">Protocolo: {ticket.protocolo}</p>
        <p className="text-sm text-brand-text-secondary">Cliente: {ticket.nome}</p>
        <p className="text-xs text-brand-accent mt-2">{ticket.endereco}, {ticket.status}</p>
      </div>

      <div className="mt-4 pt-4 border-t border-brand-accent">
        <div className={`text-center mb-2 ${styles.textColor}`}>
          {timeLeft ? (
            <div className="font-mono text-3xl tracking-tighter">
              <span>{formatTime(timeLeft.hours + timeLeft.days * 24)}</span>:
              <span>{formatTime(timeLeft.minutes)}</span>:
              <span>{formatTime(timeLeft.seconds)}</span>
            </div>
          ) : (
            <div className="font-mono text-3xl tracking-tighter">00:00:00</div>
          )}
        </div>
        <ProgressBar percentage={percentage} color={styles.progressColor} />
        <div className="text-xs text-center text-brand-text-secondary mt-2">
          Vencimento: {ticket.slaExpiration.toLocaleString('pt-BR')}
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
