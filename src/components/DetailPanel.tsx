import { motion, AnimatePresence } from 'framer-motion';
import { characters, auxiliaryCharacters } from '../data/characters';
import { useGameStore } from '../store/useGameStore';

export default function DetailPanel() {
  const selectedCharacter = useGameStore((s) => s.selectedCharacter);
  const charState = useGameStore((s) =>
    selectedCharacter ? s.characterStates[selectedCharacter] : null
  );
  const selectCharacter = useGameStore((s) => s.selectCharacter);

  const character = selectedCharacter
    ? [...characters, ...auxiliaryCharacters].find(
        (c) => c.id === selectedCharacter
      )
    : null;

  return (
    <AnimatePresence>
      {character && charState && (
        <>
          {/* Backdrop */}
          <motion.div
            className="detail-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => selectCharacter(null)}
          />

          {/* Panel */}
          <motion.div
            className="detail-panel"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <button
              className="detail-close"
              onClick={() => selectCharacter(null)}
            >
              ✕
            </button>

            {/* Character info */}
            <div className="detail-header">
              <div
                className="detail-avatar"
                style={{
                  backgroundColor: character.avatarBg,
                  borderColor: charState.currentColor,
                }}
              >
                {character.id === 'shadow-boss' ? '❓' : character.name[0]}
              </div>
              <div className="detail-names">
                <h2>{character.name}</h2>
                <p className="detail-actor">饰演：{character.actor}</p>
              </div>
            </div>

            {/* Role info */}
            <div className="detail-section">
              <h3>📋 表面身份</h3>
              <p>{character.coverRole}</p>
            </div>

            {charState.flipped && (
              <motion.div
                className="detail-section detail-reveal"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <h3>🎭 真实身份</h3>
                <p
                  style={{
                    color: charState.currentColor,
                    fontWeight: 'bold',
                  }}
                >
                  {character.trueRole}
                </p>
              </motion.div>
            )}

            <div className="detail-section">
              <h3>📖 角色简介</h3>
              <p>{character.description}</p>
            </div>

            {charState.flipped && (
              <motion.div
                className="detail-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3>🔑 关键剧情</h3>
                <p>{character.keyPlot}</p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
