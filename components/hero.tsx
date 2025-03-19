"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .from(
        buttonRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .from(
        imageRef.current,
        {
          x: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6",
      )
  }, [])

  return (
    <div ref={heroRef} className="bg-gradient-to-br from-white to-purple-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-900 leading-tight mb-4"
            >
              Ace Your Exams with Confidence
            </h1>
            <p ref={subtitleRef} className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
              Our online examination platform provides a seamless experience for students and educators. Take exams,
              track progress, and achieve your academic goals.
            </p>
            <div ref={buttonRef} className="flex space-x-4">
              <Link
                href="/exams"
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
            </div>
          </div>
          <div ref={imageRef} className="md:w-1/2">
            <img
              src="/placeholder.svg?height=400&width=500"
              alt="Online Examination Platform"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

