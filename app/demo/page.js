"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MathExam() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [questionLanguage, setQuestionLanguage] = useState('english');

  const questions = [
    {
      id: 1,
      type: 'mcq',
      text: 'Fill in the blanks:',
      subQuestions: [
        {
          id: '1i',
          text: 'A polynomial of degree 3 is called a _______.',
          options: ['cubic polynomial', 'quadratic polynomial', 'linear polynomial', 'quartic polynomial']
        },
        {
          id: '1ii',
          text: '√2 is a _______ number.',
          options: ['irrational', 'rational', 'natural', 'integer']
        },
        {
          id: '1iii',
          text: 'In the A.P.: 1, 3/2, 2, 5/2, ... the common difference d is _______.',
          options: ['1/2', '1', '2', '3/2']
        },
        {
          id: '1iv',
          text: 'All congruent triangles are _______.',
          options: ['similar', 'equal', 'different', 'none of these']
        },
        {
          id: '1v',
          text: 'A line intersecting a circle in two points is called a _______.',
          options: ['chord', 'secant', 'tangent', 'diameter']
        },
        {
          id: '1vi',
          text: 'For any event E, P(E) + P(E\') = _______.',
          options: ['1', '0', '2', '0.5']
        }
      ],
      answers: ['cubic polynomial', 'irrational', '1/2', 'similar', 'secant', '1'],
      marks: 6
    },
    {
      id: 2,
      type: 'mcq',
      text: 'True or False:',
      subQuestions: [
        {
          id: '2i',
          text: 'Area of similar triangles are always equal.',
          options: ['True', 'False']
        },
        {
          id: '2ii',
          text: '1, 2, 1, 3, ... is not an A.P.',
          options: ['True', 'False']
        },
        {
          id: '2iii',
          text: 'The distance of a point from the y-axis is called its y-coordinate.',
          options: ['True', 'False']
        },
        {
          id: '2iv',
          text: 'The volume of cone is (1/3)πr²h.',
          options: ['True', 'False']
        },
        {
          id: '2v',
          text: 'The probability of an event E is a number P(E) such that 0 ≤ P(E) ≤ 1.',
          options: ['True', 'False']
        },
        {
          id: '2vi',
          text: 'The area of minor segment is less than the area of corresponding sector.',
          options: ['True', 'False']
        }
      ],
      answers: ['False', 'True', 'False', 'True', 'True', 'True'],
      marks: 6
    },
    {
      id: 3,
      type: 'mcq',
      text: 'Match the correct value:',
      subQuestions: [
        {
          id: '3i',
          text: '9sec²A - 9tan²A equals:',
          options: ['0', '9', '1', '-9']
        },
        {
          id: '3ii',
          text: 'cos 0° equals:',
          options: ['0', '1', '-1', 'undefined']
        },
        {
          id: '3iii',
          text: 'sin 0° equals:',
          options: ['0', '1', '-1', 'undefined']
        },
        {
          id: '3iv',
          text: 'Area of sector of angle θ and radius r equals:',
          options: ['θr²/2', 'θr²/360', '(θ/360)πr²', 'πr²θ']
        },
        {
          id: '3v',
          text: 'Curved surface area of hemisphere equals:',
          options: ['2πr²', '4πr²', 'πr²', '3πr²']
        },
        {
          id: '3vi',
          text: 'Total surface area of hemisphere equals:',
          options: ['2πr²', '4πr²', '3πr²', 'πr²']
        }
      ],
      answers: ['9', '1', '0', '(θ/360)πr²', '2πr²', '3πr²'],
      marks: 6
    },
    {
      id: 4,
      type: 'mcq',
      text: 'Write the answer in one word/sentence for each:',
      subQuestions: [
        {
          id: '4i',
          text: 'Write the standard form of a quadratic equation.',
          options: ['ax² + bx + c = 0', 'ax + b = 0', 'ax³ + bx² + cx + d = 0', 'ax + by + c = 0']
        },
        {
          id: '4ii',
          text: 'Write any one condition of similarity of two triangles.',
          options: ['AAA criterion', 'SSS criterion', 'SAS criterion', 'All of the above']
        },
        {
          id: '4iii',
          text: 'Write the distance between origin (0, 0) and point (x₁, y₁).',
          options: ['√(x₁² + y₁²)', 'x₁ + y₁', '|x₁| + |y₁|', '√(|x₁| + |y₁|)']
        },
        {
          id: '4iv',
          text: 'If shadow and height of the pole are equal, then what will be the angle of the elevation of the Sun?',
          options: ['45°', '30°', '60°', '90°']
        },
        {
          id: '4v',
          text: 'Write the formula of the length of an arc of a sector of angle θ and radius r.',
          options: ['rθ', '2πr', '(θ/360°) × 2πr', 'πrθ']
        },
        {
          id: '4vi',
          text: 'Write the class mark (middle point) of 20-40.',
          options: ['30', '25', '20', '40']
        }
      ],
      answers: ['ax² + bx + c = 0', 'AAA criterion', '√(x₁² + y₁²)', '45°', '(θ/360°) × 2πr', '30'],
      marks: 6
    },
    {
      id: 5,
      type: 'mcq',
      text: 'Choose the correct option:',
      subQuestions: [
        {
          id: '5i',
          text: 'H.C.F. of numbers 6 and 20 is:',
          options: ['2', '6', '20', '1']
        },
        {
          id: '5ii',
          text: 'The quadratic equation ax² + bx + c = 0 has real and equal roots if:',
          options: ['b² - 4ac > 0', 'b² - 4ac = 0', 'b² - 4ac < 0', 'b² - 4ac ≠ 0']
        },
        {
          id: '5iii',
          text: 'When a₁, b₁, c₁ and a₂, b₂, c₂ are respectively, then the system of equation a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0 has:',
          options: ['Unique solution', 'Both solutions', 'No solution', 'Infinitely many solutions']
        },
        {
          id: '5iv',
          text: '10th term of an A.P.: 2, 4, 6, ... is:',
          options: ['20', '18', '32', '22']
        },
        {
          id: '5v',
          text: 'The distance between points (2, 3) and (4, 1) is:',
          options: ['√8', '3', '2√2', '2/3']
        },
        {
          id: '5vi',
          text: 'How many tangents can a circle have?',
          options: ['0', '1', '2', 'Infinite']
        }
      ],
      answers: ['2', 'b² - 4ac = 0', 'Infinitely many solutions', '20', '2√2', 'Infinite'],
      marks: 6
    },
    {
      id: 6,
      type: 'mcq',
      text: 'Solve the following pair of linear equations: x + 2y = 8, x - y = 8',
      subQuestions: [
        {
          id: '6i',
          text: 'What is the value of x and y?',
          options: ['x = 8, y = 0', 'x = 0, y = 4', 'x = 4, y = 2', 'x = 16, y = -4']
        }
      ],
      answers: ['x = 8, y = 0'],
      marks: 3
    },
    {
      id: 7,
      type: 'mcq',
      text: 'Find the 10th term of the A.P.: 2, 7, 12, ...',
      subQuestions: [
        {
          id: '7i',
          text: 'The 10th term is:',
          options: ['47', '42', '52', '57']
        }
      ],
      answers: ['47'],
      marks: 2
    },
    {
      id: 8,
      type: 'mcq',
      text: 'A die is thrown once. Find the probability of getting a prime number.',
      subQuestions: [
        {
          id: '8i',
          text: 'The probability is:',
          options: ['1/2', '1/3', '2/3', '1/6']
        }
      ],
      answers: ['1/2'],
      marks: 3
    },
    {
      id: 9,
      type: 'mcq',
      text: 'Two concentric circles are of radii 5 cm and 3 cm. Find the length of the chord of the larger circle which touches the smaller circle.',
      subQuestions: [
        {
          id: '9i',
          text: 'The length of the chord is:',
          options: ['8 cm', '4 cm', '6 cm', '10 cm']
        }
      ],
      answers: ['8 cm'],
      marks: 3
    },
    {
      id: 10,
      type: 'mcq',
      text: 'The sum of first n terms of an A.P. is given by:',
      subQuestions: [
        {
          id: '10i',
          text: 'Select the correct formula:',
          options: ['n/2[2a + (n-1)d]', 'n[a + (n-1)d]', 'n/2[a + l]', 'a + (n-1)d']
        }
      ],
      answers: ['n/2[2a + (n-1)d]'],
      marks: 2
    }
  ];

  const questionTranslations = {
    1: {
      text: 'रिक्त स्थान भरें:',
      subQuestions: [
        {
          text: 'डिग्री 3 का बहुपद _______ कहलाता है।',
          options: ['घन बहुपद', 'वर्ग बहुपद', 'रैखिक बहुपद', 'चतुर्थांश बहुपद']
        },
        {
          text: '√2 एक _______ संख्या है।',
          options: ['अपरिमेय', 'परिमेय', 'प्राकृत', 'पूर्णांक']
        },
        {
          text: 'समांतर श्रेणी में: 1, 3/2, 2, 5/2, ... सार्वअंतर d है _______।',
          options: ['1/2', '1', '2', '3/2']
        },
        {
          text: 'सभी सर्वांगसम त्रिभुज _______ होते हैं।',
          options: ['समरूप', 'बराबर', 'अलग', 'इनमें से कोई नहीं']
        },
        {
          text: 'एक वृत्त को दो बिंदुओं पर काटने वाली रेखा _______ कहलाती है।',
          options: ['जीवा', 'छेदक', 'स्पर्श रेखा', 'व्यास']
        },
        {
          text: 'किसी घटना E के लिए, P(E) + P(E\') = _______ होता है।',
          options: ['1', '0', '2', '0.5']
        }
      ]
    },
    2: {
      text: 'सही या गलत बताएं:',
      subQuestions: [
        {
          text: 'समरूप त्रिभुजों का क्षेत्रफल हमेशा बराबर होता है।',
          options: ['सही', 'गलत']
        },
        {
          text: '1, 2, 1, 3, ... एक समांतर श्रेणी नहीं है।',
          options: ['सही', 'गलत']
        },
        {
          text: 'किसी बिंदु की y-अक्ष से दूरी उसका y-निर्देशांक कहलाती है।',
          options: ['सही', 'गलत']
        },
        {
          text: 'शंकु का आयतन (1/3)πr²h होता है।',
          options: ['सही', 'गलत']
        },
        {
          text: 'किसी घटना E की प्रायिकता P(E) एक संख्या है जहाँ 0 ≤ P(E) ≤ 1।',
          options: ['सही', 'गलत']
        },
        {
          text: 'लघु खंड का क्षेत्रफल संगत त्रिज्यखंड के क्षेत्रफल से कम होता है।',
          options: ['सही', 'गलत']
        }
      ]
    },
    3: {
      text: 'सही मान चुनिए:',
      subQuestions: [
        {
          text: '9sec²A - 9tan²A बराबर है:',
          options: ['0', '9', '1', '-9']
        },
        {
          text: 'cos 0° बराबर है:',
          options: ['0', '1', '-1', 'अपरिभाषित']
        },
        {
          text: 'sin 0° बराबर है:',
          options: ['0', '1', '-1', 'अपरिभाषित']
        },
        {
          text: 'कोण θ और त्रिज्या r वाले त्रिज्यखंड का क्षेत्रफल बराबर है:',
          options: ['θr²/2', 'θr²/360', '(θ/360)πr²', 'πr²θ']
        },
        {
          text: 'अर्धगोले का वक्र पृष्ठीय क्षेत्रफल बराबर है:',
          options: ['2πr²', '4πr²', 'πr²', '3πr²']
        },
        {
          text: 'अर्धगोले का कुल पृष्ठीय क्षेत्रफल बराबर है:',
          options: ['2πr²', '4πr²', '3πr²', 'πr²']
        }
      ]
    },
    // Add translations for remaining questions...
  };

  const handleInputChange = (questionId, subQuestionId, value) => {
    setAnswers({
      ...answers,
      [questionId + (subQuestionId ? '-' + subQuestionId : '')]: value
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowResults(true);
  };

  const calculateScore = () => {
    let score = 0;
    let totalMarks = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    // Check if questions is defined and has forEach method
    if (!questions || !Array.isArray(questions)) {
      return { score: 0, totalMarks: 0, correctAnswers: 0, incorrectAnswers: 0 };
    }

    questions.forEach(q => {
      if (!q) return; // Skip if question is undefined

      totalMarks += q.marks || 0;

      if (q.type === 'mcq' && Array.isArray(q.subQuestions) && Array.isArray(q.answers)) {
        q.subQuestions.forEach((sq, index) => {
          if (!sq) return; // Skip if subQuestion is undefined

          const userAnswer = answers[q.id + '-' + sq.id] || '';
          const correctAnswer = q.answers[index];

          if (correctAnswer && userAnswer === correctAnswer) {
            score += q.marks / q.subQuestions.length;
            correctAnswers++;
          } else if (userAnswer) {
            incorrectAnswers++;
          }
        });
      }
    });

    return { score, totalMarks, correctAnswers, incorrectAnswers };
  };

  const renderQuestion = (question) => {
    if (!question) return <div>Question not found</div>;

    const getTranslatedContent = (q, subQ) => {
      if (questionLanguage === 'hindi' && questionTranslations[q.id]) {
        const translation = questionTranslations[q.id];
        if (subQ) {
          const subIndex = parseInt(subQ.id.split('i')[1]) - 1;
          const subTranslation = translation.subQuestions[subIndex];
          return {
            text: subTranslation?.text || subQ.text,
            options: subTranslation?.options || subQ.options
          };
        }
        return { text: translation.text };
      }
      return subQ ? { text: subQ.text, options: subQ.options } : { text: q.text };
    };

    const translatedMainQuestion = getTranslatedContent(question);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="p-6 bg-white rounded-lg shadow-lg"
      >
        <h3 className="font-semibold mb-4 text-purple-800">
          {translatedMainQuestion.text}
        </h3>
        {Array.isArray(question.subQuestions) && question.subQuestions.map((sq, index) => {
          const translatedContent = getTranslatedContent(question, sq);
          return (
            <motion.div
              key={sq.id}
              className="mb-5"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="mb-2 text-purple-700 font-medium">
                {index + 1}. {translatedContent.text}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {translatedContent.options.map((option, optIndex) => (
                  <label
                    key={optIndex}
                    className={`
                      flex items-center p-2 sm:p-3 rounded-md cursor-pointer
                      border-2 border-purple-100 hover:border-purple-300
                      ${answers[`${questions[currentQuestion].id}-${sq.id}`] === option 
                        ? 'bg-purple-50 border-purple-500' 
                        : 'hover:bg-purple-50'
                      }
                      transition-all duration-200 mb-2
                    `}
                  >
                    <input
                      type="radio"
                      name={`${questions[currentQuestion].id}-${sq.id}`}
                      value={option}
                      checked={answers[`${questions[currentQuestion].id}-${sq.id}`] === option}
                      onChange={() => handleInputChange(questions[currentQuestion].id, sq.id, option)}
                      disabled={submitted}
                      className="mr-2 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm sm:text-base">{option}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          );
        })}
        <div className="text-right text-sm text-purple-600 mt-2">[{question.marks} marks]</div>
      </motion.div>
    );
  };

  const { score, totalMarks, correctAnswers, incorrectAnswers } = calculateScore();
  const percentage = totalMarks > 0 ? ((score / totalMarks) * 100) : 0;

  // Determine the grade based on percentage
  const getGrade = (percent) => {
    if (percent >= 90) return { grade: 'A+', message: 'Outstanding!' };
    if (percent >= 80) return { grade: 'A', message: 'Excellent!' };
    if (percent >= 70) return { grade: 'B', message: 'Very Good!' };
    if (percent >= 60) return { grade: 'C', message: 'Good!' };
    if (percent >= 50) return { grade: 'D', message: 'Satisfactory' };
    return { grade: 'F', message: 'Needs Improvement' };
  };

  const gradeInfo = getGrade(percentage);

  // Calculate timing info for exam
  const getTotalMinutesRemaining = () => {
    // Assuming 3 hour exam
    return !submitted ? 180 : 0;
  };

  const formatTimeRemaining = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const renderExplanations = (questionId) => {
    // Explanations for certain questions
    const explanations = {
      '1-1i': 'A polynomial with highest degree 3 is called a cubic polynomial.',
      '1-1ii': '√2 is irrational because it cannot be expressed as a ratio of integers.',
      '1-1iii': 'In the A.P. 1, 3/2, 2, 5/2, the common difference is 1/2 as 3/2 - 1 = 1/2, 2 - 3/2 = 1/2, etc.',
      '2-2i': 'Similar triangles have the same shape but not necessarily the same size. Their areas are proportional to the square of their corresponding sides.',
      '3-3i': 'Using the identity sec²A - tan²A = 1, we get 9sec²A - 9tan²A = 9(sec²A - tan²A) = 9(1) = 9',
      '5-5i': 'For 6 and 20, we factorize: 6 = 2×3, 20 = 2²×5. The HCF is 2.',
      '7-7i': 'For A.P. 2, 7, 12, the first term a = 2 and common difference d = 5. The 10th term = a + (n-1)d = 2 + 9×5 = 2 + 45 = 47'
    };

    return explanations[questionId] || "No explanation available for this question.";
  };

  const handleReviewQuestions = () => {
    setIsReviewing(true);
    setShowResults(false);
    setCurrentQuestion(0);
  };

  const LanguageSwitch = () => {
    return (
      <motion.div 
        className="mb-4 bg-white p-3 rounded-lg shadow-lg flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-purple-800 font-medium">Question Language:</span>
        <div className="flex gap-2">
          <button
            onClick={() => setQuestionLanguage('english')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
              ${questionLanguage === 'english' 
                ? 'bg-purple-600 text-white' 
                : 'bg-purple-100 text-purple-800 hover:bg-purple-200'}`}
          >
            English
          </button>
          <button
            onClick={() => setQuestionLanguage('hindi')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
              ${questionLanguage === 'hindi' 
                ? 'bg-purple-600 text-white' 
                : 'bg-purple-100 text-purple-800 hover:bg-purple-200'}`}
          >
            हिंदी
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-purple-50">
      <div className="max-w-4xl mx-auto p-2 sm:p-4">
        <motion.header
          className="mb-4 sm:mb-6 text-center p-3 sm:p-6 bg-purple-700 text-white rounded-lg shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl sm:text-2xl font-bold mb-2 text-purple-800 ">Class 10th Mathematics Board Examination 2025</h1>
          <div className="text-sm sm:text-base text-purple-800">Total Questions: {questions.length} | Maximum Marks: {totalMarks}</div>
          <div className="text-sm sm:text-base text-purple-800">Time: 3 Hours | Remaining: {formatTimeRemaining(getTotalMinutesRemaining())}</div>
        </motion.header>

        <LanguageSwitch />

        {(!showResults || isReviewing) ? (
          <div className="mb-4 sm:mb-6">
            <motion.div
              className="flex flex-col sm:flex-row justify-between items-center mb-4 bg-white p-3 sm:p-4 rounded-lg shadow gap-3 sm:gap-0"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-lg sm:text-xl font-semibold text-purple-800 text-center sm:text-left">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <div className="flex flex-wrap justify-center sm:justify-end gap-2">
                <motion.button
                  onClick={() => setCurrentQuestion(0)}
                  className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 disabled:opacity-50 transition-colors text-sm sm:text-base"
                  disabled={currentQuestion === 0 || submitted}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  First
                </motion.button>
                <motion.button
                  onClick={handlePrevious}
                  className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 disabled:opacity-50 transition-colors text-sm sm:text-base"
                  disabled={currentQuestion === 0 || submitted}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Previous
                </motion.button>
                <motion.button
                  onClick={handleNext}
                  className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 disabled:opacity-50 transition-colors text-sm sm:text-base"
                  disabled={currentQuestion === questions.length - 1 || submitted}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next
                </motion.button>
                <motion.button
                  onClick={() => setCurrentQuestion(questions.length - 1)}
                  className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 disabled:opacity-50 transition-colors text-sm sm:text-base"
                  disabled={currentQuestion === questions.length - 1 || submitted}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Last
                </motion.button>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="mb-4 sm:mb-6"
              >
                {questions && questions.length > 0 && currentQuestion < questions.length ? (
                  <div className="p-3 sm:p-6 bg-white rounded-lg shadow-lg">
                    <h3 className="font-semibold mb-3 sm:mb-4 text-purple-800 text-base sm:text-lg">{questions[currentQuestion].text}</h3>
                    <div className="space-y-2 sm:space-y-4">
                      {questions[currentQuestion].subQuestions.map((sq, index) => (
                        <div key={sq.id} className="ml-2 sm:ml-4">
                          <div className="text-sm sm:text-base mb-2">{index + 1}. {sq.text}</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {sq.options.map((option, optIndex) => (
                              <label
                                key={optIndex}
                                className={`
                                  flex items-center p-2 sm:p-3 rounded-md cursor-pointer
                                  border-2 border-purple-100 hover:border-purple-300
                                  ${answers[`${questions[currentQuestion].id}-${sq.id}`] === option 
                                    ? 'bg-purple-50 border-purple-500' 
                                    : 'hover:bg-purple-50'
                                  }
                                  transition-all duration-200 mb-2
                                `}
                              >
                                <input
                                  type="radio"
                                  name={`${questions[currentQuestion].id}-${sq.id}`}
                                  value={option}
                                  checked={answers[`${questions[currentQuestion].id}-${sq.id}`] === option}
                                  onChange={() => handleInputChange(questions[currentQuestion].id, sq.id, option)}
                                  disabled={submitted}
                                  className="mr-2 text-purple-600 focus:ring-purple-500"
                                />
                                <span className="text-sm sm:text-base">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>No questions available</div>
                )}
              </motion.div>
            </AnimatePresence>

            <motion.div 
              className="mt-4 sm:mt-6 bg-white p-3 sm:p-4 rounded-lg shadow sticky bottom-0 sm:bottom-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              layout
            >
              <h3 className="text-xs sm:text-sm text-purple-700 mb-2 font-medium">Question Navigator:</h3>
              <div className="flex flex-wrap gap-1 sm:gap-2 justify-center sm:justify-start">
                {questions.map((_, index) => {
                  // Check if this question has any answered subquestions
                  const hasAnswered = Object.keys(answers).some(key => key.startsWith(`${index + 1}-`));
                  
                  return (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                        ${currentQuestion === index 
                          ? 'bg-purple-700 text-white' 
                          : hasAnswered 
                            ? 'bg-green-100 text-green-800 border border-green-500' 
                            : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                        }`}
                      layout
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      initial={false}
                      animate={{ 
                        scale: 1,
                        opacity: 1,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {index + 1}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {isReviewing && (
              <motion.div
                className="mt-4 flex justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  onClick={() => {
                    setIsReviewing(false);
                    setShowResults(true);
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back to Results
                </motion.button>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div className="space-y-4 sm:space-y-6">
            <motion.div
              className="p-8 bg-white rounded-lg shadow-lg mb-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="font-bold text-2xl mb-6 text-center text-purple-800"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Exam Results
              </motion.h2>

              <motion.div
                className="flex justify-center mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
              >
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-800">{percentage.toFixed(1)}%</div>
                      <div className="text-xl font-semibold text-purple-600">{gradeInfo.grade}</div>
                      <div className="text-sm text-purple-500">{gradeInfo.message}</div>
                    </div>
                  </div>
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle
                      cx="50" cy="50" r="45"
                      fill="none"
                      stroke="#E9D5FF"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="50" cy="50" r="45"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="8"
                      strokeDasharray="283"
                      strokeDashoffset="283"
                      initial={{ strokeDashoffset: 283 }}
                      animate={{
                        strokeDashoffset: 283 - (percentage / 100 * 283)
                      }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </svg>
                </div>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  className="p-4 bg-purple-50 rounded-lg"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <h3 className="font-semibold text-purple-800 mb-3">Score Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div>Total Questions:</div>
                      <div className="font-medium">{questions.length}</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Attempted:</div>
                      <div className="font-medium">{correctAnswers + incorrectAnswers}</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Marks:</div>
                      <div className="font-medium">{score.toFixed(1)}/{totalMarks}</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="p-4 bg-purple-50 rounded-lg"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                >
                  <h3 className="font-semibold text-purple-800 mb-3">Performance</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div>Correct:</div>
                      <div className="font-medium text-green-600">{correctAnswers}</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Incorrect:</div>
                      <div className="font-medium text-red-600">{incorrectAnswers}</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Not Attempted:</div>
                      <div className="font-medium">{questions.reduce((total, q) => total + q.subQuestions.length, 0) - (correctAnswers + incorrectAnswers)}</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="mt-6 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.8 }}
              >
                <p className="mb-4 text-purple-700">Review all questions and answers by navigating below</p>
                <div className="flex justify-center gap-4">
                  <motion.button
                    onClick={handleReviewQuestions}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Review Questions
                  </motion.button>
                  <motion.button
                    onClick={() => window.print()}
                    className="px-6 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Print Results
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {!submitted && (
          <motion.div
            className={`
              ${window.innerWidth >= 640 ? 'static mt-8 flex justify-end' : 'fixed bottom-16 right-2 z-50'}
              sm:static sm:mt-8 sm:flex sm:justify-end
            `}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              onClick={handleSubmit}
              className="px-6 sm:px-8 py-2 sm:py-3 bg-green-600 border text-purple-800 text-sm sm:text-base rounded-full shadow-lg hover:bg-green-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Exam
            </motion.button>
          </motion.div>
        )}

        {!submitted && (
          <motion.div
            className="fixed top-2 sm:top-4 right-2 sm:right-4 bg-white p-2 sm:p-3 rounded-lg shadow-lg z-50"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-xs sm:text-sm text-purple-600 font-medium">
              Time Remaining: {formatTimeRemaining(getTotalMinutesRemaining())}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}