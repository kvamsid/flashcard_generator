import React, { useState } from 'react';
import './App.css';
import Flashcard from './Flashcard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [inputType, setInputType] = useState('text');
  const [inputValue, setInputValue] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [difficulty, setDifficulty] = useState('Moderate');

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setPdfFile(e.target.files[0]);
    }
  };

  const generateFlashcards = async () => {
    setLoading(true);
    setFlashcards([]);
    try {
      let response;

      if (inputType === 'text') {
        response = await fetch('https://https-github-com-adelinrovay-wics.onrender.com/textFlashCards/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: inputValue,
            type: 'text',
            difficulty: difficulty,
          }),
        });
      } else if (inputType === 'pdf') {
        const formData = new FormData();
        formData.append('file', pdfFile);
        formData.append('difficulty', difficulty);
        response = await fetch('https://https-github-com-adelinrovay-wics.onrender.com/pdfFlashCards/', {
          method: 'POST',
          body: formData,
        });
      }      

      const responseText = await response.text();
      let data = JSON.parse(responseText);
      if (typeof data === 'string' || typeof data === 'object') {
        data = JSON.parse(data);
      }

      if (data && Array.isArray(data)) {
        setFlashcards(data);
      } else {
        throw new Error('Flashcards data not in expected format');
      }
    } catch (error) {
      console.error('Error generating flashcards:', error);
      alert('There was an error generating flashcards. Please try again.');
    }
    setLoading(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
  };

  const shouldShowGenerateButton =
    (inputType === 'text' && inputValue.trim() !== '') ||
    (inputType === 'pdf' && pdfFile);

  return (
    <div className="app">
      <h1>
        Flash
        <FontAwesomeIcon icon={faBolt} style={{ marginLeft: '10px', marginRight: '10px', color: '#f9d976' }} />
        Learn
      </h1>

      <div className="input-section">
        <div className="input-type-toggle">
          <button
            className={inputType === 'text' ? 'active' : ''}
            onClick={() => {
              setInputType('text');
              setPdfFile(null);
            }}
          >
            Text Input
          </button>
          <button
            className={inputType === 'pdf' ? 'active' : ''}
            onClick={() => {
              setInputType('pdf');
              setInputValue('');
            }}
          >
            Upload PDF
          </button>
        </div>
        <div className="difficulty-select">
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Beginner">Beginner</option>
            <option value="Moderate">Moderate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {inputType === 'text' ? (
          <textarea
            placeholder="Paste your notes or document text here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            rows={6}
          />
        ) : (
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        )}

        {shouldShowGenerateButton && (
          <button
            className="generate-btn"
            onClick={generateFlashcards}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Flashcards'}
          </button>
        )}
      </div>

      <div className="flashcards-section">
        {flashcards.length > 0 && (
          <div className="flashcards-container">
            <Flashcard
              question={flashcards[currentIndex].question}
              answer={flashcards[currentIndex].answer}
              onNext={handleNext}
              onPrev={handlePrevious}
            />

          </div>
        )}
      </div>
    </div>
  );
}

export default App;
