"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const ResultPage = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [result, setResult] = useState<{ rollNumber: string; answeredQuestion: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Generate a random captcha
  useEffect(() => {
    generateCaptcha();
    if (formRef.current) {
      gsap.from(formRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, []);

  const generateCaptcha = () => {
    const randomCaptcha = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedCaptcha(randomCaptcha);
  };

  // Handle fetching result
  const handleFetchResult = async () => {
    if (captcha !== generatedCaptcha) {
      alert("Captcha is incorrect!");
      generateCaptcha();
      return;
    }

    if (!rollNumber.trim()) {
      alert("Please enter a valid roll number");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/results?rollNumber=${rollNumber}`);
      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        alert(data.error || "No result found for this roll number.");
        setResult(null);
      }
    } catch (error) {
      console.error("Error fetching result:", error);
      alert("Failed to fetch result. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-800">
      <div ref={formRef} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-purple-600 mb-6 text-center">Check Your Result</h2>

        {/* Roll Number Input */}
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          className="w-full p-3 mb-4 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Captcha */}
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Enter Captcha"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
            className="w-2/3 p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <span
            className="w-1/3 text-center p-3 font-semibold bg-purple-300 text-purple-800 rounded-lg cursor-pointer m-4"
            onClick={generateCaptcha}
          >
            {generatedCaptcha}
          </span>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleFetchResult}
          className={`w-full p-3 bg-purple-600 text-white rounded-lg font-bold transition-all ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
          }`}
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Result"}
        </button>

        {/* Result Section */}
        {result && (
          <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-800 rounded-md shadow-md">
            <h3 className="text-lg font-bold">Result:</h3>
            <p>
              <span className="font-semibold">Roll Number:</span> {result.rollNumber}
            </p>
            <p>
              <span className="font-semibold">Answered Questions:</span> {result.answeredQuestion}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
