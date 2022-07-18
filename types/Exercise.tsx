import { ExerciseType } from "./ExerciseType";

export enum Exercise {
  calm = "Calm"
}

export const Exercises: Map<Exercise, ExerciseType> = new Map([
  [Exercise.calm, {name: Exercise.calm, inhaleDuration: 4000, exhaleDuration: 6000}]
])

