import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-4">
            {/* Class Card 1 */}
            <div
                className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-200"

            >
                <div className="relative h-32 bg-purple-100">
                    <img
                        src="/math.png"
                        alt="Introduction to Math Exam"
                        className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-600/30 to-purple-600/10"></div>

                </div>

                <div className="p-4">
                    <h3 className="font-bold text-lg text-purple-700 mb-1">Math</h3>
                    <p className="text-sm text-gray-600 mb-3">
                        <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs">Math Board Exam</span>
                    </p>
                    <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 mr-2">
                            AR
                        </div>
                        <p className="text-sm text-gray-700"> Aditya Rawat</p>
                    </div>
                </div>

                <div className="px-4 py-3 bg-purple-50 border-t border-purple-100 w-full">
                    <Link href="/exams/math"
                        className="w-full py-2 rounded-md text-sm font-medium transition-colors duration-200 bg-purple-100 text-purple-600 hover:bg-purple-200"
                    >
                        Give Exam
                    </Link>
                </div>
            </div>

            {/* Class Card 2 */}
            <div
                className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-200 "

            >
                <div className="relative h-32 bg-purple-100">
                    <img
                        src="/api/placeholder/400/320"
                        alt="Advanced Mathematics"
                        className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-600/30 to-purple-600/10"></div>
                    <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                        24 students
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="font-bold text-lg text-purple-700 mb-1">Advanced Mathematics</h3>
                    <p className="text-sm text-gray-600 mb-3">
                        <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs">Mathematics</span>
                    </p>
                    <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 mr-2">
                            RJ
                        </div>
                        <p className="text-sm text-gray-700">Robert Johnson</p>
                    </div>
                </div>

                <div className="px-4 py-3 bg-purple-50 border-t border-purple-100">
                    <button
                        className="w-full py-2 rounded-md text-sm font-medium transition-colors duration-200 bg-purple-100  text-purple-600"
                    >
                        Select class
                    </button>
                </div>
            </div>

            {/* Class Card 3 */}
            <div
                className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-200"

            >
                <div className="relative h-32 bg-purple-100">
                    <img
                        src="/api/placeholder/400/320"
                        alt="World History"
                        className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-600/30 to-purple-600/10"></div>
                    <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                        32 students
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="font-bold text-lg text-purple-700 mb-1">World History</h3>
                    <p className="text-sm text-gray-600 mb-3">
                        <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs">Humanities</span>
                    </p>
                    <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 mr-2">
                            MP
                        </div>
                        <p className="text-sm text-gray-700">Maria Perez</p>
                    </div>
                </div>

                <div className="px-4 py-3 bg-purple-50 border-t border-purple-100">
                    <button
                        className="w-full py-2 rounded-md text-sm font-medium transition-colors duration-200 bg-purple-100 text-purple-600 hover:bg-purple-200"
                    >
                        Select Class
                    </button>
                </div>
            </div>

            {/* Class Card 4 */}
            <div
                className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-200"

            >
                <div className="relative h-32 bg-purple-100">
                    <img
                        src="/api/placeholder/400/320"
                        alt="Introduction to Computer Science"
                        className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-600/30 to-purple-600/10"></div>
                    <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                        36 students
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="font-bold text-lg text-purple-700 mb-1">Introduction to Computer Science</h3>
                    <p className="text-sm text-gray-600 mb-3">
                        <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs">Technology</span>
                    </p>
                    <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 mr-2">
                            DK
                        </div>
                        <p className="text-sm text-gray-700">David Kim</p>
                    </div>
                </div>

                <div className="px-4 py-3 bg-purple-50 border-t border-purple-100">
                    <button
                        className="w-full py-2 rounded-md text-sm font-medium transition-colors duration-200 bg-purple-100 text-purple-600 hover:bg-purple-200"
                    >
                        Select Class
                    </button>
                </div>
            </div>

            {/* Class Card 5 */}
            <div
                className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-200"

            >
                <div className="relative h-32 bg-purple-100">
                    <img
                        src="/api/placeholder/400/320"
                        alt="Spanish Language"
                        className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-600/30 to-purple-600/10"></div>
                    <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                        22 students
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="font-bold text-lg text-purple-700 mb-1">Spanish Language</h3>
                    <p className="text-sm text-gray-600 mb-3">
                        <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs">Languages</span>
                    </p>
                    <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 mr-2">
                            CG
                        </div>
                        <p className="text-sm text-gray-700">Carmen Garcia</p>
                    </div>
                </div>

                <div className="px-4 py-3 bg-purple-50 border-t border-purple-100">
                    <button
                        className="w-full py-2 rounded-md text-sm font-medium transition-colors duration-200 bg-purple-100 text-purple-600 hover:bg-purple-200"
                    >
                        Select Class
                    </button>
                </div>
            </div>

            {/* Class Card 6 */}
            <div
                className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-200"

            >
                <div className="relative h-32 bg-purple-100">
                    <img
                        src="/api/placeholder/400/320"
                        alt="Physics Lab"
                        className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-600/30 to-purple-600/10"></div>
                    <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                        20 students
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="font-bold text-lg text-purple-700 mb-1">Physics Lab</h3>
                    <p className="text-sm text-gray-600 mb-3">
                        <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs">Science</span>
                    </p>
                    <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 mr-2">
                            AT
                        </div>
                        <p className="text-sm text-gray-700">Alex Thompson</p>
                    </div>
                </div>

                <div className="px-4 py-3 bg-purple-50 border-t border-purple-100">
                    <button
                        className="w-full py-2 rounded-md text-sm font-medium transition-colors duration-200 bg-purple-100 text-purple-600 hover:bg-purple-200"
                    >
                        Select Class
                    </button>
                </div>
            </div>
        </div>
    )
}

export default page