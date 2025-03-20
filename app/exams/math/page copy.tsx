"use client"; 

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

const MCQQuiz = () => {
  const router = useRouter();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [wrongAnswersCount, setWrongAnswersCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); 
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [rollNumber, setRollNumber] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);

  const quizContainerRef = useRef(null);
  const questionsRef = useRef([]);
  const timerRef = useRef(null);
  const resultsRef = useRef(null);

  const questions = [
    {
      id: 1,
      question: 'यदि a₁/a₂ = b₁/b₂ = c₁/c₂ हो, तो समीकरण निकाय a₁x + b₁y + c₁ = 0 तथा a₂x + b₂y + c₂ = 0 का',
      options: [
        { id: 'a', text: 'एक अद्वितीय हल होगा' },
        { id: 'b', text: 'दोनों हल होंगे' },
        { id: 'c', text: 'कोई भी हल नहीं होगा' },
        { id: 'd', text: 'अनंततः अनेक हल होंगे' },
      ],
      correctAnswer: 'd',
    },
    {
      id: 2,
      question: 'द्विघात समीकरण a * x² + bx + c = 0 के मूल वास्तविक और बराबर होंगे यदि',
      options: [
        { id: 'a', text: 'b² - 4ac > 0' },
        { id: 'b', text: 'b² - 4ac = 0' },
        { id: 'c', text: 'b² - 4ac < 0' },
        { id: 'd', text: 'b² - 4a * c² = 0' },
      ],
      correctAnswer: 'b',
    },
    {
      id: 3,
      question: 'A.P.: 2, 4, 6, ..... का 10वाँ पद है:',
      options: [
        { id: 'a', text: '2' },
        { id: 'b', text: '18' },
        { id: 'c', text: '20' },
        { id: 'd', text: '22' },
      ],
      correctAnswer: 'c',
    },
    {
      id: 4,
      question: 'बिंदु (2, 3) तथा (4, 1) के बीच दूरी है:',
      options: [
        { id: 'a', text: '√8' },
        { id: 'b', text: '3√3' },
        { id: 'c', text: '3√2' },
        { id: 'd', text: '2√3' },
      ],
      correctAnswer: 'a',
    },
    {
      id: 5,
      question: 'एक वृत्त की कितनी स्पर्श रेखा हो सकती है?',
      options: [
        { id: 'a', text: '0' },
        { id: 'b', text: '1' },
        { id: 'c', text: '2' },
        { id: 'd', text: 'अनन्त' },
      ],
      correctAnswer: 'd',
    },
    {
      id: 6,
      question: 'संख्याओं 6 व 20 का H.C.F. होगा -',
      options: [
        { id: 'a', text: '2' },
        { id: 'b', text: '6' },
        { id: 'c', text: '20' },
        { id: 'd', text: '1' },
      ],
      correctAnswer: 'a',
    },
  ];

  // Initial animation on component mount
  useEffect(() => {
    if (quizContainerRef.current) {
      gsap.from(quizContainerRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !quizSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      if (timeLeft < 60 && timerRef.current) {
        gsap.to(timerRef.current, {
          scale: 1.05,
          color: "#ef4444",
          fontWeight: "bold",
          duration: 0.5,
          repeat: -1,
          yoyo: true,
        });
      }

      return () => clearInterval(timer);
    }

    if (timeLeft === 0 && !quizSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, quizStarted, quizSubmitted]);

  // Start quiz and timer
  const handleStartQuiz = () => {
    if (rollNumber.trim() === "") {
      alert("Please enter your roll number");
      return;
    }

    setQuizStarted(true);

    // Animate questions
    gsap.from(questionsRef.current, {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  // Answer selection
  const handleAnswerSelection = (questionId, optionId) => {
    if (quizSubmitted) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));

    // Highlight animation for selected option
    gsap.to(`#question-${questionId}-option-${optionId}`, {
      backgroundColor: "#E9D5FF",
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // Submit quiz
  const handleSubmit = () => {
    let wrongCount = 0;

    questions.forEach((question) => {
      if (selectedAnswers[question.id] !== question.correctAnswer) {
        wrongCount++;
      }
    });

    setWrongAnswersCount(wrongCount);
    setShowResults(true);
    setQuizSubmitted(true);

    // Animate results
    gsap.from(resultsRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "back.out(1.7)",
    });
  };

  // Format timer display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12" ref={quizContainerRef}>
      {!quizStarted ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <input
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            placeholder="Enter your roll number"
            className="px-4 py-3 border border-gray-300 rounded-lg text-lg mb-4 w-80 focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handleStartQuiz}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-all"
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          {/* Timer */}
          <div ref={timerRef} className="text-right font-bold text-gray-700 text-lg mb-6">
            Time Left: {formatTime(timeLeft)}
          </div>

          {/* Questions */}
          {questions.map((question, index) => (
            <div
              key={question.id}
              ref={(el) => (questionsRef.current[index] = el)}
              className="mb-8"
            >
              <h3 className="font-bold text-xl mb-4">{index + 1}. {question.question}</h3>
              <div className="grid grid-cols-2 gap-4">
                {question.options.map((option) => (
                  <div
                    key={option.id}
                    id={`question-${question.id}-option-${option.id}`}
                    onClick={() => handleAnswerSelection(question.id, option.id)}
                    className={`p-4 border rounded-xl cursor-pointer transition-all duration-300
                      ${selectedAnswers[question.id] === option.id ? 'bg-purple-200 border-purple-400 scale-105' : 'hover:bg-gray-100'}
                    `}
                  >
                    {option.text}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Submit Button */}
          {!quizSubmitted && (
            <div className="text-center mt-6">
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-all"
              >
                Submit Quiz
              </button>
            </div>
          )}

          {/* Results */}
          {showResults && (
            <div ref={resultsRef} className="mt-8 text-center">
              <h2 className="text-2xl font-bold">Results</h2>
              <p>Correct Answers: {questions.length - wrongAnswersCount} / {questions.length}</p>
              <button onClick={() => router.push("/")} className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg">
                Return to Home
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MCQQuiz;
