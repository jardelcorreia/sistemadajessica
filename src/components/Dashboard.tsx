import React from 'react';
import { BarChart3, TrendingUp, Clock, CheckCircle, AlertCircle, Activity } from 'lucide-react';
import { DashboardMetrics } from '../types';

interface DashboardProps {
  metrics: DashboardMetrics;
}

export const Dashboard: React.FC<DashboardProps> = ({ metrics }) => {
  const cards = [
    {
      title: 'Total de Registros',
      value: metrics.totalRecords,
      icon: BarChart3,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Resolvidos/Satisfatórios',
      value: metrics.resolvedCount,
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Em Andamento',
      value: metrics.inProgressCount,
      icon: Clock,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Taxa de Resolução',
      value: `${metrics.resolutionRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Registros Hoje',
      value: metrics.todayRecords,
      icon: Activity,
      color: 'bg-teal-500',
      bgColor: 'bg-teal-50'
    },
    {
      title: 'Pendentes',
      value: metrics.pendingCount,
      icon: AlertCircle,
      color: 'bg-red-500',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div 
            key={index}
            className={`${card.bgColor} rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-200 hover:scale-105`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};