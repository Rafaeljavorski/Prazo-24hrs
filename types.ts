
export interface Ticket {
  id: string;
  recurso: string;
  protocolo: string;
  creationDate: Date;
  slaExpiration: Date;
  nome: string;
  endereco: string;
  status: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}
