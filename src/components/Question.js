import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let timer;
    if (timerActive && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime -1);
      }, 1000);
    } else if (timeRemaining === 0) {
      onAnswered(false);
      setTimeRemaining(10);
      setTimerActive(true);
    }

    return() => {
      clearTimeout(timer);
    };
  }, [timeRemaining , timerActive, onAnswered]);
  
  function handleAnswer(isCorrect) {
    setTimerActive(false);
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
