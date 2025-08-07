export interface OperationalRecord {
  id: string;
  timestamp: string;
  activityType: string;
  responsible: string;
  location: string;
  description: string;
  status: 'Resolvido' | 'Em Andamento' | 'Pendente' | 'Satisfatório';
  photos?: string[];
  category?: string;
}

export interface DashboardMetrics {
  totalRecords: number;
  resolvedCount: number;
  pendingCount: number;
  inProgressCount: number;
  todayRecords: number;
  resolutionRate: number;
}

export interface FilterState {
  searchTerm: string;
  status: string;
  activityType: string;
  responsible: string;
  dateRange: {
    start: string;
    end: string;
  };
}