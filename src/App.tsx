import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
//components
import { QuestionCard } from "./components";
//types
import { QuestionState, Difficulty } from "./API";
//styles
import { GlobalStyle, Wrapper } from "./App.styles";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    try {
      const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.MEDIUM);
      setQuestions(newQuestions ? newQuestions : undefined);
    } catch (error) {
      console.log(error);
    }

    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (gameOver) return;
    //user answer
    const answer: string = e.currentTarget.value;
    //check answer against correct answer
    const correct: boolean = questions[number].correct_answer === answer;
    //incrementing score based on answer
    if (correct) setScore((prev) => prev + 1);
    //saving answer in the array
    const answerObject: AnswerObject = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer,
    };

    setUserAnswers((prev) => [...prev, answerObject]);
  };

  const nextQuestion = () => {
    //move on to the next question
    const nextQuestion: number = number + 1;
    //check if there is a next question
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start-btn" onClick={startTrivia}>
            {userAnswers.length === TOTAL_QUESTIONS ? "Restart" : "Start"}
          </button>
        ) : null}
        {!gameOver && <p className="score">Score: {score}</p>}
        {loading && <p>Loading Questions....</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNo={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
          !loading &&
          userAnswers.length === number + 1 &&
          number !== TOTAL_QUESTIONS - 1 && (
            <button className="next-btn" onClick={nextQuestion}>
              Next Question
            </button>
          )}
      </Wrapper>
    </>
  );
};

export default App;
