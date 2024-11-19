import type { Token } from "marked";

export type Course = {
    title: string;
    faculty: string;
    cover: string;
    isDraft: boolean;
    description: string;
    slug: string;
    sections: {
        title: string;
        lectures: string[];
    }[];
}

// Common properties shared by all lecture types
type BaseLecture = {
    title: string;
    description: string;
    cover: string;
    badges: string[];
    content: string;
    completed: boolean;
    slug: string;
};

export type TextLecture = BaseLecture & {
    type: 'text';
};

export type VideoLecture = BaseLecture & {
    type: 'video';
    sources: {
        src: string;
    }[];
};

export type CodeLecture = BaseLecture & {
    type: 'code';
    content: Token [];
};

export type CheckpointLecture = BaseLecture & {
    type: 'checkpoint';
    questions: Array<{
        type: 'single' | 'multiple';
        question: string;
        options: string[];
        correctAnswers: number[];
    }>;
};

// Combined Lecture type
export type Lecture = TextLecture | VideoLecture | CodeLecture | CheckpointLecture;
