"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Timer } from "lucide-react"

export default function EnglishExam() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [essayAnswers, setEssayAnswers] = useState({})
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
  const timerRef = useRef(null)

  const questions = [
    {
      id: 1,
      type: "reading",
      text: "Read the passage carefully and answer the questions given below:",
      passage: `Gandhiji travelled a lot. He always travelled third class in trains. He did so because all poor people in India travelled third. In those days there were three classes in trains.
      
Once, Gandhiji got off at Bombay (Mumbai) from a third class railway compartment. Lots of people had come to meet him. Among them were some American men and women. They went into Gandhiji's compartment. They saw that it was very small.

"Why doesn't he travel first?" asked one of the ladies.

"I don't know. Let's go and ask him," replied one of the gentlemen.

"Mr. Gandhi, we've come to ask you a question." The gentleman said to Gandhiji, "you're the leader of the Indian people, but you travel third. Please tell us why you travel third?

Gandhiji laughed and said, "The answer is very simple. I travel third because there is no fourth." He laughed again and the American ladies and gentlemen laughed with him.`,
      subQuestions: [
        {
          id: "1i",
          text: "In which class did Gandhiji travel in?",
          options: ["First class", "Third class", "Second class", "All of these (a, b, c)"],
        },
        {
          id: "1ii",
          text: "Who came to meet Gandhiji at Mumbai Railway Station?",
          options: ["One person", "Few people", "Some people", "Lots of people"],
        },
        {
          id: "1iii",
          text: "Which country's men and women went into Gandhiji's compartment?",
          options: ["India", "England", "Australia", "America"],
        },
        {
          id: "1iv",
          text: "Give the opposite word of poor.",
          options: ["honest", "rich", "small", "holy"],
        },
        {
          id: "1v",
          text: "Give the synonym of word 'simple'.",
          options: ["Smart", "difficult", "poor", "easy"],
        },
      ],
      answers: ["Third class", "Lots of people", "America", "rich", "easy"],
      marks: 5,
      category: "Reading Comprehension",
      explanation:
        "The passage clearly states that Gandhiji traveled in third class. Lots of people came to meet him at Mumbai station, including American men and women. The opposite of 'poor' is 'rich', and 'simple' means 'easy' or 'uncomplicated'.",
    },
    {
      id: 2,
      type: "reading",
      text: "Read the passage carefully and answer the questions given below:",
      passage: `In 1866, Alfred Nobel, a Swedish chemist, introduced a form of nitroglycerine that could be handled safely. He called it dynamite. In 1875, he went on to invent gelignite. These explosives were used in engineering application, but they also had an obvious military application. As a committed pacifist, Nobel hoped that his explosives would provide such a deterrent to war that they would bring peace to mankind. His inventions did not bring peace, but they did bring him a massive fortune, which he used in his will to endow the Nobel Prizes awarded to those who have conferred the greatest benefit to mankind in five categories. He left £ 32,00,000 in his will to finance prizes in physics, chemistry, physiology or medicine, literature and peace. The Bank of Sweden inaugurated a new Nobel Prize for Economics in 1969. In 1903, Marie Curie became the first woman to win the Nobel Prize, sharing it with her husband.`,
      subQuestions: [
        {
          id: "2i",
          text: "Who was Alfred Nobel?",
          options: ["Indian Chemist", "African Chemist", "Swedish Chemist", "English Chemist"],
        },
        {
          id: "2ii",
          text: "What did Alfred Nobel introduce?",
          options: ["medicine", "form of nitroglycerine", "chemistry", "gelignite"],
        },
        {
          id: "2iii",
          text: "When did the Bank of Sweden introduce a new Nobel Prize in Economics?",
          options: ["1866", "1875", "1903", "1969"],
        },
        {
          id: "2iv",
          text: "Why did Alfred leave £ 32,00,000 in his will?",
          options: [
            "to finance prize in physics",
            "to finance prize in chemistry",
            "to finance prize in literature and peace",
            "All of the above",
          ],
        },
        {
          id: "2v",
          text: "Who was the first woman to win the Nobel Prize?",
          options: ["Marie Curie", "Mother Teresa", "Kalpana Chawla", "Indira Gandhi"],
        },
      ],
      answers: ["Swedish Chemist", "form of nitroglycerine", "1969", "All of the above", "Marie Curie"],
      marks: 5,
      category: "Reading Comprehension",
      explanation:
        "Alfred Nobel was a Swedish chemist who introduced a form of nitroglycerine called dynamite. The Bank of Sweden introduced the Economics prize in 1969. He left money to finance prizes in multiple categories, and Marie Curie was the first woman to win the Nobel Prize in 1903.",
    },
    {
      id: 3,
      type: "writing",
      text: "Write a letter to your friend to invite him to attend your birthday party.",
      marks: 4,
      category: "Letter Writing",
      explanation:
        "A good letter should include a proper salutation, introduction, body with details about the birthday party (date, time, venue), and a closing. The tone should be friendly and informal as it's to a friend.",
      minWords: 100,
      maxWords: 150,
    },
    {
      id: 4,
      type: "writing",
      text: "You are Manthan/Mahi studying in Govt. H.S. School Bajrang Nagar, Indore. Write an application to your principal requesting him to issue you your School Leaving Certificate (S.L.C).",
      marks: 4,
      category: "Application Writing",
      explanation:
        "A formal application should include your details (name, class, roll number), proper salutation, a clear request stating the purpose, necessary details, and a formal closing with date and signature.",
      minWords: 100,
      maxWords: 150,
    },
    {
      id: 5,
      type: "note-making",
      text: "Read the passage carefully and answer the questions given below it.",
      passage: `Students who are very fond of reading books are often labelled by their companions as bookworms. Their criticism generally comes from students who consider themselves better in sports. Students who shine in athletics or in games consider that it is better to spend time and energy in a sports arena than in a classroom or at the reading desk. All the same they do envy their fellows who shine academically. Academic honour has a glamour which is unique. It is not to be denied that playing games is useful activity, because it creates team spirit and also makes the sportsmen healthy and vigorous. That is why games and sports are given so much importance in the curriculum of schools and colleges. But studies should not be neglected and should be given due importance along with other activities connected with education. Let each type of activity have its own place in our daily routine. Then only will we have students both academically sound and physically fit. We want our educational system to generate this synergy among our youth.`,
      subQuestions: [
        {
          id: "5i",
          text: "On the basis of your reading of the above passage, make notes on it.",
          marks: 3,
        },
        {
          id: "5ii",
          text: "Give a suitable title to it.",
          marks: 1,
        },
      ],
      category: "Note Making",
      explanation:
        "Good notes should capture the main points of the passage in a concise format using abbreviations, symbols, and indentation. A suitable title might be 'Balance between Academics and Sports' or 'Holistic Education'.",
      minWords: 50,
      maxWords: 100,
    },
    {
      id: 6,
      type: "paragraph",
      text: "Look at the visual input given below and produce a small paragraph in about 75 words.",
      image: "/placeholder.svg?height=200&width=300",
      imageAlt: "A school building with children playing in the playground",
      marks: 4,
      category: "Paragraph Writing",
      explanation:
        "A good paragraph should describe the image accurately, be coherent, and stay within the word limit. It should have a clear topic sentence and supporting details.",
      minWords: 70,
      maxWords: 80,
    },
    {
      id: 7,
      type: "essay",
      text: "Write an essay in about 150 words on any one of the following topics:",
      options: ["Importance of Games and Sports", "Any Festival", "Save tree", "Science in daily life", "My hobby"],
      marks: 5,
      category: "Essay Writing",
      explanation:
        "A good essay should have a clear introduction, body, and conclusion. It should be well-structured, coherent, and stay within the word limit.",
      minWords: 140,
      maxWords: 160,
    },
    {
      id: 8,
      type: "grammar",
      text: "Do as directed:",
      subQuestions: [
        {
          id: "8i",
          text: "Kshitij plays cricket. (Change into past indefinite tense)",
          options: [
            "Kshitij played cricket.",
            "Kshitij was playing cricket.",
            "Kshitij has played cricket.",
            "Kshitij had played cricket.",
          ],
        },
        {
          id: "8ii",
          text: "Ram killed Ravan. (Change the voice)",
          options: [
            "Ravan killed Ram.",
            "Ravan was killed by Ram.",
            "Ravan has been killed by Ram.",
            "Ravan is killed by Ram.",
          ],
        },
        {
          id: "8iii",
          text: "have/they/a/new/car/bought (Rearrange the words to make a meaningful sentence)",
          options: [
            "They have bought a new car.",
            "Have they bought a new car?",
            "A new car they have bought.",
            "Bought they have a new car.",
          ],
        },
        {
          id: "8iv",
          text: "Talk properly. I shall beat you. (Combine the sentences using 'otherwise')",
          options: [
            "Talk properly otherwise I shall beat you.",
            "I shall beat you otherwise talk properly.",
            "Otherwise talk properly I shall beat you.",
            "Talk properly I shall beat you otherwise.",
          ],
        },
        {
          id: "8v",
          text: "To find error in others is easy. (Rewrite the sentence beginning with 'It')",
          options: [
            "It is easy to find error in others.",
            "It is to find error in others easy.",
            "It to find error in others is easy.",
            "It easy is to find error in others.",
          ],
        },
        {
          id: "8vi",
          text: "Shiba cooked food. (Change into negative sentence)",
          options: [
            "Shiba did not cook food.",
            "Shiba does not cook food.",
            "Shiba has not cooked food.",
            "Shiba is not cooking food.",
          ],
        },
        {
          id: "8vii",
          text: "The box is very heavy. I can not lift it. (Combine the sentences using 'so...that')",
          options: [
            "The box is so heavy that I can not lift it.",
            "The box is very heavy so that I can not lift it.",
            "So heavy is the box that I can not lift it.",
            "The box is heavy so I can not lift it.",
          ],
        },
      ],
      answers: [
        "Kshitij played cricket.",
        "Ravan was killed by Ram.",
        "They have bought a new car.",
        "Talk properly otherwise I shall beat you.",
        "It is easy to find error in others.",
        "Shiba did not cook food.",
        "The box is so heavy that I can not lift it.",
      ],
      marks: 5,
      category: "Grammar",
      explanation:
        "These questions test various grammar concepts including tense changes, active-passive voice, sentence rearrangement, and sentence combining using conjunctions.",
    },
    {
      id: 9,
      type: "fill-in-blanks",
      text: "Fill in the blanks:",
      subQuestions: [
        {
          id: "9i",
          text: "My uncle is _____ M. L. A.",
          options: ["a", "an", "the"],
        },
        {
          id: "9ii",
          text: "You _____ sit here.",
          options: ["dare", "may", "should"],
        },
        {
          id: "9iii",
          text: "_____ dog seldom bite.",
          options: ["Barking", "Barks", "Bark"],
        },
        {
          id: "9iv",
          text: "_____ there is life, there is hope.",
          options: ["If", "Unless", "As long as"],
        },
        {
          id: "9v",
          text: "Hema has been dancing _____ morning.",
          options: ["for", "since", "from"],
        },
        {
          id: "9vi",
          text: "The servant didn't make _____ tea.",
          options: ["many", "much", "a little"],
        },
        {
          id: "9vii",
          text: "Mohan is sitting _____ Ram and Shyam.",
          options: ["between", "among", "against"],
        },
      ],
      answers: ["an", "may", "Barking", "As long as", "since", "much", "between"],
      marks: 5,
      category: "Grammar",
      explanation:
        "These questions test knowledge of articles, modal verbs, subject-verb agreement, conjunctions, prepositions, and quantifiers.",
    },
    {
      id: 10,
      type: "literature",
      text: "Read the extract carefully and answer the questions:",
      passage: `Early in the New Year of 1956 I travelled to southern Iraq. By then it had crossed my mind that I should like to keep an otter instead of a dog, and that Camusfearna, ringed by water a stone's throw from its door, would be an eminently suitable spot for this experiment.

When I casually mentioned this to a friend, he as casually replied that I had better get one in the Tigris marshes, for there they were as common as mosquitoes, and were often tamed by the Arabs. We were going to Basra to the Consulate-General to collect and answer our mail from Europe. At the Consulate-General we found that my friend's mail had arrived but that mine had not.`,
      subQuestions: [
        {
          id: "10i",
          text: "When did the author travel?",
          options: ["1947", "1956", "1971", "1999"],
        },
        {
          id: "10ii",
          text: "The author travelled to",
          options: ["U.S.A.", "Iraq", "Australia", "Japan"],
        },
        {
          id: "10iii",
          text: "The author wanted to keep an otter instead of a",
          options: ["dog", "cat", "monkey", "cow"],
        },
      ],
      answers: ["1956", "Iraq", "dog"],
      marks: 3,
      category: "Literature",
      explanation:
        "The passage clearly states that the author traveled to southern Iraq in 1956 and wanted to keep an otter instead of a dog.",
    },
    {
      id: 11,
      type: "literature",
      text: "Read the extract below carefully and answer the questions:",
      passage: `Belinda tickled him, she tickled him unmerciful.
Ink, Blink and Mustard, they rudely called him Percival,
They all sat laughing in the little red wagon
At the realio, trulio cowardly dragon.`,
      subQuestions: [
        {
          id: "11i",
          text: "Who is the poet of the above extract?",
          options: ["Robert Frost", "Ogden Nash", "Carl Sandburg", "Robin Klein"],
        },
        {
          id: "11ii",
          text: "Whom did Belinda tickle?",
          options: ["Ink", "Blink", "Mustard", "Custard"],
        },
        {
          id: "11iii",
          text: "They all sat _____ in the little red wagon.",
          options: ["playing", "laughing", "talking", "studying"],
        },
      ],
      answers: ["Ogden Nash", "Custard", "laughing"],
      marks: 3,
      category: "Literature",
      explanation:
        "This extract is from 'The Tale of Custard the Dragon' by Ogden Nash. Belinda tickled Custard (the dragon), and they all sat laughing in the little red wagon.",
    },
    {
      id: 12,
      type: "mcq",
      text: "Choose the correct answer:",
      subQuestions: [
        {
          id: "12i",
          text: "Who was Lencho?",
          options: ["Peasant", "Postman", "Postmaster", "Doctor"],
        },
        {
          id: "12ii",
          text: "Monthly accounts of the baker were recorded on",
          options: ["a note book", "the main door of the house", "Some wall in pencil", "the floor"],
        },
        {
          id: "12iii",
          text: "10 May in South Africa is",
          options: ["Summer day", "Autumn day", "Winter day", "Rainy day"],
        },
        {
          id: "12iv",
          text: "The main crop of Coorg is",
          options: ["tea", "coffee", "banana", "wheat"],
        },
      ],
      answers: ["Peasant", "the main door of the house", "Autumn day", "coffee"],
      marks: 4,
      category: "Literature",
      explanation:
        "Lencho was a peasant in the story 'A Letter to God'. The baker's accounts were recorded on the main door. May 10 is autumn in South Africa (southern hemisphere). Coffee is the main crop of Coorg.",
    },
    {
      id: 13,
      type: "short-answer",
      text: "Answer the questions in about 30 words:",
      subQuestions: [
        {
          id: "13i",
          text: "What did Lencho hope for?",
        },
        {
          id: "13ii",
          text: "Where did the ceremonies take place? Can you name any public building in India that are made of sandstone?",
        },
        {
          id: "13iii",
          text: "What made the woman in the control centre look at the narrator strangely?",
        },
        {
          id: "13iv",
          text: "Anne says teachers are most unpredictable? Is Mr. Keesing unpredictable? How?",
        },
        {
          id: "13v",
          text: "What does a 'jackfruit-like' appearance mean?",
        },
        {
          id: "13vi",
          text: "Why does Valli stand up on the seat? What does she see now?",
        },
        {
          id: "13vii",
          text: "What did the Buddha do after he had attained enlightenment?",
        },
        {
          id: "13viii",
          text: "What compelled the young seagull to take his first flight?",
        },
      ],
      marks: 12,
      category: "Literature",
      explanation:
        "These questions require brief answers based on the literature texts studied. Good answers should be concise, to the point, and within the word limit.",
      minWords: 25,
      maxWords: 35,
    },
    {
      id: 14,
      type: "short-answer",
      text: "Answer the following questions in about 30 words:",
      subQuestions: [
        {
          id: "14i",
          text: "What does 'Fire and Ice' stand for in the poem?",
        },
        {
          id: "14ii",
          text: "How does the poet suggest that you identify the lion and tiger? When can you do so, according to him?",
        },
      ],
      marks: 4,
      category: "Poetry",
      explanation:
        "These questions require brief answers based on the poetry texts studied. Good answers should be concise, to the point, and within the word limit.",
      minWords: 25,
      maxWords: 35,
    },
    {
      id: 15,
      type: "short-answer",
      text: "Answer the following questions in about 30 words:",
      subQuestions: [
        {
          id: "15i",
          text: "Why does Mrs. Pumphrey think the dog's recovery is a triumph of surgery?",
        },
        {
          id: "15ii",
          text: "Who was Fowler? Why did he want to meet Ausable?",
        },
        {
          id: "15iii",
          text: "Is Amanda an orphan? Why does she say so?",
        },
      ],
      marks: 4,
      category: "Literature",
      explanation:
        "These questions require brief answers based on the literature texts studied. Good answers should be concise, to the point, and within the word limit.",
      minWords: 25,
      maxWords: 35,
    },
    {
      id: 16,
      type: "long-answer",
      text: "Answer the questions in about 75 words:",
      subQuestions: [
        {
          id: "16i",
          text: "How did Mandela's hunger for freedom change his life?",
        },
        {
          id: "16ii",
          text: "Why does Lomove think he should get married?",
        },
      ],
      marks: 3,
      category: "Literature",
      explanation:
        "These questions require detailed answers based on the literature texts studied. Good answers should be well-structured, coherent, and within the word limit.",
      minWords: 70,
      maxWords: 80,
    },
    {
      id: 17,
      type: "long-answer",
      text: "Answer the questions in about 75 words:",
      subQuestions: [
        {
          id: "17i",
          text: "Write the central idea of the poem 'How to tell wild animal?'",
        },
        {
          id: "17ii",
          text: "What does the young boy say to Anne Gregory?",
        },
      ],
      marks: 3,
      category: "Poetry",
      explanation:
        "These questions require detailed answers based on the poetry texts studied. Good answers should be well-structured, coherent, and within the word limit.",
      minWords: 70,
      maxWords: 80,
    },
    {
      id: 18,
      type: "long-answer",
      text: "Answer the following questions in about 75 words:",
      subQuestions: [
        {
          id: "18i",
          text: "What was the cause of Matilda's ruin? How could she have avoided it?",
        },
        {
          id: "18ii",
          text: "Why does the marriage not take place?",
        },
        {
          id: "18iii",
          text: "Why was the invisible man wandering the street?",
        },
      ],
      marks: 3,
      category: "Literature",
      explanation:
        "These questions require detailed answers based on the literature texts studied. Good answers should be well-structured, coherent, and within the word limit.",
      minWords: 70,
      maxWords: 80,
    },
  ]

  const categories = [...new Set(questions.map((q) => q.category))].filter(Boolean)

  const handleInputChange = (questionId, subQuestionId, value) => {
    setAnswers({
      ...answers,
      [questionId + (subQuestionId ? "-" + subQuestionId : "")]: value,
    })
  }

  const handleEssayChange = (questionId, subQuestionId, value) => {
    setEssayAnswers({
      ...essayAnswers,
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

      if (
        q.type === "mcq" ||
        q.type === "reading" ||
        q.type === "grammar" ||
        q.type === "fill-in-blanks" ||
        q.type === "literature"
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
      }
      // For essay, writing, and other subjective questions, we can't automatically score
      // In a real application, these would be manually graded
    })

    return { score, totalMarks, correctAnswers, incorrectAnswers }
  }

  const isAnswerCorrect = (questionId, subQuestionId, answer) => {
    const question = questions.find((q) => q.id === questionId)
    if (!question) return false

    const subQuestionIndex = question.subQuestions.findIndex((sq) => sq.id === subQuestionId)
    if (subQuestionIndex === -1) return false

    const correctAnswer = question.answers[subQuestionIndex]
    return answer === correctAnswer
  }

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length
  }

  const renderQuestion = (question) => {
    if (!question) return <div>Question not found</div>

    // If in practice mode with mistakes only, skip questions that were answered correctly
    if (
      practiceMode &&
      mistakesOnly &&
      submitted &&
      (question.type === "mcq" ||
        question.type === "reading" ||
        question.type === "grammar" ||
        question.type === "fill-in-blanks" ||
        question.type === "literature")
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

        {/* Render passage for reading comprehension */}
        {(question.type === "reading" || question.type === "literature" || question.type === "note-making") &&
          question.passage && (
            <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-100 whitespace-pre-line">
              {question.passage}
            </div>
          )}

        {/* Render image for paragraph writing */}
        {question.type === "paragraph" && question.image && (
          <div className="mb-6 flex justify-center">
            <img
              src={question.image || "/placeholder.svg"}
              alt={question.imageAlt}
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        )}

        {/* Render MCQ type questions */}
        {(question.type === "mcq" ||
          question.type === "reading" ||
          question.type === "grammar" ||
          question.type === "fill-in-blanks" ||
          question.type === "literature") &&
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
                          ${submitted
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

        {/* Render essay type questions */}
        {(question.type === "essay" || question.type === "writing" || question.type === "paragraph") && (
          <div className="mb-4">
            {question.options && (
              <div className="mb-4">
                <label className="block text-purple-700 font-medium mb-2">Select a topic:</label>
                <select
                  value={answers[question.id] || ""}
                  onChange={(e) => handleInputChange(question.id, null, e.target.value)}
                  disabled={submitted && !practiceMode}
                  className="w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select a topic</option>
                  {question.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label className="block text-purple-700 font-medium mb-2">
                Your answer:{" "}
                {question.minWords && question.maxWords && `(${question.minWords}-${question.maxWords} words)`}
              </label>
              <textarea
                value={essayAnswers[question.id] || ""}
                onChange={(e) => handleEssayChange(question.id, null, e.target.value)}
                disabled={submitted && !practiceMode}
                rows={8}
                className="w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Write your answer here..."
              ></textarea>
              {question.minWords && question.maxWords && (
                <div className="mt-2 text-sm">
                  <span
                    className={`font-medium ${countWords(essayAnswers[question.id] || "") < question.minWords
                      ? "text-red-500"
                      : countWords(essayAnswers[question.id] || "") > question.maxWords
                        ? "text-red-500"
                        : "text-green-500"
                      }`}
                  >
                    Word count: {countWords(essayAnswers[question.id] || "")}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Render note-making questions */}
        {question.type === "note-making" &&
          question.subQuestions &&
          question.subQuestions.map((sq, index) => (
            <div key={index} className="mb-4">
              <label className="block text-purple-700 font-medium mb-2">
                {sq.text} {sq.marks && `[${sq.marks} marks]`}
              </label>
              <textarea
                value={essayAnswers[`${question.id}-${sq.id}`] || ""}
                onChange={(e) => handleEssayChange(question.id, sq.id, e.target.value)}
                disabled={submitted && !practiceMode}
                rows={6}
                className="w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Write your answer here..."
              ></textarea>
            </div>
          ))}

        {/* Render short answer questions */}
        {(question.type === "short-answer" || question.type === "long-answer") &&
          question.subQuestions &&
          question.subQuestions.map((sq, index) => (
            <div key={index} className="mb-6">
              <label className="block text-purple-700 font-medium mb-2">
                {index + 1}. {sq.text}
              </label>
              <textarea
                value={essayAnswers[`${question.id}-${sq.id}`] || ""}
                onChange={(e) => handleEssayChange(question.id, sq.id, e.target.value)}
                disabled={submitted && !practiceMode}
                rows={question.type === "short-answer" ? 3 : 5}
                className="w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Write your answer here..."
              ></textarea>
              {sq.minWords && sq.maxWords && (
                <div className="mt-1 text-sm">
                  <span
                    className={`font-medium ${countWords(essayAnswers[`${question.id}-${sq.id}`] || "") < (sq.minWords || question.minWords)
                      ? "text-red-500"
                      : countWords(essayAnswers[`${question.id}-${sq.id}`] || "") > (sq.maxWords || question.maxWords)
                        ? "text-red-500"
                        : "text-green-500"
                      }`}
                  >
                    Word count: {countWords(essayAnswers[`${question.id}-${sq.id}`] || "")}
                  </span>
                </div>
              )}
            </div>
          ))}

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
          <h1 className="text-3xl font-bold mb-2 text-purple-800">High School English Examination 2025</h1>
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
          <h1 className="text-xl sm:text-2xl font-bold mb-2 text-purple-800 ">High School English Examination 2025</h1>
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
                        Object.keys(essayAnswers).some((key) => key.startsWith(`${index + 1}`))

                      const isCorrect =
                        hasAnswered &&
                        submitted &&
                        questions[index].type !== "essay" &&
                        questions[index].type !== "writing" &&
                        questions[index].type !== "paragraph" &&
                        questions[index].type !== "short-answer" &&
                        questions[index].type !== "long-answer" &&
                        questions[index].type !== "note-making" &&
                        questions[index].subQuestions &&
                        questions[index].subQuestions.every((sq) => {
                          const userAnswer = answers[`${index + 1}-${sq.id}`]
                          return isAnswerCorrect(index + 1, sq.id, userAnswer)
                        })

                      return (
                        <motion.button
                          key={index}
                          onClick={() => setCurrentQuestion(index)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                            ${currentQuestion === index
                              ? "bg-purple-700 text-white"
                              : submitted
                                ? isCorrect
                                  ? "bg-green-100 text-green-800 border border-green-500"
                                  : hasAnswered
                                    ? "bg-blue-100 text-blue-800 border border-blue-500"
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
                      <div>Subjective Questions:</div>
                      <div className="font-medium text-blue-600">
                        {
                          questions.filter(
                            (q) =>
                              q.type === "essay" ||
                              q.type === "writing" ||
                              q.type === "paragraph" ||
                              q.type === "short-answer" ||
                              q.type === "long-answer" ||
                              q.type === "note-making",
                          ).length
                        }
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

                  <motion.button
                    onClick={() => {
                      // Create the download function
                      const downloadPDF = () => {
                        const pdfPath = "/10_2025_english.pdf"

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

