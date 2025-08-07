import React from 'react';
import { OperationalRecord } from '../types';
import { groupByField } from '../utils/dataUtils';

interface ChartsProps {
  data: OperationalRecord[];
}

export const Charts: React.FC<ChartsProps> = ({ data }) => {
  const statusGroups = groupByField(data, 'status');
  const activityGroups = groupByField(data, 'activityType');
  const locationGroups = groupByField(data, 'location');
  const responsibleGroups = groupByField(data, 'responsible');

  const BarChart: React.FC<{ title: string; data: Record<string, number>; colorClass: string }> = ({ title, data, colorClass }) => {
    const entries = Object.entries(data).sort(([,a], [,b]) => b - a).slice(0, 8);
    const maxValue = Math.max(...entries.map(([,count]) => count));

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="space-y-3">
          {entries.map(([label, count]) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-24 text-sm text-gray-600 truncate flex-shrink-0" title={label}>
                {label}
              </div>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${colorClass}`}
                    style={{ width: `${(count / maxValue) * 100}%` }}
                  />
                </div>
                <div className="w-8 text-sm font-medium text-gray-900">
                  {count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const PieChart: React.FC<{ title: string; data: Record<string, number> }> = ({ title, data }) => {
    const entries = Object.entries(data);
    const total = entries.reduce((sum, [,count]) => sum + count, 0);

    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-orange-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
      'bg-red-500'
    ];

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="space-y-2">
          {entries.map(([label, count], index) => {
            const percentage = ((count / total) * 100).toFixed(1);
            return (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`} />
                  <span className="text-sm text-gray-600 truncate max-w-[120px]" title={label}>
                    {label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">{count}</span>
                  <span className="text-xs text-gray-500">({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <PieChart title="Distribuição por Status" data={statusGroups} />
      <BarChart title="Atividades por Tipo" data={activityGroups} colorClass="bg-indigo-500" />
      <BarChart title="Registros por Localização" data={locationGroups} colorClass="bg-teal-500" />
      <BarChart title="Registros por Responsável" data={responsibleGroups} colorClass="bg-purple-500" />
    </div>
  );
};