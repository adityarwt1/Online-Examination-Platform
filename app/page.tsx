import Link from "next/link";
import { ExamCard } from "@/components/exam-card";
import { ResultCard } from "@/components/result-card";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import ClasswisePage from "@/components/ClasswisePage";

export default function Home() {
  const upcomingExams = [
    {
      id: 1,
      title: "Mathematics Final",
      date: "2025-04-15T10:00:00",
      duration: "3 hours",
      subject: "Mathematics",
      instructor: "Dr. Smith",
    },
    {
      id: 2,
      title: "Computer Science Midterm",
      date: "2025-04-10T14:00:00",
      duration: "2 hours",
      subject: "Computer Science",
      instructor: "Prof. Johnson",
    },
    {
      id: 3,
      title: "Physics Quiz",
      date: "2025-04-05T09:00:00",
      duration: "1 hour",
      subject: "Physics",
      instructor: "Dr. Williams",
    },
  ];

  const recentResults = [
    {
      id: 1,
      title: "Biology Midterm",
      date: "2025-03-15",
      score: 85,
      totalMarks: 100,
      grade: "A",
    },
    {
      id: 2,
      title: "Chemistry Quiz",
      date: "2025-03-10",
      score: 78,
      totalMarks: 100,
      grade: "B+",
    },
    {
      id: 3,
      title: "English Literature Essay",
      date: "2025-03-05",
      score: 92,
      totalMarks: 100,
      grade: "A+",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero />
        <ClasswisePage/>

       
      </main>
      <Footer />
    </div>
  );
}