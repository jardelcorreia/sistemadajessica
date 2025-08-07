import { OperationalRecord } from '../types';

export const mockData: OperationalRecord[] = [
  {
    id: '1',
    timestamp: '5/27/2025 14:21:56',
    activityType: 'Lançamento',
    responsible: 'Anderson José Silva',
    location: 'Bilbão',
    description: 'Tratamento inadequado próximo ao pátio mais do Implantamento',
    status: 'Resolvido',
    photos: ['https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400']
  },
  {
    id: '2',
    timestamp: '6/10/2025 11:21:59',
    activityType: 'GTP',
    responsible: 'Osivan Torres',
    location: 'São Dêiveo',
    description: 'Foi verificado a aguardamento de colaborador e não estava com avares no veículo check list e documentação existem em Satisfatória',
    status: 'Satisfatório'
  },
  {
    id: '3',
    timestamp: '5/30/2025 13:21:35',
    activityType: 'Sentenciação',
    responsible: 'Ana Lucia',
    location: 'Médio',
    description: 'Documentos devem ficar anexados ao equipamento, sem mantimento da reportação ao cliente.',
    status: 'Resolvido'
  },
  {
    id: '4',
    timestamp: '5/30/2025 13:19:21',
    activityType: 'GTP',
    responsible: 'Ana Lucia',
    location: 'Médio',
    description: 'Documentação estava incompleta, sem ponto de encontro e marcação em campo de projeção estava errado',
    status: 'Resolvido'
  },
  {
    id: '5',
    timestamp: '5/30/2025 14:03:40',
    activityType: 'Lançamento',
    responsible: 'Ana Lucia',
    location: 'Médio',
    description: 'Colaboradores estavam sem e FDS de produto, por estarem utilizando em atividade',
    status: 'Resolvido'
  },
  {
    id: '6',
    timestamp: '6/4/2025 12:52:57',
    activityType: 'Lançamento',
    responsible: 'Denilson Teixeira',
    location: 'Médio',
    description: 'Peça com risco de queda na bancada',
    status: 'Resolvido',
    photos: ['https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400']
  },
  {
    id: '7',
    timestamp: '6/4/2025 10:55:41',
    activityType: 'Pátio de Matéria Prima',
    responsible: 'Marcos Ferreira',
    location: 'São Dêiveo',
    description: 'Queda que subisse na escada -- pra baixar a boca dos resfriados',
    status: 'Resolvido',
    photos: ['https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400']
  },
  {
    id: '8',
    timestamp: '6/10/2025 14:11:00',
    activityType: 'Lançamento',
    responsible: 'Denilson Teixeira',
    location: 'Alto',
    description: 'Colaborador descendo a escada com uma caixa de ferramentas sem segurar no corrimão',
    status: 'Em Andamento'
  },
  {
    id: '9',
    timestamp: '6/10/2025 14:13:10',
    activityType: 'Lançamento',
    responsible: 'Denilson Teixeira',
    location: 'Baixo',
    description: 'Jarro estacionado na rua bem próximo à porta',
    status: 'Resolvido'
  },
  {
    id: '10',
    timestamp: '6/10/2025 14:17:31',
    activityType: 'GTP',
    responsible: 'Denilson Teixeira',
    location: 'São Dêiveo',
    description: 'Satisfatório',
    status: 'Satisfatório',
    photos: ['https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400']
  },
  {
    id: '11',
    timestamp: '6/12/2025 16:17:54',
    activityType: 'Alto Risco',
    responsible: 'Alêico Chagas',
    location: 'São Dêiveo',
    description: 'Durante a mudança de movimentação da carga por identificação a falta de um instrumento eficiente do masmo foi orientado e o',
    status: 'Em Andamento'
  },
  {
    id: '12',
    timestamp: '6/13/2025 11:51:11',
    activityType: 'Sentenciação',
    responsible: 'Feliipe Santana',
    location: 'São Dêiveo',
    description: 'Plataforma de acesso ao equipamento, fora dos padrões estabelecidos pelo projeto de plantar',
    status: 'Em Andamento'
  },
  {
    id: '13',
    timestamp: '6/17/2025 14:48:19',
    activityType: 'Lançamento',
    responsible: 'Denilson Teixeira',
    location: 'Baixo',
    description: 'Colaborador atravessando a sua fora da faixa de pedestre',
    status: 'Resolvido'
  },
  {
    id: '14',
    timestamp: '6/25/2025 17:40:40',
    activityType: 'GTP',
    responsible: 'Denilson Teixeira',
    location: 'São Dêiveo',
    description: 'Documentação semi implementadas',
    status: 'Resolvido',
    photos: ['https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400']
  },
  {
    id: '15',
    timestamp: '7/25/2025 16:35:56',
    activityType: 'Ponte Rolante',
    responsible: 'Zentison Silva',
    location: 'Baixo',
    description: 'Não violação da máscara',
    status: 'Resolvido'
  }
];

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Resolvido':
    case 'Satisfatório':
      return 'text-green-600 bg-green-50';
    case 'Em Andamento':
      return 'text-blue-600 bg-blue-50';
    case 'Pendente':
      return 'text-orange-600 bg-orange-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

export const getActivityTypeColor = (type: string): string => {
  const colors = [
    'text-purple-600 bg-purple-50',
    'text-indigo-600 bg-indigo-50',
    'text-teal-600 bg-teal-50',
    'text-cyan-600 bg-cyan-50',
    'text-rose-600 bg-rose-50',
    'text-amber-600 bg-amber-50'
  ];
  
  const hash = type.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
};