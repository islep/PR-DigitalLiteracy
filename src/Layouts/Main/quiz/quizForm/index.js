import React, { useState } from 'react';

const Quiz = ({ data, onComplete }) => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState(Array(data.length).fill(0));
  const [selectedOption, setSelectedOption] = useState(null);

  const currentCategory = data[currentCategoryIndex];
  const currentQuestion = currentCategory.questions[currentQuestionIndex];

  const handleOptionChange = (id) => {
    setSelectedOption(id);
  }

  const nextQuestion = () => {
    if (selectedOption === currentQuestion.correctAnswer) {
      setScores(prevScores => {
        const newScores = [...prevScores];
        newScores[currentCategoryIndex]++;
        return newScores;
      });
    }

    setSelectedOption(null);

    if (currentQuestionIndex < currentCategory.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else if (currentCategoryIndex < data.length - 1) {
      setCurrentQuestionIndex(0);
      setCurrentCategoryIndex(prevIndex => prevIndex + 1);
    } else {
      onComplete(scores);
    }
  }

  return (
    <div>
      <h2>{currentQuestion.question}</h2>
      <div>
        {currentQuestion.options.map(option => (
          <label key={option.id}>
            <input 
              type="radio" 
              value={option.id} 
              checked={selectedOption === option.id}
              onChange={() => handleOptionChange(option.id)}
            />
            <img src={option.src} alt={option.alt} />
          </label>
        ))}
      </div>
      <button onClick={nextQuestion}>Next</button>
    </div>
  );
}

export default Quiz;
