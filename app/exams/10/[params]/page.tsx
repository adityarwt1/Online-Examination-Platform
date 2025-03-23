"use client";

import { motion } from "framer-motion";
import { SubjectCard } from "@/components/SubjectCard";

interface PageProps {
  params: {
    year: string;
  };
}

export default function YearSubjectsPage({ params }: PageProps) {
  const { year } = params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
            {year} Board Exam Practice
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Select a subject to practice {year} board exam questions
          </p>
        </motion.div>

        {/* Subject cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {subjects.map((subject, index) => (
            <SubjectCard
              key={subject.name}
              subject={subject.name}
              year={year}
              questionCount={subject.questionCounts[year] || 0}
              icon={subject.icon}
              color={subject.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}