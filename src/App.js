
import React, { useState, useEffect } from 'react';
import './App.css';
import questions from './data/questions.json';

function App() {
  const [time, setTime] = useState(15);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState('');

  // Timer logic
  useEffect(() => {
    let timer;
    if (isQuizActive && time > 0) {
      timer = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(timer);
      setMessage(`Time's up! The correct answer is ${questions[currentIndex].correctAnswer}`);
      moveToNextQuestion();
    }
    return () => clearInterval(timer);
  }, [time, isQuizActive]);

  const moveToNextQuestion = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
    setTime(15);
  };

  const checkAnswer = (answer) => {
    if (answer === questions[currentIndex].correctAnswer) {
      setMessage('Correct!');
      moveToNextQuestion();
    } else {
      setMessage(`That's the wrong answer, the correct answer is ${questions[currentIndex].correctAnswer}`);
    }
  };

  const startQuiz = () => {
    setIsQuizActive(true);
    setTime(15);
  };

  const stopQuiz = () => {
    setIsQuizActive(false);
    setTime(15);
    setCurrentIndex(0);
    setMessage('');
  };

  return (
    <div className="App">
      <h1>Trivia Quiz</h1>
      {isQuizActive && (
        <>
          <div>
            <h2>Time remaining: {time} seconds</h2>
            <h3>{questions[currentIndex].question}</h3>
            {questions[currentIndex].options.map((option, index) => (
              <button key={index} onClick={() => checkAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
          <h2 className={message === 'Correct!' ? 'correct' : 'wrong'}>{message}</h2>
        </>
      )}
      <div>
        <button className="large-button" onClick={startQuiz}>
          START QUIZ
        </button>
        <button className="large-button" onClick={stopQuiz}>
          STOP QUIZ
        </button>
      </div>
    </div>
  );
}

export default App;












// import React, { useState, useEffect } from 'react';
// import './App.css';
// import questions from './data/questions.json';

// function App() {
//   const [currentQuestion, setCurrentQuestion] = useState({});
//   const [timer, setTimer] = useState(15);
//   const [showAnswer, setShowAnswer] = useState(null);
//   const [answerStatus, setAnswerStatus] = useState('');

//   useEffect(() => {
//     getRandomQuestion();
//   }, []);

//   const getRandomQuestion = () => {
//     const randomIndex = Math.floor(Math.random() * questions.length);
//     setCurrentQuestion(questions[randomIndex]);
//   };

//   useEffect(() => {
//     if (timer === 0) {
//       clearInterval(timer);
//       setShowAnswer(`Time's up! The correct answer is ${currentQuestion.correctAnswer}`);
//       setAnswerStatus('wrong');
//       setTimeout(() => {
//         getRandomQuestion();
//         setTimer(15);
//         setShowAnswer(null);
//         setAnswerStatus('');
//       }, 5000);
//     }
//   }, [timer]);

//   useEffect(() => {
//     const timerId = setInterval(() => {
//       setTimer(prev => prev - 1);
//     }, 1000);

//     return () => {
//       clearInterval(timerId);
//     };
//   }, [currentQuestion]);

//   const handleAnswerClick = (answer) => {
//     clearInterval(timer);
//     if (answer === currentQuestion.correctAnswer) {
//       setShowAnswer('That\'s the correct answer!');
//       setAnswerStatus('correct');
//     } else {
//       setShowAnswer(`That's the wrong answer. The correct answer is ${currentQuestion.correctAnswer}`);
//       setAnswerStatus('wrong');
//     }
//     setTimeout(() => {
//       getRandomQuestion();
//       setTimer(15);
//       setShowAnswer(null);
//       setAnswerStatus('');
//     }, 5000);
//   };

//   return (
//     <div className="App">
//       <h1>Trivia Quiz</h1>
//       {showAnswer ? (
//         <h2 className={answerStatus}>{showAnswer}</h2>
//       ) : (
//         <>
//           <div>Timer: {timer}</div>
//           <h2>{currentQuestion.question}</h2>
//           {currentQuestion.options?.map((option, index) => (
//             <button key={index} onClick={() => handleAnswerClick(option)}>
//               {option}
//             </button>
//           ))}
//         </>
//       )}
//     </div>
//   );
// }

// export default App;








// import React, { useState, useEffect } from 'react';
// import './App.css';
// import questions from './data/questions.json';  // Make sure this path is correct

// let timerInterval;

// function App() {
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [timer, setTimer] = useState(15);
//   const [showAnswer, setShowAnswer] = useState(null);

//   useEffect(() => {
//     loadRandomQuestion();
//   }, []);

//   const loadRandomQuestion = () => {
//     const randomIndex = Math.floor(Math.random() * questions.length);
//     setCurrentQuestion(questions[randomIndex]);
//   };

//   useEffect(() => {
//     if (timer === 0) {
//       clearInterval(timerInterval);
//       setShowAnswer(`Time's up! The correct answer is ${currentQuestion.correctAnswer}`);
//       setTimeout(() => {
//         loadRandomQuestion();
//         setTimer(15);
//         setShowAnswer(null);
//       }, 5000);
//     }
//   }, [timer, currentQuestion]);

//   useEffect(() => {
//     timerInterval = setInterval(() => {
//       setTimer((prevTimer) => prevTimer - 1);
//     }, 1000);
//     return () => {
//       clearInterval(timerInterval);
//     };
//   }, [currentQuestion]);

//   const handleAnswerClick = (selectedAnswer) => {
//     clearInterval(timerInterval); // Stop the timer
//     if (selectedAnswer === currentQuestion.correctAnswer) {
//       setShowAnswer('That\'s the correct answer!');
//       setTimeout(() => {
//         loadRandomQuestion();
//         setTimer(15);
//         setShowAnswer(null);
//       }, 5000);
//     } else {
//       setShowAnswer(`That's the wrong answer, the correct answer is ${currentQuestion.correctAnswer}`);
//       setTimeout(() => {
//         loadRandomQuestion();
//         setTimer(15);
//         setShowAnswer(null);
//       }, 5000);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Trivia Quiz</h1>
//       {showAnswer ? (
//         <h2>{showAnswer}</h2>
//       ) : (
//         <>
//           <p>{timer}</p>
//           <h2>{currentQuestion?.question}</h2>
//           {currentQuestion?.options?.map((option, index) => (
//             <button key={index} onClick={() => handleAnswerClick(option)}>
//               {option}
//             </button>
//           ))}
//         </>
//       )}
//     </div>
//   );
// }

// export default App;
