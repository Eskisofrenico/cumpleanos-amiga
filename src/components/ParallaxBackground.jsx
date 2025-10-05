// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import '../styles/ParallaxBackground.css';

const ParallaxBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;
    
    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMousePosition({
            x: (e.clientX / window.innerWidth - 0.5) * 15,
            y: (e.clientY / window.innerHeight - 0.5) * 15
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const circles = [
    { size: 250, color: '#98D8C8', opacity: 0.15, speed: 0.8 },
    { size: 180, color: '#87CEEB', opacity: 0.12, speed: 0.5 },
    { size: 200, color: '#FF7F7F', opacity: 0.1, speed: 0.6 }
  ];

  return (
    <div className="parallax-background">
      {circles.map((circle, index) => (
        <motion.div
          key={index}
          className="parallax-circle"
          style={{
            width: circle.size,
            height: circle.size,
            backgroundColor: circle.color,
            opacity: circle.opacity,
            left: `${15 + index * 25}%`,
            top: `${20 + index * 15}%`
          }}
          animate={{
            x: mousePosition.x * circle.speed,
            y: mousePosition.y * circle.speed
          }}
          transition={{ type: 'spring', stiffness: 30, damping: 15 }}
        />
      ))}
    </div>
  );
};

export default ParallaxBackground;