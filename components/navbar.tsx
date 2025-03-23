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

  // GSAP animation for navbar on mount
  useEffect(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
  }, [])

  // GSAP animation for opening/closing mobile menu
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

  // ✅ Close menu when clicking on any link
  const handleLinkClick = () => {
    setIsOpen(false);
  }

  return (
    <nav ref={navRef} className="bg-white border-b border-purple-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center" onClick={handleLinkClick}>
              <span className="text-2xl font-bold text-purple-800">Exam-Simulator</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {["dashboard", "classwise", "exams", "results", "resources", "support"].map((item) => (
              <Link
                key={item}
                href={`/${item}`}
                onClick={handleLinkClick}
                className="text-gray-700 font-semibold hover:text-purple-600 transition-colors duration-200"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
          </div>

          {/* Notification & Profile */}
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
                  New exam scheduled: Mathematics Final
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Results published: Biology Midterm
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
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Toggle */}
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

      {/* Mobile Navigation */}
      <div ref={mobileMenuRef} className="md:hidden overflow-hidden h-0 opacity-0">
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
          {["classwise", "exams", "results", "resources", "support"].map((item) => (
            <Link
              key={item}
              href={`/${item}`}
              onClick={handleLinkClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="h-10 w-10 rounded-full bg-purple-200 flex items-center justify-center">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">Aditya Rawat</div>
                <div className="text-sm font-medium text-gray-500">adityarawatnew2487@gmail.com</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link href="/profile" onClick={handleLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50">
                Profile
              </Link>
              <Link href="/settings" onClick={handleLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50">
                Settings
              </Link>
              <button onClick={handleLinkClick} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50">
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
