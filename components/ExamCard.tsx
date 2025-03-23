"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Globe2, Layout, Clock, ArrowRight } from "lucide-react";

interface ExamCardProps {
  examTitle: string;
  date: string;
  duration: string;
  languages: string[];
  questionType: string;
  examId: string;
  index: number;
}

export function ExamCard({
  examTitle,
  date,
  duration,
  languages,
  questionType,
  examId,
  index
}: ExamCardProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-purple-100 hover:border-purple-300"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-purple-900">{examTitle}</h3>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium"
          >
            {questionType}
          </motion.div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">{duration}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Globe2 className="h-4 w-4 mr-2" />
            <div className="flex gap-2">
              {languages.map((lang, i) => (
                <span
                  key={i}
                  className="text-sm px-2 py-1 bg-gray-100 rounded-full"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center text-gray-600">
            <Layout className="h-4 w-4 mr-2" />
            <span className="text-sm">{questionType}</span>
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="mt-4"
        >
          <Link
            href={`/exams/${examId}`}
            className="inline-flex items-center justify-center w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
          >
            Give Exam
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}