import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { characters, auxiliaryCharacters, type Faction } from '../data/characters';
import { useGameStore } from '../store/useGameStore';

interface CharacterCardProps {
  characterId: string;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

const PIN_COLORS: Record<Faction, string> = {
  china: '#3B82F6',
  enemy: '#EF4444',
  double: '#F59E0B',
  unknown: '#9CA3AF',
  shadow: '#374151',
};

function getFactionLabel(faction: Faction): string {
  switch (faction) {
    case 'china': return '🔵 中方';
    case 'enemy': return '🔴 敌方';
    case 'double': return '🟡 双面卧底';
    case 'unknown': return '⚪ 未知';
    case 'shadow': return '⚫ 暗影';
  }
}

export default function CharacterCard({ characterId, onDragStart, onDragEnd }: CharacterCardProps) {
  const character = [...characters, ...auxiliaryCharacters].find((c) => c.id === characterId);
  const charState = useGameStore((s) => s.characterStates[characterId]);
  const position = useGameStore((s) => s.cardPositions[characterId]);
  const updatePosition = useGameStore((s) => s.updateCardPosition);
  const selectCharacter = useGameStore((s) => s.selectCharacter);

  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const didDragRef = useRef(false);

  // Random tilt for authenticity
  const [tilt] = useState(() => (Math.random() - 0.5) * 6);

  // Use motion values for position to avoid double-offset bug with framer-motion drag
  const motionX = useMotionValue(position?.x ?? 0);
  const motionY = useMotionValue(position?.y ?? 0);

  // Sync store position to motion values when position changes externally (e.g. board reset)
  useEffect(() => {
    if (!isDraggingRef.current && position) {
      motionX.set(position.x);
      motionY.set(position.y);
    }
  }, [position?.x, position?.y, motionX, motionY]);

  if (!character || !charState?.visible) return null;

  const borderColor = charState.currentColor;
  const pinColor = PIN_COLORS[character.trueFaction] || '#9CA3AF';
  const isShadow = character.id === 'shadow-boss';
  const hasPhoto = !!character.image;
  const imgSrc = character.image ? import.meta.env.BASE_URL + character.image.replace(/^\//, '') : undefined;

  const avatarContent = (showBadge: boolean) => (
    <div
      className="card-avatar"
      style={{ backgroundColor: hasPhoto ? undefined : character.avatarBg }}
    >
      {hasPhoto ? (
        <img className="card-photo" src={imgSrc} alt={character.name} draggable={false} />
      ) : isShadow ? (
        <span className="shadow-icon">❓</span>
      ) : (
        <span className="avatar-letter" style={{ color: 'white' }}>
          {character.name[0]}
        </span>
      )}
      {showBadge && (
        <div className="reveal-badge">
          {getFactionLabel(character.trueFaction)}
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      className="character-card"
      initial={{ scale: 0, opacity: 0, rotate: tilt }}
      animate={{
        scale: 1,
        opacity: 1,
        rotate: isDragging ? 0 : tilt,
        zIndex: isDragging ? 100 : 10,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        x: motionX,
        y: motionY,
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none',
      }}
      drag
      dragMomentum={false}
      onDragStart={() => {
        didDragRef.current = true;
        isDraggingRef.current = true;
        setIsDragging(true);
        onDragStart?.();
      }}
      onDrag={() => {
        updatePosition(characterId, {
          x: motionX.get(),
          y: motionY.get(),
        });
      }}
      onDragEnd={() => {
        isDraggingRef.current = false;
        setIsDragging(false);
        updatePosition(characterId, {
          x: motionX.get(),
          y: motionY.get(),
        });
        onDragEnd?.();
        setTimeout(() => { didDragRef.current = false; }, 200);
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (!didDragRef.current) {
          selectCharacter(characterId);
        }
        didDragRef.current = false;
      }}
    >
      {/* Push pin */}
      <div className="card-pin" style={{ backgroundColor: pinColor }}>
        <div className="pin-highlight" />
      </div>

      {/* Card body - Polaroid style */}
      <AnimatePresence mode="wait">
        {charState.flipped ? (
          <motion.div
            key="back"
            className="card-inner card-back"
            initial={{ rotateY: 90 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: -90 }}
            transition={{ duration: 0.4 }}
            style={{ borderColor, boxShadow: `0 0 12px ${borderColor}40` }}
          >
            {avatarContent(true)}
            <div className="card-info">
              <div className="card-name">{character.name}</div>
              <div className="card-true-role">{character.trueRole}</div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="front"
            className="card-inner card-front"
            initial={{ rotateY: -90 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 90 }}
            transition={{ duration: 0.4 }}
            style={{ borderColor, boxShadow: `0 0 8px ${borderColor}30` }}
          >
            {avatarContent(false)}
            <div className="card-info">
              <div className="card-name">{character.name}</div>
              <div className="card-role">{character.coverRole}</div>
              <div className="card-actor">{character.actor}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
