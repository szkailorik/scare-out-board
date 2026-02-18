import { motion } from 'framer-motion';
import { scenes } from '../data/scenes';
import { useGameStore } from '../store/useGameStore';

export default function Timeline() {
  const currentScene = useGameStore((s) => s.currentScene);
  const unlockedScenes = useGameStore((s) => s.unlockedScenes);
  const unlockScene = useGameStore((s) => s.unlockScene);

  const canUnlock = (sceneId: number) => {
    if (unlockedScenes.includes(sceneId)) return false;
    if (sceneId === 1) return true;
    return unlockedScenes.includes(sceneId - 1);
  };

  return (
    <div className="timeline-container">
      <div className="timeline-track">
        {scenes.map((scene) => {
          const isUnlocked = unlockedScenes.includes(scene.id);
          const isCurrent = currentScene === scene.id;
          const isNextToUnlock = canUnlock(scene.id);

          return (
            <motion.button
              key={scene.id}
              className={`timeline-node ${isUnlocked ? 'unlocked' : ''} ${isCurrent ? 'current' : ''} ${isNextToUnlock ? 'next' : ''}`}
              onClick={() => {
                if (isNextToUnlock) {
                  unlockScene(scene.id);
                }
              }}
              whileHover={isNextToUnlock ? { scale: 1.1 } : {}}
              whileTap={isNextToUnlock ? { scale: 0.95 } : {}}
              disabled={!isNextToUnlock && !isUnlocked}
            >
              <div className="node-icon">
                {isUnlocked ? (
                  scene.icon
                ) : isNextToUnlock ? (
                  <span className="unlock-icon">🔓</span>
                ) : (
                  <span className="lock-icon">🔒</span>
                )}
              </div>
              <div className="node-number">{scene.id}</div>
              <div className="node-title">{scene.title}</div>
              {isNextToUnlock && (
                <motion.div
                  className="pulse-ring"
                  animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.button>
          );
        })}
        {/* Connecting line between nodes */}
        <div className="timeline-line" />
      </div>

      {/* Scene summary */}
      {currentScene > 0 && (
        <motion.div
          className="scene-summary"
          key={currentScene}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="scene-summary-icon">
            {scenes.find((s) => s.id === currentScene)?.icon}
          </span>
          <span className="scene-summary-text">
            {scenes.find((s) => s.id === currentScene)?.summary}
          </span>
        </motion.div>
      )}
    </div>
  );
}
