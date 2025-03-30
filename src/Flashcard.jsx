import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,faChevronRight
} from '@fortawesome/free-solid-svg-icons';

const Flashcard = ({ question, answer, onNext, onPrev }) => {
  return (
    <div className="flashcard-wrapper">
      <button className="arrow-button left" onClick={onPrev}>
      <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <div className="flashcard">
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <div className="flashcard-text">
              <strong>Q:</strong> {question}
            </div>
          </div>
          <div className="flashcard-back">
            <div className="flashcard-text">
              <strong>A:</strong> {answer}
            </div>
          </div>
        </div>
      </div>

      <button className="arrow-button right" onClick={onNext}>
      <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Flashcard;
