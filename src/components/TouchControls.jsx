import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUp } from './Icons';
import '../styles/TouchControls.css';

const TouchControls = ({ onLeft, onRight, onJump, onRelease }) => {
  return (
    <div className="touch-controls">
      <motion.button
        className="control-button left"
        onTouchStart={onLeft}
        onTouchEnd={onRelease}
        onMouseDown={onLeft}
        onMouseUp={onRelease}
        whileTap={{ scale: 0.9 }}
        aria-label="Mover izquierda"
      >
        <ChevronLeft size={24} />
      </motion.button>

      <motion.button
        className="control-button jump"
        onTouchStart={onJump}
        onTouchEnd={onRelease}
        onMouseDown={onJump}
        onMouseUp={onRelease}
        whileTap={{ scale: 0.9 }}
        aria-label="Saltar"
      >
        <ArrowUp size={28} />
        <span>SALTAR</span>
      </motion.button>

      <motion.button
        className="control-button right"
        onTouchStart={onRight}
        onTouchEnd={onRelease}
        onMouseDown={onRight}
        onMouseUp={onRelease}
        whileTap={{ scale: 0.9 }}
        aria-label="Mover derecha"
      >
        <ChevronRight size={24} />
      </motion.button>
    </div>
  );
};

export default TouchControls;