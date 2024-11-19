import type {
  CheckpointLecture,
  CheckpointMultipleChoiceQuestion,
  CheckpointSingleChoiceQuestion,
} from "../lib/server/content/_lecture";
import { match } from "ts-pattern";

export type SingleChoiceResult = {
  type: "single-choice-answer";
  answer: string | null;
  isCorrect: boolean;
};

export type MultipleChoiceResult = {
  type: "multiple-choice-answer";
  answer: string[];
  isCorrect: boolean;
};

export type CheckpointResult = {
  answers: Record<string, SingleChoiceResult | MultipleChoiceResult>;
  correctAnswers: number;
  totalAnswers: number;
};

export function evaluateCheckpointLecture(formData: FormData, checkpoint: CheckpointLecture): CheckpointResult {
  const { questions } = checkpoint.data;
  
  const checkpointResult: CheckpointResult = { answers: {}, correctAnswers: 0, totalAnswers: 0 };

  questions.forEach((question) => {
    checkpointResult.totalAnswers += 1;

    const answer = match(question.type)
      .with("single-choice", () => evalSingleChoice(formData, question as CheckpointSingleChoiceQuestion))
      .with("multiple-choice", () => evalMultipleChoice(formData, question as CheckpointMultipleChoiceQuestion))
      .run();

    checkpointResult.correctAnswers += answer.isCorrect ? 1 : 0;
    checkpointResult.answers[question.code] = answer;
  });

  return checkpointResult;
}

function evalSingleChoice(formData: FormData, question: CheckpointSingleChoiceQuestion): SingleChoiceResult {
  const answer = formData.get(question.code) as string | null;

  return {
    type: "single-choice-answer",
    answer: (answer as string) ?? null,
    isCorrect: answer === question.correct,
  };
}

function evalMultipleChoice(formData: FormData, question: CheckpointMultipleChoiceQuestion): MultipleChoiceResult {
  const answers = formData.getAll(question.code) as string[];
  const isCorrect =
    question.correct.length === answers.length && answers.every((val) => question.correct.includes(val));

  return {
    type: "multiple-choice-answer",
    answer: (answers as string[]) ?? [],
    isCorrect: isCorrect,
  };
}
