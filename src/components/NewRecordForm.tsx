import React, { useState } from 'react';
import { Plus, X, Save, Camera, Trash2, AlertCircle } from 'lucide-react';
import { OperationalRecord } from '../types';
import { compressImage, getStorageInfo } from '../utils/storageUtils';

interface NewRecordFormProps {
  onAddRecord: (record: Omit<OperationalRecord, 'id'>) => void;
}

export const NewRecordForm: React.FC<NewRecordFormProps> = ({ onAddRecord }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    timestamp: new Date().toISOString().slice(0, 16),
    activityType: '',
    responsible: '',
    location: '',
    description: '',
    status: 'Pendente' as OperationalRecord['status'],
    photos: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRecord(formData);
    setFormData({
      timestamp: new Date().toISOString().slice(0, 16),
      activityType: '',
      responsible: '',
      location: '',
      description: '',
      status: 'Pendente',
      photos: []
    });
    setIsOpen(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Verificar espaço disponível
    const storageInfo = getStorageInfo();
    const availableMB = storageInfo.available / (1024 * 1024);
    
    if (availableMB < 1) {
      alert('Espaço insuficiente no navegador. Tente remover alguns registros antigos.');
      return;
    }

    setIsUploading(true);
    
    try {
      const newPhotos: string[] = [];
      
      for (const file of Array.from(files)) {
        // Verificar tipo de arquivo
        if (!file.type.startsWith('image/')) {
          alert(`Arquivo ${file.name} não é uma imagem válida.`);
          continue;
        }
        
        // Verificar tamanho (máximo 5MB por imagem)
        if (file.size > 5 * 1024 * 1024) {
          alert(`Arquivo ${file.name} é muito grande. Máximo 5MB por imagem.`);
          continue;
        }
        
        // Comprimir imagem
        const compressedImage = await compressImage(file, 800, 0.7);
        newPhotos.push(compressedImage);
      }
      
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos]
      }));
      
    } catch (error) {
      console.error('Erro ao processar imagens:', error);
      alert('Erro ao processar as imagens. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const getStorageStatus = () => {
    const info = getStorageInfo();
    const usedMB = (info.used / (1024 * 1024)).toFixed(1);
    const availableMB = (info.available / (1024 * 1024)).toFixed(1);
    return { usedMB, availableMB };
  };

  if (!isOpen) {
    return (
      <div className="mb-6">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Registro
        </button>
      </div>
    );
  }

  const storageStatus = getStorageStatus();

  return (
    <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Novo Registro</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data/Hora
            </label>
            <input
              type="datetime-local"
              value={formData.timestamp}
              onChange={(e) => handleChange('timestamp', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Atividade
            </label>
            <input
              type="text"
              value={formData.activityType}
              onChange={(e) => handleChange('activityType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: GTP, Lançamento, Sentenciação..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Responsável
            </label>
            <input
              type="text"
              value={formData.responsible}
              onChange={(e) => handleChange('responsible', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nome do responsável"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Localização
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: São Dêiveo, Bilbão, Médio..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Pendente">Pendente</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Resolvido">Resolvido</option>
              <option value="Satisfatório">Satisfatório</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fotos (Opcional) - Armazenamento Local
            </label>
            <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Usado: {storageStatus.usedMB}MB | Disponível: {storageStatus.availableMB}MB
            </div>
            <div className="space-y-2">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                disabled={isUploading}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
              />
              {isUploading && (
                <div className="text-sm text-blue-600 flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  Processando imagens...
                </div>
              )}
              {formData.photos.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Descreva detalhadamente a atividade ou ocorrência..."
            required
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isUploading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {isUploading ? 'Processando...' : 'Salvar Registro'}
          </button>
        </div>
      </form>
    </div>
  );
};