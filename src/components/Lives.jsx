// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from './Icons';
import '../styles/Lives.css';

const Lives = ({ lives }) => {
  const getMessage = () => {
    if (lives === 2) return "¡Cuidado! Te quedan pocas vidas";
    if (lives === 1) return "¡Última oportunidad!";
    return "";
  };

  const message = getMessage();

  return (
    <div className="lives-wrapper">
      <motion.div 
        className="lives-container"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="lives-display">
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              className={`heart-icon ${index < lives ? 'alive' : 'lost'}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Heart 
                size={28} 
                fill={index < lives ? "#FF7F7F" : "none"}
                stroke={index < lives ? "#FF7F7F" : "#ccc"}
                strokeWidth={2}
              />
            </motion.div>
          ))}
        </div>
        <div className="lives-counter">
          {lives}/3
        </div>
      </motion.div>

      <AnimatePresence>
        {message && (
          <motion.div
            className="lives-warning"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Lives;