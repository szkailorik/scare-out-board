export interface SceneReveal {
  characterId: string;
  action: 'appear' | 'flip' | 'recolor';
  newColor?: string;
}

export interface Scene {
  id: number;
  title: string;
  icon: string;
  summary: string;
  reveals: SceneReveal[];
  newConnections: string[];  // connection IDs that appear in this scene
  notebookEntry: string;     // text added to detective notebook
}

export const scenes: Scene[] = [
  {
    id: 1,
    title: '任务开始',
    icon: '🎬',
    summary: '登场人物：严迪、黄凯、赵虹、李楠、Nathan。国安行动组接到任务，调查涉及国家机密泄露的间谍活动。',
    reveals: [
      { characterId: 'yan-di', action: 'appear' },
      { characterId: 'huang-kai', action: 'appear' },
      { characterId: 'zhao-hong', action: 'appear' },
      { characterId: 'li-nan', action: 'appear' },
      { characterId: 'nathan', action: 'appear' },
    ],
    newConnections: ['conn-5', 'conn-6'],
    notebookEntry: '国安行动组集结完毕。严迪（副队长）、黄凯（资深警察）、赵虹（队长）组成核心团队。目标：追查涉嫌泄露隐身涂层机密的嫌疑人。',
  },
  {
    id: 2,
    title: '抓捕行动',
    icon: '🔍',
    summary: 'Nathan被抓获！李楠的叛国者身份暴露——他将隐身涂层液体交给了Nathan。',
    reveals: [
      { characterId: 'nathan', action: 'recolor', newColor: '#DC2626' },
      { characterId: 'li-nan', action: 'flip', newColor: '#DC2626' },
    ],
    newConnections: ['conn-3', 'conn-9'],
    notebookEntry: '重大突破！抓获美方取货人Nathan。追查发现李楠博士竟是叛国者，为金钱出卖了隐身涂层配方。但背后是否还有更大的间谍网络？',
  },
  {
    id: 3,
    title: '内鬼嫌疑',
    icon: '🕵️',
    summary: '神秘女子白帆登场。黄凯的行为引起怀疑——他是不是另一个内鬼？',
    reveals: [
      { characterId: 'bai-fan', action: 'appear' },
      { characterId: 'huang-kai', action: 'recolor', newColor: '#6B7280' },
    ],
    newConnections: ['conn-8'],
    notebookEntry: '新人物出现：白帆，身份不明的神秘女性。同时，黄凯的一些行为引起了赵虹队长的怀疑——队伍里是否还有内鬼？气氛紧张。',
  },
  {
    id: 4,
    title: '第一重反转',
    icon: '💔',
    summary: '真相大白！黄凯不是内鬼，他是被当作诱饵使用的。白帆才是真正的境外间谍！',
    reveals: [
      { characterId: 'huang-kai', action: 'flip', newColor: '#2563EB' },
      { characterId: 'bai-fan', action: 'flip', newColor: '#DC2626' },
    ],
    newConnections: ['conn-1', 'conn-2'],
    notebookEntry: '反转！黄凯是清白的，他只是被利用的诱饵。真正的间谍是白帆——她一直在用美人计策反黄凯和李楠，操控情报泄露。',
  },
  {
    id: 5,
    title: '第二重反转',
    icon: '🎭',
    summary: '最大的秘密：严迪其实是中方的深度卧底！他潜伏了整整5年！王副局长和境外幕后操控者浮出水面。',
    reveals: [
      { characterId: 'yan-di', action: 'flip', newColor: '#D97706' },
      { characterId: 'director-wang', action: 'appear' },
      { characterId: 'shadow-boss', action: 'appear' },
    ],
    newConnections: [],
    notebookEntry: '震惊！严迪不是叛徒，他是潜伏5年的深度卧底！王副局长出场——他是整个行动的幕后策划者。境外情报操控者的身影也开始浮现。',
  },
  {
    id: 6,
    title: '全员棋子',
    icon: '♟️',
    summary: '终极格局揭晓：王副局长是幕后操盘手，白帆只是境外势力的棋子。所有人都在这盘大棋中扮演着自己的角色。',
    reveals: [],
    newConnections: ['conn-7', 'conn-4'],
    notebookEntry: '真相全部揭开。王副局长是保护严迪的幕后操盘手，精心布局了这盘大棋。白帆只是境外情报机构的一颗棋子。每个人都在不知不觉中成为了这场谍战的一部分。',
  },
];
