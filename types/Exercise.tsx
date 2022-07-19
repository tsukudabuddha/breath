export type ExerciseType = {
  name: string;
  inhaleDuration: number;
  exhaleDuration: number;
  holdDuration?: number;
  durationOptions: [number, number, number]
}

export enum Exercise {
  calm = "Calm"
}

export const Exercises: Map<Exercise, ExerciseType> = new Map([
  [Exercise.calm, {
    name: Exercise.calm,
    inhaleDuration: 4000, 
    exhaleDuration: 6000,
    durationOptions: [12, 30, 48] // 2m, 5m, 8m -- e.g. 12 -> 2m == 12r * 10s (4000ms + 6000ms) = 120 sec / 2m
  }]
])

