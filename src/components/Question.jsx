// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useState } from 'react';
import '../styles/Question.css';

const Question = ({ question, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionClick = (optionId) => {
    if (showFeedback) return;
    
    setSelectedOption(optionId);
    setShowFeedback(true);

    const isCorrect = optionId === question.correctAnswer;

    setTimeout(() => {
      onAnswer(isCorrect);
      setSelectedOption(null);
      setShowFeedback(false);
    }, 800);
  };

  return (
    <motion.div
      className="question-container"
      initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
      animate={{ opacity: 1, rotateY: 0, scale: 1 }}
      exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
      transition={{ 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
    >
      <motion.h2 
        className="question-text"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {question.question}
      </motion.h2>
      
      <div className="options-grid">
        {question.options.map((option, index) => (
          <motion.button
            key={option.id}
            className={`option-button ${
              showFeedback && selectedOption === option.id
                ? option.id === question.correctAnswer
                  ? 'correct'
                  : 'incorrect'
                : ''
            }`}
            onClick={() => handleOptionClick(option.id)}
            disabled={showFeedback}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
            whileTap={!showFeedback ? { scale: 0.97 } : {}}
          >
            <span className="option-id">{option.id.toUpperCase()}</span>
            <span className="option-text">{option.text}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Question;