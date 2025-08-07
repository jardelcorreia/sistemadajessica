import { OperationalRecord, DashboardMetrics } from '../types';

export const calculateMetrics = (data: OperationalRecord[]): DashboardMetrics => {
  const total = data.length;
  const resolved = data.filter(record => 
    record.status === 'Resolvido' || record.status === 'Satisfatório'
  ).length;
  const pending = data.filter(record => record.status === 'Pendente').length;
  const inProgress = data.filter(record => record.status === 'Em Andamento').length;
  
  const today = new Date().toDateString();
  const todayRecords = data.filter(record => {
    const recordDate = new Date(record.timestamp).toDateString();
    return recordDate === today;
  }).length;
  
  const resolutionRate = total > 0 ? (resolved / total) * 100 : 0;
  
  return {
    totalRecords: total,
    resolvedCount: resolved,
    pendingCount: pending,
    inProgressCount: inProgress,
    todayRecords,
    resolutionRate
  };
};

export const filterData = (
  data: OperationalRecord[],
  searchTerm: string,
  statusFilter: string,
  activityTypeFilter: string,
  responsibleFilter: string,
  startDate?: string,
  endDate?: string
): OperationalRecord[] => {
  return data.filter(record => {
    const matchesSearch = !searchTerm || 
      record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.responsible.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || record.status === statusFilter;
    const matchesActivityType = !activityTypeFilter || record.activityType === activityTypeFilter;
    const matchesResponsible = !responsibleFilter || record.responsible === responsibleFilter;
    
    let matchesDateRange = true;
    if (startDate || endDate) {
      const recordDate = new Date(record.timestamp);
      if (startDate) matchesDateRange = matchesDateRange && recordDate >= new Date(startDate);
      if (endDate) matchesDateRange = matchesDateRange && recordDate <= new Date(endDate);
    }
    
    return matchesSearch && matchesStatus && matchesActivityType && 
           matchesResponsible && matchesDateRange;
  });
};

export const getUniqueValues = (data: OperationalRecord[], field: keyof OperationalRecord): string[] => {
  const values = data.map(record => record[field] as string).filter(Boolean);
  return Array.from(new Set(values)).sort();
};

export const exportToCSV = (data: OperationalRecord[]): string => {
  const headers = ['Data/Hora', 'Tipo de Atividade', 'Responsável', 'Localização', 'Descrição', 'Status', 'Fotos'];
  const rows = data.map(record => [
    record.timestamp,
    record.activityType,
    record.responsible,
    record.location,
    record.description,
    record.status,
    record.photos ? record.photos.length.toString() + ' foto(s)' : '0 fotos'
  ]);
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');
    
  return csvContent;
};

export const groupByField = (data: OperationalRecord[], field: keyof OperationalRecord): Record<string, number> => {
  const groups: Record<string, number> = {};
  
  data.forEach(record => {
    const value = record[field] as string;
    if (value) {
      groups[value] = (groups[value] || 0) + 1;
    }
  });
  
  return groups;
};