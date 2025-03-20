"use client"
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface ClassData {
  id: number;
  name: string;
  subject: string;
  students: number;
  teacher: string;
  imageUrl: string;
}

const ClassSelectionComponent: React.FC<{
  onClassSelect: (classId: number) => void;
}> = ({ onClassSelect }) => {
  // Sample data for available classes
  const classes: ClassData[] = [
    {
      id: 1,
      name: "Mathematics 101",
      subject: "Mathematics",
      students: 32,
      teacher: "Dr. Alan Johnson",
      imageUrl: "/api/placeholder/100/60"
    },
    {
      id: 2,
      name: "English Literature",
      subject: "English",
      students: 28,
      teacher: "Ms. Emily Parker",
      imageUrl: "/api/placeholder/100/60"
    },
    {
      id: 3,
      name: "Physics: Mechanics",
      subject: "Physics",
      students: 24,
      teacher: "Prof. Robert Chen",
      imageUrl: "/api/placeholder/100/60"
    },
    {
      id: 4,
      name: "World History",
      subject: "History",
      students: 30,
      teacher: "Mrs. Sarah Williams",
      imageUrl: "/api/placeholder/100/60"
    },
    {
      id: 5,
      name: "Computer Science",
      subject: "Technology",
      students: 26,
      teacher: "Mr. David Martinez",
      imageUrl: "/api/placeholder/100/60"
    },
    {
      id: 6,
      name: "Biology",
      subject: "Science",
      students: 29,
      teacher: "Dr. Lisa Thompson",
      imageUrl: "/api/placeholder/100/60"
    }
  ];

  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle class selection
  const handleClassSelect = (classId: number) => {
    setSelectedClass(classId);
    if (onClassSelect) {
      onClassSelect(classId);
    }
  };

  // Initial animation when component mounts
  useEffect(() => {
    // Animate the header
    if (containerRef.current) {
      gsap.from(containerRef.current.querySelector('h2'), {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
    }

    // Staggered animation for cards
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { 
          y: 30, 
          opacity: 0,
          scale: 0.9
        },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.2)",
          delay: 0.2
        }
      );
    }
  }, []);

  // Animation for card hover
  const handleCardMouseEnter = (index: number) => {
    if (cardsRef.current[index]) {
      gsap.to(cardsRef.current[index], {
        y: -8,
        boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.3)",
        scale: 1.03,
        duration: 0.3
      });
    }
  };

  const handleCardMouseLeave = (index: number) => {
    if (cardsRef.current[index]) {
      gsap.to(cardsRef.current[index], {
        y: 0,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        scale: 1,
        duration: 0.3
      });
    }
  };

  // Animation for card selection
  const handleCardClick = (index: number, classId: number) => {
    // Animate selected card
    if (cardsRef.current[index]) {
      // Pulse animation
      gsap.timeline()
        .to(cardsRef.current[index], {
          scale: 1.05,
          boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.4)",
          borderColor: "#9333EA",
          duration: 0.2
        })
        .to(cardsRef.current[index], {
          scale: 1,
          duration: 0.15,
          delay: 0.1
        });
    }
    
    // Call selection handler
    handleClassSelect(classId);
  };

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto p-4 bg-purple-50 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-purple-600 text-center">Select a Class</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classData, index) => (
          <div 
            key={classData.id}
            ref={el => cardsRef.current[index] = el}
            className={`
              bg-white rounded-lg overflow-hidden shadow-md transition-all duration-200
              ${selectedClass === classData.id ? 'ring-2 ring-purple-600' : ''}
            `}
            onMouseEnter={() => handleCardMouseEnter(index)}
            onMouseLeave={() => handleCardMouseLeave(index)}
            onClick={() => handleCardClick(index, classData.id)}
          >
            <div className="relative h-32 bg-purple-100">
              <img 
                src={classData.imageUrl} 
                alt={classData.name} 
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-600/30 to-purple-600/10"></div>
              <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                {classData.students} students
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-lg text-purple-700 mb-1">{classData.name}</h3>
              <p className="text-sm text-gray-600 mb-3">
                <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs">{classData.subject}</span>
              </p>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 mr-2">
                  {classData.teacher.split(' ')[0][0]}{classData.teacher.split(' ')[1][0]}
                </div>
                <p className="text-sm text-gray-700">{classData.teacher}</p>
              </div>
            </div>
            
            <div className="px-4 py-3 bg-purple-50 border-t border-purple-100">
              <button 
                className={`w-full py-2 rounded-md text-sm font-medium transition-colors duration-200
                  ${selectedClass === classData.id 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                  }`}
              >
                {selectedClass === classData.id ? 'Selected' : 'Select Class'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassSelectionComponent;