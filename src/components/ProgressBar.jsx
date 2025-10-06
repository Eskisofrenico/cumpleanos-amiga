/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import '../styles/ProgressBar.css';

const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <motion.div 
      className="progress-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="progress-info">
        <span>Pregunta {current} de {total}</span>
      </div>
      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

export default ProgressBar;