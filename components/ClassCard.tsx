"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ClassCardProps {
  className: string;
  description: string;
  index: number;
}

export function ClassCard({ className, description, index }: ClassCardProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="group"
    >
      <Link href={`/exams/${className}`}>
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100 hover:border-purple-300">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-purple-900 mb-2">
              Class {className}
            </h3>
            <p className="text-gray-600">{description}</p>
          </div>
          <div className="flex items-center justify-between mt-6">
            <span className="text-purple-600 font-medium">Explore Exams</span>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="h-5 w-5 text-purple-600 group-hover:text-purple-800" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}