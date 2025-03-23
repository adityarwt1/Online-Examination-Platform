"use client";

import { motion } from "framer-motion";
import { ClassCard } from "@/components/ClassCard";

const classData = [
  {
    className: "10",
    description: "Prepare for your board exams with comprehensive practice questions covering all major subjects.",
  },
  {
    className: "11",
    description: "Master intermediate concepts with detailed practice materials and subject-wise question banks.",
  },
  {
    className: "12",
    description: "Get ready for board exams and competitive tests with advanced practice questions and mock tests.",
  },
];

export default function ClasswisePage() {
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
            Choose Your Class
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Select your class to access tailored practice questions, mock tests, and study materials
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {classData.map((data, index) => (
            <ClassCard
              key={data.className}
              className={data.className}
              description={data.description}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-purple-600 text-lg">
            Need help choosing? Try our{" "}
            <a href="/demo" className="underline hover:text-purple-800">
              demo exam
            </a>{" "}
            first
          </p>
        </motion.div>
      </div>
    </div>
  );
}