import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { auxiliaryCharacters } from '../data/characters';

export default function DetectiveNotebook() {
  const notebookOpen = useGameStore((s) => s.notebookOpen);
  const toggleNotebook = useGameStore((s) => s.toggleNotebook);
  const notebookEntries = useGameStore((s) => s.notebookEntries);
  const currentScene = useGameStore((s) => s.currentScene);

  return (
    <>
      {/* Toggle button */}
      <motion.button
        className="notebook-toggle"
        onClick={toggleNotebook}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="notebook-toggle-icon">📓</span>
        <span className="notebook-toggle-text">侦探笔记</span>
        {notebookEntries.length > 0 && (
          <span className="notebook-badge">{notebookEntries.length}</span>
        )}
      </motion.button>

      {/* Notebook panel */}
      <AnimatePresence>
        {notebookOpen && (
          <motion.div
            className="notebook-panel"
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="notebook-header">
              <h2>🕵️ 侦探笔记本</h2>
              <button className="notebook-close" onClick={toggleNotebook}>
                ✕
              </button>
            </div>

            {/* Entries */}
            <div className="notebook-entries">
              {notebookEntries.length === 0 ? (
                <div className="notebook-empty">
                  <p>📝 还没有线索...</p>
                  <p>点击下方时间线解锁场景，收集线索吧！</p>
                </div>
              ) : (
                notebookEntries.map((entry, index) => (
                  <motion.div
                    key={index}
                    className="notebook-entry"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="entry-header">
                      <span className="entry-number">线索 #{index + 1}</span>
                    </div>
                    <p className="entry-text">{entry}</p>
                  </motion.div>
                ))
              )}
            </div>

            {/* Auxiliary characters section */}
            {currentScene >= 1 && (
              <div className="notebook-auxiliary">
                <h3>👥 其他相关人物</h3>
                {auxiliaryCharacters.map((char) => (
                  <div key={char.id} className="aux-character">
                    <div
                      className="aux-avatar"
                      style={{ backgroundColor: char.avatarBg }}
                    >
                      {char.name[0]}
                    </div>
                    <div className="aux-info">
                      <span className="aux-name">
                        {char.name}
                        <span className="aux-actor">（{char.actor}）</span>
                      </span>
                      <span className="aux-role">{char.coverRole}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
