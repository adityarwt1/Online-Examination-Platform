import Link from "next/link";
import { ExamCard } from "@/components/exam-card";
import { ResultCard } from "@/components/result-card";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

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
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-purple-800 mb-8">Upcoming Exams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingExams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/exams"
              className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
            >
              View All Exams
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 bg-purple-50">
          <h2 className="text-3xl font-bold text-purple-800 mb-8">Recent Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentResults.map((result) => (
              <ResultCard key={result.id} result={result} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/results"
              className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
            >
              View All Results
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}