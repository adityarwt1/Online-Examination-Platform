"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Calendar, Award } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ResultProps {
  id: number
  title: string
  date: string
  score: number
  totalMarks: number
  grade: string
}

export function ResultCard({ result, index }: { result: ResultProps; index: number }) {
  const cardRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    gsap.from(cardRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      delay: 0.1 * index,
      ease: "power3.out",
    })

    gsap.from(progressRef.current, {
      width: 0,
      duration: 1,
      delay: 0.3 + 0.1 * index,
      ease: "power3.inOut",
    })
  }, [index])

  const percentage = (result.score / result.totalMarks) * 100

  return (
    <Card ref={cardRef} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-purple-100">
      <div className="h-2 bg-purple-600"></div>
      <CardContent className="pt-6">
        <h3 className="text-xl font-bold text-purple-800 mb-2">{result.title}</h3>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-purple-500" />
            <span>{result.date}</span>
          </div>
          <div className="flex items-center text-sm font-medium">
            <Award className="h-4 w-4 mr-1 text-purple-500" />
            <span className="text-purple-800">{result.grade}</span>
          </div>
        </div>

        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Score</span>
            <span className="font-medium text-purple-800">
              {result.score}/{result.totalMarks}
            </span>
          </div>
          <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-purple-600 rounded-full"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-purple-50 p-4">
        <Button className="w-full bg-white text-purple-600 border border-purple-200 hover:bg-purple-100 hover:text-purple-700">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

