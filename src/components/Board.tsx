import { useCallback, useState, useRef } from 'react';
import { characters } from '../data/characters';
import { useGameStore } from '../store/useGameStore';
import CharacterCard from './CharacterCard';
import StringConnection from './StringConnection';
import Timeline from './Timeline';
import DetectiveNotebook from './DetectiveNotebook';
import DetailPanel from './DetailPanel';

export default function Board() {
  const selectCharacter = useGameStore((s) => s.selectCharacter);
  const resetBoard = useGameStore((s) => s.resetBoard);
  const currentScene = useGameStore((s) => s.currentScene);
  const [isDraggingAny, setIsDraggingAny] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  const handleBoardClick = useCallback(() => {
    if (!isDraggingAny) {
      selectCharacter(null);
    }
  }, [isDraggingAny, selectCharacter]);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="board-header">
        <div className="header-left">
          <h1 className="board-title">
            <span className="title-icon">🔍</span>
            惊蛰无声 — 线索看板
          </h1>
          <span className="header-subtitle">FBI Investigation Board</span>
        </div>
        <div className="header-right">
          <button className="reset-btn" onClick={resetBoard}>
            🔄 重置
          </button>
        </div>
      </header>

      {/* Main board area */}
      <div className="board-wrapper">
        <div
          ref={boardRef}
          className="cork-board"
          onClick={handleBoardClick}
        >
          {/* Cork board texture overlay */}
          <div className="cork-texture" />
          <div className="vignette" />

          {/* Connection lines */}
          <StringConnection />

          {/* Character cards */}
          {characters.map((char) => (
            <CharacterCard
              key={char.id}
              characterId={char.id}
              onDragStart={() => setIsDraggingAny(true)}
              onDragEnd={() => setIsDraggingAny(false)}
            />
          ))}

          {/* Empty state hint */}
          {currentScene === 0 && (
            <div className="board-hint">
              <p className="hint-icon">👇</p>
              <p>点击下方时间线的 <strong>🔓 按钮</strong> 开始调查！</p>
            </div>
          )}
        </div>

        {/* Detective notebook (sidebar) */}
        <DetectiveNotebook />
      </div>

      {/* Timeline */}
      <Timeline />

      {/* Detail panel overlay */}
      <DetailPanel />
    </div>
  );
}
