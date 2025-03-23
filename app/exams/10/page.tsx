"use client";

import { motion } from "framer-motion";
import { SubjectCard } from "@/components/SubjectCard";
import { useState } from "react";

const subjects = [
  {
    name: "English",
    icon: "/icons/english.svg",
    color: "blue",
    questionCounts: { "2025": 23, "2024": 23, "2023": 23 } // etc
  },
  {
    name: "Hindi",
    icon: "/icons/hindi.svg",
    color: "orange",
    questionCounts: { "2025": 23, "2024": 23, "2023": 23 }
  },
  {
    name: "Social Science",
    icon: "/icons/social.svg",
    color: "green",
    questionCounts: { "2025": 23, "2024": 23, "2023": 23 }
  },
  {
    name: "Science",
    icon: "/icons/science.svg",
    color: "purple",
    questionCounts: { "2025": 23, "2024": 23, "2023": 23 }
  },
  {
    name: "Mathematics",
    icon: "/icons/math.svg",
    color: "red",
    questionCounts: { "2025": 23, "2024": 23, "2023": 23 }
  },
  {
    name: "Information Technology",
    icon: "/icons/it.svg",
    color: "indigo",
    questionCounts: { "2025": 23, "2024": 23, "2023": 23 }
  },
  {
    name: "Sanskrit",
    icon: "/icons/sanskrit.svg",
    color: "yellow",
    questionCounts: { "2025": 23, "2024": 23, "2023": 23 }
  }
];

const years = Array.from({ length: 15 }, (_, i) => (2025 - i).toString());

export default function SubjectsPage() {
  const [selectedYear, setSelectedYear] = useState("2025");

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-purple-230 mb-4">
            Practice by Subject
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Choose a subject to start practicing previous year questions
          </p>
        </motion.div>

        {/* Year selector */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${selectedYear === year
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-purple-600 hover:bg-purple-50'
                  }`}
              >
                {year}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Subject cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {subjects.map((subject, index) => (
            <SubjectCard
              key={`${subject.name}-${selectedYear}`}
              subject={subject.name}
              year={selectedYear}
              questionCount={subject.questionCounts[selectedYear] || 0}
              icon={subject.icon}
              color={subject.color}
              index={index}
            />
          ))}
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-purple-600 text-lg">
            Not sure where to start?{" "}
            <a href="/demo" className="underline hover:text-purple-800">
              Try our demo exam
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}