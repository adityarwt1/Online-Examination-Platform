"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

interface SubjectCardProps {
  subject: string;
  year: string;
  questionCount: number;
  icon: string;
  color: string;
  index: number;
}

export function SubjectCard({
  subject,
  year,
  questionCount,
  icon,
  color,
  index
}: SubjectCardProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/exams/${year}/${subject.toLowerCase().replace(' ', '-')}`}>
        <div className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-${color}-100 hover:border-${color}-300`}>
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-full bg-${color}-100 flex items-center justify-center`}>
              <img src={icon} alt={subject} className="w-6 h-6" />
            </div>
            <span className={`text-sm font-medium text-${color}-600 bg-${color}-50 px-3 py-1 rounded-full`}>
              {year}
            </span>
          </div>

          <h3 className={`text-xl font-bold text-${color}-900 mb-2`}>{subject}</h3>
          <p className="text-gray-600 text-sm mb-4">
            {questionCount} Questions
          </p>

          <div className="flex items-center justify-between mt-4">
            <span className={`text-${color}-600 font-medium text-sm`}>Start Practice</span>
            <motion.div
              whileHover={{ x: 5 }}
              className={`text-${color}-600 group-hover:text-${color}-800`}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}