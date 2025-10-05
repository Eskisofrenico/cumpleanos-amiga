import { motion } from 'framer-motion';
import '../styles/WelcomeScreen.css';

const WelcomeScreen = ({ onStart }) => {
  return (
    <motion.div
      className="welcome-screen"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Feliz Cumpleaños
      </motion.h1>
      
      <motion.p
        className="welcome-subtitle"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Antes de tu regalo, demuestra cuánto nos conocemos
      </motion.p>

      <motion.button
        className="start-button"
        onClick={onStart}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Comenzar
      </motion.button>
    </motion.div>
  );
};

export default WelcomeScreen;