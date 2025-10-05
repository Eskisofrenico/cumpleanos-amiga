import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Confetti = () => {
  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    const pieces = [];
    const colors = ['#98D8C8', '#87CEEB', '#FF7F7F', '#FFD700', '#FF69B4'];
    
    for (let i = 0; i < 40; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 1.5,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        size: 8 + Math.random() * 6
      });
    }
    setConfettiPieces(pieces);
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      pointerEvents: 'none', 
      zIndex: 9999 
    }}>
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ 
            y: window.innerHeight + 20,
            opacity: 0,
            rotate: piece.rotation + 360
          }}
          transition={{
            duration: 2 + Math.random() * 1.5,
            delay: piece.animationDelay,
            ease: "easeIn"
          }}
          style={{
            position: 'absolute',
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.backgroundColor,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            willChange: 'transform'
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;