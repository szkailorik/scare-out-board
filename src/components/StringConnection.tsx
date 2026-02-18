import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { connections, CONNECTION_STYLES } from '../data/connections';
import { useGameStore } from '../store/useGameStore';

// Card dimensions for calculating center points
const CARD_WIDTH = 140;
const CARD_HEIGHT = 200;

export default function StringConnection() {
  const visibleConnections = useGameStore((s) => s.visibleConnections);
  const cardPositions = useGameStore((s) => s.cardPositions);
  const characterStates = useGameStore((s) => s.characterStates);

  const activeConnections = useMemo(() => {
    return connections.filter((conn) => {
      if (!visibleConnections.includes(conn.id)) return false;
      const fromVisible = characterStates[conn.from]?.visible;
      const toVisible = characterStates[conn.to]?.visible;
      return fromVisible && toVisible;
    });
  }, [visibleConnections, characterStates]);

  return (
    <svg
      className="connections-layer"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      <defs>
        {/* Arrow markers for each connection type */}
        {Object.entries(CONNECTION_STYLES).map(([type, style]) => (
          <marker
            key={type}
            id={`arrow-${type}`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={style.color} />
          </marker>
        ))}
      </defs>

      {activeConnections.map((conn) => {
        const fromPos = cardPositions[conn.from];
        const toPos = cardPositions[conn.to];
        if (!fromPos || !toPos) return null;

        const style = CONNECTION_STYLES[conn.type];

        // Center of cards
        const x1 = fromPos.x + CARD_WIDTH / 2;
        const y1 = fromPos.y + CARD_HEIGHT / 2;
        const x2 = toPos.x + CARD_WIDTH / 2;
        const y2 = toPos.y + CARD_HEIGHT / 2;

        // Slight curve for natural rope feel
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        // Perpendicular offset for curve
        const curvature = Math.min(dist * 0.15, 40);
        const nx = -dy / dist;
        const ny = dx / dist;
        const cx = midX + nx * curvature;
        const cy = midY + ny * curvature;

        const pathD = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;

        return (
          <g key={conn.id}>
            {/* Connection line */}
            <motion.path
              d={pathD}
              fill="none"
              stroke={style.color}
              strokeWidth={2.5}
              strokeDasharray={style.strokeDasharray === 'none' ? undefined : style.strokeDasharray}
              markerEnd={conn.directed ? `url(#arrow-${conn.type})` : undefined}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.85 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />

            {/* Label on the line */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <rect
                x={cx - conn.label.length * 7}
                y={cy - 12}
                width={conn.label.length * 14}
                height={20}
                rx={4}
                fill="rgba(0,0,0,0.75)"
              />
              <text
                x={cx}
                y={cy + 2}
                textAnchor="middle"
                fill="white"
                fontSize={11}
                fontFamily="system-ui, sans-serif"
              >
                {conn.label}
              </text>
            </motion.g>
          </g>
        );
      })}
    </svg>
  );
}
