"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, Bell, User, LogOut } from "lucide-react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef(null)
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
  }, [])

  useEffect(() => {
    if (isOpen) {
      gsap.to(mobileMenuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      })
    }
  }, [isOpen])

  return (
    <nav ref={navRef} className="bg-white border-b border-purple-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-purple-800">ExamPro</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="text-gray-700 font-semibold hover:text-purple-600 transition-colors duration-200">
              Dashboard
            </Link>
            <Link href="/classwise" className="text-gray-700  font-semibold hover:text-purple-600 transition-colors duration-200">
              Classwise
            </Link>
            <Link href="/exams" className="text-gray-700 font-semibold hover:text-purple-600 transition-colors duration-200">
              Exams
            </Link>
            <Link href="/results" className="text-gray-700 font-semibold hover:text-purple-600 transition-colors duration-200">
              Results
            </Link>
            <Link href="/resources" className="text-gray-700 font-semibold hover:text-purple-600 transition-colors duration-200">
              Resources
            </Link>
            <Link href="/support" className="text-gray-700 font-semibold hover:text-purple-600 transition-colors duration-200">
              Support
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5 text-gray-700" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span className="text-sm">New exam scheduled: Mathematics Final</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="text-sm">Results published: Biology Midterm</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5 text-gray-700" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile" className="flex w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings" className="flex w-full">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex items-center w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div ref={mobileMenuRef} className="md:hidden overflow-hidden h-0 opacity-0">
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
          <Link
            href="/dashboard"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
          >
            Dashboard
          </Link>
          <Link
            href="/exams"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
          >
            Exams
          </Link>
          <Link
            href="/results"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
          >
            Results
          </Link>
          <Link
            href="/resources"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
          >
            Resources
          </Link>
          <Link
            href="/support"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
          >
            Support
          </Link>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-purple-200 flex items-center justify-center">
                  <User className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">John Doe</div>
                <div className="text-sm font-medium text-gray-500">john@example.com</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                href="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
              >
                Profile
              </Link>
              <Link
                href="/settings"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
              >
                Settings
              </Link>
              <button className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50">
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

