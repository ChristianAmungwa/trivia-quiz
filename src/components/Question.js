import React, { useState, useEffect, useReducer } from "react";
import Timer from "./Timer";

const initialState = {
  currentQuestion: {},
  remainingQuestions: [],
  timeUp: false,
  incorrect: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_QUESTION":
      return { ...state, currentQuestion: action.payload };
    case "SET_REMAINING_QUESTIONS":
      return { ...state, remainingQuestions: action.payload };
    case "TIME_UP":
      return { ...state, timeUp: true };
    case "INCORRECT":
      return { ...state, incorrect: true };
    default:
      return state;
  }
};

const Question = ({ questions }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Shuffle the questions array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const checkAnswer = (answer) => {
    if (answer === state.currentQuestion.correctAnswer) {
      moveToNextQuestion();
    } else {
      dispatch({ type: "INCORRECT" });
    }
  };

  // Function to move to the next question
  const moveToNextQuestion = (fromTimer = false) => {
    if (fromTimer) {
      dispatch({ type: "TIME_UP" });
    } else {
      dispatch({ type: "INCORRECT" });
    }
    const nextRemainingQuestions = state.remainingQuestions.slice(1);
    dispatch({ type: "SET_REMAINING_QUESTIONS", payload: nextRemainingQuestions });
  };

  // Initialize remaining questions and current question
  useEffect(() => {
    dispatch({ type: "SET_REMAINING_QUESTIONS", payload: shuffleArray(questions) });
  }, [questions]); // Empty dependency array indicates this useEffect runs once

  // Set the current question and reset timeUp and incorrect
  useEffect(() => {
    if (!state.remainingQuestions.length) {
      dispatch({ type: "SET_REMAINING_QUESTIONS", payload: shuffleArray(questions) });
    } else {
      dispatch({ type: "SET_CURRENT_QUESTION", payload: state.remainingQuestions[0] });
    }
  }, [state.remainingQuestions, questions]);

  return (
    <div>
      <h1>{state.currentQuestion.question}</h1>
      {state.currentQuestion.options?.map((option, index) => (
        <button key={index} onClick={() => checkAnswer(option)}>
          {option}
        </button>
      ))}
      <Timer moveToNextQuestion={moveToNextQuestion} />
      {state.timeUp && <p>Time's up! The correct answer is {state.currentQuestion.correctAnswer}</p>}
      {state.incorrect && <p>That's incorrect. Please try again.</p>}
    </div>
  );
};

export default Question;
