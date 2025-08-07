// Utilitários para armazenamento local
export const STORAGE_KEYS = {
  RECORDS: 'operational_records',
  PHOTOS: 'operational_photos'
};

// Comprimir imagem para reduzir tamanho
export const compressImage = (file: File, maxWidth: number = 800, quality: number = 0.8): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      // Calcular novas dimensões mantendo proporção
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      // Desenhar imagem redimensionada
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Converter para base64 com compressão
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedDataUrl);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Salvar dados no localStorage
export const saveToLocalStorage = (key: string, data: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
    alert('Erro ao salvar dados. Verifique se há espaço suficiente no navegador.');
  }
};

// Carregar dados do localStorage
export const loadFromLocalStorage = (key: string): any => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erro ao carregar do localStorage:', error);
    return null;
  }
};

// Verificar espaço disponível no localStorage
export const getStorageInfo = (): { used: number; available: number } => {
  let used = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      used += localStorage[key].length;
    }
  }
  
  // Estimar espaço disponível (geralmente 5-10MB por domínio)
  const estimated = 5 * 1024 * 1024; // 5MB em bytes
  
  return {
    used: used,
    available: Math.max(0, estimated - used)
  };
};

// Limpar dados antigos se necessário
export const cleanupOldData = (): void => {
  const storageInfo = getStorageInfo();
  const usedMB = storageInfo.used / (1024 * 1024);
  
  if (usedMB > 4) { // Se usar mais de 4MB
    const records = loadFromLocalStorage(STORAGE_KEYS.RECORDS) || [];
    
    // Manter apenas os últimos 100 registros
    if (records.length > 100) {
      const recentRecords = records.slice(0, 100);
      saveToLocalStorage(STORAGE_KEYS.RECORDS, recentRecords);
      
      alert('Dados antigos foram removidos para liberar espaço. Mantidos os 100 registros mais recentes.');
    }
  }
};