"use client"
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Student {
  id: number;
  name: string;
  mark: number;
  rank?: number;
}

const StudentLeaderboard: React.FC = () => {
  // Sample data for demonstration
  const students: Student[] = [
    { id: 1, name: "Emma Thompson", mark: 95 },
    { id: 2, name: "James Wilson", mark: 88 },
    { id: 3, name: "Sophia Chen", mark: 92 },
    { id: 4, name: "Miguel Rodriguez", mark: 78 },
    { id: 5, name: "Olivia Johnson", mark: 95 },
    { id: 6, name: "Noah Williams", mark: 85 },
    { id: 7, name: "Ava Martinez", mark: 90 },
    { id: 8, name: "Ethan Brown", mark: 82 },
  ];

  // Refs for animations
  const tableRef = useRef<HTMLTableElement>(null);
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  // Calculate ranks based on marks (higher mark = better rank)
  const calculateRanks = (students: Student[]): Student[] => {
    const sortedStudents = [...students].sort((a, b) => b.mark - a.mark);
    
    let currentRank = 1;
    let previousMark = -1;
    let skippedRanks = 0;
    
    return sortedStudents.map((student, index) => {
      if (index > 0 && student.mark < previousMark) {
        currentRank += skippedRanks + 1;
        skippedRanks = 0;
      } else if (index > 0 && student.mark === previousMark) {
        skippedRanks++;
      }
      
      previousMark = student.mark;
      return { ...student, rank: currentRank };
    });
  };

  const rankedStudents = calculateRanks(students);

  // Animation effects
  useEffect(() => {
    // Initial animation for table header
    if (tableRef.current) {
      gsap.from(tableRef.current.querySelector('thead'), {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
    }

    // Staggered animation for table rows
    if (rowRefs.current.length > 0) {
      gsap.fromTo(
        rowRefs.current,
        { 
          x: -20, 
          opacity: 0,
          scale: 0.95
        },
        { 
          x: 0, 
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.3
        }
      );
    }
  }, []);

  // Animation for hovering over rows
  const handleRowMouseEnter = (index: number) => {
    if (rowRefs.current[index]) {
      gsap.to(rowRefs.current[index], {
        backgroundColor: "rgba(147, 51, 234, 0.1)",
        boxShadow: "0 0 10px rgba(147, 51, 234, 0.2)",
        duration: 0.3
      });
    }
  };

  const handleRowMouseLeave = (index: number) => {
    if (rowRefs.current[index]) {
      gsap.to(rowRefs.current[index], {
        backgroundColor: "transparent",
        boxShadow: "none",
        duration: 0.3
      });
    }
  };

  return (
    <div className=" mx-auto p-4 bg-purple-50">
      <h1 className="text-2xl font-bold mb-4 text-purple-600">Student Leaderboard</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-purple-200">
        <table ref={tableRef} className="min-w-full">
          <thead>
            <tr className="bg-purple-600 border-b border-purple-300">
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">Mark</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-100">
            {rankedStudents.map((student, index) => (
              <tr 
                key={student.id} 
                ref={el => rowRefs.current[index] = el}
                onMouseEnter={() => handleRowMouseEnter(index)}
                onMouseLeave={() => handleRowMouseLeave(index)}
                className="transition-all duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${student.rank === 1 ? "text-purple-600 font-bold" : "text-gray-900"}`}>
                    {student.rank === 1 ? (
                      <span className="inline-flex items-center">
                        {student.rank} 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </span>
                    ) : (
                      student.rank
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${student.rank === 1 ? "text-purple-600 font-bold" : "text-gray-900"}`}>
                    {student.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className={`text-sm font-medium ${student.mark >= 90 ? "text-purple-600 font-bold" : "text-gray-900"}`}>
                    {student.mark}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentLeaderboard;