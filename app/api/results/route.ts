import { connectDB } from '@/lib/mongodb';
import QuizResult from '@/models/QuizResult';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectDB();

    const { rollNumber, answeredQuestion } = await req.json();

    const result = new QuizResult({
      rollNumber,
      answeredQuestion,
    });

    await result.save();

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const rollNumber = url.searchParams.get("rollNumber");

    if (!rollNumber) {
      return NextResponse.json({ error: "Roll number is required" }, { status: 400 });
    }

    await connectDB();

    const result = await QuizResult.findOne({ rollNumber });

    if (!result) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching result:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
