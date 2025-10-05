// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Confetti from './Confetti';
import '../styles/SuccessScreen.css';

const StarIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFD700" stroke="#FFA500" strokeWidth="1"/>
  </svg>
);

const SuccessScreen = ({ activity, onBack }) => {
  const IconComponent = activity.icon;

  return (
    <>
      <Confetti />
      <motion.div
        className="success-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="success-card"
          initial={{ scale: 0.5, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.5, duration: 1 }}
        >
          <motion.div
            className="success-icon-container"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.6, duration: 1 }}
          >
            <div className="success-icon-circle" style={{ background: activity.color }}>
              <IconComponent size={100} />
            </div>
            <motion.div
              className="success-ring"
              style={{ borderColor: activity.color }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0 }}
              transition={{ delay: 0.5, duration: 1.5, repeat: Infinity }}
            />
          </motion.div>

          <motion.h1
            className="success-heading"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Felicidades
          </motion.h1>

          <motion.div
            className="success-divider"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          />

          <motion.p
            className="success-text"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Entonces vamos a
          </motion.p>

          <motion.p
            className="success-activity"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            {activity.name}
          </motion.p>

          <motion.button
            className="success-back-button"
            onClick={onBack}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Volver
          </motion.button>
        </motion.div>

        <motion.div
          className="success-sparkles"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="sparkle"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 2) * 60}%`
              }}
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            >
              <StarIcon size={30} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};

export default SuccessScreen;