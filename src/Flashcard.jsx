import React from 'react';
import './App.css'; // Optional if styling separately

const Flashcard = ({ question, answer, onNext, onPrev }) => {
  return (
    <div className="flashcard-wrapper">
      <button className="arrow-button left" onClick={onPrev}>&#8592;</button>

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

      <button className="arrow-button right" onClick={onNext}>&#8594;</button>
    </div>
  );
};

export default Flashcard;
