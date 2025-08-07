import React, { useState, useMemo } from 'react';
import { BarChart3, Settings, Database } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { FilterPanel } from './components/FilterPanel';
import { DataTable } from './components/DataTable';
import { Charts } from './components/Charts';
import { NewRecordForm } from './components/NewRecordForm';
import { OperationalRecord, FilterState } from './types';
import { mockData } from './data/mockData';
import { calculateMetrics, filterData, getUniqueValues } from './utils/dataUtils';
import { saveToLocalStorage, loadFromLocalStorage, STORAGE_KEYS, cleanupOldData } from './utils/storageUtils';

function App() {
  // Carregar dados do localStorage ou usar dados mock
  const [data, setData] = useState<OperationalRecord[]>(() => {
    const savedData = loadFromLocalStorage(STORAGE_KEYS.RECORDS);
    return savedData && savedData.length > 0 ? savedData : mockData;
  });
  const [activeTab, setActiveTab] = useState<'dashboard' | 'data' | 'analytics'>('dashboard');
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    status: '',
    activityType: '',
    responsible: '',
    dateRange: { start: '', end: '' }
  });

  const filteredData = useMemo(() => 
    filterData(
      data,
      filters.searchTerm,
      filters.status,
      filters.activityType,
      filters.responsible,
      filters.dateRange.start,
      filters.dateRange.end
    ), 
    [data, filters]
  );

  const metrics = useMemo(() => calculateMetrics(filteredData), [filteredData]);
  const uniqueStatuses = useMemo(() => getUniqueValues(data, 'status'), [data]);
  const uniqueActivityTypes = useMemo(() => getUniqueValues(data, 'activityType'), [data]);
  const uniqueResponsibles = useMemo(() => getUniqueValues(data, 'responsible'), [data]);

  const handleAddRecord = (newRecord: Omit<OperationalRecord, 'id'>) => {
    // Limpar dados antigos se necessário
    cleanupOldData();
    
    const id = (Math.max(...data.map(r => parseInt(r.id))) + 1).toString();
    const updatedData = [{ ...newRecord, id }, ...data];
    
    setData(updatedData);
    
    // Salvar no localStorage
    saveToLocalStorage(STORAGE_KEYS.RECORDS, updatedData);
  };

  // Salvar dados sempre que houver mudanças
  React.useEffect(() => {
    if (data.length > 0) {
      saveToLocalStorage(STORAGE_KEYS.RECORDS, data);
    }
  }, [data]);

  const tabs = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: BarChart3 },
    { id: 'data' as const, label: 'Dados', icon: Database },
    { id: 'analytics' as const, label: 'Analytics', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sistema de Dados Operacionais</h1>
                <p className="text-sm text-gray-500">Captação e Análise de Informações</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <>
            <Dashboard metrics={metrics} />
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              uniqueStatuses={uniqueStatuses}
              uniqueActivityTypes={uniqueActivityTypes}
              uniqueResponsibles={uniqueResponsibles}
            />
            <DataTable data={filteredData} />
          </>
        )}

        {activeTab === 'data' && (
          <>
            <NewRecordForm onAddRecord={handleAddRecord} />
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              uniqueStatuses={uniqueStatuses}
              uniqueActivityTypes={uniqueActivityTypes}
              uniqueResponsibles={uniqueResponsibles}
            />
            <DataTable data={filteredData} />
          </>
        )}

        {activeTab === 'analytics' && (
          <>
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              uniqueStatuses={uniqueStatuses}
              uniqueActivityTypes={uniqueActivityTypes}
              uniqueResponsibles={uniqueResponsibles}
            />
            <Charts data={filteredData} />
            <Dashboard metrics={metrics} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;