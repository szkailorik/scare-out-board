export type ConnectionType = 'alliance' | 'opposition' | 'secret_control' | 'intel_transfer' | 'suspected';

export interface Connection {
  id: string;
  from: string;       // character id
  to: string;         // character id
  type: ConnectionType;
  label: string;
  appearsInScene: number;
  directed?: boolean;  // true = arrow from → to
}

export const CONNECTION_STYLES: Record<ConnectionType, {
  color: string;
  strokeDasharray: string;
  label: string;
}> = {
  alliance: {
    color: '#22C55E',
    strokeDasharray: 'none',
    label: '同盟',
  },
  opposition: {
    color: '#DC2626',
    strokeDasharray: 'none',
    label: '对抗',
  },
  secret_control: {
    color: '#EAB308',
    strokeDasharray: '8,4',
    label: '秘密操控',
  },
  intel_transfer: {
    color: '#F97316',
    strokeDasharray: '8,4',
    label: '情报传递',
  },
  suspected: {
    color: '#9CA3AF',
    strokeDasharray: '3,3',
    label: '疑似关联',
  },
};

export const connections: Connection[] = [
  {
    id: 'conn-1',
    from: 'bai-fan',
    to: 'huang-kai',
    type: 'secret_control',
    label: '色诱策反',
    appearsInScene: 4,
    directed: true,
  },
  {
    id: 'conn-2',
    from: 'bai-fan',
    to: 'li-nan',
    type: 'secret_control',
    label: '策反科学家',
    appearsInScene: 4,
    directed: true,
  },
  {
    id: 'conn-3',
    from: 'li-nan',
    to: 'nathan',
    type: 'intel_transfer',
    label: '交付隐身涂层',
    appearsInScene: 2,
    directed: true,
  },
  {
    id: 'conn-4',
    from: 'shadow-boss',
    to: 'bai-fan',
    type: 'secret_control',
    label: '指挥执行任务',
    appearsInScene: 6,
    directed: true,
  },
  {
    id: 'conn-5',
    from: 'yan-di',
    to: 'huang-kai',
    type: 'alliance',
    label: '同组搭档',
    appearsInScene: 1,
    directed: false,
  },
  {
    id: 'conn-6',
    from: 'yan-di',
    to: 'zhao-hong',
    type: 'alliance',
    label: '上下级',
    appearsInScene: 1,
    directed: false,
  },
  {
    id: 'conn-7',
    from: 'director-wang',
    to: 'yan-di',
    type: 'alliance',
    label: '保护卧底布局',
    appearsInScene: 6,
    directed: true,
  },
  {
    id: 'conn-8',
    from: 'zhao-hong',
    to: 'huang-kai',
    type: 'opposition',
    label: '调查怀疑内鬼',
    appearsInScene: 3,
    directed: true,
  },
  {
    id: 'conn-9',
    from: 'zhao-hong',
    to: 'nathan',
    type: 'opposition',
    label: '追踪抓捕',
    appearsInScene: 2,
    directed: true,
  },
  {
    id: 'conn-10',
    from: 'huang-kai',
    to: 'xiao-yu',
    type: 'alliance',
    label: '夫妻',
    appearsInScene: 3,
    directed: false,
  },
];
