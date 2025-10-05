// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import '../styles/ConfirmationModal.css';

const ConfirmationModal = ({ activity, onConfirm, onCancel }) => {
  const IconComponent = activity.icon;

  return (
    <motion.div
      className="confirmation-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="confirmation-card"
        initial={{ scale: 0.5, opacity: 0, y: 100 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.5, opacity: 0, y: 100 }}
        transition={{ type: "spring", bounce: 0.4 }}
      >
        <motion.div
          className="confirmation-icon-wrapper"
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
        >
          <div className="confirmation-icon" style={{ background: activity.color }}>
            <IconComponent size={80} />
          </div>
        </motion.div>

        <motion.h2
          className="confirmation-title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Estas segura
        </motion.h2>

        <motion.p
          className="confirmation-subtitle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {activity.name}
        </motion.p>

        <motion.div
          className="confirmation-actions"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="confirmation-btn confirmation-yes"
            onClick={onConfirm}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Si
          </motion.button>
          <motion.button
            className="confirmation-btn confirmation-no"
            onClick={onCancel}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            No
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmationModal;