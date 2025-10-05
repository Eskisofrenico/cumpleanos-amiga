// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import '../styles/FinalMessage.css';
import Confetti from './Confetti';
import { Gift } from './Icons';
import { SushiIcon, HotDogIcon, IceCreamIcon, CinemaIcon, FriesIcon } from './ActivityIcons';
import SuccessScreen from './SuccessScreen';
import ConfirmationModal from './ConfirmationModal';

const FinalMessage = ({ message }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showGifts, setShowGifts] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const [showActivities, setShowActivities] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedActivity, setConfirmedActivity] = useState(null);
  const messageBoxRef = useRef(null);

  const gifts = [
    { 
      id: 1, 
      image: '/cine.jpeg', 
      name: 'Nuestro Momento en el cine',
      message: 'Este fue nuestro primer momento donde fuimos a ver una pelicula juntos y nuestra primera vez viendo una pelicula de terror en el modo d-box, un recuerdo que siempre atesoraré.'
    },
    { 
      id: 2, 
      image: '/peluche1.jpeg', 
      name: 'Nuestro momento en las maquinas de los chinos',
      message: 'Este momento fue cuando ya tu felicidad y como sonreias con tu palta, me cautivo porque eras tan adorable y feliz, que me di cuenta que queria hacerte feliz siempre.'
    },
    { 
      id: 3, 
      image: '/peluche2.jpeg', 
      name: 'Nuestro momento en las maquinas de los chinos',
      message: 'Este momento fue cuando ya te brillaban los ojitos cuando ya sacabamos hartos peluches y fue un momento inolvidable que siempre voy a recordar.'
    }
  ];

  const activities = [
    { id: 1, name: 'Ir a comer sushi', icon: SushiIcon, color: '#FF6B9D' },
    { id: 2, name: 'Ir a comer completo', icon: HotDogIcon, color: '#FFA726' },
    { id: 3, name: 'Ir a comer helado', icon: IceCreamIcon, color: '#66BB6A' },
    { id: 4, name: 'Ir al cine', icon: CinemaIcon, color: '#AB47BC' },
    { id: 5, name: 'Ir a comer papas fritas', icon: FriesIcon, color: '#FFD54F' }
  ];

  useEffect(() => {
    if (currentIndex < message.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + message[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else if (currentIndex === message.length && message.length > 0) {
      setTimeout(() => setShowGifts(true), 1000);
    }
  }, [currentIndex, message]);

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [displayedText]);

  const handleGiftClick = (gift) => setSelectedGift(gift);
  const closeModal = () => setSelectedGift(null);
  const handleShowActivities = () => setShowActivities(true);
  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setShowConfirmation(true);
  };
  const handleConfirmYes = () => {
    setConfirmedActivity(selectedActivity);
    setShowConfirmation(false);
    setSelectedActivity(null);
  };
  const handleConfirmNo = () => {
    setShowConfirmation(false);
    setSelectedActivity(null);
  };
  const handleBackToGifts = () => {
    setShowActivities(false);
    setConfirmedActivity(null);
  };

  if (confirmedActivity) {
    return <SuccessScreen activity={confirmedActivity} onBack={handleBackToGifts} />;
  }

  if (showActivities) {
    return (
      <>
        <Confetti />
        <motion.div className="activities-container" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.6 }}>
          <motion.h1 className="activities-title" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>Ahora tu decides</motion.h1>
          <motion.p className="activities-subtitle" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>Elige la actividad que mas te gustaria hacer</motion.p>
          <div className="activities-grid">
            {activities.map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <motion.button key={activity.id} className="activity-card" style={{ borderColor: activity.color }} onClick={() => handleActivityClick(activity)} initial={{ opacity: 0, scale: 0, rotate: -180 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.4 + index * 0.15, type: "spring", bounce: 0.6 }} whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                  <div className="activity-icon" style={{ background: activity.color }}>
                    <IconComponent size={60} />
                  </div>
                  <p className="activity-name">{activity.name}</p>
                </motion.button>
              );
            })}
          </div>
          <motion.button className="back-button" onClick={handleBackToGifts} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Volver a los regalos</motion.button>
          <AnimatePresence>
            {showConfirmation && selectedActivity && (
              <ConfirmationModal activity={selectedActivity} onConfirm={handleConfirmYes} onCancel={handleConfirmNo} />
            )}
          </AnimatePresence>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <Confetti />
      <motion.div className="final-message-container" initial={{ opacity: 0, scale: 0.5, rotateY: 180 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 1, type: "spring", bounce: 0.4 }}>
        <motion.h1 className="final-title" initial={{ y: -100, opacity: 0, scale: 0.5 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>Lo lograste</motion.h1>
        <motion.div ref={messageBoxRef} className="message-box" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
          <p className="message-text">{displayedText}</p>
          {currentIndex < message.length && <span className="typing-cursor">|</span>}
        </motion.div>
        <AnimatePresence>
          {showGifts && (
            <motion.div className="gifts-container" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <h3 className="gifts-title">Tus Regalos</h3>
              <div className="gifts-grid">
                {gifts.map((gift, index) => (
                  <motion.button key={gift.id} className="gift-button" onClick={() => handleGiftClick(gift)} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + index * 0.2, type: "spring", bounce: 0.5 }} whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }} whileTap={{ scale: 0.9 }}>
                    <Gift size={60} />
                    <span className="gift-number">{index + 1}</span>
                  </motion.button>
                ))}
              </div>
              <motion.button className="decide-button" onClick={handleShowActivities} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, type: "spring", bounce: 0.5 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Ahora tu decides</motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {selectedGift && (
            <motion.div className="gift-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal}>
              <motion.div className="gift-modal-content" initial={{ scale: 0.5, opacity: 0, rotateY: 90 }} animate={{ scale: 1, opacity: 1, rotateY: 0 }} exit={{ scale: 0.5, opacity: 0, rotateY: -90 }} transition={{ type: "spring", bounce: 0.4 }} onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={closeModal}>×</button>
                <img src={selectedGift.image} alt={selectedGift.name} className="gift-image" />
                <h3 className="gift-name">{selectedGift.name}</h3>
                <p className="gift-message">{selectedGift.message}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default FinalMessage;