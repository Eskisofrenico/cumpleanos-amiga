/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Heart, Gift } from './Icons';
import AnimatedCat from './AnimatedCat';
import '../styles/PlatformGame.css';
import TouchControls from './TouchControls';

const GRAVITY = 0.6;
const MOVE_SPEED = 6;
const JUMP_FORCE = -15;
const BASE_WIDTH = 800;
const BASE_HEIGHT = 560;
const BASE_PLAYER_SIZE = 80;
const HEART_SIZE = 30;
const GIFT_SIZE = 60;

const platforms = [
  { id: 1, x: 0, y: 520, width: 200, height: 20 },
  { id: 2, x: 250, y: 470, width: 150, height: 20 },
  { id: 3, x: 450, y: 420, width: 150, height: 20 },
  { id: 4, x: 650, y: 370, width: 150, height: 20 },
  { id: 5, x: 450, y: 320, width: 150, height: 20 },
  { id: 6, x: 250, y: 270, width: 150, height: 20 },
  { id: 7, x: 50, y: 220, width: 200, height: 20 },
  { id: 8, x: 300, y: 170, width: 250, height: 20 }
];

const hearts = [
  { id: 1, x: 85, y: 470 },
  { id: 2, x: 310, y: 420 },
  { id: 3, x: 510, y: 370 },
  { id: 4, x: 710, y: 320 },
  { id: 5, x: 510, y: 270 },
  { id: 6, x: 135, y: 170 }
];

const goal = {
  x: 380,
  y: 86,
  width: GIFT_SIZE,
  height: GIFT_SIZE
};

const PlatformGame = ({ onComplete }) => {
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 460 });
  const [cameraY, setCameraY] = useState(0);
  const [collectedHearts, setCollectedHearts] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [scale, setScale] = useState(1);
  const [catState, setCatState] = useState({
    isMoving: false,
    isJumping: false,
    direction: 'right'
  });
  
  const playerVelocityRef = useRef({ x: 0, y: 0 });
  const isGroundedRef = useRef(false);
  const keysPressed = useRef({});
  const animationFrameId = useRef(null);
  const lastUpdateTime = useRef(Date.now());
  const gameAreaRef = useRef(null);
  const collectedHeartsSet = useRef(new Set());
  const completedRef = useRef(false);
  const lastDirectionRef = useRef('right');

  useEffect(() => {
    const updateScale = () => {
      if (gameAreaRef.current) {
        const rect = gameAreaRef.current.getBoundingClientRect();
        const scaleX = rect.width / BASE_WIDTH;
        const scaleY = rect.height / BASE_HEIGHT;
        setScale(Math.min(scaleX, scaleY));
      }
    };

    const timer = setTimeout(updateScale, 50);
    return () => clearTimeout(timer);
  }, [gameStarted]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (isGroundedRef.current) {
          playerVelocityRef.current.y = JUMP_FORCE;
          isGroundedRef.current = false;
        }
      } else {
        keysPressed.current[e.key] = true;
      }
    };

    const handleKeyUp = (e) => {
      keysPressed.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!gameStarted) return;

    const playerSize = BASE_PLAYER_SIZE;

    const gameLoop = () => {
      const now = Date.now();
      const deltaTime = Math.min((now - lastUpdateTime.current) / 16.67, 2);
      lastUpdateTime.current = now;

      setPlayerPos(prevPos => {
        let newX = prevPos.x;
        let newY = prevPos.y;
        
        const maxX = BASE_WIDTH - playerSize;
        let moving = false;
        let currentDirection = lastDirectionRef.current;

        if (keysPressed.current['ArrowLeft']) {
          newX = Math.max(0, prevPos.x - MOVE_SPEED * deltaTime);
          moving = true;
          currentDirection = 'left';
        }
        if (keysPressed.current['ArrowRight']) {
          newX = Math.min(maxX, prevPos.x + MOVE_SPEED * deltaTime);
          moving = true;
          currentDirection = 'right';
        }

        if (moving) {
          lastDirectionRef.current = currentDirection;
        }

        playerVelocityRef.current.y += GRAVITY * deltaTime;
        newY = prevPos.y + playerVelocityRef.current.y * deltaTime;

        let grounded = false;
        platforms.forEach(platform => {
          if (
            newX + playerSize > platform.x &&
            newX < platform.x + platform.width &&
            newY + playerSize >= platform.y &&
            newY + playerSize <= platform.y + platform.height + 20 &&
            playerVelocityRef.current.y >= 0
          ) {
            newY = platform.y - playerSize;
            playerVelocityRef.current.y = 0;
            grounded = true;
          }
        });

        if (newY + playerSize > BASE_HEIGHT - 10) {
          newY = BASE_HEIGHT - playerSize - 10;
          playerVelocityRef.current.y = 0;
          grounded = true;
        }

        isGroundedRef.current = grounded;

        setCatState({
          isMoving: moving,
          isJumping: !grounded,
          direction: currentDirection
        });

        setCameraY(currentCameraY => {
          const viewportHeight = BASE_HEIGHT;
          const targetCameraY = newY - (viewportHeight * 0.6);
          const minCameraY = 0;
          const maxCameraY = BASE_HEIGHT - viewportHeight;
          const smoothness = 0.08;
          const smoothCameraY = currentCameraY + (targetCameraY - currentCameraY) * smoothness;
          return Math.max(minCameraY, Math.min(maxCameraY, smoothCameraY));
        });

        hearts.forEach(heart => {
          if (
            !collectedHeartsSet.current.has(heart.id) &&
            newX + playerSize > heart.x &&
            newX < heart.x + HEART_SIZE &&
            newY + playerSize > heart.y &&
            newY < heart.y + HEART_SIZE
          ) {
            collectedHeartsSet.current.add(heart.id);
            setCollectedHearts(Array.from(collectedHeartsSet.current));
          }
        });

        if (collectedHeartsSet.current.size === 6 && !completedRef.current) {
          if (
            newX + playerSize > goal.x &&
            newX < goal.x + goal.width &&
            newY + playerSize > goal.y &&
            newY < goal.y + goal.height
          ) {
            completedRef.current = true;
            cancelAnimationFrame(animationFrameId.current);
            setTimeout(() => onComplete(), 500);
            return prevPos;
          }
        }

        return { x: newX, y: newY };
      });

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    setPlayerPos({ x: 50, y: 460 });
    setCameraY(0);
    playerVelocityRef.current = { x: 0, y: 0 };
    isGroundedRef.current = false;
    collectedHeartsSet.current = new Set();
    setCollectedHearts([]);
    completedRef.current = false;
    lastUpdateTime.current = Date.now();
    lastDirectionRef.current = 'right';
    setCatState({ isMoving: false, isJumping: false, direction: 'right' });

    animationFrameId.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameStarted, onComplete]);

  const handleLeftPress = () => keysPressed.current['ArrowLeft'] = true;
  const handleRightPress = () => keysPressed.current['ArrowRight'] = true;
  const handleJump = () => {
    if (isGroundedRef.current) {
      playerVelocityRef.current.y = JUMP_FORCE;
      isGroundedRef.current = false;
    }
  };
  const handleRelease = () => {
    keysPressed.current['ArrowLeft'] = false;
    keysPressed.current['ArrowRight'] = false;
  };

  return (
    <div className="platform-game-container">
      {!gameStarted ? (
        <motion.div
          className="game-instructions"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2>Desafio de Habilidad</h2>
          <p>Ayuda al gatito a recolectar los 6 corazones</p>
          <div className="controls-info">
            <p>Flechas para mover</p>
            <p>ESPACIO o flecha arriba para saltar</p>
            <p className="mobile-hint">En movil usa los botones en pantalla</p>
          </div>
          <motion.button
            className="start-game-button"
            onClick={() => setGameStarted(true)}
            whileTap={{ scale: 0.95 }}
          >
            Comenzar
          </motion.button>
        </motion.div>
      ) : (
        <>
          <div className="game-hud">
            <div className="hearts-counter">
              Corazones: {collectedHearts.length}/6
            </div>
            <div className="height-indicator">
              {Math.max(0, Math.round((BASE_HEIGHT - playerPos.y - BASE_PLAYER_SIZE) / 10))}m
            </div>
          </div>

          <div className="game-area" ref={gameAreaRef}>
            <div 
              className="game-world"
              style={{
                transform: `translateY(${-cameraY * scale}px)`
              }}
            >
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className="platform"
                  style={{
                    left: platform.x * scale,
                    top: platform.y * scale,
                    width: platform.width * scale,
                    height: platform.height * scale
                  }}
                />
              ))}

              {hearts.map(heart => (
                !collectedHearts.includes(heart.id) && (
                  <motion.div
                    key={heart.id}
                    className="heart-collectible"
                    style={{ 
                      left: heart.x * scale, 
                      top: heart.y * scale 
                    }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Heart 
                      size={Math.max(24, 24 * scale)} 
                      fill="#FF7F7F" 
                      stroke="#FF7F7F" 
                    />
                  </motion.div>
                )
              ))}

              {collectedHearts.length === 6 && (
                <motion.div
                  className="goal"
                  style={{ 
                    left: goal.x * scale, 
                    top: goal.y * scale 
                  }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  <Gift 
                    size={Math.max(48, 48 * scale)} 
                    fill="#FFD700" 
                    stroke="#FFD700" 
                  />
                </motion.div>
              )}

              <div
                className="player"
                style={{
                  left: playerPos.x * scale,
                  top: playerPos.y * scale,
                  width: BASE_PLAYER_SIZE * scale,
                  height: BASE_PLAYER_SIZE * scale
                }}
              >
                <AnimatedCat 
                  size={Math.max(70, BASE_PLAYER_SIZE * scale * 1.5)}
                  isMoving={catState.isMoving}
                  isJumping={catState.isJumping}
                  direction={catState.direction}
                />
              </div>
            </div>
          </div>

          <TouchControls
            onLeft={handleLeftPress}
            onRight={handleRightPress}
            onJump={handleJump}
            onRelease={handleRelease}
          />
        </>
      )}
    </div>
  );
};

export default PlatformGame;