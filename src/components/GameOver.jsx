import { motion } from 'framer-motion';
import '../styles/GameOver.css';

const GameOver = ({ onRestart }) => {
  return (
    <motion.div
      className="gameover-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="gameover-title"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        ¡Oh no!
      </motion.h1>

      <motion.p
        className="gameover-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Te quedaste sin vidas. ¡Pero no te preocupes, puedes intentarlo de nuevo!
      </motion.p>

      <motion.button
        className="restart-button"
        onClick={onRestart}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Intentar de nuevo
      </motion.button>
    </motion.div>
  );
};

export default GameOver;