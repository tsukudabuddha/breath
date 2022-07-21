export type ExerciseType = {
  name: string;
  inhaleDuration: number;
  exhaleDuration: number;
  holdDuration?: number;
  durationOptions: [number, number, number];
  durationDisplayNames: [string, string, string];
}

export enum Exercise {
  calm = "Calm",
  balance = "Balance"
}

export const Exercises: Map<Exercise, ExerciseType> = new Map([
  [Exercise.calm, {
    name: Exercise.calm,
    inhaleDuration: 4000, 
    exhaleDuration: 6000,
    durationOptions: [12, 30, 48], // 2m, 5m, 8m -- e.g. 12 -> 2m == 12r * 10s (4000ms + 6000ms) = 120 sec / 2m
    durationDisplayNames: ['2m', '5m', '8m']
  }],
  [Exercise.balance, {
    name: Exercise.balance,
    inhaleDuration: 6000, 
    exhaleDuration: 6000,
    durationOptions: [10, 25, 40],
    durationDisplayNames: ['2m', '5m', '8m']
  }]
])

