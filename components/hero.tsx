"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <div className="bg-gradient-to-br from-white to-purple-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-900 leading-tight mb-4"
            >
              Practice Smarter, Score Higher with Real Exam Questions
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg"
            >
              Access thousands of previous MCQs from real exams, track your progress, and identify knowledge gaps to maximize your study efficiency.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
              className="flex space-x-4"
            >
              <Link
                href="/classwise"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center px-6 py-3 bg-white text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-300"
              >
                View Demo
              </Link>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
            className="md:w-1/2"
          >
            <img
              src="/graduation-celebration.png"
              alt="Student celebrating exam success"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}