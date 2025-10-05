/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

const AnimatedCat = ({ size = 60, isMoving = false, isJumping = false, direction = 'right' }) => {
  const tailVariants = {
    idle: {
      rotate: [-5, 5, -5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    moving: {
      rotate: [-15, 15, -15],
      transition: {
        duration: 0.4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    jumping: {
      rotate: -30,
      transition: {
        duration: 0.2
      }
    }
  };

  const bodyVariants = {
    idle: {
      y: [0, -1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    moving: {
      y: [0, -2, 0, -2, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    jumping: {
      y: 0,
      scaleY: [1, 1.1, 0.9, 1],
      transition: {
        duration: 0.5
      }
    }
  };

  const legVariants = {
    frontLeft: {
      idle: { rotate: 0 },
      moving: {
        rotate: [0, 25, 0, -15, 0],
        transition: {
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut"
        }
      },
      jumping: { rotate: -20 }
    },
    frontRight: {
      idle: { rotate: 0 },
      moving: {
        rotate: [0, -15, 0, 25, 0],
        transition: {
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut"
        }
      },
      jumping: { rotate: -20 }
    },
    backLeft: {
      idle: { rotate: 0 },
      moving: {
        rotate: [0, -20, 0, 15, 0],
        transition: {
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut"
        }
      },
      jumping: { rotate: 35 }
    },
    backRight: {
      idle: { rotate: 0 },
      moving: {
        rotate: [0, 15, 0, -20, 0],
        transition: {
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut"
        }
      },
      jumping: { rotate: 35 }
    }
  };

  const earVariants = {
    idle: {
      rotate: [0, -3, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    moving: {
      rotate: [0, -5, 0, 5, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    jumping: {
      rotate: -8
    }
  };

  const getAnimationState = () => {
    if (isJumping) return 'jumping';
    if (isMoving) return 'moving';
    return 'idle';
  };

  const animationState = getAnimationState();
  const flipScale = direction === 'left' ? -1 : 1;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ 
        overflow: 'visible',
        transform: `scaleX(${flipScale})`,
        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
      }}
    >
      <defs>
        <clipPath id="bodyCatClip">
          <ellipse cx="50" cy="60" rx="18" ry="14" />
        </clipPath>
        <clipPath id="headCatClip">
          <circle cx="50" cy="35" r="13" />
        </clipPath>
      </defs>

      {/* Cola */}
      <motion.g
        style={{ transformOrigin: '32px 65px' }}
        variants={tailVariants}
        animate={animationState}
      >
        <path
          d="M32 65 Q25 60, 20 55 Q18 50, 19 45"
          stroke="#2c3e50"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M32 65 Q25 60, 20 55 Q18 50, 19 45"
          stroke="white"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="22" cy="52" rx="2.5" ry="4" fill="#1a1a1a" />
        <ellipse cx="19" cy="47" rx="2" ry="3" fill="#1a1a1a" />
      </motion.g>

      {/* Pata trasera izquierda */}
      <motion.g
        style={{ transformOrigin: '40px 72px' }}
        variants={legVariants.backLeft}
        animate={animationState}
      >
        <rect
          x="38"
          y="72"
          width="4"
          height="14"
          rx="2"
          fill="white"
          stroke="#2c3e50"
          strokeWidth="1"
        />
        <ellipse cx="40" cy="86" rx="3" ry="2" fill="white" stroke="#2c3e50" strokeWidth="1" />
      </motion.g>

      {/* Pata trasera derecha */}
      <motion.g
        style={{ transformOrigin: '60px 72px' }}
        variants={legVariants.backRight}
        animate={animationState}
      >
        <rect
          x="58"
          y="72"
          width="4"
          height="14"
          rx="2"
          fill="white"
          stroke="#2c3e50"
          strokeWidth="1"
        />
        <ellipse cx="60" cy="86" rx="3" ry="2" fill="white" stroke="#2c3e50" strokeWidth="1" />
      </motion.g>

      {/* Cuerpo */}
      <motion.g variants={bodyVariants} animate={animationState}>
        <ellipse
          cx="50"
          cy="60"
          rx="18"
          ry="14"
          fill="white"
          stroke="#2c3e50"
          strokeWidth="1.5"
        />
        
        <g clipPath="url(#bodyCatClip)">
          <ellipse cx="42" cy="58" rx="4" ry="5" fill="#1a1a1a" />
          <ellipse cx="58" cy="58" rx="4" ry="5" fill="#1a1a1a" />
          <ellipse cx="50" cy="65" rx="3" ry="4" fill="#1a1a1a" />
        </g>

        {/* Pata delantera izquierda */}
        <motion.g
          style={{ transformOrigin: '43px 72px' }}
          variants={legVariants.frontLeft}
          animate={animationState}
        >
          <rect
            x="41"
            y="72"
            width="4"
            height="16"
            rx="2"
            fill="white"
            stroke="#2c3e50"
            strokeWidth="1"
          />
          <ellipse cx="43" cy="88" rx="3" ry="2" fill="white" stroke="#2c3e50" strokeWidth="1" />
        </motion.g>

        {/* Pata delantera derecha */}
        <motion.g
          style={{ transformOrigin: '57px 72px' }}
          variants={legVariants.frontRight}
          animate={animationState}
        >
          <rect
            x="55"
            y="72"
            width="4"
            height="16"
            rx="2"
            fill="white"
            stroke="#2c3e50"
            strokeWidth="1"
          />
          <ellipse cx="57" cy="88" rx="3" ry="2" fill="white" stroke="#2c3e50" strokeWidth="1" />
        </motion.g>

        {/* Cabeza */}
        <g>
          <circle
            cx="50"
            cy="35"
            r="13"
            fill="white"
            stroke="#2c3e50"
            strokeWidth="1.5"
          />

          {/* Orejas */}
          <motion.g
            style={{ transformOrigin: '42px 24px' }}
            variants={earVariants}
            animate={animationState}
          >
            <path
              d="M42 24 L38 16 L44 22 Z"
              fill="white"
              stroke="#2c3e50"
              strokeWidth="1.5"
            />
            <path d="M42 24 L40 18 L44 22 Z" fill="#1a1a1a" />
          </motion.g>

          <motion.g
            style={{ transformOrigin: '58px 24px' }}
            variants={earVariants}
            animate={animationState}
          >
            <path
              d="M58 24 L62 16 L56 22 Z"
              fill="white"
              stroke="#2c3e50"
              strokeWidth="1.5"
            />
            <path d="M58 24 L60 18 L56 22 Z" fill="#1a1a1a" />
          </motion.g>

          <g clipPath="url(#headCatClip)">
            <ellipse cx="44" cy="32" rx="3.5" ry="4.5" fill="#1a1a1a" />
            <ellipse cx="56" cy="32" rx="3.5" ry="4.5" fill="#1a1a1a" />
            <ellipse cx="50" cy="28" rx="2.5" ry="3.5" fill="#1a1a1a" />
          </g>

          {/* Ojos */}
          <circle cx="46" cy="34" r="2" fill="#2ecc71" />
          <circle cx="46" cy="34" r="1" fill="#000" />
          
          <circle cx="54" cy="34" r="2" fill="#2ecc71" />
          <circle cx="54" cy="34" r="1" fill="#000" />

          {/* Nariz */}
          <path
            d="M50 38 L49 39 L50 39.5 L51 39 Z"
            fill="#ff9cb5"
            stroke="#e74c3c"
            strokeWidth="0.5"
          />

          {/* Boca */}
          <path
            d="M50 39.5 Q48 41 46 40.5 M50 39.5 Q52 41 54 40.5"
            stroke="#2c3e50"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />

          {/* Bigotes */}
          <line x1="38" y1="36" x2="43" y2="35" stroke="#2c3e50" strokeWidth="0.6" />
          <line x1="38" y1="37.5" x2="43" y2="37" stroke="#2c3e50" strokeWidth="0.6" />
          <line x1="38" y1="39" x2="43" y2="39" stroke="#2c3e50" strokeWidth="0.6" />
          
          <line x1="62" y1="36" x2="57" y2="35" stroke="#2c3e50" strokeWidth="0.6" />
          <line x1="62" y1="37.5" x2="57" y2="37" stroke="#2c3e50" strokeWidth="0.6" />
          <line x1="62" y1="39" x2="57" y2="39" stroke="#2c3e50" strokeWidth="0.6" />
        </g>
      </motion.g>
    </svg>
  );
};

export default AnimatedCat;