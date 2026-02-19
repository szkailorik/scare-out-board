import { create } from 'zustand';
import { characters } from '../data/characters';
import { scenes } from '../data/scenes';

interface CardPosition {
  x: number;
  y: number;
}

interface CharacterState {
  visible: boolean;
  flipped: boolean;
  currentColor: string;
}

interface GameState {
  // Scene
  currentScene: number;
  unlockedScenes: number[];

  // Card positions (character id -> position)
  cardPositions: Record<string, CardPosition>;

  // Character states
  characterStates: Record<string, CharacterState>;

  // Visible connections
  visibleConnections: string[];

  // UI state
  selectedCharacter: string | null;
  notebookOpen: boolean;
  notebookEntries: string[];

  // Actions
  unlockScene: (sceneId: number) => void;
  updateCardPosition: (characterId: string, position: CardPosition) => void;
  selectCharacter: (characterId: string | null) => void;
  toggleNotebook: () => void;
  resetBoard: () => void;
}

const initialCharacterStates: Record<string, CharacterState> = {};
const initialPositions: Record<string, CardPosition> = {};

characters.forEach((char) => {
  initialCharacterStates[char.id] = {
    visible: false,
    flipped: false,
    currentColor: char.boardColor,
  };
  initialPositions[char.id] = { ...char.initialPosition };
});

export const useGameStore = create<GameState>((set, get) => ({
  currentScene: 0,
  unlockedScenes: [],
  cardPositions: { ...initialPositions },
  characterStates: { ...initialCharacterStates },
  visibleConnections: [],
  selectedCharacter: null,
  notebookOpen: false,
  notebookEntries: [],

  unlockScene: (sceneId: number) => {
    const state = get();
    if (state.unlockedScenes.includes(sceneId)) return;

    const scene = scenes.find((s) => s.id === sceneId);
    if (!scene) return;

    // Must unlock in order
    if (sceneId > 1 && !state.unlockedScenes.includes(sceneId - 1)) return;

    const newCharStates = { ...state.characterStates };

    // Apply reveals
    scene.reveals.forEach((reveal) => {
      const charState = { ...newCharStates[reveal.characterId] };
      switch (reveal.action) {
        case 'appear':
          charState.visible = true;
          break;
        case 'flip':
          charState.flipped = true;
          if (reveal.newColor) charState.currentColor = reveal.newColor;
          break;
        case 'recolor':
          if (reveal.newColor) charState.currentColor = reveal.newColor;
          break;
      }
      newCharStates[reveal.characterId] = charState;
    });

    // Add new connections
    const newVisibleConnections = [
      ...state.visibleConnections,
      ...scene.newConnections.filter(
        (c) => !state.visibleConnections.includes(c)
      ),
    ];

    // Add notebook entry
    const newEntries = [...state.notebookEntries, scene.notebookEntry];

    set({
      currentScene: sceneId,
      unlockedScenes: [...state.unlockedScenes, sceneId],
      characterStates: newCharStates,
      visibleConnections: newVisibleConnections,
      notebookEntries: newEntries,
    });
  },

  updateCardPosition: (characterId, position) => {
    set((state) => {
      const current = state.cardPositions[characterId];
      if (
        current &&
        current.x === position.x &&
        current.y === position.y
      ) {
        return state;
      }

      return {
        cardPositions: {
          ...state.cardPositions,
          [characterId]: position,
        },
      };
    });
  },

  selectCharacter: (characterId) => {
    set({ selectedCharacter: characterId });
  },

  toggleNotebook: () => {
    set((state) => ({ notebookOpen: !state.notebookOpen }));
  },

  resetBoard: () => {
    set({
      currentScene: 0,
      unlockedScenes: [],
      cardPositions: { ...initialPositions },
      characterStates: { ...initialCharacterStates },
      visibleConnections: [],
      selectedCharacter: null,
      notebookOpen: false,
      notebookEntries: [],
    });
  },
}));
