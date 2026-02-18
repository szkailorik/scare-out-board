export type Faction = 'china' | 'enemy' | 'double' | 'unknown' | 'shadow';

export interface Character {
  id: string;
  name: string;
  actor: string;
  coverRole: string;
  trueFaction: Faction;
  trueRole: string;
  boardColor: string;       // initial border color
  revealedColor?: string;   // border color after reveal
  avatarBg: string;         // fallback avatar background color
  initialPosition: { x: number; y: number };
  appearsInScene: number;   // scene number when this character first appears
  revealScene?: number;     // scene when true identity is revealed
  flipSequence?: string[];  // sequence of color changes e.g. ['blue','gray','blue']
  description: string;
  keyPlot: string;
  isAuxiliary?: boolean;
}

export const FACTION_COLORS: Record<Faction, string> = {
  china: '#2563EB',
  enemy: '#DC2626',
  double: '#D97706',
  unknown: '#6B7280',
  shadow: '#1F2937',
};

export const characters: Character[] = [
  {
    id: 'yan-di',
    name: '严迪',
    actor: '易烊千玺',
    coverRole: '国安行动组副队长',
    trueFaction: 'double',
    trueRole: '中方深度卧底（潜伏5年的双面棋子）',
    boardColor: FACTION_COLORS.china,
    revealedColor: FACTION_COLORS.double,
    avatarBg: '#3B82F6',
    initialPosition: { x: 300, y: 200 },
    appearsInScene: 1,
    revealScene: 5,
    flipSequence: ['china', 'double'],
    description: '表面上是国安行动组的副队长，实际上是潜伏5年的中方深度卧底。他的真实身份是整部电影最大的反转。',
    keyPlot: '第三重反转：揭露为中方深度卧底，所有看似可疑的行动都是在执行秘密任务。',
  },
  {
    id: 'huang-kai',
    name: '黄凯',
    actor: '朱一龙',
    coverRole: '资深国安警察',
    trueFaction: 'china',
    trueRole: '中方（被当作诱饵使用）',
    boardColor: FACTION_COLORS.china,
    revealedColor: FACTION_COLORS.china,
    avatarBg: '#2563EB',
    initialPosition: { x: 550, y: 150 },
    appearsInScene: 1,
    revealScene: 4,
    flipSequence: ['china', 'unknown', 'china'],
    description: '资深国安警察，忠诚可靠。但在调查过程中被怀疑是内鬼，实际上他被当作了诱饵来引出真正的间谍。',
    keyPlot: '第一、二重反转：先被怀疑是内鬼（灰色），后证实清白，实际是被利用的诱饵。',
  },
  {
    id: 'zhao-hong',
    name: '赵虹',
    actor: '宋佳',
    coverRole: '行动组队长',
    trueFaction: 'china',
    trueRole: '中方',
    boardColor: FACTION_COLORS.china,
    avatarBg: '#1D4ED8',
    initialPosition: { x: 150, y: 350 },
    appearsInScene: 1,
    description: '行动组队长，严迪和黄凯的直接上级。立场坚定，始终站在正义一方。',
    keyPlot: '负责调查内鬼，一度怀疑黄凯，是推动剧情的关键角色。',
  },
  {
    id: 'li-nan',
    name: '李楠',
    actor: '雷佳音',
    coverRole: '高分子材料化学博士',
    trueFaction: 'enemy',
    trueRole: '叛国者（为钱出卖隐身涂层机密）',
    boardColor: FACTION_COLORS.china,
    revealedColor: FACTION_COLORS.enemy,
    avatarBg: '#059669',
    initialPosition: { x: 750, y: 300 },
    appearsInScene: 1,
    revealScene: 2,
    flipSequence: ['china', 'enemy'],
    description: '高分子材料化学博士，掌握国家机密隐身涂层配方。为金钱出卖机密，是最先暴露的叛国者。',
    keyPlot: '开场揭露：将隐身涂层液体交给Nathan，是整个间谍网络的起点。',
  },
  {
    id: 'bai-fan',
    name: '白帆',
    actor: '杨幂',
    coverRole: '神秘女性',
    trueFaction: 'enemy',
    trueRole: '境外间谍（色诱策反、情报操控）',
    boardColor: FACTION_COLORS.unknown,
    revealedColor: FACTION_COLORS.enemy,
    avatarBg: '#9333EA',
    initialPosition: { x: 550, y: 420 },
    appearsInScene: 3,
    revealScene: 4,
    flipSequence: ['unknown', 'enemy'],
    description: '身份神秘的女性，实际是境外间谍。利用美色策反黄凯和李楠，是间谍网络的核心执行者。',
    keyPlot: '中段揭露：被揭穿为境外间谍，负责色诱策反和情报操控。',
  },
  {
    id: 'director-wang',
    name: '王副局长',
    actor: '张译',
    coverRole: '国安系统高层',
    trueFaction: 'china',
    trueRole: '中方幕后操盘手（保护严迪的大局）',
    boardColor: FACTION_COLORS.china,
    avatarBg: '#1E40AF',
    initialPosition: { x: 100, y: 100 },
    appearsInScene: 5,
    description: '国安系统高层，整个反间谍行动的幕后操盘手。他精心布局保护严迪的卧底身份，是最终的棋手。',
    keyPlot: '第四重反转：揭露为幕后操盘手，所有人都是他棋盘上的棋子。',
  },
  {
    id: 'nathan',
    name: 'Nathan',
    actor: 'Nathaniel Boyd',
    coverRole: '来华"商务人士"',
    trueFaction: 'enemy',
    trueRole: '美方取货人（开场被抓）',
    boardColor: FACTION_COLORS.enemy,
    avatarBg: '#B91C1C',
    initialPosition: { x: 900, y: 150 },
    appearsInScene: 1,
    revealScene: 2,
    description: '以商务人士身份来华，实际是美方派来的取货人。在开场行动中被国安抓获。',
    keyPlot: '开场被抓，拉开整个间谍调查的序幕。',
  },
  {
    id: 'shadow-boss',
    name: '境外情报幕后操控者',
    actor: '（神秘人物）',
    coverRole: '不明',
    trueFaction: 'shadow',
    trueRole: '敌方最高指挥',
    boardColor: FACTION_COLORS.shadow,
    avatarBg: '#111827',
    initialPosition: { x: 850, y: 450 },
    appearsInScene: 5,
    description: '隐藏在暗处的境外情报机构最高指挥者，操控白帆等人执行间谍任务。始终未露真容。',
    keyPlot: '贯穿全片的幕后黑手，指挥整个间谍网络。',
  },
];

export const auxiliaryCharacters: Character[] = [
  {
    id: 'xiao-yu',
    name: '小玉',
    actor: '刘诗诗',
    coverRole: '黄凯的妻子',
    trueFaction: 'china',
    trueRole: '黄凯的妻子，怀孕中',
    boardColor: FACTION_COLORS.china,
    avatarBg: '#EC4899',
    initialPosition: { x: 0, y: 0 },
    appearsInScene: 3,
    description: '黄凯的妻子，正在怀孕。发现丈夫被色诱后内心挣扎，是电影中的情感线索。',
    keyPlot: '发现丈夫被白帆色诱，增添了剧情的人性化冲突。',
    isAuxiliary: true,
  },
  {
    id: 'jian-hao',
    name: '建浩',
    actor: '刘耀文',
    coverRole: '国安小组技术分析员',
    trueFaction: 'china',
    trueRole: '技术支援',
    boardColor: FACTION_COLORS.china,
    avatarBg: '#6366F1',
    initialPosition: { x: 0, y: 0 },
    appearsInScene: 1,
    description: '国安小组的技术分析员，负责数据分析和技术支援。',
    keyPlot: '在幕后提供关键技术支持。',
    isAuxiliary: true,
  },
  {
    id: 'chen-yi',
    name: '陈依',
    actor: '林博洋',
    coverRole: '国安小组成员',
    trueFaction: 'china',
    trueRole: '行动组成员',
    boardColor: FACTION_COLORS.china,
    avatarBg: '#0891B2',
    initialPosition: { x: 0, y: 0 },
    appearsInScene: 1,
    description: '国安小组成员，参与各项行动任务。',
    keyPlot: '跟随小组执行各项抓捕和调查任务。',
    isAuxiliary: true,
  },
];
