export type TotalLecturesInStatuses = {
  [courseId: string]: {
    completed: number;
    inProgress: number;
  };
};

export type CourseLectureStatistics = {
  completed: number;
  inProgress: number;
  remaining: number;
};
