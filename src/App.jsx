// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './App.css';
import WelcomeScreen from './components/WelcomeScreen';
import Question from './components/Question';
import ProgressBar from './components/ProgressBar';
import FinalMessage from './components/FinalMessage';
import Lives from './components/Lives';
import GameOver from './components/GameOver';
import ParallaxBackground from './components/ParallaxBackground';
import PlatformGame from './components/PlatformGame';
import Intermission from './components/Intermission';
import { questions, finalMessage } from './data/questions';

function App() {
  const [gameState, setGameState] = useState('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lives, setLives] = useState(3);

  const handleStart = () => {
    setGameState('playing');
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setGameState('intermission');
      }
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      
      if (newLives === 0) {
        setGameState('gameover');
      }
    }
  };

  const handleIntermissionContinue = () => {
    setGameState('platformgame');
  };

  const handlePlatformComplete = () => {
    setGameState('finished');
  };

  const handleRestart = () => {
    setGameState('welcome');
    setCurrentQuestionIndex(0);
    setLives(3);
  };

  return (
    <div className="app">
      <ParallaxBackground />
      {gameState === 'playing' && <Lives lives={lives} />}
      
      <AnimatePresence mode="wait">
        {gameState === 'welcome' && (
          <WelcomeScreen key="welcome" onStart={handleStart} />
        )}

        {gameState === 'playing' && (
          <div key="playing" className="game-container">
            <ProgressBar 
              current={currentQuestionIndex + 1} 
              total={questions.length} 
            />
            <Question 
              question={questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
            />
          </div>
        )}

        {gameState === 'intermission' && (
          <Intermission 
            key="intermission"
            message="¡Genial! Ahora un desafío de habilidad"
            onContinue={handleIntermissionContinue}
          />
        )}

        {gameState === 'platformgame' && (
          <PlatformGame 
            key="platformgame"
            onComplete={handlePlatformComplete}
          />
        )}

        {gameState === 'gameover' && (
          <GameOver key="gameover" onRestart={handleRestart} />
        )}

        {gameState === 'finished' && (
          <FinalMessage key="finished" message={finalMessage} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;