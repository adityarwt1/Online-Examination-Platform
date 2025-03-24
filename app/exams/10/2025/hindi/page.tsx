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
    const [questionLanguage, setQuestionLanguage] = useState("english")
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

    // English questions
    const questions = [
        {
            id: 1,
            type: "fill-in-blanks",
            text: "रिक्त स्थानों की पूति कीजिये:",
            subQuestions: [
                {
                    id: "1i",
                    text: "परशुराम ने _______ वध किया था",
                    options: ["महिसासुर", "राम", "रावण", "सहस्रबाहु"],
                },
                {
                    id: "1ii",
                    text: "कामायनी एक ________ है|",
                    options: ["महाकाव्य", "मुक्तक काव्य", "खंडकाव्य", "पद्य"],
                },
                {
                    id: "1iii",
                    text: "रस के ________ भेद होते है|",
                    options: ["11", "15", "5", "10"],
                },
                {
                    id: "1iv",
                    text: "बालगोविन की अवस्था ________ थी|",
                    options: ["साठ से ऊपर", "पैसठ से ऊपर", "सत्तर से ऊपर", "पचहत्तर से ऊपर"],
                },
                {
                    id: "1v",
                    text: `"जिविविषा" शब्द का अर्थ _________ है|`,
                    options: ["जीने के लिए", "जाने की इच्छा", "जीने की इच्छा", "जीने का विषय"],
                },
                {
                    id: "1vi",
                    text: "मै क्यों लिखता हु पथ के लेखक ___________ है|",
                    options: ["यतीन्द्र मिश्र", "मन्नू भंडारी", "अज्ञेय", "यशपाल"],
                },
            ],
            answers: ["सहस्रबाहु", "महाकाव्य",
                "10",
                "साठ से ऊपर",
                "जीने की इच्छा",
                 "अज्ञेय"],
            marks: 6,
            category: "General Knowledge",
            explanation:
                "1. परुशुराम ने सहस्रबाहु को कामधेनु गे चुराने के जुर्म में मारा था| 2. कामायनी एक महाकाव्य है, जो की जयशंकर प्रसाद द्वारा लिखी गई थी| 3. कहानी के अनुसार बालगोविन भगत की आयु साथ से ऊपर थी| 4. रस के 9 भेद होते है लेकिन बोर्ड एग्जाम में 10 थे तो आप्शन देना पड़ता है| 5. जिजिविषा का अर्थ जय जीने की इच्छा| 6. मै क्यों लिखता हु को अज्ञेय ने लिखा था अपनी रूचियो के दम पे या पैसो के लिए|",
        },
        {
            id: 2,
            type: "true-false",
            text: "सत्य / असत्य लिखिए:",
            subQuestions: [
                {
                    id: "2i",
                    text: "कमल तालाब को छोड़कर आकाश में खिल रहे है |",
                    options: ["सत्य", "असत्य"],
                },
                {
                    id: "2ii",
                    text: "छुपाई छंद सम अर्द्ध मात्रिक छंद है | ",
                    options: ["सत्य", "असत्य"],
                },
                {
                    id: "2iii",
                    text: "शीला अग्रवाल मन्नू भंडारी की माँ थी|",
                    options: ["सत्य", "असत्य"],
                },
                {
                    id: "2iv",
                    text: "बिस्मिल्लग खां को शहनाई वादन के लिए भारत रत्न मिला था|",
                    options: ["सत्य", "असत्य"],
                },
                {
                    id: "2v",
                    text: "जिस भाव से किसी कम को करने या होने का बोध होता है उसे क्रिया कहते है|",
                    options: ["सत्य", "असत्य"],
                },
                {
                    id: "2vi",
                    text: "सभ्यता संस्कृत का परिणाम है|",
                    options: ["सत्य", "असत्य"],
                },
            ],
            answers: ["असत्य", "असत्य", "असत्य", "सत्य", "सत्य", "सत्य"],
            marks: 6,
            category: "General Knowledge",
            explanation:
                `1. यह वाक्य एक कल्पना है, क्योंकि कमल आमतौर पर तालाबों या अन्य जलस्रोतों में खिलते हैं, आकाश में नहीं. नहीं, 2. "छुपाई" छंद, जिसे चौपाई भी कहते हैं, एक सम मात्रिक छंद है, न कि अर्ध-सम मात्रिक. 3.  नहीं, शीला अग्रवाल, मन्नू भंडारी की हिन्दी अध्यापिका थीं, ना कि उनकी माँ। मन्नू भंडारी की माँ का नाम अनूपकुंवरि था .4. उस्ताद बिस्मिल्ला खाँ को भारत रत्न, भारत का सर्वोच्च नागरिक सम्मान, 2001 में प्राप्त हुआ था 5. यह कथन पूर्ण रूप से सत्य है. 6. हां, सभ्यता संस्कृति का परिणाम है. सभ्यता और संस्कृति, दोनों ही समाज की अभिव्यक्ति के ज़रिए लोगों को परिभाषित करते हैं.`,
        },
        {
            id: 3,
            type: "matching",
            text: "सही जोड़ी मिलाइए:",
            subQuestions: [
                {
                    id: "3i",
                    text: "संगतकार",
                    options: [
                        "मंगलेश डबराल",
                        "यतीन्द्रमिश्र",
                        "यशपाल",
                        "मन्नू भंडारी",
                    ],
                },
                {
                    id: "3ii",
                    text: "छंद के प्रकार",
                    options: [
                        "3",
                        "2",
                        "4",
                        "6",
                    ],
                },
                {
                    id: "3iii",
                    text: "बिस्मिल्लाह खा",
                    options: [
                        "मुरली वादक",
                        "ढोल वादक",
                        "शहनाई वादक",
                        "खेजड़ी वादक",
                    ],
                },
                {
                    id: "3iv",
                    text: "गले का हर होना",
                    options: [
                        "साथ साथ चलना",
                        "अच्छा दिखाना",
                        "दिखावा करना",
                        "बहुत प्यारा",
                    ],
                },
                {
                    id: "3v",
                    text: "बालम खीरा",
                    options: [
                        "दिल्ली",
                        "लखनऊ",
                        "मुंबई",
                        "भोपाल"
                    ],
                },
                {
                    id: "3vi",
                    text: "संधि में प्रकार",
                    options: ["1", "2", "3", "4"],
                },
            ],
            answers: [
                "मंगलेश डबराल",
                "2",
                "शहनाई वादक",
                "बहुत प्यारा",
                "लखनऊ",
                "3",
            ],
            marks: 6,
            category: "General Knowledge",
            explanation:
                "1. संगतकार मंगलेश डबराल द्वारा लिखी गई है, इस कविता में उन्होंने ने संगतकार के महत्व को बताया है. 2. छंद के दो मुख्य प्रकार वर्णिक छंद और मात्रिक छंद हैं. 3. बिस्मिल्लाह खा शहनाई के वादक थे.4. गले का हर होने का अर्थ है बहुत यारा होना जिस प्रकार हर को प्यार से पहनते है उसी प्रकार उसे भी मन जाता है. 5. बालम खीला लखनऊ का प्रसिध्ध खीरा है. 6. संधि के 3 प्रकार होते है स्वर संधि, यंजन संधि और विसर्गः संधि.",
        },
        {
            id: 4,
            type: "one-sentence",
            text: "एक शब्द या वाक्य में उत्तर दीजिये:",
            subQuestions: [
                {
                    id: "4i",
                    text: "किसकी अभा अट नहीं रही है|",
                    options: ["वैशाख","फाल्गुन", "वसंत", "माघ" ],
                },
                {
                    id: "4ii",
                    text: "प्रबंध काव्य के कितने भेद होते है|",
                    options: ["2", "3", "4", "1"],
                },
                {
                    id: "4iii",
                    text: "नेताजी सुभाष चन्द्र बोष की प्रतिमा कहा लगवाई गई थी |",
                    options: ["Manufacturing", "नगर के बीच में", "चौराहे पर", "तिराहे पर",],
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

    // Hindi translations
    const questionTranslations = [
        {
            id: 1,
            type: "fill-in-blanks",
            text: "रिक्त स्थानों की पूर्ति कीजिए:",
            subQuestions: [
                {
                    id: "1i",
                    text: "MGNREGA-2005 के अनुसार _______ दिनों के रोजगार की गारंटी प्रदान की गई है।",
                    options: ["60", "90", "100", "120"],
                    answerMapping: {
                        "60": "60",
                        "90": "90",
                        "100": "100",
                        "120": "120",
                    },
                },
                {
                    id: "1ii",
                    text: "मध्य प्रदेश का एक राष्ट्रीय उद्यान _______ है।",
                    options: ["कान्हा", "रणथंभौर", "जिम कॉर्बेट", "गिर"],
                    answerMapping: {
                        कान्हा: "Kanha",
                        रणथंभौर: "Ranthambore",
                        "जिम कॉर्बेट": "Jim Corbett",
                        गिर: "Gir",
                    },
                },
                {
                    id: "1iii",
                    text: "कृषि _______ क्षेत्र की गतिविधि है।",
                    options: ["प्राथमिक", "द्वितीयक", "तृतीयक", "चतुर्थक"],
                    answerMapping: {
                        प्राथमिक: "primary",
                        द्वितीयक: "secondary",
                        तृतीयक: "tertiary",
                        चतुर्थक: "quaternary",
                    },
                },
                {
                    id: "1iv",
                    text: "श्रीलंका _______ (वर्ष) में एक स्वतंत्र देश के रूप में उभरा।",
                    options: ["1947", "1948", "1950", "1952"],
                    answerMapping: {
                        "1947": "1947",
                        "1948": "1948",
                        "1950": "1950",
                        "1952": "1952",
                    },
                },
                {
                    id: "1v",
                    text: "_______ सरकार में दो या अधिक स्तर (सरकार के स्तर) होते हैं।",
                    options: ["संघीय", "एकात्मक", "राष्ट्रपति", "संसदीय"],
                    answerMapping: {
                        संघीय: "federal",
                        एकात्मक: "unitary",
                        राष्ट्रपति: "presidential",
                        संसदीय: "parliamentary",
                    },
                },
                {
                    id: "1vi",
                    text: "अफ्रीका में 1890 के दशक में रिंडरपेस्ट _______ था।",
                    options: ["एक पशु रोग", "एक फसल रोग", "एक मानव रोग", "एक जल संकट"],
                    answerMapping: {
                        "एक पशु रोग": "a cattle disease",
                        "एक फसल रोग": "a crop disease",
                        "एक मानव रोग": "a human disease",
                        "एक जल संकट": "a water crisis",
                    },
                },
            ],
            answers: ["100", "कान्हा", "प्राथमिक", "1948", "संघीय", "एक पशु रोग"],
            marks: 6,
            category: "सामान्य ज्ञान",
            explanation:
                "MGNREGA 100 दिनों के रोजगार की गारंटी देता है। कान्हा मध्य प्रदेश का एक राष्ट्रीय उद्यान है। कृषि प्राथमिक क्षेत्र की गतिविधि है। श्रीलंका 1948 में स्वतंत्र हुआ। संघीय सरकारों में कई स्तर होते हैं। रिंडरपेस्ट एक पशु रोग था जिसने 1890 के दशक में अफ्रीका को प्रभावित किया था।",
        },
        {
            id: 2,
            type: "true-false",
            text: "सत्य / असत्य लिखिए:",
            subQuestions: [
                {
                    id: "2i",
                    text: "अनवीकरणीय संसाधन वे हैं जो कुछ वर्षों के उपयोग के बाद समाप्त हो जाएंगे।",
                    options: ["सत्य", "असत्य"],
                    answerMapping: {
                        सत्य: "True",
                        असत्य: "False",
                    },
                },
                {
                    id: "2ii",
                    text: "भारत में अब संविधान की आठवीं अनुसूची में 22 भाषाएँ शामिल हैं।",
                    options: ["सत्य", "असत्य"],
                    answerMapping: {
                        सत्य: "True",
                        असत्य: "False",
                    },
                },
                {
                    id: "2iii",
                    text: "भारत अब संघीय प्रणाली नहीं है।",
                    options: ["सत्य", "असत्य"],
                    answerMapping: {
                        सत्य: "True",
                        असत्य: "False",
                    },
                },
                {
                    id: "2iv",
                    text: "हल्दिया बंदरगाह कोलकाता का एक सहायक बंदरगाह है।",
                    options: ["सत्य", "असत्य"],
                    answerMapping: {
                        सत्य: "True",
                        असत्य: "False",
                    },
                },
                {
                    id: "2v",
                    text: "प्राथमिक, द्वितीयक और तृतीयक क्षेत्रों की गतिविधियाँ स्वतंत्र हैं।",
                    options: ["सत्य", "असत्य"],
                    answerMapping: {
                        सत्य: "True",
                        असत्य: "False",
                    },
                },
                {
                    id: "2vi",
                    text: "आधुनिक मुद्रा के रूपों में मुद्रा - कागजी नोट और सिक्के शामिल हैं।",
                    options: ["सत्य", "असत्य"],
                    answerMapping: {
                        सत्य: "True",
                        असत्य: "False",
                    },
                },
            ],
            answers: ["सत्य", "सत्य", "असत्य", "सत्य", "असत्य", "सत्य"],
            marks: 6,
            category: "सामान्य ज्ञान",
            explanation:
                "अनवीकरणीय संसाधन वास्तव में समाप्त हो जाते हैं। आठवीं अनुसूची में 22 भाषाएँ हैं। भारत अभी भी एक संघीय प्रणाली है। हल्दिया कोलकाता का एक सहायक बंदरगाह है। आर्थिक क्षेत्र परस्पर निर्भर हैं। आधुनिक मुद्रा में कागजी नोट और सिक्के शामिल हैं।",
        },
        {
            id: 3,
            type: "matching",
            text: "सही जोड़े मिलाएँ:",
            subQuestions: [
                {
                    id: "3i",
                    text: "भारतीय रिज़र्व बैंक",
                    options: ["औपचारिक ऋण का स्रोत", "सार्वजनिक और निजी क्षेत्र", "चुनाव और सरकारी व्यवस्था", "सामाजिक मुद्दे और समाचार"],
                    answerMapping: {
                        "औपचारिक ऋण का स्रोत": "Formal source of credit",
                        "सार्वजनिक और निजी क्षेत्र": "Public and Private sectors",
                        "चुनाव और सरकारी व्यवस्था": "Elections and government system",
                        "सामाजिक मुद्दे और समाचार": "Social issues and News",
                    },
                },
                {
                    id: "3ii",
                    text: "स्वामित्व के संदर्भ में क्षेत्र",
                    options: ["औपचारिक ऋण का स्रोत", "सार्वजनिक और निजी क्षेत्र", "चुनाव और सरकारी व्यवस्था", "सामाजिक मुद्दे और समाचार"],
                    answerMapping: {
                        "औपचारिक ऋण का स्रोत": "Formal source of credit",
                        "सार्वजनिक और निजी क्षेत्र": "Public and Private sectors",
                        "चुनाव और सरकारी व्यवस्था": "Elections and government system",
                        "सामाजिक मुद्दे और समाचार": "Social issues and News",
                    },
                },
                {
                    id: "3iii",
                    text: "राजनीतिक दलों के कार्य",
                    options: ["औपचारिक ऋण का स्रोत", "सार्वजनिक और निजी क्षेत्र", "चुनाव और सरकारी व्यवस्था", "सामाजिक मुद्दे और समाचार"],
                    answerMapping: {
                        "औपचारिक ऋण का स्रोत": "Formal source of credit",
                        "सार्वजनिक और निजी क्षेत्र": "Public and Private sectors",
                        "चुनाव और सरकारी व्यवस्था": "Elections and government system",
                        "सामाजिक मुद्दे और समाचार": "Social issues and News",
                    },
                },
                {
                    id: "3iv",
                    text: "प्रिंट मीडिया",
                    options: ["औपचारिक ऋण का स्रोत", "सार्वजनिक और निजी क्षेत्र", "चुनाव और सरकारी व्यवस्था", "सामाजिक मुद्दे और समाचार"],
                    answerMapping: {
                        "औपचारिक ऋण का स्रोत": "Formal source of credit",
                        "सार्वजनिक और निजी क्षेत्र": "Public and Private sectors",
                        "चुनाव और सरकारी व्यवस्था": "Elections and government system",
                        "सामाजिक मुद्दे और समाचार": "Social issues and News",
                    },
                },
                {
                    id: "3v",
                    text: "चूना पत्थर",
                    options: ["सीमेंट", "कोयला", "लोहा", "पेट्रोलियम"],
                    answerMapping: {
                        सीमेंट: "Cement",
                        कोयला: "Coal",
                        लोहा: "Iron",
                        पेट्रोलियम: "Petroleum",
                    },
                },
                {
                    id: "3vi",
                    text: "साइमन कमीशन",
                    options: ["1926 ई.", "1927 ई.", "1928 ई.", "1929 ई."],
                    answerMapping: {
                        "1926 ई.": "1926 A.D.",
                        "1927 ई.": "1927 A.D.",
                        "1928 ई.": "1928 A.D.",
                        "1929 ई.": "1929 A.D.",
                    },
                },
            ],
            answers: [
                "औपचारिक ऋण का स्रोत",
                "सार्वजनिक और निजी क्षेत्र",
                "चुनाव और सरकारी व्यवस्था",
                "सामाजिक मुद्दे और समाचार",
                "सीमेंट",
                "1928 ई.",
            ],
            marks: 6,
            category: "सामान्य ज्ञान",
            explanation:
                "RBI औपचारिक ऋण का स्रोत है। स्वामित्व क्षेत्र सार्वजनिक और निजी हैं। राजनीतिक दल चुनाव और सरकार पर काम करते हैं। प्रिंट मीडिया सामाजिक मुद्दों और समाचारों को कवर करता है। चूना पत्थर सीमेंट के लिए उपयोग किया जाता है। साइमन कमीशन 1928 में गठित किया गया था।",
        },
        {
            id: 4,
            type: "one-sentence",
            text: "एक वाक्य में उत्तर दीजिए:",
            subQuestions: [
                {
                    id: "4i",
                    text: "भारत की पहली कपास मिल किस स्थान पर स्थापित की गई थी?",
                    options: ["मुंबई", "अहमदाबाद", "सूरत", "कोलकाता"],
                    answerMapping: {
                        मुंबई: "Mumbai",
                        अहमदाबाद: "Ahmedabad",
                        सूरत: "Surat",
                        कोलकाता: "Kolkata",
                    },
                },
                {
                    id: "4ii",
                    text: "प्रथम विश्व युद्ध किस वर्ष में हुआ था?",
                    options: ["1914-1918", "1915-1919", "1939-1945", "1940-1944"],
                    answerMapping: {
                        "1914-1918": "1914-1918",
                        "1915-1919": "1915-1919",
                        "1939-1945": "1939-1945",
                        "1940-1944": "1940-1944",
                    },
                },
                {
                    id: "4iii",
                    text: "द्वितीयक क्षेत्र की एक गतिविधि का नाम लिखिए।",
                    options: ["विनिर्माण", "कृषि", "बैंकिंग", "परिवहन"],
                    answerMapping: {
                        विनिर्माण: "Manufacturing",
                        कृषि: "Agriculture",
                        बैंकिंग: "Banking",
                        परिवहन: "Transport",
                    },
                },
                {
                    id: "4iv",
                    text: "अतीत में देशों को जोड़ने वाला मुख्य माध्यम (चैनल) क्या था?",
                    options: ["व्यापार मार्ग", "डाक सेवा", "टेलीग्राफ", "रेडियो"],
                    answerMapping: {
                        "व्यापार मार्ग": "Trade routes",
                        "डाक सेवा": "Postal service",
                        टेलीग्राफ: "Telegraph",
                        रेडियो: "Radio",
                    },
                },
                {
                    id: "4v",
                    text: "एक देश के भीतर सरकार विरोधी समूहों के बीच हिंसक संघर्ष जो इतना तीव्र हो जाता है कि युद्ध जैसा दिखता है, उसे क्या कहते हैं?",
                    options: ["गृह युद्ध", "तख्तापलट", "क्रांति", "विद्रोह"],
                    answerMapping: {
                        "गृह युद्ध": "Civil war",
                        तख्तापलट: "Coup",
                        क्रांति: "Revolution",
                        विद्रोह: "Insurgency",
                    },
                },
                {
                    id: "4vi",
                    text: "परिवहन का सबसे सुविधाजनक साधन कौन सा है?",
                    options: ["हवाई मार्ग", "रेल मार्ग", "सड़क मार्ग", "जल मार्ग"],
                    answerMapping: {
                        "हवाई मार्ग": "Airways",
                        "रेल मार्ग": "Railways",
                        "सड़क मार्ग": "Roadways",
                        "जल मार्ग": "Waterways",
                    },
                },
            ],
            answers: ["मुंबई", "1914-1918", "विनिर्माण", "व्यापार मार्ग", "गृह युद्ध", "हवाई मार्ग"],
            marks: 6,
            category: "इतिहास और भूगोल",
            explanation:
                "भारत की पहली कपास मिल मुंबई में थी। प्रथम विश्व युद्ध 1914-1918 तक चला। विनिर्माण द्वितीयक क्षेत्र की गतिविधि है। व्यापार मार्ग अतीत में देशों को जोड़ते थे। गृह युद्ध एक तीव्र आंतरिक संघर्ष है। हवाई मार्ग आमतौर पर सबसे सुविधाजनक परिवहन माना जाता है।",
        },
        {
            id: 5,
            type: "mcq",
            text: "सही विकल्प चुनें और लिखें:",
            subQuestions: [
                {
                    id: "5i",
                    text: "ब्राजील के रियो-डी-जनेरियो में पृथ्वी शिखर सम्मेलन किस वर्ष आयोजित किया गया था?",
                    options: ["जून, 1992", "जुलाई, 1991", "जून, 1929", "जुलाई, 1992"],
                    answerMapping: {
                        "जून, 1992": "June, 1992",
                        "जुलाई, 1991": "July, 1991",
                        "जून, 1929": "June, 1929",
                        "जुलाई, 1992": "July, 1992",
                    },
                },
                {
                    id: "5ii",
                    text: "छोटा नागपुर क्षेत्र के मुंडा और संथाल जनजातियाँ किन पेड़ों की पूजा करती हैं?",
                    options: ["पलाश और कदंब", "गूलर और अर्जुन", "महुआ और कदंब", "महुआ और नीम"],
                    answerMapping: {
                        "पलाश और कदंब": "Palash and Kadamba",
                        "गूलर और अर्जुन": "Gular and Arjun",
                        "महुआ और कदंब": "Mahua and Kadamba",
                        "महुआ और नीम": "Mahua and Neem",
                    },
                },
                {
                    id: "5iii",
                    text: "भारत की सबसे बड़ी जल संसाधन परियोजना जो चार राज्यों - महाराष्ट्र, मध्य प्रदेश, गुजरात और राजस्थान को कवर करती है:",
                    options: ["सरदार सरोवर बांध", "कोयना बांध", "हीराकुंड बांध", "गांधी सागर बांध"],
                    answerMapping: {
                        "सरदार सरोवर बांध": "Sardar Sarovar Dam",
                        "कोयना बांध": "Koyna Dam",
                        "हीराकुंड बांध": "Hirakud Dam",
                        "गांधी सागर बांध": "Gandhi Sagar Dam",
                    },
                },
                {
                    id: "5iv",
                    text: "भारत की मुख्य खाद्य फसल है:",
                    options: ["चाय", "जूट", "धान", "रबर"],
                    answerMapping: {
                        चाय: "Tea",
                        जूट: "Jute",
                        धान: "Paddy",
                        रबर: "Rubber",
                    },
                },
                {
                    id: "5v",
                    text: "महात्मा गांधी की प्रसिद्ध पुस्तक है:",
                    options: ["गोदान", "हिंद स्वराज", "गीतांजलि", "इंडिया - ए डिस्कवरी"],
                    answerMapping: {
                        गोदान: "Godan",
                        "हिंद स्वराज": "Hind Swaraj",
                        गीतांजलि: "Gitanjali",
                        "इंडिया - ए डिस्कवरी": "India - a Discovery",
                    },
                },
                {
                    id: "5vi",
                    text: "H.D.I. का अर्थ है:",
                    options: ["मानव विकास", "मानव वृद्धि सूचकांक", "मानव आय", "मानव विकास सूचकांक"],
                    answerMapping: {
                        "मानव विकास": "Human Development",
                        "मानव वृद्धि सूचकांक": "Human Growth Index",
                        "मानव आय": "Human Income",
                        "मानव विकास सूचकांक": "Human Development Index",
                    },
                },
            ],
            answers: ["जून, 1992", "महुआ और कदंब", "सरदार सरोवर बांध", "धान", "हिंद स्वराज", "मानव विकास सूचकांक"],
            marks: 6,
            category: "सामान्य ज्ञान",
            explanation:
                "पृथ्वी शिखर सम्मेलन जून 1992 में आयोजित किया गया था। मुंडा और संथाल महुआ और कदंब पेड़ों की पूजा करते हैं। सरदार सरोवर 4 राज्यों को कवर करने वाली सबसे बड़ी जल परियोजना है। धान (चावल) भारत की मुख्य खाद्य फसल है। हिंद स्वराज गांधी द्वारा लिखी गई थी। HDI का अर्थ मानव विकास सूचकांक है।",
        },
        {
            id: 6,
            type: "short-answer",
            text: "जुसेपे मैज़िनी कौन था?",
            options: [
                "एक इतालवी क्रांतिकारी जिन्होंने यंग इटली आंदोलन की स्थापना की",
                "प्रबोधन काल का एक फ्रांसीसी दार्शनिक",
                "प्रथम विश्व युद्ध के दौरान एक जर्मन सैन्य जनरल",
                "एक रूसी कम्युनिस्ट नेता",
            ],
            answer: "एक इतालवी क्रांतिकारी जिन्होंने यंग इटली आंदोलन की स्थापना की",
            marks: 2,
            category: "इतिहास",
            explanation:
                "जुसेपे मैज़िनी (1805-1872) एक इतालवी क्रांतिकारी थे जिन्होंने यंग इटली आंदोलन की स्थापना की। वह इतालवी एकीकरण आंदोलन के एक प्रमुख व्यक्ति थे और एक एकीकृत गणतांत्रिक इटली की वकालत करते थे।",
        },
        {
            id: 7,
            type: "short-answer",
            text: "यूटोपियन क्या है?",
            options: [
                "एक आदर्शवादी लेकिन अव्यावहारिक सामाजिक या राजनीतिक योजना",
                "ज्यामिति में एक गणितीय अवधारणा",
                "एक प्राचीन यूनानी दर्शन",
                "एक प्रकार की आर्थिक प्रणाली",
            ],
            answer: "एक आदर्शवादी लेकिन अव्यावहारिक सामाजिक या राजनीतिक योजना",
            marks: 2,
            category: "राजनीति विज्ञान",
            explanation:
                "यूटोपियन एक आदर्श समाज की आदर्शवादी लेकिन अक्सर अव्यावहारिक दृष्टि को संदर्भित करता है। यह शब्द सर थॉमस मोर की पुस्तक 'यूटोपिया' (1516) से आया है, जिसमें एक काल्पनिक द्वीप का वर्णन किया गया था जिसमें एक आदर्श सामाजिक और राजनीतिक व्यवस्था थी।",
        },
        {
            id: 8,
            type: "short-answer",
            text: "बहिष्कार से आप क्या समझते हैं?",
            options: [
                "एक प्रकार का विरोध जहां लोग कुछ खरीदने, उपयोग करने या भाग लेने से इनकार करते हैं",
                "एक प्रकार की संसदीय प्रक्रिया",
                "एक सैन्य रणनीति",
                "निर्यात बढ़ाने के लिए एक आर्थिक नीति",
            ],
            answer: "एक प्रकार का विरोध जहां लोग कुछ खरीदने, उपयोग करने या भाग लेने से इनकार करते हैं",
            marks: 2,
            category: "राजनीति विज्ञान",
            explanation:
                "बहिष्कार एक प्रकार का विरोध है जहां लोग असहमति व्यक्त करने या कुछ शर्तों की स्वीकृति को मजबूर करने के तरीके के रूप में कुछ खरीदने, उपयोग करने या भाग लेने से इनकार करते हैं। यह भारत के स्वतंत्रता आंदोलन के दौरान एक प्रमुख रणनीति थी।",
        },
        {
            id: 9,
            type: "short-answer",
            text: "जलियांवाला बाग हत्याकांड के बारे में दो बिंदु लिखिए।",
            answer:
                "जलियांवाला बाग हत्याकांड 13 अप्रैल, 1919 को अमृतसर, पंजाब में हुआ था। जनरल डायर ने एक शांतिपूर्ण सभा पर गोली चलाने का आदेश दिया, जिसमें सैकड़ों निहत्थे भारतीयों की मौत हो गई। यह भारत के स्वतंत्रता संग्राम में एक मोड़ था और स्वतंत्रता आंदोलन के लिए समर्थन बढ़ाने में मदद की।",
            marks: 2,
            category: "इतिहास",
            explanation:
                "जलियांवाला बाग हत्याकांड भारत के स्वतंत्रता संग्राम में एक महत्वपूर्ण घटना थी जहां ब्रिटिश सैनिकों ने जनरल डायर के नेतृत्व में एक बंद बगीचे में इकट्ठे हुए निहत्थे नागरिकों पर गोली चलाई, जिसमें सैकड़ों लोग मारे गए और कई घायल हुए।",
        },
        {
            id: 10,
            type: "short-answer",
            text: "रेशम मार्गों के बारे में दो बिंदु लिखिए।",
            answer:
                "रेशम मार्ग व्यापार मार्गों का एक नेटवर्क था जो पूर्व और पश्चिम को जोड़ता था, मुख्य रूप से चीन से भूमध्य सागर तक। इनका उपयोग रेशम, मसालों, कपड़ों और अन्य वस्तुओं के व्यापार के लिए किया जाता था, और इसने विभिन्न सभ्यताओं के बीच सांस्कृतिक आदान-प्रदान को भी सुविधाजनक बनाया।",
            marks: 2,
            category: "इतिहास",
            explanation:
                "रेशम मार्ग प्राचीन व्यापार नेटवर्क थे जो पूर्वी एशिया को दक्षिण एशिया, फारस, अरब प्रायद्वीप, पूर्वी अफ्रीका और दक्षिणी यूरोप से जोड़ते थे। वे कई सभ्यताओं के विकास में महत्वपूर्ण थे और सांस्कृतिक आदान-प्रदान को सुविधाजनक बनाते थे।",
        },
        {
            id: 11,
            type: "short-answer",
            text: "स्पिनिंग जेनी की दो विशेषताएँ लिखिए।",
            options: [
                "यह एक साथ कई धागों को कात सकती थी, जिससे उत्पादकता बढ़ जाती थी",
                "यह जल-संचालित थी, जिससे मैनुअल श्रम कम होता था",
                "इसे संचालित करने के लिए इसने भाप शक्ति का उपयोग किया",
                "यह पोर्टेबल थी और घरों में इस्तेमाल की जा सकती थी",
            ],
            answer: "यह एक साथ कई धागों को कात सकती थी, जिससे उत्पादकता बढ़ जाती थी",
            marks: 2,
            category: "इतिहास",
            explanation:
                "स्पिनिंग जेनी, जिसे 1764 में जेम्स हारग्रीव्स ने आविष्कार किया था, एक मल्टी-स्पिंडल स्पिनिंग फ्रेम था जो एक साथ कई धागों को कात सकता था, जिससे उत्पादकता काफी बढ़ गई। यह बाद के औद्योगिक मशीनों के विपरीत अपेक्षाकृत छोटा था और घरों में इस्तेमाल किया जा सकता था।",
        },
        {
            id: 12,
            type: "short-answer",
            text: "टैरिफ का अर्थ क्या है?",
            options: [
                "आयातित या निर्यातित वस्तुओं पर लगाया गया कर",
                "एक प्रकार की सरकारी सब्सिडी",
                "प्रत्यक्ष कराधान का एक रूप",
                "एक मूल्य नियंत्रण तंत्र",
            ],
            answer: "आयातित या निर्यातित वस्तुओं पर लगाया गया कर",
            marks: 2,
            category: "अर्थशास्त्र",
            explanation:
                "टैरिफ एक कर है जो सरकार द्वारा अन्य देशों से आयातित वस्तुओं और सेवाओं पर लगाया जाता है। टैरिफ का उपयोग व्यापार को प्रतिबंधित करने के लिए किया जाता है, क्योंकि वे आयातित वस्तुओं और सेवाओं की कीमत बढ़ाते हैं, जिससे वे उपभोक्ताओं के लिए अधिक महंगे हो जाते हैं।",
        },
        {
            id: 13,
            type: "short-answer",
            text: "ब्रिटेन में कॉर्न लॉ के रद्द होने पर क्या हुआ?",
            answer:
                "जब 1846 में कॉर्न लॉ को निरस्त किया गया, तो ब्रिटेन में खाद्य कीमतें गिर गईं क्योंकि सस्ते आयात उपलब्ध हो गए। इससे औद्योगिक श्रमिकों को लाभ हुआ लेकिन कृषि हितों को नुकसान हुआ। इसने मुक्त व्यापार नीतियों की ओर ब्रिटेन के बदलाव को चिह्नित किया और औद्योगीकरण को तेज किया।",
            marks: 2,
            category: "इतिहास",
            explanation:
                "1846 में कॉर्न लॉ के निरसन ने मुक्त व्यापार की ओर ब्रिटेन के कदम को चिह्नित किया। इससे सस्ते खाद्य आयात हुए, जिससे शहरी श्रमिकों को लाभ हुआ लेकिन कृषि हितों को नुकसान हुआ। यह भूमि के अभिजात वर्ग पर औद्योगिक हितों की बढ़ती शक्ति का प्रतीक था।",
        },
        {
            id: 14,
            type: "short-answer",
            text: "प्रिंटिंग या प्रिंट मीडिया के महत्व के दो बिंदु लिखिए।",
            answer:
                "प्रिंट मीडिया सूचना और विचारों के बड़े पैमाने पर प्रसार की अनुमति देता है। यह घटनाओं और ज्ञान का एक स्थायी रिकॉर्ड बनाता है, जिससे संरक्षण और व्यापक पहुंच सक्षम होती है। इसने विचारों को फैलाकर और जनमत को गतिशील करके सामाजिक और राजनीतिक आंदोलनों में महत्वपूर्ण भूमिका निभाई।",
            marks: 2,
            category: "इतिहास",
            explanation:
                "प्रिंट मीडिया ने लिखित सामग्री के बड़े पैमाने पर उत्पादन और वितरण को सक्षम करके संचार में क्रांति ला दी। इसने ज्ञान का लोकतंत्रीकरण किया, नए विचारों के प्रसार का समर्थन किया, और पूरे इतिहास में सामाजिक और राजनीतिक आंदोलनों में महत्वपूर्ण भूमिका निभाई।",
        },
        {
            id: 15,
            type: "short-answer",
            text: "'महिलाओं पर प्रिंट' के प्रभावों की व्याख्या करें।",
            answer:
                "प्रिंट मीडिया ने महिलाओं के अधिकारों और मुद्दों के बारे में जागरूकता फैलाने में मदद की। इसने महिला लेखकों और कार्यकर्ताओं को अपने विचार व्यक्त करने के लिए एक मंच प्रदान किया। महिलाओं की पत्रिकाओं और साहित्य ने लिंग भूमिकाओं के बारे में धारणाओं को बदलने में योगदान दिया और महिलाओं की शिक्षा और सार्वजनिक जीवन में भागीदारी को प्रोत्साहित किया।",
            marks: 2,
            category: "इतिहास",
            explanation:
                "प्रिंट मीडिया ने शिक्षा और सूचना तक पहुंच प्रदान करके, महिलाओं की आवाज़ों के लिए मंच बनाकर, और महिला आंदोलनों का समर्थन करके महिलाओं के जीवन पर महत्वपूर्ण प्रभाव डाला। महिलाओं की पत्रिकाओं और साहित्य ने पारंपरिक लिंग भूमिकाओं को चुनौती देने में मदद की।",
        },
        {
            id: 16,
            type: "short-answer",
            text: "नारीवादी आंदोलन क्या है?",
            options: [
                "महिलाओं के अधिकारों और लिंग समानता की वकालत करने वाला एक सामाजिक आंदोलन",
                "महिला लेखकों पर केंद्रित एक साहित्यिक आंदोलन",
                "कार्यबल में महिलाओं के बारे में एक आर्थिक सिद्धांत",
                "महिलाओं के हितों का प्रतिनिधित्व करने वाली एक राजनीतिक पार्टी",
            ],
            answer: "महिलाओं के अधिकारों और लिंग समानता की वकालत करने वाला एक सामाजिक आंदोलन",
            marks: 2,
            category: "राजनीति विज्ञान",
            explanation:
                "नारीवादी आंदोलन सामाजिक आंदोलनों और विचारधाराओं की एक श्रृंखला है जिसका उद्देश्य लिंगों की राजनीतिक, आर्थिक, व्यक्तिगत और सामाजिक समानता को परिभाषित और स्थापित करना है। यह लिंग असमानता के विभिन्न पहलुओं को संबोधित करते हुए कई 'लहरों' से गुजरा है।",
        },
        {
            id: 17,
            type: "short-answer",
            text: "समाज में भारतीय आदर्श महिला की दो विशेषताएँ लिखिए।",
            answer:
                "पारंपरिक रूप से, आदर्श भारतीय महिला से परिवार के प्रति समर्पित, आत्म-बलिदानी और पोषण करने वाली होने की अपेक्षा की जाती थी। उससे सांस्कृतिक परंपराओं, धार्मिक मूल्यों को बनाए रखने और परिवार के सम्मान को बनाए रखने की भी अपेक्षा की जाती थी। ये आदर्श बदलते सामाजिक मानदंडों और महिला आंदोलनों के साथ समय के साथ विकसित हुए हैं।",
            marks: 2,
            category: "समाजशास्त्र",
            explanation:
                "पारंपरिक भारतीय समाज अक्सर उन महिलाओं को आदर्श मानता था जो परिवार के प्रति समर्पण, आत्म-बलिदान, शालीनता और सांस्कृतिक परंपराओं के संरक्षण जैसे गुणों को प्रदर्शित करती थीं। समाज के विकसित होने के साथ इन आदर्शों की प्रशंसा और चुनौती दोनों दी गई हैं।",
        },
        {
            id: 18,
            type: "short-answer",
            text: "लोकतंत्र का महत्व लिखिए।",
            answer:
                "लोकतंत्र चुनावों के माध्यम से शासन में लोगों की भागीदारी सुनिश्चित करता है। यह नागरिकों के मौलिक अधिकारों और स्वतंत्रता की रक्षा करता है। यह उनकी पृष्ठभूमि की परवाह किए बिना सभी नागरिकों के लिए समानता और गरिमा को बढ़ावा देता है। यह शक्ति के शांतिपूर्ण हस्तांतरण की अनुमति देता है और संघर्षों को हल करने के लिए तंत्र प्रदान करता है।",
            marks: 2,
            category: "राजनीति विज्ञान",
            explanation:
                "लोकतंत्र महत्वपूर्ण है क्योंकि यह शासन में नागरिक भागीदारी सुनिश्चित करता है, मौलिक अधिकारों की रक्षा करता है, समानता को बढ़ावा देता है, शांतिपूर्ण शक्ति परिवर्तन की अनुमति देता है, और जवाबदेही और संघर्ष समाधान के लिए तंत्र प्रदान करता है।",
        },
        {
            id: 19,
            type: "short-answer",
            text: "ऋणदाता उधार देते समय संपार्श्विक (सुरक्षा) क्यों मांगते हैं?",
            options: [
                "उधारकर्ता के भुगतान में चूक करने की स्थिति में ऋण को सुरक्षित करने के लिए",
                "ऋण पर ब्याज दर बढ़ाने के लिए",
                "सरकारी नियमों का पालन करने के लिए",
                "उधारकर्ता के साथ दीर्घकालिक संबंध स्थापित करने के लिए",
            ],
            answer: "उधारकर्ता के भुगतान में चूक करने की स्थिति में ऋण को सुरक्षित करने के लिए",
            marks: 2,
            category: "अर्थशास्त्र",
            explanation:
                "ऋणदाता अपने जोखिम को कम करने के लिए संपार्श्विक मांगते हैं। यदि कोई उधारकर्ता ऋण चुकाने में विफल रहता है, तो ऋणदाता अपने पैसे की वसूली के लिए संपार्श्विक बेच सकता है। संपार्श्विक उधारकर्ताओं के लिए समय पर ऋण चुकाने के लिए एक प्रोत्साहन के रूप में भी काम करता है।",
        },
        {
            id: 20,
            type: "short-answer",
            text: "बाजार में लोगों का शोषण किन-किन तरीकों से हो सकता है?",
            answer:
                "लोगों का शोषण अनुचित मूल्य निर्धारण, भ्रामक विज्ञापनों, मिलावटी या घटिया सामान की बिक्री, झूठे वजन और माप के उपयोग, और उत्पादों के बारे में उचित जानकारी की कमी के माध्यम से किया जा सकता है। शोषण अनुचित अनुबंध शर्तों, छिपे हुए शुल्कों और एकाधिकार प्रथाओं के माध्यम से भी होता है जो उपभोक्ता विकल्पों को सीमित करते हैं।",
            marks: 2,
            category: "अर्थशास्त्र",
            explanation:
                "बाजार शोषण विभिन्न रूपों में होता है जिसमें अनुचित मूल्य निर्धारण, भ्रामक विज्ञापन, उत्पादों की मिलावट, झूठे वजन और माप, छिपे हुए शुल्क, और एकाधिकार प्रथाएं शामिल हैं जो उपभोक्ताओं को नुकसान पहुंचाती हैं।",
        },
        {
            id: 21,
            type: "short-answer",
            text: "वन संरक्षण के लिए दो आंदोलनों के नाम बताइए।",
            options: [
                "चिपको आंदोलन और अप्पिको आंदोलन",
                "नर्मदा बचाओ आंदोलन और चिपको आंदोलन",
                "साइलेंट वैली आंदोलन और सेव अमेज़न आंदोलन",
                "ग्रीन बेल्ट आंदोलन और चिपको आंदोलन",
            ],
            answer: "चिपको आंदोलन और अप्पिको आंदोलन",
            marks: 2,
            category: "पर्यावरण अध्ययन",
            explanation:
                "चिपको आंदोलन 1970 के दशक में उत्तराखंड, भारत में शुरू हुआ, जहां ग्रामीणों, मुख्य रूप से महिलाओं ने पेड़ों को काटे जाने से रोकने के लिए उन्हें गले लगाया। अप्पिको आंदोलन चिपको आंदोलन का एक दक्षिणी संस्करण था जो 1983 में कर्नाटक में पश्चिमी घाट के जंगलों की रक्षा के लिए शुरू हुआ था।",
        },
        {
            id: 22,
            type: "long-answer",
            text: "निम्नलिखित में से किन्हीं दो की व्याख्या करें: साइमन कमीशन, दांडी मार्च, भारत छोड़ो आंदोलन, सत्याग्रह पर महात्मा गांधीजी के विचार",
            answer:
                "साइमन कमीशन (1928): इसे ब्रिटिश सरकार द्वारा भारतीय संविधान के कामकाज पर रिपोर्ट करने के लिए नियुक्त किया गया था। इसका भारत में व्यापक विरोध हुआ क्योंकि इसमें कोई भारतीय सदस्य नहीं था। साइमन कमीशन के बहिष्कार ने भारत में विभिन्न राजनीतिक गुटों को एकजुट किया।\n\nदांडी मार्च (1930): महात्मा गांधी के नेतृत्व में, यह समुद्री जल से नमक बनाने के लिए एक 24-दिवसीय मार्च था, जिससे ब्रिटिश नमक एकाधिकार टूट गया। यह सविनय अवज्ञा आंदोलन की एक प्रमुख घटना थी और स्वतंत्रता संग्राम में व्यापक भागीदारी को प्रेरित किया।",
            marks: 4,
            category: "इतिहास",
            explanation:
                "ये भारत के स्वतंत्रता संग्राम में प्रमुख घटनाएँ/अवधारणाएँ थीं। बिना किसी भारतीय सदस्य के साइमन कमीशन (1928) ने देशव्यापी विरोध प्रदर्शन किए। दांडी मार्च (1930) ने ब्रिटिश नमक एकाधिकार को चुनौती दी। भारत छोड़ो आंदोलन (1942) ने तत्काल स्वतंत्रता की मांग की। सत्याग्रह गांधी का अहिंसक प्रतिरोध का दर्शन था।",
        },
        {
            id: 23,
            type: "map",
            text: "भारत के मानचित्र पर निम्नलिखित क्षेत्रों को दिखाएँ:",
            subQuestions: [
                {
                    id: "23i",
                    text: "मुंबई हाई",
                    coordinates: { x: 72.3, y: 19.1 },
                    tolerance: 50,
                },
                {
                    id: "23ii",
                    text: "दिल्ली",
                    coordinates: { x: 77.2, y: 28.6 },
                    tolerance: 50,
                },
                {
                    id: "23iii",
                    text: "रानीगंज",
                    coordinates: { x: 87.1, y: 23.6 },
                    tolerance: 50,
                },
                {
                    id: "23iv",
                    text: "तूतीकोरिन",
                    coordinates: { x: 78.1, y: 8.8 },
                    tolerance: 50,
                },
            ],
            marks: 4,
            category: "भूगोल",
            explanation:
                "मुंबई हाई अरब सागर में एक अपतटीय तेल क्षेत्र है। दिल्ली उत्तर में भारत की राजधानी है। रानीगंज पश्चिम बंगाल में एक कोयला खनन क्षेत्र है। तूतीकोरिन (अब थूथुकुडी) तमिलनाडु में एक बंदरगाह शहर है।",
            alternateSet: {
                text: "भारत के मानचित्र पर निम्नलिखित क्षेत्रों को दिखाएँ:",
                subQuestions: [
                    {
                        id: "23alt-i",
                        text: "डिगबोई",
                        coordinates: { x: 95.6, y: 27.4 },
                        tolerance: 50,
                    },
                    {
                        id: "23alt-ii",
                        text: "गोवा",
                        coordinates: { x: 74.1, y: 15.3 },
                        tolerance: 50,
                    },
                    {
                        id: "23alt-iii",
                        text: "दुर्ग",
                        coordinates: { x: 81.3, y: 21.2 },
                        tolerance: 50,
                    },
                    {
                        id: "23alt-iv",
                        text: "लक्षद्वीप",
                        coordinates: { x: 73.0, y: 10.6 },
                        tolerance: 50,
                    },
                ],
                explanation:
                    "डिगबोई असम में भारत का सबसे पुराना तेल रिफाइनरी है। गोवा पश्चिमी तट पर भारत का सबसे छोटा राज्य है। दुर्ग छत्तीसगढ़ में एक औद्योगिक शहर है। लक्षद्वीप अरब सागर में द्वीपों का एक केंद्र शासित प्रदेश है।",
            },
        },
    ]

    const categories = [...new Set(questions.map((q) => q.category))].filter(Boolean)
    const hindiCategories = [...new Set(questionTranslations.map((q) => q.category))].filter(Boolean)

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
            } else if (q.type === "short-answer" && q.options) {
                const userAnswer = answers[q.id] || ""

                // Get the correct answer based on the language
                let correctAnswer
                if (questionLanguage === "english") {
                    correctAnswer = q.answer
                } else {
                    // For Hindi, we need to get the corresponding translation
                    const translatedQuestion = questionTranslations.find((tq) => tq.id === q.id)
                    if (translatedQuestion) {
                        correctAnswer = translatedQuestion.answer
                    }
                }

                if (correctAnswer && userAnswer === correctAnswer) {
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
            // Get the correct answer based on the language
            let correctAnswer
            if (questionLanguage === "english") {
                correctAnswer = question.answer
            } else {
                // For Hindi, we need to get the corresponding translation
                const translatedQuestion = questionTranslations.find((tq) => tq.id === questionId)
                if (translatedQuestion) {
                    correctAnswer = translatedQuestion.answer
                }
            }

            return answer === correctAnswer
        }

        const subQuestionIndex = question.subQuestions?.findIndex((sq) => sq.id === subQuestionId)
        if (subQuestionIndex === -1 || subQuestionIndex === undefined) return false

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

        const subQuestion = translatedQuestion.subQuestions?.find((sq) => sq.id === subQuestionId)
        if (!subQuestion || !subQuestion.answerMapping) return hindiAnswer

        return subQuestion.answerMapping[hindiAnswer] || hindiAnswer
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

        const currentTranslation =
            questionLanguage === "hindi" ? questionTranslations.find((tq) => tq.id === question.id) : null

        return (
            <motion.div
                key={`${question.id}-${questionLanguage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="p-4 sm:p-6 bg-white rounded-lg shadow-lg"
            >
                <h3 className="font-semibold mb-4 text-purple-800">
                    {currentTranslation ? currentTranslation.text : question.text}
                </h3>

                {/* Render MCQ type questions */}
                {(question.type === "mcq" ||
                    question.type === "fill-in-blanks" ||
                    question.type === "true-false" ||
                    question.type === "matching" ||
                    question.type === "one-sentence") &&
                    Array.isArray(question.subQuestions) &&
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
                                {sq.options && (
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

                {/* Render short answer questions */}
                {question.type === "short-answer" && (
                    <div className="mb-4">
                        {question.options ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {question.options.map((option, optIndex) => {
                                    const translatedOptions = currentTranslation?.options
                                    const displayOption = translatedOptions ? translatedOptions[optIndex] : option
                                    const isSelected = answers[question.id] === (questionLanguage === "hindi" && translatedOptions ? translatedOptions[optIndex] : option)
                                    const isCorrect = submitted && isAnswerCorrect(question.id, null, questionLanguage === "hindi" && translatedOptions ? translatedOptions[optIndex] : option)

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
                                                name={`${question.id}`}
                                                value={questionLanguage === "hindi" && translatedOptions ? translatedOptions[optIndex] : option}
                                                checked={isSelected}
                                                onChange={() => handleInputChange(question.id, null, questionLanguage === "hindi" && translatedOptions ? translatedOptions[optIndex] : option)}
                                                disabled={submitted && !practiceMode}
                                                className="mr-2 text-purple-600 focus:ring-purple-500"
                                            />
                                            <span className="text-sm sm:text-base">{displayOption}</span>
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
                                    placeholder={questionLanguage === "hindi" ? "अपना उत्तर यहां लिखें..." : "Write your answer here..."}
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
                            placeholder={questionLanguage === "hindi" ? "अपना उत्तर यहां लिखें..." : "Write your answer here..."}
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
                                {questionLanguage === "hindi" ? "सेट 1" : "Set 1"}
                            </button>
                            <button
                                onClick={() => setActiveMapSet("set2")}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
                  ${activeMapSet === "set2" ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-800 hover:bg-purple-200"}`}
                            >
                                {questionLanguage === "hindi" ? "सेट 2" : "Set 2"}
                            </button>
                        </div>

                        <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-200">
                            <h4 className="text-blue-700 font-medium mb-2">{questionLanguage === "hindi" ? "निर्देश:" : "Instructions:"}</h4>
                            <p className="text-sm text-blue-600">
                                {questionLanguage === "hindi"
                                    ? "प्रत्येक स्थान के लिए मार्कर रखने के लिए मानचित्र पर क्लिक करें। आप उनकी स्थिति समायोजित करने के लिए मार्कर खींच सकते हैं।"
                                    : "Click on the map to place markers for each location. You can drag markers to adjust their position."}
                            </p>
                        </div>

                        <div className="relative border border-gray-300 rounded-lg overflow-hidden" ref={mapRef}>
                            <Image
                                src="/map.jpeg"
                                alt={questionLanguage === "hindi" ? "भारत का मानचित्र" : "Map of India"}
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
                            {(activeMapSet === "set1" ? question.subQuestions : question.alternateSet.subQuestions).map((sq) => {
                                // Get translated text for map locations if in Hindi
                                const translatedText = questionLanguage === "hindi" && currentTranslation
                                    ? (activeMapSet === "set1"
                                        ? currentTranslation.subQuestions.find(tsq => tsq.id === sq.id)?.text
                                        : currentTranslation.alternateSet?.subQuestions.find(tsq => tsq.id === sq.id)?.text)
                                    : sq.text;

                                return (
                                    <div key={sq.id} className="flex items-center">
                                        <div
                                            className={`w-4 h-4 rounded-full mr-2 ${mapMarkers[question.id + "-" + sq.id]
                                                ? submitted
                                                    ? isAnswerCorrect(question.id, sq.id, "marker")
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                    : "bg-purple-500"
                                                : "bg-gray-300"
                                                }`}
                                        />
                                        <span className={`text-sm ${mapMarkers[question.id + "-" + sq.id] ? "font-medium" : ""}`}>
                                            {translatedText || sq.text}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-center mt-2">
                    <div className="text-sm text-purple-600">
                        {questionLanguage === "hindi"
                            ? (currentTranslation?.category || question.category)
                            : question.category}
                    </div>
                    <div className="text-sm text-purple-600">[{question.marks} {questionLanguage === "hindi" ? "अंक" : "marks"}]</div>
                </div>

                {submitted && showExplanation && (
                    <motion.div
                        className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                    >
                        <h4 className="text-blue-700 font-medium mb-1">{questionLanguage === "hindi" ? "व्याख्या:" : "Explanation:"}</h4>
                        <p className="text-sm text-blue-600 whitespace-pre-line">
                            {questionLanguage === "hindi"
                                ? (activeMapSet === "set2" && question.type === "map"
                                    ? currentTranslation?.alternateSet?.explanation
                                    : currentTranslation?.explanation)
                                : (activeMapSet === "set2" && question.type === "map"
                                    ? question.alternateSet.explanation
                                    : question.explanation)}
                        </p>
                    </motion.div>
                )}
            </motion.div>
        )
    }

    const { score, totalMarks, correctAnswers, incorrectAnswers } = calculateScore()
    const percentage = totalMarks > 0 ? (score / totalMarks) * 100 : 0

    const getGrade = (percent) => {
        if (percent >= 90) return { grade: "A+", message: questionLanguage === "hindi" ? "उत्कृष्ट!" : "Outstanding!" }
        if (percent >= 80) return { grade: "A", message: questionLanguage === "hindi" ? "उत्तम!" : "Excellent!" }
        if (percent >= 70) return { grade: "B", message: questionLanguage === "hindi" ? "बहुत अच्छा!" : "Very Good!" }
        if (percent >= 60) return { grade: "C", message: questionLanguage === "hindi" ? "अच्छा!" : "Good!" }
        if (percent >= 50) return { grade: "D", message: questionLanguage === "hindi" ? "संतोषजनक" : "Satisfactory" }
        return { grade: "F", message: questionLanguage === "hindi" ? "सुधार की आवश्यकता है" : "Needs Improvement" }
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

    const LanguageSwitch = () => {
        return (
            <motion.div
                className="mb-4 bg-white p-3 rounded-lg shadow-lg flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <span className="text-purple-800 font-medium">
                    {questionLanguage === "hindi" ? "Question Language:" : "Question Language:"}
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={() => setQuestionLanguage("english")}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
              ${questionLanguage === "english"
                                ? "bg-purple-600 text-white"
                                : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                            }`}
                    >
                        English
                    </button>
                    <button
                        onClick={() => setQuestionLanguage("hindi")}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
              ${questionLanguage === "hindi"
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
                            {questionLanguage === "hindi" ? "व्याख्या दिखाएँ" : "Show Explanations"}
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
                                {questionLanguage === "hindi" ? "केवल गलतियाँ दिखाएँ" : "Show Mistakes Only"}
                            </label>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <label className="text-sm text-purple-800">
                            {questionLanguage === "hindi" ? "श्रेणी द्वारा फ़िल्टर करें:" : "Filter by Category:"}
                        </label>
                        <select
                            className="text-sm border border-purple-300 rounded p-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            onChange={(e) => {
                                // Filter questions by category logic would go here
                                // This is a placeholder for the UI
                            }}
                        >
                            <option value="">{questionLanguage === "hindi" ? "सभी श्रेणियाँ" : "All Categories"}</option>
                            {(questionLanguage === "hindi" ? hindiCategories : categories).map((category, index) => (
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

    if (showSettings) {
        return (
            <div className="min-h-screen bg-purple-50 flex flex-col justify-center p-4">
                <motion.header
                    className="mb-8 text-center"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold mb-2 text-purple-800">
                        {questionLanguage === "hindi"
                            ? "High School Social Science Examination 2025"
                            : "High School Social Science Examination 2025"}
                    </h1>
                    <p className="text-purple-600">
                        {questionLanguage === "hindi"
                            ? "Configure your exam settings below"
                            : "Configure your exam settings below"}
                    </p>
                </motion.header>

                <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">
                        {questionLanguage === "hindi" ? "Exam Settings" : "Exam Settings"}
                    </h2>

                    <div className="mb-6">
                        <label className="block text-purple-700 font-medium mb-2">
                            {questionLanguage === "hindi" ? "Exam Duration (minutes):" : "Exam Duration (minutes):"}
                        </label>
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
                        <label className="block text-purple-700 font-medium mb-2">
                            {questionLanguage === "hindi" ? "Language:" : "Language:"}
                        </label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setQuestionLanguage("english")}
                                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${questionLanguage === "english"
                                        ? "bg-purple-600 text-white"
                                        : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                                    }`}
                            >
                                English
                            </button>
                            <button
                                onClick={() => setQuestionLanguage("hindi")}
                                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${questionLanguage === "hindi"
                                        ? "bg-purple-600 text-white"
                                        : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                                    }`}
                            >
                                हिंदी
                            </button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-purple-700 font-medium mb-2">
                            {questionLanguage === "hindi" ? "Mode:" : "Mode:"}
                        </label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPracticeMode(false)}
                                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${!practiceMode
                                        ? "bg-purple-600 text-white"
                                        : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                                    }`}
                            >
                                {questionLanguage === "hindi" ? "Exam Mode" : "Exam Mode"}
                            </button>
                            <button
                                onClick={() => setPracticeMode(true)}
                                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${practiceMode
                                        ? "bg-purple-600 text-white"
                                        : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                                    }`}
                            >
                                {questionLanguage === "hindi" ? "Practice Mode" : "Practice Mode"}
                            </button>
                        </div>
                    </div>

                    <motion.button
                        onClick={startExam}
                        className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {questionLanguage === "hindi" ? "Start Exam" : "Start Exam"}
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
                        {questionLanguage === "hindi"
                            ? "High School Social Science Examination 2025"
                            : "High School Social Science Examination 2025"}
                    </h1>
                    <div className="text-sm sm:text-base text-purple-800">
                        {questionLanguage === "hindi"
                            ? `Total Questions:: ${questions.length} | Maximum Marks: ${totalMarks}`
                            : `Total Questions: ${questions.length} | Maximum Marks: ${totalMarks}`}
                    </div>
                    <div className="text-sm sm:text-base text-purple-800 flex items-center justify-center gap-2">
                        <Clock size={16} className="text-purple-800" />
                        {questionLanguage === "hindi"
                            ? `Time Remaining: ${formatTimeRemaining(timeRemaining)}`
                            : `Time Remaining: ${formatTimeRemaining(timeRemaining)}`}
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
                                {questionLanguage === "hindi"
                                    ? `प्रश्न ${currentQuestion + 1} / ${questions.length}`
                                    : `Question ${currentQuestion + 1} of ${questions.length}`}
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
                                    <div>{questionLanguage === "hindi" ? "कोई प्रश्न उपलब्ध नहीं है" : "No questions available"}</div>
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
                                        title={questionLanguage === "hindi" ? "पहला प्रश्न" : "First Question"}
                                    >
                                        <ChevronsLeft size={20} />
                                    </motion.button>
                                    <motion.button
                                        onClick={handlePrevious}
                                        className="p-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 disabled:opacity-50 transition-colors"
                                        disabled={currentQuestion === 0 || (submitted && !practiceMode)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        title={questionLanguage === "hindi" ? "पिछला प्रश्न" : "Previous Question"}
                                    >
                                        <ChevronLeft size={20} />
                                    </motion.button>
                                    <motion.button
                                        onClick={handleNext}
                                        className="p-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 disabled:opacity-50 transition-colors"
                                        disabled={currentQuestion === questions.length - 1 || (submitted && !practiceMode)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        title={questionLanguage === "hindi" ? "अगला प्रश्न" : "Next Question"}
                                    >
                                        <ChevronRight size={20} />
                                    </motion.button>
                                    <motion.button
                                        onClick={() => setCurrentQuestion(questions.length - 1)}
                                        className="p-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 disabled:opacity-50 transition-colors"
                                        disabled={currentQuestion === questions.length - 1 || (submitted && !practiceMode)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        title={questionLanguage === "hindi" ? "अंतिम प्रश्न" : "Last Question"}
                                    >
                                        <ChevronsRight size={20} />
                                    </motion.button>
                                </div>

                                <div className="flex-1 order-1 sm:order-2">
                                    <h3 className="text-xs sm:text-sm text-purple-700 mb-2 font-medium text-center">
                                        {questionLanguage === "hindi" ? "प्रश्न नेविगेटर:" : "Question Navigator:"}
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
                            ${currentQuestion === index
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
                                    {questionLanguage === "hindi" ? "परिणामों पर वापस जाएं" : "Back to Results"}
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
                                {questionLanguage === "hindi" ? "परीक्षा परिणाम" : "Exam Results"}
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
                                    <h3 className="font-semibold text-purple-800 mb-3">
                                        {questionLanguage === "hindi" ? "स्कोर सारांश" : "Score Summary"}
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <div>{questionLanguage === "hindi" ? "कुल प्रश्न:" : "Total Questions:"}</div>
                                            <div className="font-medium">{questions.length}</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>{questionLanguage === "hindi" ? "प्रयास किए गए:" : "Attempted:"}</div>
                                            <div className="font-medium">{correctAnswers + incorrectAnswers}</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>{questionLanguage === "hindi" ? "अंक:" : "Marks:"}</div>
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
                                    <h3 className="font-semibold text-purple-800 mb-3">
                                        {questionLanguage === "hindi" ? "प्रदर्शन" : "Performance"}
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <div>{questionLanguage === "hindi" ? "सही:" : "Correct:"}</div>
                                            <div className="font-medium text-green-600">{correctAnswers}</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>{questionLanguage === "hindi" ? "गलत:" : "Incorrect:"}</div>
                                            <div className="font-medium text-red-600">{incorrectAnswers}</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>{questionLanguage === "hindi" ? "प्रयास नहीं किए गए:" : "Not Attempted:"}</div>
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
                                <p className="mb-4 text-purple-700">
                                    {questionLanguage === "hindi"
                                        ? "नीचे नेविगेट करके सभी प्रश्नों और उत्तरों की समीक्षा करें"
                                        : "Review all questions and answers by navigating below"}
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <motion.button
                                        onClick={handleReviewQuestions}
                                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {questionLanguage === "hindi" ? "प्रश्नों की समीक्षा करें" : "Review Questions"}
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
                                        {questionLanguage === "hindi" ? "अभ्यास मोड" : "Practice Mode"}
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
                                        {questionLanguage === "hindi" ? "गलतियों की समीक्षा करें" : "Review Mistakes"}
                                    </motion.button>

                                    <motion.button
                                        onClick={() => window.print()}
                                        className="px-6 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {questionLanguage === "hindi" ? "परिणाम प्रिंट करें" : "Print Results"}
                                    </motion.button>

                                    <motion.button
                                        onClick={() => {
                                            // Create the download function
                                            const downloadPDF = () => {
                                                const pdfPath = "/10_2025_sst.pdf"

                                                // Create an anchor element
                                                const link = document.createElement("a")
                                                link.href = pdfPath
                                                link.setAttribute("download", pdfPath)
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
                                        {questionLanguage === "hindi" ? "मूल पेपर डाउनलोड करें" : "Download Original Paper"}
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
                            {questionLanguage === "hindi" ? "Submit Exam" : "Submit Exam"}
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
                        <div className="text-xs sm:text-sm text-purple-600 font-medium">
                            {questionLanguage === "hindi" ? `शेष समय: ${formatTimeRemaining(timeRemaining)}` : `${formatTimeRemaining(timeRemaining)}`}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

