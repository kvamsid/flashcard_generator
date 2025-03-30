import React from 'react';

const Flashcard = ({ question, answer }) => {
  return (
    <div className="flashcard">
      <div className="flashcard-inner">
        <div className="flashcard-front">
          <p className="flashcard-text">
            <strong>Q:</strong> {question}
          </p>
        </div>
        <div className="flashcard-back">
          <p className="flashcard-text">
            <strong>A:</strong> {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
