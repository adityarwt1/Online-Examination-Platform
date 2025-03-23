"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Timer } from "lucide-react"

export default function MathExam() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isReviewing, setIsReviewing] = useState(false)
  const [questionLanguage, setQuestionLanguage] = useState("english")
  const [examStarted, setExamStarted] = useState(false)
  const [examDuration, setExamDuration] = useState(30) // Default 30 minutes
  const [timeRemaining, setTimeRemaining] = useState(30 * 60) // in seconds
  const [showSettings, setShowSettings] = useState(false)
  const [practiceMode, setPracticeMode] = useState(false)
  const [mistakesOnly, setMistakesOnly] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const timerRef = useRef(null)

  const questions = [
    {
      id: 1,
      type: "mcq",
      text: "Fill in the blanks:",
      subQuestions: [
        {
          id: "1i",
          text: "A polynomial of degree 3 is called a _______.",
          options: ["cubic polynomial", "quadratic polynomial", "linear polynomial", "quartic polynomial"],
        },
        {
          id: "1ii",
          text: "√2 is a _______ number.",
          options: ["irrational", "rational", "natural", "integer"],
        },
        {
          id: "1iii",
          text: "In the A.P.: 1, 3/2, 2, 5/2, ... the common difference d is _______.",
          options: ["1/2", "1", "2", "3/2"],
        },
        {
          id: "1iv",
          text: "All congruent triangles are _______.",
          options: ["similar", "equal", "different", "none of these"],
        },
        {
          id: "1v",
          text: "A line intersecting a circle in two points is called a _______.",
          options: ["chord", "secant", "tangent", "diameter"],
        },
        {
          id: "1vi",
          text: "For any event E, P(E) + P(E') = _______.",
          options: ["1", "0", "2", "0.5"],
        },
      ],
      answers: ["cubic polynomial", "irrational", "1/2", "similar", "secant", "1"],
      marks: 6,
      category: "Algebra",
      explanation:
        "These are fundamental mathematical concepts. A polynomial of degree 3 is called cubic, √2 is irrational as it cannot be expressed as a ratio of integers, and the common difference in the given A.P. is 1/2.",
    },
    {
      id: 2,
      type: "mcq",
      text: "True or False:",
      subQuestions: [
        {
          id: "2i",
          text: "Area of similar triangles are always equal.",
          options: ["True", "False"],
        },
        {
          id: "2ii",
          text: "1, 2, 1, 3, ... is not an A.P.",
          options: ["True", "False"],
        },
        {
          id: "2iii",
          text: "The distance of a point from the y-axis is called its y-coordinate.",
          options: ["True", "False"],
        },
        {
          id: "2iv",
          text: "The volume of cone is (1/3)πr²h.",
          options: ["True", "False"],
        },
        {
          id: "2v",
          text: "The probability of an event E is a number P(E) such that 0 ≤ P(E) ≤ 1.",
          options: ["True", "False"],
        },
        {
          id: "2vi",
          text: "The area of minor segment is less than the area of corresponding sector.",
          options: ["True", "False"],
        },
      ],
      answers: ["False", "True", "False", "True", "True", "True"],
      marks: 6,
      category: "Geometry",
      explanation:
        "Similar triangles have the same shape but not necessarily the same size. Their areas are proportional to the square of their corresponding sides. The distance from the y-axis is the x-coordinate, not the y-coordinate.",
    },
    {
      id: 3,
      type: "mcq",
      text: "Match the correct value:",
      subQuestions: [
        {
          id: "3i",
          text: "9sec²A - 9tan²A equals:",
          options: ["0", "9", "1", "-9"],
        },
        {
          id: "3ii",
          text: "cos 0° equals:",
          options: ["0", "1", "-1", "undefined"],
        },
        {
          id: "3iii",
          text: "sin 0° equals:",
          options: ["0", "1", "-1", "undefined"],
        },
        {
          id: "3iv",
          text: "Area of sector of angle θ and radius r equals:",
          options: ["θr²/2", "θr²/360", "(θ/360)πr²", "πr²θ"],
        },
        {
          id: "3v",
          text: "Curved surface area of hemisphere equals:",
          options: ["2πr²", "4πr²", "πr²", "3πr²"],
        },
        {
          id: "3vi",
          text: "Total surface area of hemisphere equals:",
          options: ["2πr²", "4πr²", "3πr²", "πr²"],
        },
      ],
      answers: ["9", "1", "0", "(θ/360)πr²", "2πr²", "3πr²"],
      marks: 6,
      category: "Trigonometry",
      explanation:
        "Using the identity sec²A - tan²A = 1, we get 9sec²A - 9tan²A = 9(sec²A - tan²A) = 9(1) = 9. For trigonometric values, cos 0° = 1 and sin 0° = 0.",
    },
    {
      id: 4,
      type: "mcq",
      text: "Write the answer in one word/sentence for each:",
      subQuestions: [
        {
          id: "4i",
          text: "Write the standard form of a quadratic equation.",
          options: ["ax² + bx + c = 0", "ax + b = 0", "ax³ + bx² + cx + d = 0", "ax + by + c = 0"],
        },
        {
          id: "4ii",
          text: "Write any one condition of similarity of two triangles.",
          options: ["AAA criterion", "SSS criterion", "SAS criterion", "All of the above"],
        },
        {
          id: "4iii",
          text: "Write the distance between origin (0, 0) and point (x₁, y₁).",
          options: ["√(x₁² + y₁²)", "x₁ + y₁", "|x₁| + |y₁|", "√(|x₁| + |y₁|)"],
        },
        {
          id: "4iv",
          text: "If shadow and height of the pole are equal, then what will be the angle of the elevation of the Sun?",
          options: ["45°", "30°", "60°", "90°"],
        },
        {
          id: "4v",
          text: "Write the formula of the length of an arc of a sector of angle θ and radius r.",
          options: ["rθ", "2πr", "(θ/360°) × 2πr", "πrθ"],
        },
        {
          id: "4vi",
          text: "Write the class mark (middle point) of 20-40.",
          options: ["30", "25", "20", "40"],
        },
      ],
      answers: ["ax² + bx + c = 0", "AAA criterion", "√(x₁² + y₁²)", "45°", "(θ/360°) × 2πr", "30"],
      marks: 6,
      category: "Algebra",
      explanation:
        "The standard form of a quadratic equation is ax² + bx + c = 0. The distance formula from origin to a point is derived from the Pythagorean theorem.",
    },
    {
      id: 5,
      type: "mcq",
      text: "Choose the correct option:",
      subQuestions: [
        {
          id: "5i",
          text: "H.C.F. of numbers 6 and 20 is:",
          options: ["2", "6", "20", "1"],
        },
        {
          id: "5ii",
          text: "The quadratic equation ax² + bx + c = 0 has real and equal roots if:",
          options: ["b² - 4ac > 0", "b² - 4ac = 0", "b² - 4ac < 0", "b�� - 4ac ≠ 0"],
        },
        {
          id: "5iii",
          text: "When a₁, b₁, c₁ and a₂, b₂, c₂ are respectively, then the system of equation a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0 has:",
          options: ["Unique solution", "Both solutions", "No solution", "Infinitely many solutions"],
        },
        {
          id: "5iv",
          text: "10th term of an A.P.: 2, 4, 6, ... is:",
          options: ["20", "18", "32", "22"],
        },
        {
          id: "5v",
          text: "The distance between points (2, 3) and (4, 1) is:",
          options: ["√8", "3", "2√2", "2/3"],
        },
        {
          id: "5vi",
          text: "How many tangents can a circle have?",
          options: ["0", "1", "2", "Infinite"],
        },
      ],
      answers: ["2", "b² - 4ac = 0", "Infinitely many solutions", "20", "2√2", "Infinite"],
      marks: 6,
      category: "Algebra",
      explanation:
        "For 6 and 20, we factorize: 6 = 2×3, 20 = 2²×5. The HCF is 2. A quadratic equation has equal roots when the discriminant b² - 4ac = 0.",
    },
    {
      id: 6,
      type: "mcq",
      text: "Solve the following pair of linear equations: x + 2y = 8, x - y = 8",
      subQuestions: [
        {
          id: "6i",
          text: "What is the value of x and y?",
          options: ["x = 8, y = 0", "x = 0, y = 4", "x = 4, y = 2", "x = 16, y = -4"],
        },
      ],
      answers: ["x = 8, y = 0"],
      marks: 3,
      category: "Algebra",
      explanation:
        "From x - y = 8, we get x = 8 + y. Substituting in x + 2y = 8, we get (8 + y) + 2y = 8, which gives 8 + 3y = 8, so 3y = 0, thus y = 0. Therefore, x = 8 + 0 = 8.",
    },
    {
      id: 7,
      type: "mcq",
      text: "Find the 10th term of the A.P.: 2, 7, 12, ...",
      subQuestions: [
        {
          id: "7i",
          text: "The 10th term is:",
          options: ["47", "42", "52", "57"],
        },
      ],
      answers: ["47"],
      marks: 2,
      category: "Algebra",
      explanation:
        "For A.P. 2, 7, 12, the first term a = 2 and common difference d = 5. The 10th term = a + (n-1)d = 2 + 9×5 = 2 + 45 = 47",
    },
    {
      id: 8,
      type: "mcq",
      text: "A die is thrown once. Find the probability of getting a prime number.",
      subQuestions: [
        {
          id: "8i",
          text: "The probability is:",
          options: ["1/2", "1/3", "2/3", "1/6"],
        },
      ],
      answers: ["1/2"],
      marks: 3,
      category: "Probability",
      explanation:
        "On a standard die, the prime numbers are 2, 3, and 5, which is 3 out of 6 possible outcomes. Therefore, the probability is 3/6 = 1/2.",
    },
    {
      id: 9,
      type: "mcq",
      text: "Two concentric circles are of radii 5 cm and 3 cm. Find the length of the chord of the larger circle which touches the smaller circle.",
      subQuestions: [
        {
          id: "9i",
          text: "The length of the chord is:",
          options: ["8 cm", "4 cm", "6 cm", "10 cm"],
        },
      ],
      answers: ["8 cm"],
      marks: 3,
      category: "Geometry",
      explanation:
        "Using the Pythagorean theorem, if the chord is at a distance of 3 cm from the center, then in a circle of radius 5 cm, the length of the chord is 2√(5² - 3²) = 2√(25 - 9) = 2√16 = 2×4 = 8 cm.",
    },
    {
      id: 10,
      type: "mcq",
      text: "The sum of first n terms of an A.P. is given by:",
      subQuestions: [
        {
          id: "10i",
          text: "Select the correct formula:",
          options: ["n/2[2a + (n-1)d]", "n[a + (n-1)d]", "n/2[a + l]", "a + (n-1)d"],
        },
      ],
      answers: ["n/2[2a + (n-1)d]"],
      marks: 2,
      category: "Algebra",
      explanation:
        "The sum of first n terms of an A.P. is given by the formula Sn = n/2[2a + (n-1)d], where a is the first term, d is the common difference, and n is the number of terms.",
    },
  ]

  const questionTranslations = [
    {
      id: 1,
      type: "mcq",
      text: "Fill in the blanks:",
      subQuestions: [
        {
          id: "1i",
          text: "घात 3 वाले बहुपद को _______ कहा जाता है।",
          options: ["घन बहुपद", "द्विघात बहुपद", "रैखिक बहुपद", "चतुर्थक बहुपद"],
          answerMapping: {
            "घन बहुपद": "cubic polynomial",
            "द्विघात बहुपद": "quadratic polynomial",
            "रैखिक बहुपद": "linear polynomial",
            "चतुर्थक बहुपद": "quartic polynomial",
          },
        },
        {
          id: "1ii",
          text: "√2 एक _______ संख्या है.",
          options: ["अपरिमेय", "तर्कसंगत", "प्राकृतिक", "पूर्णांक"],
          answerMapping: {
            अपरिमेय: "irrational",
            तर्कसंगत: "rational",
            प्राकृतिक: "natural",
            पूर्णांक: "integer",
          },
        },
        {
          id: "1iii",
          text: "समान्तर श्रेणी: 1, 3/2, 2, 5/2, ... में सार्व अंतर d _______ है।",
          options: ["1/2", "1", "2", "3/2"],
          answerMapping: {
            "1/2": "1/2",
            "1": "1",
            "2": "2",
            "3/2": "3/2",
          },
        },
        {
          id: "1iv",
          text: "सभी सर्वांगसम त्रिभुज ______ होते हैं.",
          options: ["समान", "बराबर", "भिन्न", "इनमें से कोई नहीं"],
          answerMapping: {
            समान: "similar",
            बराबर: "equal",
            भिन्न: "different",
            "इनमें से कोई नहीं": "none of these",
          },
        },
        {
          id: "1v",
          text: "एक वृत्त को दो बिंदुओं पर प्रतिच्छेद करने वाली रेखा को _______ कहा जाता है।",
          options: ["जीवा", "छेदक", "स्पर्शरेखा", "व्यास"],
          answerMapping: {
            जीवा: "chord",
            छेदक: "secant",
            स्पर्शरेखा: "tangent",
            व्यास: "diameter",
          },
        },
        {
          id: "1vi",
          text: "किसी भी घटना E के लिए, P(E) + P(E') = _______.",
          options: ["1", "0", "2", "0.5"],
          answerMapping: {
            "1": "1",
            "0": "0",
            "2": "2",
            "0.5": "0.5",
          },
        },
      ],
      answers: ["घन बहुपद", "अपरिमेय", "1/2", "समान", "छेदक", "1"],
      marks: 6,
    },
    {
      id: 2,
      type: "mcq",
      text: "सत्य या असत्य:",
      subQuestions: [
        {
          id: "2i",
          text: "समान त्रिभुजों का क्षेत्रफल हमेशा बराबर होता है.",
          options: ["सत्य", "असत्य"],
          answerMapping: {
            सत्य: "True",
            असत्य: "False",
          },
        },
        {
          id: "2ii",
          text: "1, 2, 1, 3, ... A.P. नहीं है.",
          options: ["सत्य", "असत्य"],
          answerMapping: {
            सत्य: "True",
            असत्य: "False",
          },
        },
        {
          id: "2iii",
          text: "y-अक्ष से किसी बिंदु की दूरी को उसका y-निर्देशांक कहते हैं.",
          options: ["सत्य", "असत्य"],
          answerMapping: {
            सत्य: "True",
            असत्य: "False",
          },
        },
        {
          id: "2iv",
          text: "शंकु का आयतन (1/3)πr²h है.",
          options: ["सत्य", "असत्य"],
          answerMapping: {
            सत्य: "True",
            असत्य: "False",
          },
        },
        {
          id: "2v",
          text: "घटना E की प्रायिकता एक संख्या P(E) है, जैसे कि 0 ≤ P(E) ≤ 1.",
          options: ["सत्य", "असत्य"],
          answerMapping: {
            सत्य: "True",
            असत्य: "False",
          },
        },
        {
          id: "2vi",
          text: "लघु खंड का क्षेत्रफल संगत क्षेत्र के क्षेत्रफल से कम है.",
          options: ["सत्य", "असत्य"],
          answerMapping: {
            सत्य: "True",
            असत्य: "False",
          },
        },
      ],
      answers: ["असत्य", "सत्य", "असत्य", "सत्य", "सत्य", "सत्य"],
      marks: 6,
    },
    {
      id: 3,
      type: "mcq",
      text: "सही मान से मिलान करें:",
      subQuestions: [
        {
          id: "3i",
          text: "9sec²A - 9tan²A बराबर है:",
          options: ["0", "9", "1", "-9"],
          answerMapping: {
            "0": "0",
            "9": "9",
            "1": "1",
            "-9": "-9",
          },
        },
        {
          id: "3ii",
          text: "cos 0° बराबर है:",
          options: ["0", "1", "-1", "undefined"],
          answerMapping: {
            "0": "0",
            "1": "1",
            "-1": "-1",
            undefined: "undefined",
          },
        },
        {
          id: "3iii",
          text: "sin 0° बराबर है:",
          options: ["0", "1", "-1", "undefined"],
          answerMapping: {
            "0": "0",
            "1": "1",
            "-1": "-1",
            undefined: "undefined",
          },
        },
        {
          id: "3iv",
          text: "कोण θ और त्रिज्या r के क्षेत्र का क्षेत्रफल बराबर है:",
          options: ["θr²/2", "θr²/360", "(θ/360)πr²", "πr²θ"],
          answerMapping: {
            "θr²/2": "θr²/2",
            "θr²/360": "θr²/360",
            "(θ/360)πr²": "(θ/360)πr²",
            "πr²θ": "πr²θ",
          },
        },
        {
          id: "3v",
          text: "गोलार्ध का वक्र पृष्ठीय क्षेत्रफल बराबर है:",
          options: ["2πr²", "4πr²", "πr²", "3πr²"],
          answerMapping: {
            "2πr²": "2πr²",
            "4πr²": "4πr²",
            "πr²": "πr²",
            "3πr²": "3πr²",
          },
        },
        {
          id: "3vi",
          text: "गोलार्ध का कुल पृष्ठीय क्षेत्रफल बराबर है:",
          options: ["2πr²", "4πr²", "3πr²", "πr²"],
          answerMapping: {
            "2πr²": "2πr²",
            "4πr²": "4πr²",
            "3πr²": "3πr²",
            "πr²": "πr²",
          },
        },
      ],
      answers: ["9", "1", "0", "(θ/360)πr²", "2πr²", "3πr²"],
      marks: 6,
    },
    {
      id: 4,
      type: "mcq",
      text: "प्रत्येक के लिए एक शब्द/वाक्य में उत्तर लिखें:",
      subQuestions: [
        {
          id: "4i",
          text: "द्विघात समीकरण का मानक रूप लिखें।",
          options: ["ax² + bx + c = 0", "ax + b = 0", "ax³ + bx² + cx + d = 0", "ax + by + c = 0"],
          answerMapping: {
            "ax² + bx + c = 0": "ax² + bx + c = 0",
            "ax + b = 0": "ax + b = 0",
            "ax³ + bx² + cx + d = 0": "ax³ + bx² + cx + d = 0",
            "ax + by + c = 0": "ax + by + c = 0",
          },
        },
        {
          id: "4ii",
          text: "दो त्रिभुजों की समानता की कोई एक शर्त लिखें।",
          options: ["AAA मानदंड", "SSS मानदंड", "SAS मानदंड", "उपर्युक्त सभी"],
          answerMapping: {
            "AAA मानदंड": "AAA criterion",
            "SSS मानदंड": "SSS criterion",
            "SAS मानदंड": "SAS criterion",
            "उपर्युक्त सभी": "All of the above",
          },
        },
        {
          id: "4iii",
          text: "मूल बिंदु (0, 0) और बिंदु (x₁, y₁) के बीच की दूरी लिखें।",
          options: ["√(x₁² + y₁²)", "x₁ + y₁", "|x₁| + |y₁|", "√(|x₁| + |y₁|)"],
          answerMapping: {
            "√(x₁² + y₁²)": "√(x₁² + y₁²)",
            "x₁ + y₁": "x₁ + y₁",
            "|x₁| + |y₁|": "|x₁| + |y₁|",
            "√(|x₁| + |y₁|)": "√(|x₁| + |y₁|)",
          },
        },
        {
          id: "4iv",
          text: "यदि छाया और ध्रुव की ऊँचाई बराबर हो, तो सूर्य का उन्नयन कोण क्या होगा?",
          options: ["45°", "30°", "60°", "90°"],
          answerMapping: {
            "45°": "45°",
            "30°": "30°",
            "60°": "60°",
            "90°": "90°",
          },
        },
        {
          id: "4v",
          text: "कोण θ और त्रिज्या r वाले एक त्रिज्यखंड के चाप की लंबाई का सूत्र लिखें।",
          options: ["rθ", "2πr", "(θ/360°) × 2πr", "πrθ"],
          answerMapping: {
            rθ: "rθ",
            "2πr": "2πr",
            "(θ/360°) × 2πr": "(θ/360°) × 2πr",
            πrθ: "πrθ",
          },
        },
        {
          id: "4vi",
          text: "20-40 का वर्ग चिह्न (मध्य बिंदु) लिखें।",
          options: ["30", "25", "20", "40"],
          answerMapping: {
            "30": "30",
            "25": "25",
            "20": "20",
            "40": "40",
          },
        },
      ],
      answers: ["ax² + bx + c = 0", "AAA मानदंड", "√(x₁² + y₁²)", "45°", "(θ/360°) × 2πr", "30"],
      marks: 6,
    },
    {
      id: 5,
      type: "mcq",
      text: "सही विकल्प चुनें:",
      subQuestions: [
        {
          id: "5i",
          text: "H.C.F. सं���्या 6 और 20 का मान है:",
          options: ["2", "6", "20", "1"],
          answerMapping: {
            "2": "2",
            "6": "6",
            "20": "20",
            "1": "1",
          },
        },
        {
          id: "5ii",
          text: "द्विघात समीकरण ax² + bx + c = 0 के वास्तविक और समान मूल हैं यदि:",
          options: ["b² - 4ac > 0", "b² - 4ac = 0", "b² - 4ac < 0", "b² - 4ac ≠ 0"],
          answerMapping: {
            "b² - 4ac > 0": "b² - 4ac > 0",
            "b² - 4ac = 0": "b² - 4ac = 0",
            "b² - 4ac < 0": "b² - 4ac < 0",
            "b² - 4ac ≠ 0": "b² - 4ac ≠ 0",
          },
        },
        {
          id: "5iii",
          text: "जब a₁, b₁, c₁ और a₂, b₂, c₂ क्रमशः हों, तो समीकरण a₁x + b₁y + c₁ = 0 और a₂x + b₂y + c₂ = 0 की प्रणाली में है:",
          options: ["अद्वितीय समाधान", "दोनों समाधान", "कोई समाधान नहीं", "अनंत समाधान"],
          answerMapping: {
            "अद्वितीय समाधान": "Unique solution",
            "दोनों समाधान": "Both solutions",
            "कोई समाधान नहीं": "No solution",
            "अनंत समाधान": "Infinitely many solutions",
          },
        },
        {
          id: "5iv",
          text: "एक समांतर श्रेणी: 2, 4, 6, ... का 10वाँ पद है:",
          options: ["20", "18", "32", "22"],
          answerMapping: {
            "20": "20",
            "18": "18",
            "32": "32",
            "22": "22",
          },
        },
        {
          id: "5v",
          text: "बिंदुओं (2, 3) और (4, 1) के बीच की दूरी है:",
          options: ["√8", "3", "2√2", "2/3"],
          answerMapping: {
            "√8": "√8",
            "3": "3",
            "2√2": "2√2",
            "2/3": "2/3",
          },
        },
        {
          id: "5vi",
          text: "एक वृत्त में कितनी स्पर्श रेखाएँ हो सकती हैं?",
          options: ["0", "1", "2", "अनंत"],
          answerMapping: {
            "0": "0",
            "1": "1",
            "2": "2",
            अनंत: "Infinite",
          },
        },
      ],
      answers: ["2", "b² - 4ac = 0", "अनंत समाधान", "20", "2√2", "अनंत"],
      marks: 6,
    },
    {
      id: 6,
      type: "mcq",
      text: "निम्न रैखिक समीकरणों के युग्म को हल करें: x + 2y = 8, x - y = 8",
      subQuestions: [
        {
          id: "6i",
          text: "x और y का मान क्या है?",
          options: ["x = 8, y = 0", "x = 0, y = 4", "x = 4, y = 2", "x = 16, y = -4"],
          answerMapping: {
            "x = 8, y = 0": "x = 8, y = 0",
            "x = 0, y = 4": "x = 0, y = 4",
            "x = 4, y = 2": "x = 4, y = 2",
            "x = 16, y = -4": "x = 16, y = -4",
          },
        },
      ],
      answers: ["x = 8, y = 0"],
      marks: 3,
    },
    {
      id: 7,
      type: "mcq",
      text: "... का 10वाँ पद ज्ञात करें A.P.: 2, 7, 12, ...",
      subQuestions: [
        {
          id: "7i",
          text: "दसवाँ पद है:",
          options: ["47", "42", "52", "57"],
          answerMapping: {
            "47": "47",
            "42": "42",
            "52": "52",
            "57": "57",
          },
        },
      ],
      answers: ["47"],
      marks: 2,
    },
    {
      id: 8,
      type: "mcq",
      text: "एक पासा एक बार फेंका जाता है। अभाज्य संख्या प्राप्त करने की प्रायिकता ज्ञात कीजिए।",
      subQuestions: [
        {
          id: "8i",
          text: "संभावना है:",
          options: ["1/2", "1/3", "2/3", "1/6"],
          answerMapping: {
            "1/2": "1/2",
            "1/3": "1/3",
            "2/3": "2/3",
            "1/6": "1/6",
          },
        },
      ],
      answers: ["1/2"],
      marks: 3,
    },
    {
      id: 9,
      type: "mcq",
      text: "दो संकेन्द्रीय वृत्तों की त्रिज्याएँ 5 सेमी और 3 सेमी हैं। बड़े वृत्त की जीवा की लंबाई ज्ञात कीजिए जो छोटे वृत्त को स्पर्श करती है।",
      subQuestions: [
        {
          id: "9i",
          text: "जीवा की लंबाई है:",
          options: ["8 सेमी", "4 सेमी", "6 सेमी", "10 सेमी"],
          answerMapping: {
            "8 सेमी": "8 cm",
            "4 सेमी": "4 cm",
            "6 सेमी": "6 cm",
            "10 सेमी": "10 cm",
          },
        },
      ],
      answers: ["8 सेमी"],
      marks: 3,
    },
    {
      id: 10,
      type: "mcq",
      text: "एक समांतर श्रेणी के प्रथम n पदों का योग निम्न प्रकार दिया जाता है:",
      subQuestions: [
        {
          id: "10i",
          text: "सही सूत्र चुनें:",
          options: ["n/2[2a + (n-1)d]", "n[a + (n-1)d]", "n/2[a + l]", "a + (n-1)d"],
          answerMapping: {
            "n/2[2a + (n-1)d]": "n/2[2a + (n-1)d]",
            "n[a + (n-1)d]": "n[a + (n-1)d]",
            "n/2[a + l]": "n/2[a + l]",
            "a + (n-1)d": "a + (n-1)d",
          },
        },
      ],
      answers: ["n/2[2a + (n-1)d]"],
      marks: 2,
    },
  ]

  const categories = [...new Set(questions.map((q) => q.category))].filter(Boolean)

  const handleInputChange = (questionId, subQuestionId, value) => {
    setAnswers({
      ...answers,
      [questionId + (subQuestionId ? "-" + subQuestionId : "")]: value,
    })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
    setShowResults(true)
    clearInterval(timerRef.current)
  }

  const calculateScore = () => {
    let score = 0
    let totalMarks = 0
    let correctAnswers = 0
    let incorrectAnswers = 0

    if (!questions || !Array.isArray(questions)) {
      return { score: 0, totalMarks: 0, correctAnswers: 0, incorrectAnswers: 0 }
    }

    questions.forEach((q) => {
      if (!q) return

      totalMarks += q.marks || 0

      if (q.type === "mcq" && Array.isArray(q.subQuestions) && Array.isArray(q.answers)) {
        q.subQuestions.forEach((sq, index) => {
          if (!sq) return

          const userAnswer = answers[q.id + "-" + sq.id] || ""

          // Get the correct answer based on the language
          let correctAnswer
          if (questionLanguage === "english") {
            correctAnswer = q.answers[index]
          } else {
            // For Hindi, we need to get the corresponding translation
            const translatedQuestion = questionTranslations.find((tq) => tq.id === q.id)
            if (translatedQuestion && Array.isArray(translatedQuestion.answers)) {
              correctAnswer = translatedQuestion.answers[index]
            }
          }

          if (correctAnswer && userAnswer === correctAnswer) {
            score += q.marks / q.subQuestions.length
            correctAnswers++
          } else if (userAnswer) {
            incorrectAnswers++
          }
        })
      }
    })

    return { score, totalMarks, correctAnswers, incorrectAnswers }
  }

  const isAnswerCorrect = (questionId, subQuestionId, answer) => {
    const question = questions.find((q) => q.id === questionId)
    if (!question) return false

    const subQuestionIndex = question.subQuestions.findIndex((sq) => sq.id === subQuestionId)
    if (subQuestionIndex === -1) return false

    // Get the correct answer based on the language
    let correctAnswer
    if (questionLanguage === "english") {
      correctAnswer = question.answers[subQuestionIndex]
    } else {
      // For Hindi, we need to get the corresponding translation
      const translatedQuestion = questionTranslations.find((tq) => tq.id === questionId)
      if (translatedQuestion && Array.isArray(translatedQuestion.answers)) {
        correctAnswer = translatedQuestion.answers[subQuestionIndex]
      }
    }

    return answer === correctAnswer
  }

  // This function maps Hindi answers to English for comparison
  const mapAnswerToEnglish = (questionId, subQuestionId, hindiAnswer) => {
    if (questionLanguage === "english") return hindiAnswer // No mapping needed

    const translatedQuestion = questionTranslations.find((tq) => tq.id === questionId)
    if (!translatedQuestion) return hindiAnswer

    const subQuestion = translatedQuestion.subQuestions.find((sq) => sq.id === subQuestionId)
    if (!subQuestion || !subQuestion.answerMapping) return hindiAnswer

    return subQuestion.answerMapping[hindiAnswer] || hindiAnswer
  }

  const renderQuestion = (question) => {
    if (!question) return <div>Question not found</div>

    // If in practice mode with mistakes only, skip questions that were answered correctly
    if (practiceMode && mistakesOnly && submitted) {
      const allSubQuestionsCorrect = question.subQuestions.every((sq) => {
        const userAnswer = answers[`${question.id}-${sq.id}`]
        return isAnswerCorrect(question.id, sq.id, userAnswer)
      })
      if (allSubQuestionsCorrect) return null
    }

    const currentTranslation = questionLanguage === "hindi" ? questionTranslations[question.id - 1] : null

    return (
      <motion.div
        key={`${question.id}-${questionLanguage}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="p-6 bg-white rounded-lg shadow-lg"
      >
        <h3 className="font-semibold mb-4 text-purple-800">
          {currentTranslation ? currentTranslation.text : question.text}
        </h3>
        {Array.isArray(question.subQuestions) &&
          question.subQuestions.map((sq, index) => {
            const translatedSubQuestion = currentTranslation?.subQuestions?.[index]
            const options = translatedSubQuestion ? translatedSubQuestion.options : sq.options
            const userAnswer = answers[`${question.id}-${sq.id}`]

            return (
              <motion.div
                key={`${sq.id}-${questionLanguage}`}
                className="mb-5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="mb-2 text-purple-700 font-medium">
                  {index + 1}. {translatedSubQuestion ? translatedSubQuestion.text : sq.text}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {options.map((option, optIndex) => {
                    const isSelected = userAnswer === option
                    const isCorrect = submitted && isAnswerCorrect(question.id, sq.id, option)

                    return (
                      <label
                        key={`${optIndex}-${questionLanguage}`}
                        className={`
                        flex items-center p-2 sm:p-3 rounded-md cursor-pointer
                        border-2 transition-all duration-200 mb-2
                        ${
                          submitted
                            ? isCorrect
                              ? "bg-green-50 border-green-500"
                              : isSelected
                                ? "bg-red-50 border-red-500"
                                : "border-purple-100"
                            : isSelected
                              ? "bg-purple-50 border-purple-500"
                              : "border-purple-100 hover:border-purple-300"
                        }
                      `}
                      >
                        <input
                          type="radio"
                          name={`${question.id}-${sq.id}`}
                          value={option}
                          checked={isSelected}
                          onChange={() => handleInputChange(question.id, sq.id, option)}
                          disabled={submitted && !practiceMode}
                          className="mr-2 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm sm:text-base">{option}</span>
                      </label>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        <div className="flex justify-between items-center mt-2">
          <div className="text-sm text-purple-600">{question.category}</div>
          <div className="text-sm text-purple-600">[{question.marks} marks]</div>
        </div>

        {submitted && showExplanation && question.explanation && (
          <motion.div
            className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-blue-700 font-medium mb-1">Explanation:</h4>
            <p className="text-sm text-blue-600">{question.explanation}</p>
          </motion.div>
        )}
      </motion.div>
    )
  }

  const { score, totalMarks, correctAnswers, incorrectAnswers } = calculateScore()
  const percentage = totalMarks > 0 ? (score / totalMarks) * 100 : 0

  const getGrade = (percent) => {
    if (percent >= 90) return { grade: "A+", message: "Outstanding!" }
    if (percent >= 80) return { grade: "A", message: "Excellent!" }
    if (percent >= 70) return { grade: "B", message: "Very Good!" }
    if (percent >= 60) return { grade: "C", message: "Good!" }
    if (percent >= 50) return { grade: "D", message: "Satisfactory" }
    return { grade: "F", message: "Needs Improvement" }
  }

  const gradeInfo = getGrade(percentage)

  const formatTimeRemaining = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`
    } else {
      return `${minutes}m ${secs}s`
    }
  }

  const handleReviewQuestions = () => {
    setIsReviewing(true)
    setShowResults(false)
    setCurrentQuestion(0)
  }

  const startExam = () => {
    setExamStarted(true)
    setTimeRemaining(examDuration * 60)

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

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
            onClick={() => setQuestionLanguage("english")}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
              ${
                questionLanguage === "english"
                  ? "bg-purple-600 text-white"
                  : "bg-purple-100 text-purple-800 hover:bg-purple-200"
              }`}
          >
            English
          </button>
          <button
            onClick={() => setQuestionLanguage("hindi")}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
              ${
                questionLanguage === "hindi"
                  ? "bg-purple-600 text-white"
                  : "bg-purple-100 text-purple-800 hover:bg-purple-200"
              }`}
          >
            हिंदी
          </button>
        </div>
      </motion.div>
    )
  }

  const ExamSettings = () => {
    return (
      <motion.div
        className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">Exam Settings</h2>

        <div className="mb-6">
          <label className="block text-purple-700 font-medium mb-2">Exam Duration (minutes):</label>
          <input
            type="number"
            min="1"
            max="180"
            value={examDuration}
            onChange={(e) => setExamDuration(Math.max(1, Number.parseInt(e.target.value) || 30))}
            className="w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-purple-700 font-medium mb-2">Language:</label>
          <div className="flex gap-2">
            <button
              onClick={() => setQuestionLanguage("english")}
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  questionLanguage === "english"
                    ? "bg-purple-600 text-white"
                    : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                }`}
            >
              English
            </button>
            <button
              onClick={() => setQuestionLanguage("hindi")}
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  questionLanguage === "hindi"
                    ? "bg-purple-600 text-white"
                    : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                }`}
            >
              हिंदी
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-purple-700 font-medium mb-2">Mode:</label>
          <div className="flex gap-2">
            <button
              onClick={() => setPracticeMode(false)}
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${!practiceMode ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-800 hover:bg-purple-200"}`}
            >
              Exam Mode
            </button>
            <button
              onClick={() => setPracticeMode(true)}
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${practiceMode ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-800 hover:bg-purple-200"}`}
            >
              Practice Mode
            </button>
          </div>
        </div>

        <motion.button
          onClick={startExam}
          className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Start Exam
        </motion.button>
      </motion.div>
    )
  }

  const PracticeSettings = () => {
    return (
      <motion.div
        className="mb-4 bg-white p-3 rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showExplanations"
              checked={showExplanation}
              onChange={() => setShowExplanation(!showExplanation)}
              className="rounded text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="showExplanations" className="text-sm text-purple-800">
              Show Explanations
            </label>
          </div>

          {submitted && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="mistakesOnly"
                checked={mistakesOnly}
                onChange={() => setMistakesOnly(!mistakesOnly)}
                className="rounded text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="mistakesOnly" className="text-sm text-purple-800">
                Show Mistakes Only
              </label>
            </div>
          )}

          <div className="flex items-center gap-2">
            <label className="text-sm text-purple-800">Filter by Category:</label>
            <select
              className="text-sm border border-purple-300 rounded p-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => {
                // Filter questions by category logic would go here
                // This is a placeholder for the UI
              }}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>
    )
  }

  useEffect(() => {
    setCurrentQuestion((prev) => prev)
  }, [questionLanguage])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-purple-50 flex flex-col justify-center p-4">
        <motion.header
          className="mb-8 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2 text-purple-800">Class 10th Mathematics Board Examination 2025</h1>
          <p className="text-purple-600">Configure your exam settings below</p>
        </motion.header>

        <ExamSettings />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-purple-50">
      <div className="max-w-4xl mx-auto p-2 sm:p-4">
        <motion.header
          className="mb-4 sm:mb-6 text-center p-3 sm:p-6 bg-purple-700 text-white rounded-lg shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl sm:text-2xl font-bold mb-2 text-purple-800 ">
            Class 10th Mathematics Board Examination 2025
          </h1>
          <div className="text-sm sm:text-base text-purple-800">
            Total Questions: {questions.length} | Maximum Marks: {totalMarks}
          </div>
          <div className="text-sm sm:text-base text-purple-800 flex items-center justify-center gap-2">
            <Clock size={16} className="text-purple-800" />
            Time Remaining: {formatTimeRemaining(timeRemaining)}
          </div>
        </motion.header>

        <LanguageSwitch />

        {practiceMode && <PracticeSettings />}

        {!showResults || isReviewing ? (
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
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentQuestion}-${questionLanguage}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="mb-4 sm:mb-6"
              >
                {questions && questions.length > 0 && currentQuestion < questions.length ? (
                  renderQuestion(questions[currentQuestion])
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
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex justify-center sm:justify-start gap-2 order-2 sm:order-1">
                  <motion.button
                    onClick={() => setCurrentQuestion(0)}
                    className="p-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 disabled:opacity-50 transition-colors"
                    disabled={currentQuestion === 0 || (submitted && !practiceMode)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="First Question"
                  >
                    <ChevronsLeft size={20} />
                  </motion.button>
                  <motion.button
                    onClick={handlePrevious}
                    className="p-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 disabled:opacity-50 transition-colors"
                    disabled={currentQuestion === 0 || (submitted && !practiceMode)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Previous Question"
                  >
                    <ChevronLeft size={20} />
                  </motion.button>
                  <motion.button
                    onClick={handleNext}
                    className="p-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 disabled:opacity-50 transition-colors"
                    disabled={currentQuestion === questions.length - 1 || (submitted && !practiceMode)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Next Question"
                  >
                    <ChevronRight size={20} />
                  </motion.button>
                  <motion.button
                    onClick={() => setCurrentQuestion(questions.length - 1)}
                    className="p-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 disabled:opacity-50 transition-colors"
                    disabled={currentQuestion === questions.length - 1 || (submitted && !practiceMode)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Last Question"
                  >
                    <ChevronsRight size={20} />
                  </motion.button>
                </div>

                <div className="flex-1 order-1 sm:order-2">
                  <h3 className="text-xs sm:text-sm text-purple-700 mb-2 font-medium text-center">
                    Question Navigator:
                  </h3>
                  <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                    {questions.map((_, index) => {
                      const hasAnswered = Object.keys(answers).some((key) => key.startsWith(`${index + 1}-`))
                      const isCorrect =
                        hasAnswered &&
                        submitted &&
                        questions[index].subQuestions.every((sq) => {
                          const userAnswer = answers[`${index + 1}-${sq.id}`]
                          return isAnswerCorrect(index + 1, sq.id, userAnswer)
                        })

                      return (
                        <motion.button
                          key={index}
                          onClick={() => setCurrentQuestion(index)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                            ${
                              currentQuestion === index
                                ? "bg-purple-700 text-white"
                                : submitted
                                  ? isCorrect
                                    ? "bg-green-100 text-green-800 border border-green-500"
                                    : hasAnswered
                                      ? "bg-red-100 text-red-800 border border-red-500"
                                      : "bg-gray-100 text-gray-800 border border-gray-300"
                                  : hasAnswered
                                    ? "bg-purple-100 text-purple-800 border border-purple-500"
                                    : "bg-purple-50 text-purple-800 hover:bg-purple-100"
                            }`}
                          layout
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          initial={false}
                          animate={{
                            scale: 1,
                            opacity: 1,
                            transition: { duration: 0.2 },
                          }}
                        >
                          {index + 1}
                        </motion.button>
                      )
                    })}
                  </div>
                </div>
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
                    setIsReviewing(false)
                    setShowResults(true)
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
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#E9D5FF" strokeWidth="8" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="8"
                      strokeDasharray="283"
                      strokeDashoffset="283"
                      initial={{ strokeDashoffset: 283 }}
                      animate={{
                        strokeDashoffset: 283 - (percentage / 100) * 283,
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
                      <div className="font-medium">
                        {score.toFixed(1)}/{totalMarks}
                      </div>
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
                      <div className="font-medium">
                        {questions.reduce((total, q) => total + q.subQuestions.length, 0) -
                          (correctAnswers + incorrectAnswers)}
                      </div>
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
                <div className="flex flex-wrap justify-center gap-4">
                  <motion.button
                    onClick={handleReviewQuestions}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Review Questions
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setPracticeMode(true)
                      setShowExplanation(true)
                      handleReviewQuestions()
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Practice Mode
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setPracticeMode(true)
                      setMistakesOnly(true)
                      setShowExplanation(true)
                      handleReviewQuestions()
                    }}
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Review Mistakes
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
              ${window.innerWidth >= 640 ? "static mt-8 flex justify-end" : "fixed bottom-16 right-2 z-50"}
              sm:static sm:mt-8 sm:flex sm:justify-end
            `}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              onClick={handleSubmit}
              className="px-6 sm:px-8 py-2 sm:py-3 bg-green-600 text-white text-sm sm:text-base rounded-full shadow-lg hover:bg-green-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Exam
            </motion.button>
          </motion.div>
        )}

        {!submitted && (
          <motion.div
            className="fixed top-2 sm:top-4 right-2 sm:right-4 bg-white p-2 sm:p-3 rounded-lg shadow-lg z-50 flex items-center gap-2"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Timer size={16} className="text-purple-600" />
            <div className="text-xs sm:text-sm text-purple-600 font-medium">{formatTimeRemaining(timeRemaining)}</div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

