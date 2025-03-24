"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Timer, MapPin } from "lucide-react"
import Image from "next/image"

export default function SocialScienceExam() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [mapMarkers, setMapMarkers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isReviewing, setIsReviewing] = useState(false)
  const [examStarted, setExamStarted] = useState(false)
  const [examDuration, setExamDuration] = useState(180) // Default 180 minutes (3 hours)
  const [timeRemaining, setTimeRemaining] = useState(180 * 60) // in seconds
  const [showSettings, setShowSettings] = useState(true)
  const [practiceMode, setPracticeMode] = useState(false)
  const [mistakesOnly, setMistakesOnly] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [activeMapSet, setActiveMapSet] = useState("set1")
  const timerRef = useRef(null)
  const mapRef = useRef(null)

  const questions = [
    {
      id: 1,
      type: "fill-in-blanks",
      text: "Fill in the blanks:",
      subQuestions: [
        {
          id: "1i",
          text: "According to MGNREGA-2005 provided employment guarantee for _______ days.",
          options: ["60", "90", "100", "120"],
        },
        {
          id: "1ii",
          text: "One national park of Madhya Pradesh is _______.",
          options: ["Kanha", "Ranthambore", "Jim Corbett", "Gir"],
        },
        {
          id: "1iii",
          text: "Agriculture is _______ sector activity.",
          options: ["primary", "secondary", "tertiary", "quaternary"],
        },
        {
          id: "1iv",
          text: "Sri Lanka emerged as an independent country in _______ (year).",
          options: ["1947", "1948", "1950", "1952"],
        },
        {
          id: "1v",
          text: "In _______ government are two or more levels (tiers of government).",
          options: ["federal", "unitary", "presidential", "parliamentary"],
        },
        {
          id: "1vi",
          text: "In Africa 1890s Rinderpest was _______.",
          options: ["a cattle disease", "a crop disease", "a human disease", "a water crisis"],
        },
      ],
      answers: ["100", "Kanha", "primary", "1948", "federal", "a cattle disease"],
      marks: 6,
      category: "General Knowledge",
      explanation:
        "MGNREGA guarantees 100 days of employment. Kanha is a national park in MP. Agriculture is a primary sector activity. Sri Lanka gained independence in 1948. Federal governments have multiple tiers. Rinderpest was a cattle disease that affected Africa in the 1890s.",
    },
    {
      id: 2,
      type: "true-false",
      text: "Write True / False:",
      subQuestions: [
        {
          id: "2i",
          text: "Non-renewable resources are those which will get exhausted after a few years of use.",
          options: ["True", "False"],
        },
        {
          id: "2ii",
          text: "In India 22 languages are now included in the Eighth Schedule of Constitution.",
          options: ["True", "False"],
        },
        {
          id: "2iii",
          text: "India is no longer a federal system.",
          options: ["True", "False"],
        },
        {
          id: "2iv",
          text: "Haldia port is a subsidiary port of Kolkatta.",
          options: ["True", "False"],
        },
        {
          id: "2v",
          text: "The activities in primary, secondary and tertiary sectors are independent.",
          options: ["True", "False"],
        },
        {
          id: "2vi",
          text: "Modern forms of money include currency - paper notes and coins.",
          options: ["True", "False"],
        },
      ],
      answers: ["True", "True", "False", "True", "False", "True"],
      marks: 6,
      category: "General Knowledge",
      explanation:
        "Non-renewable resources do get exhausted. 22 languages are in the Eighth Schedule. India is still a federal system. Haldia is a subsidiary port of Kolkata. The economic sectors are interdependent. Modern money includes paper notes and coins.",
    },
    {
      id: 3,
      type: "matching",
      text: "Match the correct pairs:",
      subQuestions: [
        {
          id: "3i",
          text: "Reserve Bank of India",
          options: [
            "Formal source of credit",
            "Public and Private sectors",
            "Elections and government system",
            "Social issues and News",
          ],
        },
        {
          id: "3ii",
          text: "Sectors in terms of ownership",
          options: [
            "Formal source of credit",
            "Public and Private sectors",
            "Elections and government system",
            "Social issues and News",
          ],
        },
        {
          id: "3iii",
          text: "Works of political parties",
          options: [
            "Formal source of credit",
            "Public and Private sectors",
            "Elections and government system",
            "Social issues and News",
          ],
        },
        {
          id: "3iv",
          text: "Print media",
          options: [
            "Formal source of credit",
            "Public and Private sectors",
            "Elections and government system",
            "Social issues and News",
          ],
        },
        {
          id: "3v",
          text: "Lime stone",
          options: ["Cement", "Coal", "Iron", "Petroleum"],
        },
        {
          id: "3vi",
          text: "Simon Commission",
          options: ["1926 A.D.", "1927 A.D.", "1928 A.D.", "1929 A.D."],
        },
      ],
      answers: [
        "Formal source of credit",
        "Public and Private sectors",
        "Elections and government system",
        "Social issues and News",
        "Cement",
        "1928 A.D.",
      ],
      marks: 6,
      category: "General Knowledge",
      explanation:
        "RBI is a formal source of credit. Ownership sectors are public and private. Political parties work on elections and government. Print media covers social issues and news. Limestone is used for cement. Simon Commission was formed in 1928.",
    },
    {
      id: 4,
      type: "one-sentence",
      text: "Answer in one sentence:",
      subQuestions: [
        {
          id: "4i",
          text: "In which place did India's first cotton mill set up?",
          options: ["Mumbai", "Ahmedabad", "Surat", "Kolkata"],
        },
        {
          id: "4ii",
          text: "First world war held in which year?",
          options: ["1914-1918", "1915-1919", "1939-1945", "1940-1944"],
        },
        {
          id: "4iii",
          text: "Write the name of one activity of secondary sector.",
          options: ["Manufacturing", "Agriculture", "Banking", "Transport"],
        },
        {
          id: "4iv",
          text: "What was the main channel (medium) connecting countries in the past?",
          options: ["Trade routes", "Postal service", "Telegraph", "Radio"],
        },
        {
          id: "4v",
          text: "A violent conflict between government opposing groups within a country that becomes so intense, appears like a war called what?",
          options: ["Civil war", "Coup", "Revolution", "Insurgency"],
        },
        {
          id: "4vi",
          text: "Which is the most convenient means of transport?",
          options: ["Airways", "Railways", "Roadways", "Waterways"],
        },
      ],
      answers: ["Mumbai", "1914-1918", "Manufacturing", "Trade routes", "Civil war", "Airways"],
      marks: 6,
      category: "History & Geography",
      explanation:
        "India's first cotton mill was in Mumbai. WWI was from 1914-1918. Manufacturing is a secondary sector activity. Trade routes connected countries in the past. Civil war is an intense internal conflict. Airways are generally considered the most convenient transport.",
    },
    {
      id: 5,
      type: "mcq",
      text: "Choose and write the correct option:",
      subQuestions: [
        {
          id: "5i",
          text: "Rio-de-Janeiro in Brazil, Earth Summit was held in which year?",
          options: ["June, 1992", "July, 1991", "June, 1929", "July, 1992"],
        },
        {
          id: "5ii",
          text: "The Mundas and the Santhals tribes of Chota Nagpur region worship which trees?",
          options: ["Palash and Kadamba", "Gular and Arjun", "Mahua and Kadamba", "Mahua and Neem"],
        },
        {
          id: "5iii",
          text: "The largest water resource project of India covering four states - Maharashtra, Madhya Pradesh, Gujarat and Rajasthan is:",
          options: ["Sardar Sarovar Dam", "Koyna Dam", "Hirakud Dam", "Gandhi Sagar Dam"],
        },
        {
          id: "5iv",
          text: "Main staple food crop of India is:",
          options: ["Tea", "Jute", "Paddy", "Rubber"],
        },
        {
          id: "5v",
          text: "Famous book of Mahatma Gandhi is:",
          options: ["Godan", "Hind Swaraj", "Gitanjali", "India - a Discovery"],
        },
        {
          id: "5vi",
          text: "H.D.I. means:",
          options: ["Human Development", "Human Growth Index", "Human Income", "Human Development Index"],
        },
      ],
      answers: [
        "June, 1992",
        "Mahua and Kadamba",
        "Sardar Sarovar Dam",
        "Paddy",
        "Hind Swaraj",
        "Human Development Index",
      ],
      marks: 6,
      category: "General Knowledge",
      explanation:
        "The Earth Summit was held in June 1992. Mundas and Santhals worship Mahua and Kadamba trees. Sardar Sarovar is the largest water project covering 4 states. Paddy (rice) is India's main staple food. Hind Swaraj was written by Gandhi. HDI stands for Human Development Index.",
    },
    {
      id: 6,
      type: "short-answer",
      text: "Who was Giuseppe Mazzini?",
      options: [
        "An Italian revolutionary who founded Young Italy movement",
        "A French philosopher of the Enlightenment period",
        "A German military general during World War I",
        "A Russian communist leader",
      ],
      answer: "An Italian revolutionary who founded Young Italy movement",
      marks: 2,
      category: "History",
      explanation:
        "Giuseppe Mazzini (1805-1872) was an Italian revolutionary who founded the Young Italy movement. He was a key figure in the Italian unification movement and advocated for a unified republican Italy.",
    },
    {
      id: 7,
      type: "short-answer",
      text: "What is Utopian?",
      options: [
        "An idealistic but impractical social or political scheme",
        "A mathematical concept in geometry",
        "An ancient Greek philosophy",
        "A type of economic system",
      ],
      answer: "An idealistic but impractical social or political scheme",
      marks: 2,
      category: "Political Science",
      explanation:
        "Utopian refers to an idealistic but often impractical vision of a perfect society. The term comes from Sir Thomas More's book 'Utopia' (1516), which described an imaginary island with a perfect social and political system.",
    },
    {
      id: 8,
      type: "short-answer",
      text: "What do you understand by Boycott?",
      options: [
        "A form of protest where people refuse to buy, use, or participate in something",
        "A type of parliamentary procedure",
        "A military strategy",
        "An economic policy to increase exports",
      ],
      answer: "A form of protest where people refuse to buy, use, or participate in something",
      marks: 2,
      category: "Political Science",
      explanation:
        "Boycott is a form of protest where people refuse to buy, use, or participate in something as a way of expressing disapproval or forcing acceptance of certain conditions. It was a key strategy during India's freedom movement.",
    },
    {
      id: 9,
      type: "short-answer",
      text: "Write two points about Jallianwalla Bagh massacre.",
      answer:
        "The Jallianwalla Bagh massacre took place on April 13, 1919, in Amritsar, Punjab. General Dyer ordered troops to fire on a peaceful gathering, killing hundreds of unarmed Indians. It was a turning point in India's freedom struggle and led to increased support for the independence movement.",
      marks: 2,
      category: "History",
      explanation:
        "The Jallianwalla Bagh massacre was a pivotal event in India's freedom struggle where British troops under General Dyer fired on unarmed civilians gathered in an enclosed garden, killing hundreds and wounding many more.",
    },
    {
      id: 10,
      type: "short-answer",
      text: "Write two points about Silk Routes.",
      answer:
        "The Silk Routes were a network of trade routes connecting the East and West, primarily China to the Mediterranean. They were used for trading silk, spices, textiles, and other goods, and also facilitated cultural exchange between different civilizations.",
      marks: 2,
      category: "History",
      explanation:
        "The Silk Routes were ancient trade networks that connected East Asia to South Asia, Persia, the Arabian Peninsula, East Africa, and Southern Europe. They were instrumental in the development of many civilizations and facilitated cultural exchange.",
    },
    {
      id: 11,
      type: "short-answer",
      text: "Write two qualities of Spinning Jenny.",
      options: [
        "It could spin multiple threads simultaneously, increasing productivity",
        "It was water-powered, reducing manual labor",
        "It used steam power to operate",
        "It was portable and could be used in homes",
      ],
      answer: "It could spin multiple threads simultaneously, increasing productivity",
      marks: 2,
      category: "History",
      explanation:
        "The Spinning Jenny, invented by James Hargreaves in 1764, was a multi-spindle spinning frame that could spin multiple threads simultaneously, greatly increasing productivity. It was also relatively small and could be used in homes, unlike later industrial machines.",
    },
    {
      id: 12,
      type: "short-answer",
      text: "What is the meaning of Tariff?",
      options: [
        "A tax imposed on imported or exported goods",
        "A type of government subsidy",
        "A form of direct taxation",
        "A price control mechanism",
      ],
      answer: "A tax imposed on imported or exported goods",
      marks: 2,
      category: "Economics",
      explanation:
        "A tariff is a tax imposed by a government on goods and services imported from other countries. Tariffs are used to restrict trade, as they increase the price of imported goods and services, making them more expensive to consumers.",
    },
    {
      id: 13,
      type: "short-answer",
      text: "What happened when Corn Law was scrapped in Britain?",
      answer:
        "When the Corn Laws were repealed in 1846, food prices in Britain fell as cheaper imports became available. This benefited industrial workers but hurt agricultural interests. It marked Britain's shift toward free trade policies and accelerated industrialization.",
      marks: 2,
      category: "History",
      explanation:
        "The repeal of the Corn Laws in 1846 marked Britain's move toward free trade. It led to cheaper food imports, benefiting urban workers but hurting agricultural interests. It symbolized the rising power of industrial interests over landed aristocracy.",
    },
    {
      id: 14,
      type: "short-answer",
      text: "Write two points of importance of Printing or Print Media.",
      answer:
        "Print media allows for the mass dissemination of information and ideas. It creates a permanent record of events and knowledge, enabling preservation and wider access. It played a crucial role in social and political movements by spreading ideas and mobilizing public opinion.",
      marks: 2,
      category: "History",
      explanation:
        "Print media revolutionized communication by enabling mass production and distribution of written material. It democratized knowledge, supported the spread of new ideas, and played a crucial role in social and political movements throughout history.",
    },
    {
      id: 15,
      type: "short-answer",
      text: "Explain effects of 'Print on Women'.",
      answer:
        "Print media helped in spreading awareness about women's rights and issues. It provided a platform for women writers and activists to express their views. Women's magazines and literature contributed to changing perceptions about gender roles and encouraged women's education and participation in public life.",
      marks: 2,
      category: "History",
      explanation:
        "Print media had significant impacts on women's lives by providing access to education and information, creating platforms for women's voices, and supporting women's movements. Women's magazines and literature helped challenge traditional gender roles.",
    },
    {
      id: 16,
      type: "short-answer",
      text: "What is Feminist Movement?",
      options: [
        "A social movement advocating for women's rights and gender equality",
        "A literary movement focused on female authors",
        "An economic theory about women in the workforce",
        "A political party representing women's interests",
      ],
      answer: "A social movement advocating for women's rights and gender equality",
      marks: 2,
      category: "Political Science",
      explanation:
        "The feminist movement is a series of social movements and ideologies that aim to define and establish political, economic, personal, and social equality of the sexes. It has gone through several 'waves' addressing different aspects of gender inequality.",
    },
    {
      id: 17,
      type: "short-answer",
      text: "Write two characteristics of Indian ideal woman in society.",
      answer:
        "Traditionally, the ideal Indian woman was expected to be devoted to family, self-sacrificing, and nurturing. She was also expected to uphold cultural traditions, religious values, and maintain family honor. These ideals have evolved over time with changing social norms and women's movements.",
      marks: 2,
      category: "Sociology",
      explanation:
        "Traditional Indian society often idealized women who embodied qualities like devotion to family, self-sacrifice, modesty, and preservation of cultural traditions. These ideals have been both celebrated and challenged as society evolves.",
    },
    {
      id: 18,
      type: "short-answer",
      text: "Write importance of Democracy.",
      answer:
        "Democracy ensures people's participation in governance through elections. It protects fundamental rights and freedoms of citizens. It promotes equality and dignity for all citizens regardless of their background. It allows for peaceful transfer of power and provides mechanisms for resolving conflicts.",
      marks: 2,
      category: "Political Science",
      explanation:
        "Democracy is important because it ensures citizen participation in governance, protects fundamental rights, promotes equality, allows for peaceful power transitions, and provides mechanisms for accountability and conflict resolution.",
    },
    {
      id: 19,
      type: "short-answer",
      text: "Why do lenders ask for collateral (Security) while lending?",
      options: [
        "To secure the loan in case the borrower defaults on repayment",
        "To increase the interest rate on the loan",
        "To comply with government regulations",
        "To establish a long-term relationship with the borrower",
      ],
      answer: "To secure the loan in case the borrower defaults on repayment",
      marks: 2,
      category: "Economics",
      explanation:
        "Lenders ask for collateral to reduce their risk. If a borrower fails to repay the loan, the lender can sell the collateral to recover their money. Collateral also serves as an incentive for borrowers to repay loans on time.",
    },
    {
      id: 20,
      type: "short-answer",
      text: "What are the various ways by which people may be exploited in the market?",
      answer:
        "People can be exploited through unfair pricing, misleading advertisements, sale of adulterated or substandard goods, use of false weights and measures, and lack of proper information about products. Exploitation also occurs through unfair contract terms, hidden charges, and monopolistic practices that limit consumer choices.",
      marks: 2,
      category: "Economics",
      explanation:
        "Market exploitation occurs in various forms including unfair pricing, misleading advertising, adulteration of products, false weights and measures, hidden charges, and monopolistic practices that disadvantage consumers.",
    },
    {
      id: 21,
      type: "short-answer",
      text: "Name two movements for conservation of forest.",
      options: [
        "Chipko Movement and Appiko Movement",
        "Narmada Bachao Andolan and Chipko Movement",
        "Silent Valley Movement and Save Amazon Movement",
        "Green Belt Movement and Chipko Movement",
      ],
      answer: "Chipko Movement and Appiko Movement",
      marks: 2,
      category: "Environmental Studies",
      explanation:
        "The Chipko Movement began in the 1970s in Uttarakhand, India, where villagers, primarily women, hugged trees to prevent them from being cut down. The Appiko Movement was a southern version of the Chipko Movement that started in Karnataka in 1983 to protect the Western Ghats forests.",
    },
    {
      id: 22,
      type: "long-answer",
      text: "Explain any two of the following: Simon Commission, Dandi March, Quit India Movement, Mahatma Gandhiji's views on Satyagraha",
      answer:
        "Simon Commission (1928): It was appointed by the British government to report on the working of the Indian constitution. It faced widespread protests in India because it had no Indian members. The boycott of the Simon Commission united different political factions in India.\n\nDandi March (1930): Led by Mahatma Gandhi, this was a 24-day march to produce salt from seawater, breaking the British salt monopoly. It was a key event in the Civil Disobedience Movement and inspired widespread participation in the freedom struggle.",
      marks: 4,
      category: "History",
      explanation:
        "These were key events/concepts in India's freedom struggle. The Simon Commission (1928) with no Indian members sparked nationwide protests. The Dandi March (1930) challenged the British salt monopoly. The Quit India Movement (1942) demanded immediate independence. Satyagraha was Gandhi's philosophy of non-violent resistance.",
    },
    {
      id: 23,
      type: "map",
      text: "Show the following areas in the map of India:",
      subQuestions: [
        {
          id: "23i",
          text: "Mumbai High",
          coordinates: { x: 72.3, y: 19.1 },
          tolerance: 50,
        },
        {
          id: "23ii",
          text: "Delhi",
          coordinates: { x: 77.2, y: 28.6 },
          tolerance: 50,
        },
        {
          id: "23iii",
          text: "Raniganj",
          coordinates: { x: 87.1, y: 23.6 },
          tolerance: 50,
        },
        {
          id: "23iv",
          text: "Tuticorin",
          coordinates: { x: 78.1, y: 8.8 },
          tolerance: 50,
        },
      ],
      marks: 4,
      category: "Geography",
      explanation:
        "Mumbai High is an offshore oil field in the Arabian Sea. Delhi is India's capital in the north. Raniganj is a coal mining area in West Bengal. Tuticorin (now Thoothukudi) is a port city in Tamil Nadu.",
      alternateSet: {
        text: "Show the following areas in the map of India:",
        subQuestions: [
          {
            id: "23alt-i",
            text: "Digboi",
            coordinates: { x: 95.6, y: 27.4 },
            tolerance: 50,
          },
          {
            id: "23alt-ii",
            text: "Goa",
            coordinates: { x: 74.1, y: 15.3 },
            tolerance: 50,
          },
          {
            id: "23alt-iii",
            text: "Durg",
            coordinates: { x: 81.3, y: 21.2 },
            tolerance: 50,
          },
          {
            id: "23alt-iv",
            text: "Lakshadweep",
            coordinates: { x: 73.0, y: 10.6 },
            tolerance: 50,
          },
        ],
        explanation:
          "Digboi is India's oldest oil refinery in Assam. Goa is India's smallest state on the western coast. Durg is an industrial city in Chhattisgarh. Lakshadweep is a union territory of islands in the Arabian Sea.",
      },
    },
  ]

  const categories = [...new Set(questions.map((q) => q.category))].filter(Boolean)

  const handleInputChange = (questionId, subQuestionId, value) => {
    setAnswers({
      ...answers,
      [questionId + (subQuestionId ? "-" + subQuestionId : "")]: value,
    })
  }

  const handleMapMarkerPlace = (questionId, subQuestionId, x, y) => {
    setMapMarkers({
      ...mapMarkers,
      [questionId + "-" + subQuestionId]: { x, y },
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

      if (
        q.type === "mcq" ||
        q.type === "fill-in-blanks" ||
        q.type === "true-false" ||
        q.type === "matching" ||
        q.type === "one-sentence"
      ) {
        if (Array.isArray(q.subQuestions) && Array.isArray(q.answers)) {
          q.subQuestions.forEach((sq, index) => {
            if (!sq) return

            const userAnswer = answers[q.id + "-" + sq.id] || ""
            const correctAnswer = q.answers[index]

            if (correctAnswer && userAnswer === correctAnswer) {
              score += q.marks / q.subQuestions.length
              correctAnswers++
            } else if (userAnswer) {
              incorrectAnswers++
            }
          })
        }
      } else if (q.type === "short-answer" && q.options) {
        const userAnswer = answers[q.id] || ""
        if (userAnswer === q.answer) {
          score += q.marks
          correctAnswers++
        } else if (userAnswer) {
          incorrectAnswers++
        }
      } else if (q.type === "map") {
        const currentSet = activeMapSet === "set1" ? q.subQuestions : q.alternateSet.subQuestions

        currentSet.forEach((sq) => {
          const marker = mapMarkers[q.id + "-" + sq.id]
          if (marker) {
            const dx = marker.x - sq.coordinates.x
            const dy = marker.y - sq.coordinates.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance <= sq.tolerance) {
              score += q.marks / currentSet.length
              correctAnswers++
            } else {
              incorrectAnswers++
            }
          }
        })
      }
    })

    return { score, totalMarks, correctAnswers, incorrectAnswers }
  }

  const isAnswerCorrect = (questionId, subQuestionId, answer) => {
    const question = questions.find((q) => q.id === questionId)
    if (!question) return false

    if (question.type === "map") {
      const currentSet = activeMapSet === "set1" ? question.subQuestions : question.alternateSet.subQuestions
      const subQuestion = currentSet.find((sq) => sq.id === subQuestionId)
      if (!subQuestion) return false

      const marker = mapMarkers[questionId + "-" + subQuestionId]
      if (!marker) return false

      const dx = marker.x - subQuestion.coordinates.x
      const dy = marker.y - subQuestion.coordinates.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      return distance <= subQuestion.tolerance
    }

    if (question.type === "short-answer" && question.options) {
      return answer === question.answer
    }

    const subQuestionIndex = question.subQuestions?.findIndex((sq) => sq.id === subQuestionId)
    if (subQuestionIndex === -1 || subQuestionIndex === undefined) return false

    const correctAnswer = question.answers[subQuestionIndex]
    return answer === correctAnswer
  }

  const renderQuestion = (question) => {
    if (!question) return <div>Question not found</div>

    // If in practice mode with mistakes only, skip questions that were answered correctly
    if (
      practiceMode &&
      mistakesOnly &&
      submitted &&
      (question.type === "mcq" ||
        question.type === "fill-in-blanks" ||
        question.type === "true-false" ||
        question.type === "matching" ||
        question.type === "one-sentence")
    ) {
      const allSubQuestionsCorrect = question.subQuestions.every((sq) => {
        const userAnswer = answers[`${question.id}-${sq.id}`]
        return isAnswerCorrect(question.id, sq.id, userAnswer)
      })
      if (allSubQuestionsCorrect) return null
    }

    return (
      <motion.div
        key={question.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="p-4 sm:p-6 bg-white rounded-lg shadow-lg"
      >
        <h3 className="font-semibold mb-4 text-purple-800">{question.text}</h3>

        {/* Render MCQ type questions */}
        {(question.type === "mcq" ||
          question.type === "fill-in-blanks" ||
          question.type === "true-false" ||
          question.type === "matching" ||
          question.type === "one-sentence") &&
          Array.isArray(question.subQuestions) &&
          question.subQuestions.map((sq, index) => {
            const userAnswer = answers[`${question.id}-${sq.id}`]

            return (
              <motion.div
                key={sq.id}
                className="mb-5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="mb-2 text-purple-700 font-medium">
                  {index + 1}. {sq.text}
                </div>
                {sq.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sq.options.map((option, optIndex) => {
                      const isSelected = userAnswer === option
                      const isCorrect = submitted && isAnswerCorrect(question.id, sq.id, option)

                      return (
                        <label
                          key={optIndex}
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
                )}
              </motion.div>
            )
          })}

        {/* Render short answer questions */}
        {question.type === "short-answer" && (
          <div className="mb-4">
            {question.options ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {question.options.map((option, optIndex) => {
                  const isSelected = answers[question.id] === option
                  const isCorrect = submitted && isAnswerCorrect(question.id, null, option)

                  return (
                    <label
                      key={optIndex}
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
                        name={`${question.id}`}
                        value={option}
                        checked={isSelected}
                        onChange={() => handleInputChange(question.id, null, option)}
                        disabled={submitted && !practiceMode}
                        className="mr-2 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm sm:text-base">{option}</span>
                    </label>
                  )
                })}
              </div>
            ) : (
              <div>
                <textarea
                  value={answers[question.id] || ""}
                  onChange={(e) => handleInputChange(question.id, null, e.target.value)}
                  disabled={submitted && !practiceMode}
                  rows={4}
                  className="w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Write your answer here..."
                ></textarea>
              </div>
            )}
          </div>
        )}

        {/* Render long answer questions */}
        {question.type === "long-answer" && (
          <div className="mb-4">
            <textarea
              value={answers[question.id] || ""}
              onChange={(e) => handleInputChange(question.id, null, e.target.value)}
              disabled={submitted && !practiceMode}
              rows={6}
              className="w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Write your answer here..."
            ></textarea>
          </div>
        )}

        {/* Render map questions */}
        {question.type === "map" && (
          <div className="mb-4">
            <div className="flex justify-between mb-4">
              <button
                onClick={() => setActiveMapSet("set1")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
                  ${activeMapSet === "set1" ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-800 hover:bg-purple-200"}`}
              >
                Set 1
              </button>
              <button
                onClick={() => setActiveMapSet("set2")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
                  ${activeMapSet === "set2" ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-800 hover:bg-purple-200"}`}
              >
                Set 2
              </button>
            </div>

            <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-200">
              <h4 className="text-blue-700 font-medium mb-2">Instructions:</h4>
              <p className="text-sm text-blue-600">
                Click on the map to place markers for each location. You can drag markers to adjust their position.
              </p>
            </div>

            <div className="relative border border-gray-300 rounded-lg overflow-hidden" ref={mapRef}>
              <Image
                src="/placeholder.svg?height=500&width=400"
                alt="Map of India"
                width={400}
                height={500}
                className="w-full h-auto"
              />

              {/* Map markers */}
              {(activeMapSet === "set1" ? question.subQuestions : question.alternateSet.subQuestions).map((sq) => {
                const marker = mapMarkers[question.id + "-" + sq.id]
                return marker ? (
                  <div
                    key={sq.id}
                    className="absolute w-6 h-6 -ml-3 -mt-3 bg-red-500 rounded-full flex items-center justify-center cursor-move"
                    style={{
                      left: `${marker.x}px`,
                      top: `${marker.y}px`,
                      opacity: submitted ? (isAnswerCorrect(question.id, sq.id, "marker") ? 1 : 0.5) : 1,
                      backgroundColor: submitted
                        ? isAnswerCorrect(question.id, sq.id, "marker")
                          ? "green"
                          : "red"
                        : "purple",
                    }}
                    draggable={!submitted || practiceMode}
                    onDragEnd={(e) => {
                      if (submitted && !practiceMode) return
                      const rect = mapRef.current.getBoundingClientRect()
                      const x = e.clientX - rect.left
                      const y = e.clientY - rect.top
                      handleMapMarkerPlace(question.id, sq.id, x, y)
                    }}
                  >
                    <MapPin size={16} className="text-white" />
                  </div>
                ) : null
              })}

              {/* Click handler for placing markers */}
              <div
                className="absolute inset-0 cursor-crosshair"
                onClick={(e) => {
                  if (submitted && !practiceMode) return
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = e.clientX - rect.left
                  const y = e.clientY - rect.top

                  // Find the first unanswered question
                  const currentSet =
                    activeMapSet === "set1" ? question.subQuestions : question.alternateSet.subQuestions
                  const unanswered = currentSet.find((sq) => !mapMarkers[question.id + "-" + sq.id])
                  if (unanswered) {
                    handleMapMarkerPlace(question.id, unanswered.id, x, y)
                  }
                }}
              />
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(activeMapSet === "set1" ? question.subQuestions : question.alternateSet.subQuestions).map((sq) => (
                <div key={sq.id} className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full mr-2 ${
                      mapMarkers[question.id + "-" + sq.id]
                        ? submitted
                          ? isAnswerCorrect(question.id, sq.id, "marker")
                            ? "bg-green-500"
                            : "bg-red-500"
                          : "bg-purple-500"
                        : "bg-gray-300"
                    }`}
                  />
                  <span className={`text-sm ${mapMarkers[question.id + "-" + sq.id] ? "font-medium" : ""}`}>
                    {sq.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

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
            <p className="text-sm text-blue-600 whitespace-pre-line">
              {activeMapSet === "set2" && question.type === "map"
                ? question.alternateSet.explanation
                : question.explanation}
            </p>
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
    setShowSettings(false)
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
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  if (showSettings) {
    return (
      <div className="min-h-screen bg-purple-50 flex flex-col justify-center p-4">
        <motion.header
          className="mb-8 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2 text-purple-800">High School Social Science Examination 2025</h1>
          <p className="text-purple-600">Configure your exam settings below</p>
        </motion.header>

        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">Exam Settings</h2>

          <div className="mb-6">
            <label className="block text-purple-700 font-medium mb-2">Exam Duration (minutes):</label>
            <input
              type="number"
              min="1"
              max="180"
              value={examDuration}
              onChange={(e) => setExamDuration(Math.max(1, Number.parseInt(e.target.value) || 180))}
              className="w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
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
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-purple-50">
      <div className="max-w-4xl mx-auto p-2 sm:p-4">
        <motion.header
          className="mb-4 sm:mb-6 text-center p-3 sm:p-6 bg-purple-100 text-white rounded-lg shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl sm:text-2xl font-bold mb-2 text-purple-800 ">
            High School Social Science Examination 2025
          </h1>
          <div className="text-sm sm:text-base text-purple-800">
            Total Questions: {questions.length} | Maximum Marks: {totalMarks}
          </div>
          <div className="text-sm sm:text-base text-purple-800 flex items-center justify-center gap-2">
            <Clock size={16} className="text-purple-800" />
            Time Remaining: {formatTimeRemaining(timeRemaining)}
          </div>
        </motion.header>

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
                key={currentQuestion}
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
                      const hasAnswered =
                        Object.keys(answers).some((key) => key.startsWith(`${index + 1}-`)) ||
                        Object.keys(answers).some((key) => key === `${index + 1}`) ||
                        Object.keys(mapMarkers).some((key) => key.startsWith(`${index + 1}-`))

                      return (
                        <motion.button
                          key={index}
                          onClick={() => setCurrentQuestion(index)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                            ${
                              currentQuestion === index
                                ? "bg-purple-700 text-white"
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
                      <div className="font-medium">{questions.length - (correctAnswers + incorrectAnswers)}</div>
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

                  <motion.button
                    onClick={() => {
                      // Create the download function
                      const downloadPDF = () => {
                        const pdfPath = "/papers/social-science/2025_social_science.pdf"

                        // Create an anchor element
                        const link = document.createElement("a")
                        link.href = pdfPath
                        link.setAttribute("download", "original-paper.pdf")
                        link.setAttribute("target", "_blank")

                        // Append to the document body
                        document.body.appendChild(link)

                        // Trigger the download
                        link.click()

                        // Clean up by removing the link
                        setTimeout(() => {
                          document.body.removeChild(link)
                        }, 100)
                      }

                      // Call the download function
                      downloadPDF()
                    }}
                    className="px-6 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Download Original Paper
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

