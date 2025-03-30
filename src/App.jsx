import React, { useState } from 'react';
import './App.css';
import Flashcard from './Flashcard';

function App() {
  // 'pdf' or 'text'
  const [inputType, setInputType] = useState('text');
  const [inputValue, setInputValue] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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
          }),
        });
      } else if (inputType === 'pdf') {
        if (!pdfFile) {
          alert('Please select a PDF file.');
          setLoading(false);
          return;
        }
        const formData = new FormData();
        formData.append('file', pdfFile);
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

      if (data.flashcards && Array.isArray(data.flashcards)) {
        setFlashcards(data.flashcards);
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

  return (
    <div className="app">
      <h1>FlashLearn MVP</h1>

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

        {inputType === 'text' ? (
          <textarea
            placeholder="Paste your notes or document text here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            rows={10}
          />
        ) : (
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        )}

        <button
          className="generate-btn"
          onClick={generateFlashcards}
          disabled={
            loading ||
            ((inputType === 'text' && !inputValue) ||
              (inputType === 'pdf' && !pdfFile))
          }
        >
          {loading ? 'Generating...' : 'Generate Flashcards'}
        </button>
      </div>

      <div className="flashcards-section">
        {flashcards.length > 0 && <h2>Generated Flashcards:</h2>}
        {flashcards.length > 0 && (
          <div className="flashcards-container">
            <Flashcard
              question={flashcards[currentIndex].question}
              answer={flashcards[currentIndex].answer}
            />
          </div>
        )}

        {flashcards.length > 0 && (
          <div className="navigation-buttons">
            <button onClick={handlePrevious}>
              &lt; Previous
            </button>
            <button onClick={handleNext}>
              Next &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
