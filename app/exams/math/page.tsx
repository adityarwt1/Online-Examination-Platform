"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: number;
  question: string;
  options: Array<{ id: string; text: string }>;
  correctAnswer: string;
}

interface SelectedAnswers {
  [key: number]: string;
}

const MCQQuiz = () => {
  const router = useRouter();
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
  const [wrongAnswersCount, setWrongAnswersCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [rollNumber, setRollNumber] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);

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

  // Start quiz and timer
  const handleStartQuiz = () => {
    if (rollNumber.trim() === "") {
      alert("Please enter your roll number");
      return;
    }

    setQuizStarted(true);
  };

  // Answer selection
  const handleAnswerSelection = (questionId: number, optionId: string) => {
    if (quizSubmitted) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Timer effect
  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !quizSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

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

  // Handle quiz submission
  const handleSubmit = async () => {
    let wrongCount = 0;

    questions.forEach((question) => {
      if (selectedAnswers[question.id] !== question.correctAnswer) {
        wrongCount++;
      }
    });
    setWrongAnswersCount(wrongCount);
    const answeredQuestion = questions.length - wrongCount;

    try {
      const response = await fetch("/api/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          rollNumber,
          answeredQuestion,
        })
      });

      if (response.ok) {
        setShowResults(true);
        setQuizSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-100 py-4 sm:py-8 md:py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {!quizStarted ? (
          <motion.div 
            key="login"
            className="flex flex-col items-center justify-center min-h-[80vh] px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="Enter your roll number"
              className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg text-lg mb-4 focus:ring-2 focus:ring-purple-400"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileFocus={{ scale: 1.02, borderColor: "#a855f7" }}
            />
            <motion.button
              onClick={handleStartQuiz}
              className="w-full max-w-md px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-all"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Quiz
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            key="quiz"
            className="max-w-3xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Timer */}
            <motion.div 
              className="text-right font-bold text-gray-700 text-lg mb-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Time Left: {formatTime(timeLeft)}
            </motion.div>

            {/* Questions */}
            {questions.map((question, index) => (
              <motion.div
                key={question.id}
                className="mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <motion.h3 
                  className="font-bold text-lg sm:text-xl mb-3 sm:mb-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index + 0.2 }}
                >
                  {index + 1}. {question.question}
                </motion.h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {question.options.map((option, optIndex) => (
                    <motion.div
                      key={option.id}
                      id={`question-${question.id}-option-${option.id}`}
                      onClick={() => handleAnswerSelection(question.id, option.id)}
                      className={`p-3 sm:p-4 border rounded-xl cursor-pointer transition-all duration-300
                        ${selectedAnswers[question.id] === option.id ? 'bg-purple-200 border-purple-400' : 'hover:bg-gray-100'}
                      `}
                      initial={{ opacity: 0, x: optIndex % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index + 0.1 * optIndex + 0.3 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {option.text}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Submit Button */}
            {!quizSubmitted && (
              <motion.div 
                className="text-center mt-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <motion.button
                  onClick={handleSubmit}
                  className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit Quiz
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Modal */}
      <AnimatePresence>
        {showResults && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-xl p-6 max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <motion.div 
                className="bg-green-300 text-black shadow-md p-4 rounded-lg w-full text-center mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                Exam Submitted Successfully
              </motion.div>
              <motion.div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  className="bg-red-300 font-semibold rounded-md shadow-md duration-300 w-full sm:w-auto px-6 py-3"
                  onClick={() => router.push("/results")}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Check Result
                </motion.button>
                <motion.button 
                  className="bg-purple-300 font-semibold rounded-md shadow-md duration-300 w-full sm:w-auto px-6 py-3"
                  onClick={() => router.push("/")}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Go to Home
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MCQQuiz;