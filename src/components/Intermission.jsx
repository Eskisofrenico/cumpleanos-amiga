import { motion } from 'framer-motion';
import '../styles/Intermission.css';

const Intermission = ({ message, onContinue }) => {
  return (
    <motion.div
      className="intermission-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="intermission-title"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {message}
      </motion.h2>

      <motion.button
        className="continue-button"
        onClick={onContinue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Continuar
      </motion.button>
    </motion.div>
  );
};

export default Intermission;