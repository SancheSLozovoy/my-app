import React from 'react';
import './Popup.css';

const Popup = ({ isOpen, message, onClose, onRestart }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-message">{message}</div>
        <button className="popup-button" onClick={onRestart && onClose}>
          Start New Game
        </button>
        <button className="popup-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;