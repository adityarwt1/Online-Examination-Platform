"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

interface Question {
  id: number;
  question: string;
  options: Array<{ id: string; text: string }>;
  correctAnswer: string;
}

interface SelectedAnswers {
  [key: number]: string;
}

// Custom hook for animation management
const useAnimation = (isVisible: boolean) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && elementRef.current) {
      gsap.from(elementRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  }, [isVisible]);

  return elementRef;
};

const MCQQuiz = () => {
  const router = useRouter();
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
  const [wrongAnswersCount, setWrongAnswersCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [rollNumber, setRollNumber] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);

  const quizContainerRef = useRef<HTMLDivElement>(null);
  const questionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timerRef = useRef<HTMLDivElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Animation refs using custom hook
  const startScreenRef = useAnimation(!quizStarted);
  const quizScreenRef = useAnimation(quizStarted);
  const resultsScreenRef = useAnimation(showResults);

  const questions: Question[] = [
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

  // Improved animation for questions
  const animateQuestions = useCallback(() => {
    if (questionsRef.current.length > 0) {
      gsap.fromTo(
        questionsRef.current,
        { 
          opacity: 0,
          y: 20,
          scale: 0.95
        },
        { 
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.2
        }
      );
    }
  }, []);

  // Start quiz and timer
  const handleStartQuiz = () => {
    if (rollNumber.trim() === "") {
      alert("Please enter your roll number");
      return;
    }

    setQuizStarted(true);
    animateQuestions();
  };

  // Answer selection with improved animation
  const handleAnswerSelection = (questionId: number, optionId: string) => {
    if (quizSubmitted) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));

    // Improved highlight animation
    gsap.timeline()
      .to(`#question-${questionId}-option-${optionId}`, {
        backgroundColor: "#E9D5FF",
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out",
      })
      .to(`#question-${questionId}-option-${optionId}`, {
        scale: 1,
        duration: 0.1,
        ease: "power2.out",
      });
  };

  // Timer effect with improved animation
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
          ease: "power2.inOut",
        });
      }

      return () => clearInterval(timer);
    }

    if (timeLeft === 0 && !quizSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, quizStarted, quizSubmitted]);

  // Format timer display
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  //// api work goes here
  const handleSubmit = async () => {
    let wrongCount = 0;

    questions.forEach((question) => {
      if (selectedAnswers[question.id] !== question.correctAnswer) {
        wrongCount++;
      }
    });
    setWrongAnswersCount(wrongCount)
    const answeredQuestion =  questions.length - wrongAnswersCount
    const response = await fetch("/api/results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        rollNumber,
        answeredQuestion,
      })
    })
    if (response.ok) {
      setShowResults(true);
      setQuizSubmitted(true)
      setShowResults(true);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-8 md:py-12">
      {!quizStarted ? (
        <div ref={startScreenRef} className="flex flex-col items-center justify-center min-h-[80vh] px-4">
          <input
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            placeholder="Enter your roll number"
            className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg text-lg mb-4 focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handleStartQuiz}
            className="w-full max-w-md px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-all"
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <div ref={quizScreenRef} className="max-w-3xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg">
          {/* Timer */}
          <div ref={timerRef} className="text-right font-bold text-gray-700 text-lg mb-6">
            Time Left: {formatTime(timeLeft)}
          </div>

          {/* Questions */}
          {questions.map((question, index) => (
            <div
              key={question.id}
              ref={(el) => (questionsRef.current[index] = el)}
              className="mb-6 sm:mb-8"
            >
              <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4">{index + 1}. {question.question}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {question.options.map((option) => (
                  <div
                    key={option.id}
                    id={`question-${question.id}-option-${option.id}`}
                    onClick={() => handleAnswerSelection(question.id, option.id)}
                    className={`p-3 sm:p-4 border rounded-xl cursor-pointer transition-all duration-300
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
                className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-all"
              >
                Submit Quiz
              </button>
            </div>
          )}
        </div>
      )}

      {showResults && (
        <div ref={resultsScreenRef} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="bg-green-300 text-black shadow-md p-4 rounded-lg w-full text-center">
              Exam Submitted Successfully
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="bg-red-300 font-semibold rounded-md shadow-md duration-300 w-full sm:w-auto px-6 py-3 hover:scale-105" 
                onClick={() => router.push("/results")}
              >
                Check Result
              </button>
              <button 
                className="bg-purple-300 font-semibold rounded-md shadow-md duration-300 w-full sm:w-auto px-6 py-3 hover:scale-105" 
                onClick={() => router.push("/")}
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MCQQuiz;
