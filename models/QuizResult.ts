import { Schema, model, models } from 'mongoose';

interface IQuizResult {
  rollNumber: string;
  answeredQuestion: number;
}

const QuizResultSchema = new Schema<IQuizResult>({
  rollNumber: { type: String, required: true },
  answeredQuestion: { type: Number, required: true },
});

const QuizResult = models.QuizResult || model<IQuizResult>('QuizResult', QuizResultSchema);

export default QuizResult;
