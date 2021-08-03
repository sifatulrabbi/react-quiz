import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
//components
import { QuestionCard } from "./components";
//types
import { Difficulty } from "./API";

const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
  const [laoding, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setQuestions(await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.MEDIUM));
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    //code goes here...
  };

  const nextQuestion = () => {
    //code goes here...
  };

  return (
    <div className="App">
      <h1>React Quiz</h1>
      <button className="start-btn" onClick={startTrivia}>
        Start
      </button>
      <p className="score">Score: </p>
      <p>Loading Questions....</p>
      {/* <QuestionCard
        questionNo={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      /> */}
      <button className="next-btn" onClick={nextQuestion}>
        Next Question
      </button>
    </div>
  );
};

export default App;
