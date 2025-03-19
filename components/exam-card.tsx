"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Calendar, Clock, User } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ExamProps {
  id: number
  title: string
  date: string
  duration: string
  subject: string
  instructor: string
}

export function ExamCard({ exam, index }: { exam: ExamProps; index: number }) {
  const cardRef = useRef(null)

  useEffect(() => {
    gsap.from(cardRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      delay: 0.1 * index,
      ease: "power3.out",
    })
  }, [index])

  const formattedDate = new Date(exam.date).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  return (
    <Card ref={cardRef} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-purple-100">
      <div className="h-2 bg-purple-600"></div>
      <CardContent className="pt-6">
        <h3 className="text-xl font-bold text-purple-800 mb-2">{exam.title}</h3>
        <p className="text-gray-600 mb-4">{exam.subject}</p>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-purple-500" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-purple-500" />
            <span>{exam.duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <User className="h-4 w-4 mr-2 text-purple-500" />
            <span>{exam.instructor}</span>
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

